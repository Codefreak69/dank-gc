"use client";

import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { User } from "lucide-react";
import Link from "next/link";
import { FunctionComponent, useEffect, useState } from "react";

interface FriendRequestsSIdebarOptionsProps {
  initialUnseenRequestCounts: number;
  sessionId: string;
}

const FriendRequestsSIdebarOptions: FunctionComponent<
  FriendRequestsSIdebarOptionsProps
> = ({ initialUnseenRequestCounts, sessionId }) => {
  const [unseenRequestCounts, setUnseenRequestCounts] = useState<number>(
    initialUnseenRequestCounts
  );

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_requests`)
    );
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));

    const friendRequestHandler = () => {
      setUnseenRequestCounts((prev) => prev + 1);
    };

    const addedFriendHandler = () => {
      setUnseenRequestCounts((prev) => prev - 1);
    };

    pusherClient.bind("incoming_friend_request", friendRequestHandler);
    pusherClient.bind("new_friend", addedFriendHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_requests`)
      );
      pusherClient.unbind("incoming_friend_request", friendRequestHandler);
      pusherClient.unbind("new_friend", addedFriendHandler);
    };
  }, [sessionId]);

  return (
    <Link
      href={"dashboard/requests"}
      className="text-purple-600 hover:text-purple-500 hover:bg-purple-300 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors"
    >
      <div className="text-purple-200 border-purple-200 group-hover:border-purple-600 group-hover:text-purple-500 flex h-6 w-6 shrink-0 items-center justify-center rounded-full  text-[0.625rem] font-medium bg-purple-800">
        <User className="h-4 w-4 " />
      </div>
      <p className="truncate ">Friend Requests</p>

      {unseenRequestCounts > 0 ? (
        <div className="rounded-full h-5 w-5 text-xs flex justify-center items-center bg-purple-400 text-purple-100 animate-pulse">
          {unseenRequestCounts}
        </div>
      ) : null}
    </Link>
  );
};

export default FriendRequestsSIdebarOptions;
