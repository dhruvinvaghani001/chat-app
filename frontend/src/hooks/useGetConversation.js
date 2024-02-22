import { useEffect, useState } from "react";
import config from "../config";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversation, setConvesation] = useState([]);
  const { users, setUsers } = useConversation();

  useEffect(() => {
    const fetchConvesation = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/user`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConvesation(data);
        setUsers(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchConvesation();
  }, []);

  return { loading, conversation };
};

export default useGetConversation;
