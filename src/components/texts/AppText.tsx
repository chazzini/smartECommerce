import { Text, StyleSheet, TextStyle } from "react-native";
import React from "react";
import { s } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import { Fonts } from "@/styles/fonts";

interface AppTextProps {
  children: React.ReactNode;
  variant: "bold" | "medium" | "regular" | "light";
  style?: TextStyle;
}

const AppText: React.FC<AppTextProps> = ({
  children,
  variant = "regular",
  style,
}) => {
  return <Text style={[styles[variant], style]}>{children}</Text>;
};

export default AppText;

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
    fontSize: s(18),
    color: AppColors.black,
    fontFamily: Fonts.bold,
  },
  medium: {
    fontWeight: "500",
    fontSize: s(16),
    color: AppColors.black,
    fontFamily: Fonts.medium,
  },
  regular: {
    fontWeight: "normal",
    fontSize: s(14),
    color: AppColors.black,
    fontFamily: Fonts.regular,
  },
  light: {
    fontWeight: "200",
    fontSize: s(12),
    color: AppColors.black,
    fontFamily: Fonts.light,
  },
});
