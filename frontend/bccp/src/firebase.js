import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrw-m6UTkauzPs1bpifrYJpfxfgQ3gLXo",
  authDomain: "bccp-17dc7.firebaseapp.com",
  projectId: "bccp-17dc7",
  storageBucket: "bccp-17dc7.appspot.com",
  messagingSenderId: "491681430314",
  appId: "1:491681430314:web:65103161ac72b5d8befc53",
  measurementId: "G-3N8894NEZT",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
