import SignIn from "@/screens/auth/SignIn";
import SignUp from "@/screens/auth/SignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BottomTabNavigation from "./BottomTabNavigation";
import AuthNavigation from "./AuthNavigation";
import Checkout from "@/screens/cart/Checkout";
import MyOrder from "@/screens/orders/MyOrder";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();
const MainNavigation = () => {
  const user = useSelector((state: any) => state.user);
  return (
    <Stack.Navigator>
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
