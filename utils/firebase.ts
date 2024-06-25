
import { initializeApp, getApps } from "firebase/app";
import { getAuth, initializeAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyA6q6mHl6E1Z8nmAs_Rl3mbs9m91Xk_y8w",
  authDomain: "learnability-f029f.firebaseapp.com",
  projectId: "learnability-f029f",
  storageBucket: "learnability-f029f.appspot.com",
  messagingSenderId: "10890364304",
  appId: "1:10890364304:web:5a08d815b639e904681f15"
};
// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Firebase Authentication and Firestore
const db = getFirestore(app);
// const auth = initializeAuth(app);
export {db}
// Now you can use auth and db to interact with Firebase Authentication and Firestore services