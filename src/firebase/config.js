// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// const firebaseConfig = {
//   apiKey: "AIzaSyAplzWPPWGl2YapmKUqhLqKkgqaBnIuOOM",
//   authDomain: "chat-5b24d.firebaseapp.com",
//   projectId: "chat-5b24d",
//   storageBucket: "chat-5b24d.appspot.com",
//   messagingSenderId: "249718293571",
//   appId: "1:249718293571:web:396e6a1814e67244bdc0f6",
//   measurementId: "G-47RKTRZM7R",
// };

const firebaseConfig = {
  apiKey: "AIzaSyAm75PsdFAgixGVqx-OU86rK0MerJMtSOo",
  authDomain: "fun-chat-475b7.firebaseapp.com",
  projectId: "fun-chat-475b7",
  storageBucket: "fun-chat-475b7.appspot.com",
  messagingSenderId: "259524468985",
  appId: "1:259524468985:web:c95663bd57ba6337744228",
  measurementId: "G-H78J7RRT18",
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
