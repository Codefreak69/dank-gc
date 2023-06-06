import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { id: idToAdd } = z.object({ id: z.string() }).parse(body);

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized NIgga Found", { status: 401 });
    }

    // if sesion exists then check wether the user are already friends or not

    const isAlreadyFriends = await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      idToAdd
    );

    if (isAlreadyFriends) {
      return new Response("This Nigga is already your Homiee....", {
        status: 400,
      });
    }

    const hasFriendRequest = await fetchRedis(
      "sismember",
      `user:${session?.user.id}:incoming_friend_requests`,
      idToAdd
    );
    // console.log("HasFriendReq", hasFriendRequest);

    if (!hasFriendRequest) {
      return new Response("No friend Request from this user", { status: 400 });
    }
    // notify added user
    pusherServer.trigger(
      toPusherKey(`user:${idToAdd}:friends`),
      "new_friend",
      {}
    );

    await db.sadd(`user:${session.user.id}:friends`, idToAdd);

    await db.sadd(`user:${idToAdd}:friends`, session.user.id);

    await db.srem(`user:${session.user.id}:incoming_friend_requests`, idToAdd);

    return new Response("OK");
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response("Invalid Request Payload", { status: 422 });
    }
    return new Response("Invalid Request", { status: 400 });
  }
}
