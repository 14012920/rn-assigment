// import { getFirestore } from "firebase/firestore";
import * as firebase from "firebase/firestore";
import app from "./FirebaseConfig";
// import { firebaseConfig } from "./FirebaseConfig";

// const Db = getFirestore(firebaseConfig);
const Db = firebase.getFirestore(app);
export default Db;
