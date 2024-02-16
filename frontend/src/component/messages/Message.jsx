import React from "react";
import { User } from "lucide-react";

const Message = () => {
  return (
    <div className="">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <User />
        </div>
      </div>
      <div className="">helo what's up !</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center"></div>
    </div>
  );
};

export default Message;
