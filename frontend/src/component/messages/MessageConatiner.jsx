import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from "../../zustand/useConversation";

const MessageConatiner = () => {
  const {
    messages,
    setMessages,
    selectedConversation,
    setSelectedConversation,
  } = useConversation();

  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);

  return (
    <div className="right w-3/4 h-[700px] overflow-auto relative flex flex-col">
      <div className="bg-slate-500 px-4 py-2 mb-2">
        <span className="label-text">To:</span>{" "}
        <span className="text-gray-900 font-bold">John doe</span>{" "}
      </div>
      <div className="flex-1 overflow-auto">
        {selectedConversation ? (
          <Messages />
        ) : (
          <h1>please select conversation to chat </h1>
        )}
      </div>
      <MessageInput />
    </div>
  );
};

export default MessageConatiner;
