import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

/**
 * Firebase configuration - Firestore, Storage, Authentication
 * @module firebase
 * @type {object}
 * @requires Firebase
 */
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE,
  messagingSenderId: process.env.VUE_APP_FIREBASE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// db.enablePersistence().catch((error) => {
//   console.log(`Firebase persistence error ${error.code}`);
// });

const usersCollection = db.collection('users');
const artistsCollection = db.collection('artists');
const clientsCollection = db.collection('clients');
const organizersCollection = db.collection('organizers');
const galleriesCollection = db.collection('galleries');

export {
  auth,
  db,
  storage,
  usersCollection,
  artistsCollection,
  clientsCollection,
  organizersCollection,
  galleriesCollection
};