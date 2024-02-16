import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, Signup } from "./pages";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);

  return (
    <>
        <RouterProvider router={router} />
    </>
  );
}

export default App;
