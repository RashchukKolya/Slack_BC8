import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
let config = {
  apiKey: "AIzaSyBcm4zdsRTtmtWk78OxV4rFh7UJHkFZyZc",
  authDomain: "slack-bc8.firebaseapp.com",
  databaseURL: "https://slack-bc8.firebaseio.com",
  projectId: "slack-bc8",
  storageBucket: "slack-bc8.appspot.com",
  messagingSenderId: "1048134385780"
};
firebase.initializeApp(config);

export default firebase;