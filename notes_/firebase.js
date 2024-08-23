// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-7i0yoD5LdeMTHwo8SbbcA0N62Ty7_BQ",
  authDomain: "fir-auth-ed3c4.firebaseapp.com",
  projectId: "fir-auth-ed3c4",
  storageBucket: "fir-auth-ed3c4.appspot.com",
  messagingSenderId: "353830715135",
  appId: "1:353830715135:web:cda4a72a88873df2a256ca"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase};
