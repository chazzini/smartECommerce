import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppImages } from "@/constants/image_path";
import { AppColors } from "@/styles/colors";
import { s, vs } from "react-native-size-matters";

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Image source={AppImages.AppLogo} style={styles.logo} />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.primary,
    width: "100%",
    height: vs(40),
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: s(40),
    height: s(40),
    resizeMode: "contain",
    tintColor: AppColors.white,
  },
});
