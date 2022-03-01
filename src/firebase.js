// import firebase from 'firebase'

// const firebaseApp = firebase.initializeApp({
    // apiKey: "AIzaSyDtCv-EmhJe1XasKgvuX4kj3r3iAbcsraw",
    // authDomain: "instagram-clone-react-a54e9.firebaseapp.com",
    // projectId: "instagram-clone-react-a54e9",
    // storageBucket: "instagram-clone-react-a54e9.appspot.com",
    // messagingSenderId: "54006565144",
    // appId: "1:54006565144:web:a5b4b4ee824c891095366d",
    // measurementId: "G-NXE18H4CLF"
// });

// const db = firebaseApp.fireStore();
// const auth = firebase.auth();
// const storage = firebase.storage();

// export { db, auth, storage };

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDtCv-EmhJe1XasKgvuX4kj3r3iAbcsraw",
    authDomain: "instagram-clone-react-a54e9.firebaseapp.com",
    projectId: "instagram-clone-react-a54e9",
    storageBucket: "instagram-clone-react-a54e9.appspot.com",
    messagingSenderId: "54006565144",
    appId: "1:54006565144:web:a5b4b4ee824c891095366d",
    measurementId: "G-NXE18H4CLF"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, db,storage };