// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqX-aKqb7YJC0QJYuUfAkpaI6Gyabxqis",
  authDomain: "as-prueba.firebaseapp.com",
  databaseURL: "https://as-prueba-default-rtdb.firebaseio.com",
  projectId: "as-prueba",
  storageBucket: "as-prueba.firebasestorage.app",
  messagingSenderId: "97179686981",
  appId: "1:97179686981:web:af4c81c803735774c1ab2c"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);
