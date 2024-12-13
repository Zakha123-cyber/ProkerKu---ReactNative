import React, { createContext, useState, useContext } from "react";

// Buat Context
const UserContext = createContext();

// Provider untuk membungkus aplikasi
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    role_id: null,
    nama: null,
    id_user: null,
    email: null,
    nim: null,
    divisi: null
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook untuk menggunakan context
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error("useUser must be used within a UserProvider");
    }
    return context;
  };