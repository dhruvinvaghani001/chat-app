import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Home, Login, Signup } from "./pages";
import { Toaster } from "react-hot-toast";
import { useAutherContext } from "./context/AuthContext";
import useConversation from "./zustand/useConversation";
import { useSocketContext } from "./context/SocketContext";
import { useEffect } from "react";

function App() {
  const { user } = useAutherContext();
  const { socket } = useSocketContext();
  // console.log("user", user);
  useEffect(() => {
    socket?.emit("setup", user);
  }, [socket]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: user == null ? <Navigate to="/login" /> : <Home />,
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/signup",
      element: user ? <Navigate to="/" /> : <Signup />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
