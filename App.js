import React from 'react';
import Navigator from './routes/drawer';
import * as firebase from 'firebase';
import "firebase/firestore";


// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/functions";
//import "firebase/storage";


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCLKsn0Hc7uU49Go18bZVZi-DLfKsVpAlY",
  authDomain: "aphea-ef6c5.firebaseapp.com",
  databaseURL: "https://aphea-ef6c5.firebaseio.com",
  projectId: "aphea-ef6c5",
  storageBucket: "aphea-ef6c5.appspot.com",
  messagingSenderId: "657261388825",
  // appId: "app-id",
  // measurementId: "G-measurement-id"
};

firebase.initializeApp(firebaseConfig);
const dbh = firebase.firestore();

 // Get a reference to the database service
 var database = firebase.database();

export default function App() {
  return (
    <Navigator />
  );
}

