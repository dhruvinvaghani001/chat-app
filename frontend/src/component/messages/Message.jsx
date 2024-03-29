import React from "react";
import { User } from "lucide-react";
import { useAutherContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

function extractTime(dateString) {
  const date = new Date(dateString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
  return number.toString().padStart(2, "0");
}

const Message = ({ msg }) => {
  const { user } = useAutherContext();

  const { selectedConversation } = useConversation();
  const fromMe = user._id == msg.sender;
  const profilePick = fromMe ? user.avatar : selectedConversation?.avatar;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-slate-600";
  const dateString = msg.createdAt;
  const shakeClasss = msg.shake ? "shake" : "";
  const date = extractTime(dateString);

  
  const checkFomMeInGroup = msg.sender._id == user._id;

  return (
    <div
      className={`flex my-4  gap-4 items-start ${
        fromMe || checkFomMeInGroup
          ? "justify-onlyend flex-row-reverse"
          : "justify-start"
      }   `}
    >
      <div className="chat-image avatar">
        <div className="rounded-full w-12 flex flex-col justify-center items-center ">
        <span className="text-xl ">{msg.sender?.username}</span>
          
        </div>
      </div>
      <div
        className={`${bubbleBgColor} ${shakeClasss}  p-2 text-xl rounded-lg max-w-[500px]`}
        style={{lineBreak:"anywhere"}}
      >
        {msg.content}
        
      </div>
      
    </div>
  );
};

export default Message;
