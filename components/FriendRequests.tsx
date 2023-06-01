"use client";
import { Check, UserPlus } from "lucide-react";
import { FunctionComponent, useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[];
  sessionId: string;
}

const FriendRequests: FunctionComponent<FriendRequestsProps> = ({
  incomingFriendRequests,
  sessionId,
}) => {
  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  );

  const router = useRouter();

  // add FriendRequest
  const acceptFriendReq = async (senderId: string) => {
    await axios.post("/api/friends/accept", { id: senderId });
    setFriendRequests((prev) =>
      prev.filter((req) => req.senderId !== senderId)
    );

    router.refresh();
  };

  // Deny Friend Requests
  const denyFriendReq = async (senderId: string) => {
    await axios.post("/api/friends/deny", { id: senderId });
    setFriendRequests((prev) =>
      prev.filter((req) => req.senderId !== senderId)
    );

    router.refresh();
  };

  return (
    <>
      {friendRequests.length === 0 ? (
        <p className="text-sm text-zinc-500">
          You are very lonely...add some niggas to get started
        </p>
      ) : (
        friendRequests.map((req) => (
          <div
            key={req.senderId}
            className="flex gap-4 ml-2 hover:bg-purple-200 cursor-pointer items-center p-2 rounded-md"
          >
            <UserPlus className="text-black" />
            <p className="font-medium text-lg ">{req.senderEmail}</p>
            <Button
              onClick={() => acceptFriendReq(req.senderId)}
              aria-label="accept friend requests"
              className="  grid place-items-center transition hover:shadow-md"
            >
              <Check className="font-semibold text-white  w-3/4 h-3/4" />
            </Button>

            <Button
              onClick={() => denyFriendReq(req.senderId)}
              variant={"destructive"}
              aria-label="Deny friend requests"
              className="  grid place-items-center transition hover:shadow-md"
            >
              <X className="font-semibold text-white  w-3/4 h-3/4" />
            </Button>
          </div>
        ))
      )}
    </>
  );
};

export default FriendRequests;
