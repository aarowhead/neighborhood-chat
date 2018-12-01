import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAjc54_m89wxm_diJLnDrp3ZkzeUbcJnIE",
  authDomain: "neighborhoodannouncement-7e40f.firebaseapp.com",
  databaseURL: "https://neighborhoodannouncement-7e40f.firebaseio.com",
  projectId: "neighborhoodannouncement-7e40f",
  storageBucket: "neighborhoodannouncement-7e40f.appspot.com",
  messagingSenderId: "277582731486"
};
firebase.initializeApp(config);

export default firebase;
