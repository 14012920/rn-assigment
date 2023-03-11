import React from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import Db from "../Config/Db";
export const useAdmin = () => {
  const adminRef = collection(Db, "admin_user");
  const checkLoggedIn = async (email, password) => {
    let data;
    try {
      const q = query(adminRef, where("email", "==", email));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data = doc.data();
      });
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };

  const getTaxi = async () => {
    let data = [];
    try {
      const taxiRef = collection(Db, "taxi");
      const querySnapshot = await getDocs(taxiRef);
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };
  const getPackage = async () => {
    let data = [];
    try {
      const pkgRef = collection(Db, "package");
      const querySnapshot = await getDocs(pkgRef);
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    checkLoggedIn,
    getTaxi,
    getPackage,
  };
};
