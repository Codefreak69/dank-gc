import { FunctionComponent } from "react";

interface ChatInputProps {}

const ChatInput: FunctionComponent<ChatInputProps> = () => {
  return (
    <div className="border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div className="reative flex-1 overflow-hidden rounded-lg shadow-sm"></div>
    </div>
  );
};

export default ChatInput;
