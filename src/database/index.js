import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyDOT6oYspnPcEnT7xBif9LTfhXzh4gkhdE",
    authDomain: "testproducts-waco.firebaseapp.com",
    projectId: "testproducts-waco",
    storageBucket: "testproducts-waco.appspot.com",
    messagingSenderId: "43633378374",
    appId: "1:43633378374:web:2378756108fd8a61e2f647"
  };
  // Initialize Firebase
  const initFirebase = firebase.initializeApp(firebaseConfig);

  

  export default initFirebase;