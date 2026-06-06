import { bool } from "yup";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";

export const getAllProducts = async () => {
  try {
    const productsRef = collection(db, "products");
    let list: any[] = [];
    const querySnapshot = await getDocs(productsRef);
    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });
    return list;
  } catch (error) {
    console.log(error);
  }
};

interface UserData {
  userName: string;
  email: string;
  uid: string;
  createdAt: Date;
  updatedAt: Date;
}
export const createUser = async (user: UserData) => {
  try {
    const usersRef = collection(db, "users");
    await addDoc(usersRef, user);
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfile = async (uid: string) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", uid), limit(1));
    const querySnapshot = await getDocs(q);
    let list: UserData[] = [];
    querySnapshot.forEach((doc) => {
      list.push(doc.data() as UserData);
    });
    return list[0];
  } catch (error) {
    console.log(error);
  }
};
export const getUserOrders = async (uid: string) => {
  try {
    const usersRef = collection(db, "orders");
    const q = query(usersRef, where("userId", "==", uid));
    const querySnapshot = await getDocs(q);
    let list: any[] = [];
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...(doc.data() as any) });
    });
    return list;
  } catch (error) {
    console.log(error);
  }
};

export const saveOrder = async (order: any) => {
  try {
    const ordersRef = collection(db, "orders");
    await addDoc(ordersRef, order);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
