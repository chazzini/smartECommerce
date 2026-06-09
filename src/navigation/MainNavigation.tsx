import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import BottomTabNavigation from "./BottomTabNavigation";
import AuthNavigation from "./AuthNavigation";
import Checkout from "@/screens/cart/Checkout";
import MyOrder from "@/screens/orders/MyOrder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearUser, setUser } from "@/store/reducer/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "@/store/store";
import { ActivityIndicator, View } from "react-native";
import { AppColors } from "@/styles/colors";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";

const Stack = createNativeStackNavigator();
const MainNavigation = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUserData] = useState<Object | null>(null);

  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      console.log("current user", currentUser);
      dispatch(
        setUser({
          uid: currentUser.uid,
          name: currentUser.displayName || "",
          email: currentUser.email || "",
        }),
      );
      setUserData(currentUser);
      setIsLoading(false);
    } else {
      dispatch(clearUser());
      setIsLoading(false);
    }
  });

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={AppColors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={user ? "bottomTabNavigation" : "authNavigation"}
    >
      <Stack.Screen
        name="authNavigation"
        component={AuthNavigation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="bottomTabNavigation"
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="checkout"
        component={Checkout}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="myOrder"
        component={MyOrder}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
