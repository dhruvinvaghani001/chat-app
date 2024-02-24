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

function App() {
  const { user } = useAutherContext();

  console.log("user", user);

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
  const { selectedConversation } = useConversation();
  console.log("hello");
  console.log(selectedConversation);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
