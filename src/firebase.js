import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAPrttC_VhKKHf8z7mj328qGekVRn2wZ6Y",
  authDomain: "my-movie-db-eaab7.firebaseapp.com",
  databaseURL: "https://my-movie-db-eaab7.firebaseio.com",
  projectId: "my-movie-db-eaab7",
  storageBucket: "my-movie-db-eaab7.appspot.com",
  messagingSenderId: "888134731625",
  appId: "1:888134731625:web:697b867d7fa66a43ff1ff8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
