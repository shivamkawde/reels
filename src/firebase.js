import firebase from "firebase/app"

import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"
 // Your web app's Firebase configuration
//  var firebaseConfig = {
//     apiKey: "AIzaSyBMHIamPGGYbAyemUuBRu63G0b8NRSzqfA",
//     authDomain: "reels-99206.firebaseapp.com",
//     projectId: "reels-99206",
//     storageBucket: "reels-99206.appspot.com",
//     messagingSenderId: "1050989661564",
//     appId: "1:1050989661564:web:4cfa8c8a6fb548775d28f9"
//   }
  // Initialize Firebase
  //firebase.initializeApp(firebaseConfig);
// Your web app's Firebase configufireration
var firebaseConfig = {
  apiKey: "AIzaSyCLyLi5scMKPwq9UGXkIleFFCien72Sepk",
  authDomain: "instagram-868bc.firebaseapp.com",
  projectId: "instagram-868bc",
  storageBucket: "instagram-868bc.appspot.com",
  messagingSenderId: "623897633866",
  appId: "1:623897633866:web:7a4731378258c3cff832b3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth()
  export const firestore = firebase.firestore();
  let provider = new firebase.auth.GoogleAuthProvider()
  export const signInWithGoogle = ()=> auth.signInWithPopup(provider);
  //export const firestore=fire.firestore();
  export const storage=firebase.storage()
  export default firebase;