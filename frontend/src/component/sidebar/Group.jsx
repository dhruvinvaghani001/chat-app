import React from "react";
import { User } from "lucide-react";
import useConversation from "../../zustand/useConversation";
import { useAutherContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";

const Group = ({ group }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id == group._id;
  const { user } = useAutherContext();
  const { onlineUsers } = useSocketContext();
  const groupParticipants = group.participants.map((participants) => {
    return {
      ...participants,
      onlineCheck: onlineUsers?.includes(participants._id),
    };
  });

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
        <div className="flex flex-wrap gap-2 justify-center items-center">
          <span className="font-semibold text-lg">Memebers:</span>
          <li className="list-none px-3 py-1 bg-violet-600 rounded-lg text-lg relative">
            You
          </li>
          {groupParticipants.map((pr) => {
            if (pr._id != user._id) {
              return (
                <li className="list-none px-3 py-1 bg-violet-600 rounded-lg text-lg relative">
                  {pr?.onlineCheck && (
                    <div className="h-3 w-3 rounded-full bg-green-500 absolute top-[-8%] left-0"></div>
                  )}

                  {pr.username}
                </li>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Group;
