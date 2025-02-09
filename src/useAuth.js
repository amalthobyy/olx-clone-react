import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user
      setLoading(false); // Authentication check is complete
    });

    return () => unsubscribe();
  }, []);

  return { user, loading }; // Return both user and loading state
};

export default useAuth;