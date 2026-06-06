import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "@/navigation/MainNavigation";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { I18nextProvider } from "react-i18next";
import i18n from "@/components/language/i18n";

export default function App() {
  const [loaded, error] = useFonts({
    "Nunito-Bold": require("@/assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Light": require("@/assets/fonts/Nunito-Light.ttf"),
    "Nunito-Medium": require("@/assets/fonts/Nunito-Medium.ttf"),
    "Nunito-Regular": require("@/assets/fonts/Nunito-Regular.ttf"),
  });

  if (!loaded) {
    return <ActivityIndicator />;
  }
  if (!loaded && !error) {
    return null;
  }
  return (
    <>
      <FlashMessage position="top" />
      <I18nextProvider i18n={i18n} defaultNS={"translation"}>
        <Provider store={store}>
          <NavigationContainer>
            <MainNavigation />
          </NavigationContainer>
        </Provider>
      </I18nextProvider>
    </>
  );
}
