// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase'

// Add the Firebase products that you want to use

const firebaseConfig = {
    apiKey: "AIzaSyApDAuoLHBZipJmRVoXPvWrlvdU_IemNJc",
    authDomain: "whatsapp-clone-204db.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-204db.firebaseio.com",
    projectId: "whatsapp-clone-204db",
    storageBucket: "whatsapp-clone-204db.appspot.com",
    messagingSenderId: "1015720866845",
    appId: "1:1015720866845:web:2f9b411dbb60f238b482f4",
    measurementId: "G-EBMLP2TE3F"
  };

  firebase.initializeApp(firebaseConfig);
  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();

  export {auth,provider}