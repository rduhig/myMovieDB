import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDjboDSWml6lMt-q1myQT94A5EIP_a4kQo",
  authDomain: "mymoviedb-f8c0b.firebaseapp.com",
  databaseURL: "https://mymoviedb-f8c0b.firebaseio.com",
  projectId: "mymoviedb-f8c0b",
  storageBucket: "mymoviedb-f8c0b.appspot.com",
  messagingSenderId: "254986086817",
  appId: "1:254986086817:web:c4912f254d4102a97e03e0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
