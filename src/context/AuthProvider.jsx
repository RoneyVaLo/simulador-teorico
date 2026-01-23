import { useState } from "react";
import { AuthContext } from "./AuthContext";
import invoices from "../assets/invoices.json";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = async (userData) => {
    const currentUser = invoices.filter(
      (invoice) => invoice.id === userData.id,
    );

    if (currentUser.length > 0) {
      if (currentUser[0].invoice === userData.invoice) {
        //   console.log("Usuario y recibo correcto");
        setUser(currentUser);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
