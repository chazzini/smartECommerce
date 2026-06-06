import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppText from "../texts/AppText";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";
import AppButton from "../buttons/AppButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const EmptyCart = () => {
  const navigation: any = useNavigation<ParamListBase>();
  const { t } = useTranslation();
  const navigateToHome = () => {
    navigation.navigate("home");
  };
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="cart-off"
        size={100}
        color={AppColors.primary}
        style={styles.cartIcon}
      />
      <AppText variant="bold" style={styles.title}>
        {t("cart.emptyCart")}
      </AppText>
      <AppText variant={"medium"} style={styles.desc}>
        {t("cart.startShopping")}
      </AppText>
      <AppButton
        title={t("cart.exploreProducts")}
        onPress={navigateToHome}
        backgroundColor={AppColors.primary}
        textColor={AppColors.white}
        style={styles.ExploreButton}
      />
    </View>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: s(20),
    color: AppColors.primary,
  },
  desc: {
    fontSize: s(14),
    color: AppColors.mediumGray,
    marginTop: s(5),
  },
  ExploreButton: {
    marginTop: s(20),
    width: "80%",
  },
  cartIcon: {
    marginBottom: vs(20),
  },
});
