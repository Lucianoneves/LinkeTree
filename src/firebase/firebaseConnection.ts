


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import  {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAk7EKncbcqIDS6aGTQyPF2vAG81R74nj0",
  authDomain: "reaclinks-7ffc6.firebaseapp.com",
  projectId: "reaclinks-7ffc6",
  storageBucket: "reaclinks-7ffc6.firebasestorage.app",
  messagingSenderId: "171616774714",
  appId: "1:171616774714:web:ebdc772e493641ba43a303",
  measurementId: "G-JE3K7Z7MZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);






export {auth, db}
