import FriendRequests from "@/components/FriendRequests";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) notFound();

  //   find who sent the request to current user
  const incomingSenderIds = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[];

  const incomingFrinedRequests = await Promise.all(
    incomingSenderIds.map(async (senderId) => {
      const sender = (await fetchRedis("get", `user:${senderId}`)) as string;
      const senderParse = JSON.parse(sender) as User;

      return {
        senderId,
        senderEmail: senderParse.email,
      };
    })
  );

  return (
    <main className="pt-8 mx-auto py-8 md:py-6">
      <h1 className="font-bold text-5xl mb-8 ">Friend Requests</h1>
      <div className="flex flex-col gap-4">
        <FriendRequests
          sessionId={session.user.id}
          incomingFriendRequests={incomingFrinedRequests}
        />
      </div>
    </main>
  );
};

export default Page;
