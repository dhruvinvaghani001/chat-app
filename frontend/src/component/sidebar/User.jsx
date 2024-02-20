import React from "react";
import { User } from "lucide-react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const SingleUser = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id == conversation._id;
  const { onlineUsers } = useSocketContext();
  console.log(onlineUsers);
  const onlineCheck = onlineUsers.includes(conversation._id);
  
  return (
    <div
      className={`user transition   ease-out hover:bg-blue-400 ${
        isSelected ? "bg-blue-400" : "bg-slate-700"
      }`}
      onClick={() => setSelectedConversation(conversation)}
    >
      <div className="profile__img">
        {onlineCheck && (
          <div className="h-4 w-4 rounded-full bg-green-700 online-dot"></div>
        )}

        <img src={conversation.avatar} alt={conversation.username} width={65} />
      </div>
      <div className="details">
        <h3>{conversation.username}</h3>
      </div>
    </div>
  );
};

export default SingleUser;
