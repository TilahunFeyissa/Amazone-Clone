// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
// import { initializeApp } from 'firebase/app';
import "firebase/compat/auth"
import "firebase/compat/firestore"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAles6MUAojSnwKdUMtv34ggOo7u3iEv_8",
  authDomain: "clone-9e979.firebaseapp.com",
  projectId: "clone-9e979",
  storageBucket: "clone-9e979.appspot.com",
  messagingSenderId: "1058790258981",
  appId: "1:1058790258981:web:2bb03f4c97f76a62c782cc",
  measurementId: "G-Y8YK5Q54RD"
};
  const firebaseApp = firebase.initializeApp(firebaseConfig);
    const db = firebaseApp.firestore();
    const auth = firebase.auth();
    export {db, auth };