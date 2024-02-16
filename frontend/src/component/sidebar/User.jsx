import React from "react";
import { User } from "lucide-react";

const SingleUser = () => {
  return (
    <div className="user ">
      <div className="profile__img">
        <User />
      </div>
      <div className="details">
        <h3>Jshon Doe</h3>
      </div>
    </div>
  );
};

export default SingleUser;
