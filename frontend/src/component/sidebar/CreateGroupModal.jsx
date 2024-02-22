import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import React from "react";
import useConversation from "../../zustand/useConversation";
import { XCircle } from "lucide-react";
import useCreateGroup from "../../hooks/useCreateGroup";

const CreateGroupModal = ({ isOpen, closeModal }) => {
  const [search, setSearch] = useState("");
  const { users } = useConversation();
  const [filteredUsers, setfilteredUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [name, setName] = useState("");

  const { loading, create } = useCreateGroup();

  useEffect(() => {
    console.log(search);
    if (search == "") {
      setfilteredUser([]);
      return;
    }
    const filteredUser = users?.filter((user) =>
      user.username.toLowerCase().includes(search.toLowerCase())
    );
    setfilteredUser(filteredUser);
  }, [search]);

  const setActivate = (user) => {
    setSelectedUser([...selectedUser, user]);
    setSearch("");
  };

  const inactivateUser = (user) => {
    const newSelectedUsers = selectedUser.filter((us) => us != user);
    setSelectedUser(newSelectedUsers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    create({ name, selectedUser });
  };

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-3xl font-medium leading-6 text-gray-900 flex justify-center"
                  >
                    Create Group
                  </Dialog.Title>
                  <div className="mt-4">
                    <form onSubmit={handleSubmit}>
                      <div className="form__input">
                        <label
                          htmlFor="groupname"
                          className="text-black mb-2 text-xl"
                        >
                          Group Name
                        </label>
                        <input
                          type="text"
                          name="groupname"
                          className="bg-gray-500 focus:outline-none p-2 rounded-lg"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div className="form__input">
                        <label className="text-black mb-2 text-xl">Users</label>
                        <input
                          type="text"
                          className="bg-gray-500 focus:outline-none p-2 rounded-lg"
                          onChange={(e) => setSearch(e.target.value)}
                          value={search}
                        />
                        <div className="flex flex-wrap gap-2 mt-4">
                          {selectedUser?.map((user) => {
                            return (
                              <div className="py-1 bg-blue-400 rounded-lg px-4 flex gap-2">
                                {user.username}
                                <XCircle onClick={() => inactivateUser(user)} />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="form__input max-h-[150px] overflow-y-auto">
                        {filteredUsers?.map((user) => {
                          if (!selectedUser.includes(user)) {
                            return (
                              <div
                                className="bg-slate-200 text-black p-2 text-lg rounded-lg mt-2"
                                onClick={() => setActivate(user)}
                              >
                                {user.username}
                              </div>
                            );
                          } else {
                            return <></>;
                          }
                        })}
                      </div>
                      <div className="mt-2 flex justify-center">
                        <button
                          type="submit"
                          className="p-2 bg-slate-800 text-white w-full rounded-lg text-xl"
                        >
                          Create
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CreateGroupModal;
