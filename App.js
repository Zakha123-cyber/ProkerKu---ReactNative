import React from "react";
import { UserProvider } from "../context/UserContext";

export default function App({ children }) {
  return (
    <UserProvider>
      {children} {/* Semua halaman di dalam _layout.js akan memiliki akses ke context */}
    </UserProvider>
  );
}
