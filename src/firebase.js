
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARnWoVJGPGtfFI_B1GJRmRRr2s8LEzsTQ",
  authDomain: "stagely-2812e.firebaseapp.com",
  projectId: "stagely-2812e",
  storageBucket: "stagely-2812e.firebasestorage.app",
  messagingSenderId: "797551490597",
  appId: "1:797551490597:web:d6edc1f50433b9c3e271cc",
  databaseURL: "https://stagely-2812e-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
export default app;











