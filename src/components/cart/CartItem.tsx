import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { sharedPaddingHorizontal } from "@/styles/sharedStyles";
import { s, vs } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { AppColors } from "@/styles/colors";
import { Feather } from "@expo/vector-icons";
import QuantityControl from "./QuantityControl";
import { products } from "@/data/products";

interface CartItemProps {
  image: string;
  title: string;
  price: string;
  handleDelete: () => void;
  handleIncrease: () => void;
  handleDecrease: () => void;
  quantity: number;
}
const CartItem = ({
  image,
  title,
  price,
  handleDelete,
  handleIncrease,
  handleDecrease,
  quantity,
}: CartItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.centerContainer}>
        <AppText variant={"bold"} style={styles.title}>
          {title}
        </AppText>
        <AppText variant={"bold"} style={styles.price}>
          ${price * quantity}
        </AppText>
        <QuantityControl
          quantity={quantity}
          handleDecrease={handleDecrease}
          handleIncrease={handleIncrease}
        />
      </View>

      <View style={styles.rightContainer}>
        <TouchableOpacity
          style={styles.trashAndCartItemContainer}
          onPress={handleDelete}
        >
          <Feather name="trash" size={20} color={AppColors.error} />
          <AppText variant={"light"} style={{ fontSize: s(12) }}>
            Delete
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: sharedPaddingHorizontal,
    width: "100%",
    gap: s(10),
    borderBottomWidth: 1,
    borderBottomColor: AppColors.lightGray,
  },
  title: {
    fontSize: s(16),
    color: AppColors.primary,
  },
  price: {
    fontSize: s(14),
    color: AppColors.black,

    marginTop: s(4),
  },
  rightContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: 100,
  },
  image: {
    width: s(100),
    height: vs(100),
    borderRadius: s(10),
    resizeMode: "contain",
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContainer: {
    flex: 2,
    justifyContent: "center",

    paddingHorizontal: s(10),
  },

  trashAndCartItemContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    gap: s(5),
  },
});
