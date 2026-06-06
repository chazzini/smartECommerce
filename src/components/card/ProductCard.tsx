import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "@/styles/colors";
import AppText from "@/components/texts/AppText";
import { Feather } from "@expo/vector-icons";
import { commonStyles } from "@/styles/sharedStyles";

interface ProductCardProps {
  onPress: () => void;
  addToCart: () => void;
  image: string;
  title: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  price,
  onPress,
  addToCart,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {/* Image UI */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        {/* Detailts UI */}
        <View style={styles.detailsContainer}>
          <AppText variant={"medium"} style={styles.title}>
            {title}
          </AppText>
          <AppText variant={"bold"} style={styles.price}>
            ${price}
          </AppText>
        </View>
        {/* Cart Icon Button */}
        <TouchableOpacity style={styles.cartIconContainer} onPress={addToCart}>
          <Feather name="shopping-cart" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: s(155),
    height: vs(190),
    backgroundColor: AppColors.white,
    borderRadius: s(10),

    borderColor: AppColors.lightGray,

    ...commonStyles.shadow,
  },
  imageContainer: {
    width: "100%",
    height: vs(130),
    overflow: "hidden",
    borderTopLeftRadius: s(10),
    borderTopRightRadius: s(10),
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  detailsContainer: {
    paddingTop: s(8),
    paddingBottom: s(15),
    paddingHorizontal: s(10),
  },
  title: {
    fontSize: s(14),
    color: AppColors.primary,
  },
  price: {
    fontSize: s(14),
    color: AppColors.black,

    marginTop: s(4),
  },
  cartIconContainer: {
    position: "absolute",
    top: s(10),
    left: s(10),
    backgroundColor: AppColors.primary,
    width: s(30),
    height: s(30),
    borderRadius: s(20),
    justifyContent: "center",
    alignItems: "center",
  },
});
