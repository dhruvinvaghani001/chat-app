import React from "react";
import { Search, User } from "lucide-react";
import SideBar from "../component/sidebar/SideBar";
import MessageConatiner from "../component/messages/MessageConatiner";

const Home = () => {
  return (
    <div className="bg-gray-800 w-full h-full rounded-xl flex">
      <SideBar />
      <MessageConatiner />
    </div>
  );
};

export default Home;
