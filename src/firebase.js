import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut , onAuthStateChanged, sendPasswordResetEmail} from "firebase/auth";
import { useEffect, useState } from "react";
import { getFirestore, collection, addDoc, getDocs, updateDoc, setDoc, query, where, doc, getDoc } from "firebase/firestore";
import { config1, config, randomtoken } from './helpers'
import { createContext } from "react";
import { useContext } from "react";

const AuthContext = createContext({
  currentUser: null,
  forgotPassword: () => Promise
})
export  const useAuth1 = () => useContext(AuthContext)

// const value ={
//   forgotPassword
// }
const app = initializeApp(config?.firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error( err );
    return Promise.resolve({ error: err.code });
  }
};


export const logout = () => {
  signOut(auth);
};
export function useAuth(){
  const[user, setUser]= useState();
  useEffect(() =>{
   const unsub = onAuthStateChanged(auth, curuser=> setUser(curuser));
    console.log(user)
    return unsub;
  
  }, []);
  return user;
}

// export const getWebsByEmail = async email => {
//   try {
//     const userRef = collection(db, "smWebUsers");
//     const q1 = query(userRef, where("WebUserID", "==", email?.toLowerCase()));
//     const query1 = await getDocs(q1);
//     const users = [];
//     query1.forEach(doc => {
//       let user = doc.data();
//       if(user) user.id = doc.id;
//       users?.push(user)
//     });
//     if(!users?.length){
//       return Promise.resolve({ error: 'Хэрэглэгч бүртгэлгүй байна.' });
//     } else if(users?.length === 1){
//       return Promise.resolve({ error: null, id: users[0]?.id });
//     } else {
//       return Promise.resolve({ error: null, users });
//     }
//   } catch (error) {
//     console.error(error);
//     return Promise.resolve({ error: error.code });
//   }
// }

// export const setWebToken = async id => {
//   try {
//     const ResetToken = randomtoken();
//     const docRef = doc(db, "smWebUsers", id);
//     await updateDoc(docRef, { ResetToken });
//     return Promise.resolve({ error: null, ResetToken });
//   } catch (error) {
//     console.error(error);
//     return Promise.resolve({ error: error.code });
//   }
// }

// export const checkWebToken = async (id, token) => {
//   try {
//     const docRef = doc(db, "smWebUsers", id);
//     const docSnap = await sendPasswordResetEmail(docRef);
//     if(docSnap.exists()){
//       let user = docSnap.data();
//       if(user?.ResetToken && user?.ResetToken === token) return Promise.resolve({ error: null });
//       else return Promise.resolve({ error: 'Токен буруу байна.' });
//     } else {
//       return Promise.resolve({ error: 'Имейл бүртгэлгүй байна.' });
//     }
//   } catch (error) {
//     console.error(error);
//     return Promise.resolve({ error: error.code });
//   }
// }

export const updateWebPassword = async (id, password) => {
  try {
    // const docRef = doc(db, "smWebUsers", id);
    await sendPasswordResetEmail( { password: password, ResetToken: null });
    return Promise.resolve({ error: null });
  } catch (error) {
    console.error(error);
    return Promise.resolve({ error: error.code });
  }
}
 export const forgotPassword= (email) =>{
  return sendPasswordResetEmail(auth, email,
     { url: 'https://localhost:3000/'  }
    )
 }