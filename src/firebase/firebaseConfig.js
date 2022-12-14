import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDTHOfDFOeTCCbv1K-gylldcEbXa8qBn9Y",
  authDomain: "c4-model.firebaseapp.com",
  projectId: "c4-model",
  storageBucket: "c4-model.appspot.com",
  messagingSenderId: "857169958032",
  appId: "1:857169958032:web:14ef62917a57f43eb1f415"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const Auth = getAuth(app);
