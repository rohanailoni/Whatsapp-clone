// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyAJ61_CaYxyab-op60YSLqvYkZV8EPz1fo",
  authDomain: "whatsappclone-1699d.firebaseapp.com",
  projectId: "whatsappclone-1699d",
  storageBucket: "whatsappclone-1699d.appspot.com",
  messagingSenderId: "502007283349",
  appId: "1:502007283349:web:a88dc90da5d5f79b96259c",
  measurementId: "G-J835WLYJZE"
};

const firebaseapp=firebase.initializeApp(firebaseConfig);

const db=firebase.firestore();
const auth =firebase.auth();
const provider =new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;

