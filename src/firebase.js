
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "blog-app-b7f7f.firebaseapp.com",
    projectId: "blog-app-b7f7f",
    databaseURL: "https://blog-app-b7f7f-default-rtdb.asia-southeast1.firebasedatabase.app/",
    storageBucket: "blog-app-b7f7f.appspot.com",
    messagingSenderId: "627952193503",
    appId: "1:627952193503:web:2e15030db282fac20d7e6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
export const auth = getAuth(app);