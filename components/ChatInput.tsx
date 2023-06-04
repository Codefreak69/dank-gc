"use client";
import { FunctionComponent, useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface ChatInputProps {
  chatPartner: User;
  chatId: string;
}

const ChatInput: FunctionComponent<ChatInputProps> = ({
  chatPartner,
  chatId,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (!input) return;
    setIsLoading(true);

    try {
      await axios.post("/api/message/send", {
        text: input,
        chatId,
      });

      // clear input
      setInput("");
      textAreaRef.current?.focus();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0 pb-2">
      <div className="reative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-purple-600 ">
        <Textarea
          placeholder={`Message ${chatPartner.name}`}
          ref={textAreaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="block w-full placeholder-gray-400  focus:outline-none focus:ring-0 sm:text-sm"
        />

        <div className="absolute right-1 bottom-1 flex justify-between py-2 pl-3 pr-4 m-1">
          <div className="flex-shrink-0 ">
            <Button
              type="submit"
              className="bg-purple-500 hover:bg-purple-700 hover:text-pink-100"
              onClick={sendMessage}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="ml-2">Send</span>
                </>
              ) : (
                <span>Send</span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
