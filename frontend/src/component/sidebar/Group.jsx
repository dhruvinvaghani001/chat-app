import React from "react";
import { User } from "lucide-react";
import useConversation from "../../zustand/useConversation";

const Group = ({ group }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id == group._id;
 
  return (
    <div
      className={`user transition   ease-out hover:bg-blue-400   ${
        isSelected ? "bg-blue-400" : "bg-slate-700"
      }`}
      onClick={() => setSelectedConversation(group)}
    >
      <div className="profile__img bg-white p-4 rounded-full">
        {/* <img src={conversation.avatar} alt={conversation.username} width={65} /> */}
        <User width={36} />
      </div>
      <div className="details">
        <h3 className="font-bold text-2xl">{group.title}</h3>
        <div className="flex gap-2 justify-center items-center">
          <span className="font-semibold text-lg">Memebers:</span>
          {group.participants.map((pr) => {
            return (
              <li className="list-none px-3 py-2 bg-green-700 rounded-lg text-lg">
                {pr.username}
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Group;
