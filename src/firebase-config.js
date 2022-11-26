import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnVb-Ioc9Ik4Uv2-7D1gWsYct0nJCz0NY",
  authDomain: "marketplace-70707.firebaseapp.com",
  projectId: "marketplace-70707",
  storageBucket: "marketplace-70707.appspot.com",
  messagingSenderId: "893727029944",
  appId: "1:893727029944:web:a9ed9a992e1a46e3af924d",
};

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
