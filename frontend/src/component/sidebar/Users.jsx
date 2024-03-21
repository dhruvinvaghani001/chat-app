import React from "react";
import SingleUser from "./User";
import useGetConversation from "../../hooks/useGetConversation";
import { ClipLoader } from "react-spinners";

const Users = () => {
  const { loading, conversation } = useGetConversation();

  console.log(conversation);

  return (
    <div className="users">
      {loading ? <ClipLoader color="white" className="ml-2" /> : <></>}
      {conversation.length == 0 ? <span>No user FOund to chat</span> : <></>}
      {conversation &&
        conversation?.map((conv) => (
          <SingleUser key={conv._id} conversation={conv} />
        ))}
    </div>
  );
};

export default Users;
