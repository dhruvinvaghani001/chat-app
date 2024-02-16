import React from "react";
import { Send } from "lucide-react";

const MessageInput = () => {
  return (
    <div className="w-full px-4 my-3">
        <form className="w-full">
          <div className="flex items-center">
            <input
              type="text"
              className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
              placeholder="Send a message"
            />
            <button
              type="submit"
              className="ml-2 bg-gray-700 text-white p-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </form>
      </div>
  );
};

export default MessageInput;
