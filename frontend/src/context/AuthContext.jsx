import { createContext, useContext, useState } from "react";

export const Authcontext = createContext();

export const useAutherContext = () => {
  const { user, setUser } = useContext(Authcontext);
  return { user, setUser };
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  return (
    <Authcontext.Provider value={{ user, setUser }}>
      {children}
    </Authcontext.Provider>
  );
};
