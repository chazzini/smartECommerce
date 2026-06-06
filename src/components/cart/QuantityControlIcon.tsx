import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";

interface QuantityControlIconProps {
  onPress: () => void;
  icon: "plus" | "minus";
}

const QuantityControlIcon = ({ onPress, icon }: QuantityControlIconProps) => {
  return (
    <TouchableOpacity style={styles.iconBackground} onPress={onPress}>
      <Feather name={icon} size={16} color={AppColors.black} />
    </TouchableOpacity>
  );
};

export default QuantityControlIcon;

const styles = StyleSheet.create({
  iconBackground: {
    borderRadius: s(10),
    backgroundColor: AppColors.lightGray,
    width: s(20),
    height: s(20),
    justifyContent: "center",
    alignItems: "center",
  },
});
