import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDbAFwgC3_zYn3YEM6wBwkRGU7SC72a1gQ",
    authDomain: "snippetbook-25e73.firebaseapp.com",
    databaseURL: "https://snippetbook-25e73-default-rtdb.firebaseio.com",
    projectId: "snippetbook-25e73",
    storageBucket: "snippetbook-25e73.appspot.com",
    messagingSenderId: "673254546652",
    appId: "1:673254546652:web:b054a2e4e1de3f622ce819",
    measurementId: "G-CGTT5Q5G13"
};
export const appI = initializeApp(
    firebaseConfig
);
// export const auth = firebase.auth();
// export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = getFirestore();

// t const db;