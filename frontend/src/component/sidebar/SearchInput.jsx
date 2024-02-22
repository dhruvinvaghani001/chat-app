import React, { useState } from "react";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import useConversation from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import CreateGroupModal from "./CreateGroupModal";

const SearchInput = () => {
  const [search, setSearch] = useState();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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
      <button
        type="button"
        onClick={openModal}
        className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        Open dialog
      </button>
      <CreateGroupModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};

export default SearchInput;
