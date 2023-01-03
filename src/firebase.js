// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDyCj-e2dN3DVAdSRRIGSvfj_y5fikKFe8",
    authDomain: "netflixclonev1.firebaseapp.com",
    projectId: "netflixclonev1",
    storageBucket: "netflixclonev1.appspot.com",
    messagingSenderId: "739314978135",
    appId: "1:739314978135:web:d98b31e5dca09cf33c4212"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);