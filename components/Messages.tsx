"use client";
import { cn } from "@/lib/utils";
import { Message } from "@/lib/validations/message";
import { FunctionComponent, useRef, useState } from "react";

interface MessagesProps {
  initialMessages: Message[];
  sessionId: string;
}

const Messages: FunctionComponent<MessagesProps> = ({
  initialMessages,
  sessionId,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const scrollDownRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      id="messages"
      className="flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-purple-900  scrollbar-track-purple-400 scrollbar-thin scrollbar-rounded-full "
    >
      <div ref={scrollDownRef} />
      {messages.map((message, idx) => {
        const isCurrUser = message.senderId === sessionId;

        const hasNextMessageFromSameUser =
          messages[idx - 1]?.senderId === messages[idx]?.senderId;

        return (
          <div
            className="chat-message"
            key={`${message.id}-${message.timeStamp}`}
          >
            <div
              className={cn("flex items-end", {
                "justify-end": isCurrUser,
              })}
            >
              <div
                className={cn(
                  "flex flex-col space-y-2 text-base max-w-xs mx-2",
                  {
                    "order-1 items-end": isCurrUser,
                    "order-2 items-start": !isCurrUser,
                  }
                )}
              >
                <span
                  className={cn("px-4 py-2  rounded-lg inline-block ", {
                    "bg-purple-600 text-white": isCurrUser,
                    "bg-gray-200 text-gray-900": !isCurrUser,
                    "rounded-br-none":
                      !hasNextMessageFromSameUser && isCurrUser,
                    "rounded-bl-none":
                      !hasNextMessageFromSameUser && !isCurrUser,
                  })}
                >
                  {message.text}{" "}
                  <span className="ml-2 text-xs text-gray-400 ">
                    {message.timeStamp}
                  </span>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
