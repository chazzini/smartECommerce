import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "@/screens/home/Home";
import Cart from "@/screens/cart/Cart";
import Profile from "@/screens/profile/Profile";
import { Ionicons } from "@expo/vector-icons";
import { AppColors } from "@/styles/colors";
import { s, vs } from "react-native-size-matters";
import { StyleSheet, View } from "react-native";
import AppText from "@/components/texts/AppText";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();
const BottomTabNavigation = () => {
  const { t } = useTranslation();
  const { items } = useSelector((state: RootState) => state.cart);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColors.primary,
        tabBarInactiveTintColor: AppColors.mediumGray,
        tabBarLabelStyle: {
          marginTop: vs(2),
          fontSize: s(10),
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: t("navigation.home"),
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="cart"
        component={Cart}
        options={{
          tabBarLabel: t("navigation.cart"),
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={styles.cartIconContainer}>
                {items?.length > 0 && (
                  <View style={styles.cartItemCountContainer}>
                    <AppText
                      variant="light"
                      style={{ color: AppColors.white, fontSize: s(10) }}
                    >
                      {items?.length ?? 0}
                    </AppText>
                  </View>
                )}
                <Ionicons
                  name={focused ? "cart" : "cart-outline"}
                  size={size}
                  color={color}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: t("navigation.profile"),
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNavigation;

const styles = StyleSheet.create({
  cartIconContainer: {
    position: "relative",
  },
  cartItemCountContainer: {
    position: "absolute",
    top: vs(-8),
    right: vs(-8),
    backgroundColor: AppColors.primary,
    borderRadius: vs(8),
    width: vs(16),
    height: vs(16),
    justifyContent: "center",
    alignItems: "center",
  },
});
