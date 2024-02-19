import React from "react";
import { User } from "lucide-react";
import useConversation from "../../zustand/useConversation";

const SingleUser = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id == conversation._id;

  return (
    <div
      className={`user transition   ease-out hover:bg-blue-400 ${
        isSelected ? "bg-blue-400" : "bg-slate-700"
      }`}
      onClick={() => setSelectedConversation(conversation)}
    >
      <div className="profile__img">
        <img src={conversation.avatar} alt={conversation.username} width={65} />
      </div>
      <div className="details">
        <h3>{conversation.username}</h3>
      </div>
    </div>
  );
};

export default SingleUser;
