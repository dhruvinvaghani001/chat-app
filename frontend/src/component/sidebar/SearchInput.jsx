import React, { useState } from "react";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import useConversation from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";


const SearchInput = () => {
  const [search, setSearch] = useState();
 

  

  const { setSelectedConversation } = useConversation();
  const { conversation } = useGetConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      toast.error("please search something!");
    }
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conver = conversation.find((c) =>
      c.username.toLowerCase().includes(search.toLowerCase())
    );

    if (conver) {
      setSelectedConversation(conver);
      setSearch("");
    } else toast.error("No such user found!");
  };

  return (
    <div className="searchbar mt-6  flex-1">
      <div className="search mt-2 p-2 flex justify-start items-center">
        <form className="flex  justify-between w-full " onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            placeholder="Search..."
            className="p-2 rounded-lg bg-slate-200 text-black focus:outline-none w-[85%]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="rounded-full bg-blue-300 p-4">
            <Search />
          </button>
        </form>
      </div>
    
    </div>
  );
};

export default SearchInput;
