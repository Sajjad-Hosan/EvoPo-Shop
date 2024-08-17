import { createContext, useEffect, useState } from "react";
import app from "../services/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (current) => {
      if (current) {
        const userData = {
          email: current?.email,
        };
        console.log(current);
        setUser(current);
        setLoading(false);
        //
        axios
          .post("http://localhost:3000/jwt", userData, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("auth res", res);
          });
      }
    });
    return () => unSubscribe();
  }, [auth]);

  const handleUserLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const handleUserRegister = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const handleGooglePopup = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const handleUserLogout = () => {
    return signOut(auth);
  };
  const contextProviders = {
    user,
    loading,
    products,
    setProducts,
    handleUserLogin,
    handleUserRegister,
    handleUserLogout,
    handleGooglePopup,
  };
  return (
    <AuthContext.Provider value={contextProviders}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
