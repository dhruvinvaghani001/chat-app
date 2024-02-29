import { createContext, useState, useEffect } from "react";
import { useAutherContext } from "./AuthContext";
import io from "socket.io-client";
import { useContext } from "react";

export const SocketContext = createContext();

export const useSocketContext = () => {
  const { socket, onlineUsers } = useContext(SocketContext);
  return { socket, onlineUsers };
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const { user } = useAutherContext();

  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:5000", {
        query: {
          user,
        },
      });
      setSocket(socket);

      socket.on("getonlineusers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ onlineUsers, socket }}>
      {children}
    </SocketContext.Provider>
  );
};
