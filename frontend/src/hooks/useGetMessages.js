import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState();
  const { messages, setMessages, selectedConversation } = useConversation();
  
  const isGroup = selectedConversation?.title ? true : null;
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/message/messages/${selectedConversation._id}`
        );
        const data = await res.json();
          console.log(data);

        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    const getGroupMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/group/messages/${selectedConversation._id}`
        );
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data.messages);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (isGroup) {
      getGroupMessages();
    } else {
      if (selectedConversation._id) {
        console.log("hello");
        getMessages();
      }
    }
  }, [selectedConversation?._id, setMessages]);

  return { loading, messages };
};

export default useGetMessages;
