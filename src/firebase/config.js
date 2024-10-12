import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyAm75PsdFAgixGVqx-OU86rK0MerJMtSOo",
//   authDomain: "fun-chat-475b7.firebaseapp.com",
//   projectId: "fun-chat-475b7",
//   storageBucket: "fun-chat-475b7.appspot.com",
//   messagingSenderId: "259524468985",
//   appId: "1:259524468985:web:c95663bd57ba6337744228",
//   measurementId: "G-H78J7RRT18",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCjBxdNWOhdcFiqCjxIdNJ9aupbZ8XBOHk",
  authDomain: "home-80235.firebaseapp.com",
  projectId: "home-80235",
  storageBucket: "home-80235.appspot.com",
  messagingSenderId: "297283639098",
  appId: "1:297283639098:web:b497c147d2cb491c7f6203",
  measurementId: "G-XHH6L66YSM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

if (process.env.REACT_APP_CONNECT_EMULATOR === "true") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", "8080");
}

export { auth, db };
