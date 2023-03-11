import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCrYgmH9I-r7IvBqO9JOtT84uBolRXvywk",
  authDomain: "bttapp-196f8.firebaseapp.com",
  projectId: "bttapp-196f8",
  storageBucket: "bttapp-196f8.appspot.com",
  messagingSenderId: "693938400245",
  appId: "1:693938400245:web:352e6261bd0315710f4ebc",
  measurementId: "G-0C2SSQF3SY",
};

// Initialize Firebase

let app;

if (firebase.apps.length === 0) {
  console.log("called");
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
export default app;
// const analytics = getAnalytics(app);
