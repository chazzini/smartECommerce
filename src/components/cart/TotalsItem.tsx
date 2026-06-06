import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "@/styles/colors";
import AppText from "../texts/AppText";
import { sharedPaddingHorizontal } from "@/styles/sharedStyles";
import AppButton from "../buttons/AppButton";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { clearCart } from "@/store/reducer/CartSlice";
import { useDispatch } from "react-redux";

interface TotalsItemProps {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}
const TotalsItem = ({ subtotal, tax, shipping, total }: TotalsItemProps) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <AppText variant={"bold"} style={styles.title}>
            Order Totals
          </AppText>
          <AppText variant={"bold"} style={styles.amount}>
            ${subtotal.toFixed(2)}
          </AppText>
        </View>
        <View style={styles.headerContainer}>
          <AppText variant={"medium"} style={styles.title}>
            Taxes & Fees:
          </AppText>
          <AppText variant={"medium"} style={styles.amount}>
            ${tax.toFixed(2)}
          </AppText>
        </View>
        <View style={styles.headerContainer}>
          <AppText variant={"medium"} style={styles.title}>
            Shipping Fees:
          </AppText>
          <AppText variant={"medium"} style={styles.amount}>
            ${shipping.toFixed(2)}
          </AppText>
        </View>
        <View style={styles.line} />
        <View style={styles.headerContainer}>
          <AppText variant={"medium"} style={styles.title}>
            Total:
          </AppText>
          <AppText variant={"bold"} style={styles.amount}>
            ${total.toFixed(2)}
          </AppText>
        </View>
      </View>
      <AppButton
        title="Check out"
        backgroundColor={AppColors.primary}
        textColor={AppColors.white}
        onPress={() => {
          navigation.navigate("checkout");
        }}
        style={styles.checkoutButton}
      />
    </>
  );
};

export default TotalsItem;

const styles = StyleSheet.create({
  container: {
    marginTop: s(30),
    backgroundColor: AppColors.white,
    paddingTop: s(10),
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: sharedPaddingHorizontal,
    paddingBottom: s(10),
  },
  title: {
    fontSize: s(16),
    color: AppColors.primary,
  },
  amount: {
    fontSize: s(14),
    color: AppColors.primary,
  },
  checkoutButton: {
    marginTop: s(10),
    alignSelf: "center",
    width: "95%",
  },
  line: {
    width: "100%",
    height: vs(1),
    marginVertical: s(10),
    backgroundColor: AppColors.lightGray,
  },
});
