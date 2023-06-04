import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { addFriendValidator } from "@/lib/validations/add-friend";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email: emailToAdd } = addFriendValidator.parse(body.email);

    const idToAdd = (await fetchRedis(
      "get",
      `user:email:${emailToAdd}`
    )) as string;

    if (!idToAdd) {
      return new Response("Nigga Doesn't exist ...", { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized Nigga Found!!!", { status: 401 });
    }

    if (idToAdd === session?.user.id) {
      return new Response(
        "Lol...Nigga Trying to be smarter ? get tf outta here..",
        { status: 400 }
      );
    }

    // if user is Already Added
    const isAlreadyAdded = (await fetchRedis(
      "sismember",
      `user:${idToAdd}:incoming_friend_requests`,
      session.user.id
    )) as 0 | 1;

    if (isAlreadyAdded) {
      return new Response("Request Already sent to this Nigga...", {
        status: 400,
      });
    }

    // if user is Already Friend
    const isAlreadyFriends = (await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      idToAdd
    )) as 0 | 1;

    if (isAlreadyFriends) {
      return new Response("Already frineds with this Nigga...", {
        status: 400,
      });
    }

    pusherServer.trigger(
      toPusherKey(`user:${idToAdd}:incoming_friend_requests`),
      "incoming_friend_request",
      {
        senderId: session.user.id,
        senderEmail: session.user.email,
      }
    );

    // send Friend Request
    db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id);
    return new Response("OK");
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response("Invalid request Payload", { status: 402 });
    }
    return new Response("Invalid request", { status: 400 });
  }
}
