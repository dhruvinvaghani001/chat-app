import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useConversation from "../../zustand/useConversation";
import useGetMessages from "../../hooks/useGetMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const lastmessageIndex = useRef(null);

  useEffect(() => {
    lastmessageIndex.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages.length == 0 ? <h1 className="flex justify-center items-center h-full text-bold text-2xl">
           start chatting now .
          </h1> : <></>}
      {messages.map((msg) => (
        <div key={msg._id} ref={lastmessageIndex}>
          <Message msg={msg} />
        </div>
      ))}
    </div>
  );
};

export default Messages;
