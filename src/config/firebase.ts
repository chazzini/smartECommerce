import { initializeApp } from "firebase/app";
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBOcvEpK0BvDUi3ryKtJ_yPL6eLmPwqpSk",
  authDomain: "smart-e-commerce-df803.firebaseapp.com",
  projectId: "smart-e-commerce-df803",
  storageBucket: "smart-e-commerce-df803.firebasestorage.app",
  messagingSenderId: "234830961431",
  appId: "1:234830961431:web:3dca138ea670134d023552",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

