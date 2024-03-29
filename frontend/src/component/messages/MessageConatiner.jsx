import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from "../../zustand/useConversation";
import { useAutherContext } from "../../context/AuthContext";

const MessageConatiner = () => {
  const {
    messages,
    setMessages,
    selectedConversation,
    setSelectedConversation,
  } = useConversation();

  const { user } = useAutherContext();
  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, [setSelectedConversation._id]);

  return (
    <div className="right w-3/4 overflow-auto relative flex flex-col">
      {selectedConversation && (
        <div className="bg-slate-500 px-4 py-2 mb-2 flex justify-between">
          <div>
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">
              {selectedConversation.username}
            </span>{" "}
          </div>
          <div>
            <img src={selectedConversation?.avatar} className="w-[40px]" />
          </div>
        </div>
      )}
      <div className="flex-1 overflow-auto">
        {selectedConversation ? (
          <Messages />
        ) : (
          <h1 className="flex justify-center items-center h-full text-bold text-2xl">
            Please Select Conversation To Chat !
          </h1>
        )}
      </div>
      <MessageInput />
    </div>
  );
};

export default MessageConatiner;
