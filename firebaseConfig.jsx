// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUMEif7NIjYlHj7EmPw9mqg4XKo4Ia3D4",
  authDomain: "prokerku-be3fd.firebaseapp.com",
  projectId: "prokerku-be3fd",
  storageBucket: "prokerku-be3fd.firebasestorage.app",
  messagingSenderId: "357255114816",
  appId: "1:357255114816:web:b241e1e0fbf4e42c98efa5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };