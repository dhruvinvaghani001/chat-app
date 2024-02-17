import React from "react";
import { Search } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="searchbar mt-6  flex-1">
      <div className="search mt-2 p-2 flex justify-start items-center">
        <form className="flex  justify-between w-full ">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            className="p-2 rounded-lg bg-slate-200 text-black focus:outline-none"
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
