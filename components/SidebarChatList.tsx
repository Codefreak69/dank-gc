"use client";

import { chatHrefConstructor } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { FunctionComponent, useEffect, useState } from "react";

interface SideBarChatListProps {
  friends: User[];
  sessionId: string;
}

const SideBarChatList: FunctionComponent<SideBarChatListProps> = ({
  friends,
  sessionId,
}) => {
  const router = useRouter();

  const pathName = usePathname();

  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (pathName.includes("chat")) {
      setUnseenMessages((prev) => {
        return prev.filter((message) => !pathName.includes(message.senderId));
      });
    }
  }, [pathName]);

  return (
    <ul role="list" className="max-h-[25rem] overflow-y-auto -mx-2">
      {friends.sort().map((friend) => {
        // getting unseen messages count

        const unseenMessagesCount = unseenMessages.filter((unseenMsg) => {
          return unseenMsg.senderId === friend.id;
        }).length;

        return (
          <li key={friend.id}>
            <a
              href={`/dashboard/chat/${chatHrefConstructor(
                sessionId,
                friend.id
              )}`}
              className={`text-white hover:text-purple-600 hover:bg-purple-300  p-2 rounded-md group flex items-center gap-x-3 text-sm leading-6 font-semibold transition-colors hover:shadow-md  ${
                pathName.includes(friend.id) ? "bg-purple-800 " : ""
              }`}
            >
              {friend.name}
              {unseenMessagesCount > 0 ? (
                <div className=" mx-2 rounded-full h-5 w-5 text-xs font-medium flex justify-center items-center bg-purple-400 text-purple-100 ">
                  {unseenMessagesCount}
                </div>
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SideBarChatList;
