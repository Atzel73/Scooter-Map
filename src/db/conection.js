// db/conection.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDQa9Iwvl-Fh3SZISjRN2hzZi_nnSAYyjw",
    authDomain: "floydapp-a1e0d.firebaseapp.com",
    projectId: "floydapp-a1e0d",
    storageBucket: "floydapp-a1e0d.appspot.com",
    messagingSenderId: "12913312650",
    appId: "1:12913312650:web:1f65993994ff61ff433e73",
    measurementId: "G-39N2GXXSBG"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const firebaseAuth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
export const auth = getAuth(app); 
