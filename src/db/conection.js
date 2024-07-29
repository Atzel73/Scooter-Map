// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDQa9Iwvl-Fh3SZISjRN2hzZi_nnSAYyjw",
    authDomain: "floydapp-a1e0d.firebaseapp.com",
    projectId: "floydapp-a1e0d",
    storageBucket: "floydapp-a1e0d.appspot.com",
    messagingSenderId: "12913312650",
    appId: "1:12913312650:web:1f65993994ff61ff433e73",
    measurementId: "G-39N2GXXSBG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const firebaseAuth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

//const analytics = getAnalytics(app);