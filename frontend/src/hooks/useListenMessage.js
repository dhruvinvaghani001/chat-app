import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/notification.mp3";
import { useAutherContext } from "../context/AuthContext";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();
  const { user } = useAutherContext();
  const isGroup = selectedConversation?.title ? true : null;

  useEffect(() => {
    if (isGroup) {
      socket?.on("new-message", ({ conversation, newMessage }) => {
      
        const part = conversation.participants.filter(
          (user) => user != user._id
        );

        newMessage.shake = true;
        const sound = new Audio(notificationSound);
        sound.play();
        if (conversation._id == selectedConversation._id) {
          console.log(newMessage);
          setMessages([...messages, newMessage]);
        }
      });
    } else {
      socket?.on("new-message", ({ conversation, newMessage }) => {
        const part = conversation.participants.filter(
          (user) => user != user._id
        );
        console.log(selectedConversation);
        newMessage.shake = true;
        const sound = new Audio(notificationSound);
        sound.play();
        if (part.includes(selectedConversation._id)) {
          setMessages([...messages, newMessage]);
        }
      });
    }

    return () => {
      socket?.off("new-message");
    };
  }, [socket, messages, setMessages]);
};

export default useListenMessages;
