import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("Token"))
  );

  const setUserAndStorage = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("Token", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("Token");
    }
  };

  return (
    <UserContext.Provider value={[user, setUserAndStorage]}>
      {children}
    </UserContext.Provider>
  );
}

//hacerle una carpeta