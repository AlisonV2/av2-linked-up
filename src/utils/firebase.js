import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics';
import 'firebase/performance';

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
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT,
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const analytics = firebase.analytics();
const perf = firebase.performance();

const usersCollection = db.collection('users');
const artistsCollection = db.collection('artists');
const clientsCollection = db.collection('clients');
const organizersCollection = db.collection('organizers');
const galleriesCollection = db.collection('galleries');
const messagesCollection = db.collection('messages');
const projectsCollection = db.collection('projects');

export {
  auth,
  db,
  storage,
  usersCollection,
  artistsCollection,
  clientsCollection,
  organizersCollection,
  galleriesCollection,
  messagesCollection,
  projectsCollection,
  analytics,
  perf
};
