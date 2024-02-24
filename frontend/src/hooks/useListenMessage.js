import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/notification.mp3";
import { useAutherContext } from "../context/AuthContext";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();
  const { user } = useAutherContext();
  const isGroup = selectedConversation?.title ? true : true;

  useEffect(() => {
    socket?.on("message-recived", (newMessage) => {
      console.log("ONCLIENT WHILE NEW MESSAGE RECIVED :", newMessage);
    });
  }, [socket, selectedConversation]);

  //   useEffect(() => {
  //     if (isGroup) {
  //       socket?.on("new-message-gp", ({ conversation, newMessage }) => {
  //        console.log("ON GROUP NEW MESSAGE:");
  //         const sound = new Audio(notificationSound);
  //         sound.play();
  //         const part = conversation.participants.filter(
  //           (user) => user != user._id
  //         );

  //         newMessage.shake = true;

  //         if (conversation._id == selectedConversation._id) {
  //           console.log(newMessage);
  //           setMessages([...messages, newMessage]);
  //         }
  //       });
  //     } else {
  //       socket?.on("new-message", ({ conversation, newMessage }) => {
  //         const part = conversation.participants.filter(
  //           (user) => user != user._id
  //         );
  //         console.log(selectedConversation);
  //         newMessage.shake = true;
  //         const sound = new Audio(notificationSound);
  //         sound.play();
  //         if (part.includes(selectedConversation._id)) {
  //           setMessages([...messages, newMessage]);
  //         }
  //       });
  //     }

  //     return () => {
  //       socket?.off("new-message");
  //       socket?.off("new-message-gp");
  //     };
  //   }, [socket, messages, setMessages,selectedConversation]);
};

export default useListenMessages;
