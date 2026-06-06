import { StyleSheet, Text, View } from "react-native";
import React from "react";
import QuantityControlIcon from "./QuantityControlIcon";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "@/styles/colors";
import AppText from "../texts/AppText";

const QuantityControl = ({
  quantity,
  handleIncrease,
  handleDecrease,
}: {
  quantity: number;
  handleIncrease: () => void;
  handleDecrease: () => void;
}) => {
  return (
    <View style={styles.quantityContainer}>
      <QuantityControlIcon onPress={handleDecrease} icon="minus" />
      <AppText variant={"regular"}>{quantity}</AppText>
      <QuantityControlIcon onPress={handleIncrease} icon="plus" />
    </View>
  );
};

export default QuantityControl;

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

    marginTop: s(5),
    borderWidth: 1,
    borderColor: AppColors.lightGray,
    borderRadius: s(20),
    overflow: "hidden",
    width: s(70),
    height: vs(25),
  },
});
