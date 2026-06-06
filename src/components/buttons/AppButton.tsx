import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import AppText from "../texts/AppText";

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  textSize?: number;
  variant?: "bold" | "medium" | "regular" | "light";
}

const AppButton: React.FC<AppButtonProps> = ({
  onPress,
  title,
  disabled,
  backgroundColor = AppColors.black,
  borderColor,
  textColor = AppColors.white,
  textSize = 16,
  variant = "bold",
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.button,
        disabled && { opacity: 0.5 },
        { backgroundColor },
        borderColor && { borderColor: borderColor },
        borderColor && { borderWidth: 1 },
        props.style,
      ]}
      disabled={disabled}
    >
      <AppText
        variant={variant}
        style={{
          color: textColor,
          fontSize: textSize,
        }}
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    marginBottom: vs(10),
    width: "100%",
    height: vs(40),
    backgroundColor: AppColors.black,
    paddingHorizontal: s(12),
    borderRadius: s(25),
    alignItems: "center",
    justifyContent: "center",
  },
});
