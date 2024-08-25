// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIDePq8vQUL8efuZAXzx7MCOLhguvveKE",
  authDomain: "clevercards-527c9.firebaseapp.com",
  projectId: "clevercards-527c9",
  storageBucket: "clevercards-527c9.appspot.com",
  messagingSenderId: "215313706912",
  appId: "1:215313706912:web:3254467cdb89b140467ec5",
  measurementId: "G-3NYZTPK1YR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db}