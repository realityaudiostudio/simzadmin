import react,{ createContext, useState, useEffect, useContext } from "react";
import { message } from "antd";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  // Load user from localStorage on initial load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Login function - Save user data to state and localStorage
  const login = (email) => {
    const userData = { email };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    messageApi.open({
      type: 'success',
      content: 'logged in !',
    });  // Save to localStorage
  };

  // Logout function - Clear user data from state and localStorage
  const logout = () => {
    messageApi.open({
      type: 'success',
      content: 'logged out !',
    });
    setUser(null);
    localStorage.removeItem("user");  // Remove from localStorage
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {contextHolder}
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
