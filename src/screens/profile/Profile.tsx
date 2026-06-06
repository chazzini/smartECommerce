import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSafeAreaView from "@/components/views/AppSafeAreaView";
import HomeHeader from "@/components/headers/HomeHeader";
import ProfileSectionButton from "@/components/buttons/ProfileSectionButton";
import { AppColors } from "@/styles/colors";
import { Feather } from "@expo/vector-icons";
import AppText from "@/components/texts/AppText";
import { sharedPaddingHorizontal } from "@/styles/sharedStyles";
import { ms, s, vs } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/store/reducer/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import LanguageBottomSheet from "@/components/language/LanguageBottomSheet";
import { SheetManager } from "react-native-actions-sheet";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const navigation = useNavigation<any>();
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
    navigation.navigate("authNavigation");
  };
  return (
    <AppSafeAreaView>
      <HomeHeader />
      <View style={styles.container}>
        <AppText variant="bold">
          {t("welcome", { username: user?.name })}
        </AppText>
      </View>
      <ProfileSectionButton
        leftIcon={<Feather name="package" size={24} color={AppColors.black} />}
        title={t("navigation.orders")}
        rightIcon={
          <Feather name="chevron-right" size={24} color={AppColors.blueGray} />
        }
        onPress={() => {
          navigation.navigate("myOrder");
        }}
      />
      <ProfileSectionButton
        leftIcon={<Feather name="globe" size={24} color={AppColors.black} />}
        title={t("navigation.language")}
        rightIcon={
          <Feather name="chevron-right" size={24} color={AppColors.blueGray} />
        }
        onPress={() => {
          SheetManager.show("LANG_SHEET");
        }}
      />
      <ProfileSectionButton
        leftIcon={<Feather name="lock" size={24} color={AppColors.black} />}
        title={t("navigation.logout")}
        rightIcon={
          <Feather name="chevron-right" size={24} color={AppColors.blueGray} />
        }
        onPress={() => {
          handleLogout();
        }}
      />

      <LanguageBottomSheet />
    </AppSafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: sharedPaddingHorizontal,
    paddingVertical: vs(12),
  },
});
