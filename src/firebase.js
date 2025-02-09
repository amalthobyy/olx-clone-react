import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";


import { getFirestore,addDoc,collection,setDoc,doc,getDocs,getDoc, } from 'firebase/firestore';
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyCV-KISISaGkBZ12K1SHP5xW9Vam51YGLs",
  authDomain: "olx-clone-a6968.firebaseapp.com",
  projectId: "olx-clone-a6968",
  storageBucket: "olx-clone-a6968.firebasestorage.app",
  messagingSenderId: "173910416785",
  appId: "1:173910416785:web:9b857b4fc9efb3fcbcce30"
};


const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
      toast.success("Account Created successfully!");
    } catch (error) {
      alert(error.message);
    }
  };
  
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged In successfully!");
    } catch (error) {
      toast.error("Logged In Failed!");
    }
  };
  
  const logout = () => {
    signOut(auth);
  };
  
  
  
  const addDataToCollection = async (collectionName, data) => {
    try {
      const docRef = await addDoc(collection(db, "posts"), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  
  // Alternatively, use setDoc for specific document IDs
  const setDataToCollection = async (collectionName, docId, data) => {
    try {
      await setDoc(doc(db, collectionName, docId), data);
      console.log(`Document with ID ${docId} successfully written.`);
    } catch (error) {
      console.error("Error setting document: ", error);
    }
  };
  
  const getAdsFromCollection = async () => {
    const adsCollection = collection(db, 'posts');
    const snapshot = await getDocs(adsCollection);
    const adsList = snapshot.docs.map(doc => ({
      id: doc.id, 
      ...doc.data()
    }));
    return adsList;
  };
  
  
  const getAdById = async (id) => {
    try {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
      throw error;
    }
  };
  
  export {
    auth,
    db,
    login,
    signup,
    logout,
    addDataToCollection,
    setDataToCollection,
    getAdsFromCollection,
    getAdById,
  };

