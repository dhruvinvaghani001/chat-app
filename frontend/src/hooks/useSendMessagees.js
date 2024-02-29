import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";

const useSendMessages = () => {
  const [loading, setLoading] = useState();

  const { selectedConversation, messages, setMessages } = useConversation();
  const { socket } = useSocketContext();

  const send = async (message) => {
    const id = selectedConversation._id;
    try {
      setLoading(true);
      const res = await fetch(`/api/group/send/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message }),
      });
      console.log(res);
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      setMessages([...messages, data.data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, send };
};

export default useSendMessages;
