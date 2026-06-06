import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ms, s, vs } from "react-native-size-matters";
import { AppColors } from "@/styles/colors";
import { sharedPaddingHorizontal } from "@/styles/sharedStyles";
import AppText from "../texts/AppText";
interface ProfileSectionButtonProps {
  leftIcon: React.ReactNode;
  title: string;
  rightIcon: React.ReactNode;
  onPress: () => void;
}
const ProfileSectionButton = ({
  leftIcon,
  title,
  rightIcon,
  onPress,
}: ProfileSectionButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.leftIcon}>{leftIcon}</View>
        <AppText variant="bold" style={styles.title}>
          {title}
        </AppText>
      </View>
      <View style={styles.rightIcon}>{rightIcon}</View>
    </TouchableOpacity>
  );
};

export default ProfileSectionButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: vs(12),
    marginVertical: vs(8),
    backgroundColor: AppColors.white,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.lightGray,
    paddingHorizontal: sharedPaddingHorizontal,
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: s(20),
  },
  leftIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  rightIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: s(16),
  },
});
