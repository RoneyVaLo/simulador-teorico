import { useState } from "react";
import { AuthContext } from "./AuthContext";
import invoices from "../assets/invoices.json";

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);

  const signIn = async (userData) => {
    const currentUser = invoices.filter(
      (invoice) => invoice.id === userData.id
    );

    if (currentUser.length > 0) {
      // if (currentUser[0].invoice === userData.invoice) {
      //   console.log("Usuario y recibo correcto");
      setuser(currentUser);
      // }
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
