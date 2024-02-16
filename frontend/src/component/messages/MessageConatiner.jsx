import React from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const MessageConatiner = () => {
  return (
    <div className="right w-3/4 h-[700px] overflow-auto relative flex flex-col">
      <div className="bg-slate-500 px-4 py-2 mb-2">
        <span className="label-text">To:</span>{" "}
        <span className="text-gray-900 font-bold">John doe</span>{" "}
      </div>
      <div className="flex-1 overflow-auto">
        <Messages />
      </div>
      <MessageInput />
    </div>
  );
};

export default MessageConatiner;
