import { useState } from "react";
import toast from "react-hot-toast";
const useCreateGroup = () => {
  const [loading, setLoading] = useState(false);

  const create = async ({ name, selectedUser }) => {
    console.log(selectedUser);
    const validate = handleValidation({ name, selectedUser });
    if (!validate) return;
    try {
      setLoading(true);
      const selectedUsersIds = selectedUser.map((user) => user._id);

      const res = await fetch("/api/group/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: name, participants: selectedUsersIds }),
      });
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, create };
};

const handleValidation = ({ name, selectedUser }) => {
  if (!name) {
    toast.error("please provide name!");
    return false;
  }
  if (selectedUser.length < 2) {
    toast.error("to make a group minimum two member required!");
    return false;
  }
  return true;
};

export default useCreateGroup;
