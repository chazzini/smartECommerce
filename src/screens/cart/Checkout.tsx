import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSafeAreaView from "@/components/views/AppSafeAreaView";
import StackHeader from "@/components/headers/StackHeader";
import { commonStyles, sharedPaddingHorizontal } from "@/styles/sharedStyles";
import { ms, s, vs } from "react-native-size-matters";
import { AppColors } from "@/styles/colors";
import AppButton from "@/components/buttons/AppButton";
import AppInputController from "@/components/inputs/AppInputController";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { removeProductFromCart } from "@/store/reducer/CartSlice";
import { IS_ANDROID } from "@/constants/constants";
import { saveOrder } from "@/config/dataService";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const CheckoutSchema = Yup.object().shape({
  fullname: Yup.string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must be at most 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),
  phone: Yup.string()
    .required("Phone number is required")
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be at most 10 digits")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  address: Yup.string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),
});

const Checkout = ({}) => {
  const user = useSelector((state: any) => state.user);
  const { items } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      fullname: user?.name || "",
      phone: "",
      address: "",
    },
    resolver: yupResolver(CheckoutSchema),
  });

  const save = async (formData: Object) => {
    const orderDetails = {
      ...formData,
      items,
      userId: user?.user.uid,
      orderDate: new Date().toISOString(),
      status: "pending",
    };

    console.log(orderDetails);

    const res = await saveOrder(orderDetails);
    if (res) {
      dispatch(removeProductFromCart(items));
      showMessage({
        message: "Order placed successfully",
        type: "success",
      });
      navigation.navigate("myOrder");
    } else {
      showMessage({
        message: "Failed to place order",
        type: "danger",
      });
    }
  };

  return (
    <AppSafeAreaView>
      <StackHeader headerTitle="Checkout" backButtonText="Cart" />
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <AppInputController
            control={control}
            placeholder={t("input.placeholder.fullname")}
            name="fullname"
          />
          <AppInputController
            control={control}
            placeholder={t("input.placeholder.phone")}
            name="phone"
          />
          <AppInputController
            control={control}
            placeholder={t("input.placeholder.address")}
            name="address"
          />
        </View>
        <View style={styles.bottomContainer}>
          <AppButton
            title={t("checkout.confirmOrder")}
            backgroundColor={AppColors.primary}
            textColor={AppColors.white}
            onPress={handleSubmit(save)}
          />
        </View>
      </View>
    </AppSafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sharedPaddingHorizontal,
    paddingVertical: vs(16),
  },
  inputContainer: {
    ...commonStyles.shadow,
    borderRadius: s(8),
    paddingHorizontal: ms(8),
    paddingVertical: ms(16),
    backgroundColor: AppColors.white,
  },
  bottomContainer: {
    position: "absolute",
    bottom: IS_ANDROID ? vs(30) : 0,
    left: 0,
    right: 0,
    backgroundColor: AppColors.white,
    paddingHorizontal: ms(8),
    paddingVertical: ms(8),
    borderTopLeftRadius: s(8),
    borderTopRightRadius: s(8),
  },
});
