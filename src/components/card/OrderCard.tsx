import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { commonStyles, sharedPaddingHorizontal } from "@/styles/sharedStyles";
import { AppColors } from "@/styles/colors";
import { s, vs } from "react-native-size-matters";
import AppText from "../texts/AppText";
import AppButton from "../buttons/AppButton";
import { useTranslation } from "react-i18next";

interface OrderCardTypes {
  orderNumber: string;
  orderDate: string;
  orderItems: string;
  orderTotal: string;
  trackOrder: () => void;
}

const OrderCard = ({
  orderNumber,
  orderDate,
  orderItems,
  orderTotal,
  trackOrder,
}: OrderCardTypes) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <AppText variant="bold">
        {t("orders.order")} #{orderNumber}
      </AppText>
      <View style={styles.headerContainer}>
        <AppText variant="regular">
          {t("orders.order-date")} {orderDate}
        </AppText>
      </View>
      <View style={styles.bodyContainer}>
        <AppText variant="regular">
          {t("orders.order-items")} {orderItems}
        </AppText>
        <AppText variant="regular">
          {t("orders.order-total")}: {orderTotal}
        </AppText>
      </View>
      <View style={styles.footerContainer}>
        <AppButton
          title={t("orders.track-order")}
          backgroundColor={AppColors.primary}
          textColor={AppColors.white}
          onPress={trackOrder}
        />
      </View>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    paddingHorizontal: sharedPaddingHorizontal,
    ...commonStyles.shadow,
    borderRadius: s(8),
    paddingVertical: vs(8),
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: vs(16),
  },
  bodyContainer: {
    justifyContent: "space-between",

    paddingTop: vs(8),
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: vs(8),
  },
});
