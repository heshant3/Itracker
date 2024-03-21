// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC49J-cflDdamQCxZEKXB1u98iff7rANdg",
  authDomain: "i-tracker-28ce5.firebaseapp.com",
  databaseURL: "https://i-tracker-28ce5-default-rtdb.firebaseio.com",
  projectId: "i-tracker-28ce5",
  storageBucket: "i-tracker-28ce5.appspot.com",
  messagingSenderId: "727800130285",
  appId: "1:727800130285:web:a00b4470ccb41f858dfae4",
  measurementId: "G-JGG89237D5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
