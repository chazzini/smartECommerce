import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSafeAreaView from "../../components/views/AppSafeAreaView";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { s, vs } from "react-native-size-matters";
import AppInput from "@/components/inputs/AppInput";
import AppButton from "@/components/buttons/AppButton";
import { useState } from "react";
import { AppColors } from "@/styles/colors";
import { AppImages } from "@/constants/image_path";
import AppText from "@/components/texts/AppText";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AppInputController from "@/components/inputs/AppInputController";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/reducer/userSlice";
import { getUserProfile } from "@/config/dataService";
import { useTranslation } from "react-i18next";

const SiginSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),
});

type FormData = yup.InferType<typeof SiginSchema>;

const SignIn = () => {
  const navigator = useNavigation<any>();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(SiginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (formData: FormData) => {
    await signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const id = user.uid;
        //get user data
        const userData = await getUserProfile(id);
        dispatch(
          setUser({
            uid: id,
            name: userData?.userName || "",
            email: user.email || "",
          }),
        );
        navigator.navigate("bottomTabNavigation");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        showMessage({
          message: errorMessage,
          type: "danger",
        });
        console.log(errorCode, errorMessage);
      });
  };

  const handleSignUp = () => {
    navigator.navigate("signUp");
  };

  return (
    <AppSafeAreaView style={styles.container}>
      <Image source={AppImages.AppLogo} style={styles.logo} />

      <AppInputController
        control={control}
        name="email"
        placeholder={t("auth.email")}
      />
      <AppInputController
        control={control}
        name="password"
        placeholder={t("auth.password")}
        secureTextEntry={true}
      />
      <AppText variant="regular" style={styles.appName}>
        {t("auth.smart-e-commerce")}
      </AppText>
      <AppButton
        title={t("auth.sign-in-now")}
        onPress={handleSubmit(handleLogin)}
        backgroundColor={AppColors.primary}
        textColor={AppColors.white}
      />
      <AppButton
        title={t("auth.go-to-sign-up")}
        onPress={handleSignUp}
        backgroundColor="transparent"
        textColor={AppColors.black}
        borderColor={AppColors.borderGray}
      />
    </AppSafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: sharedPaddingHorizontal,
  },
  logo: {
    width: s(200),
    height: vs(150),
    resizeMode: "contain",
    marginBottom: vs(30),
  },
  appName: {
    fontSize: s(18),
    marginBottom: vs(20),
  },
});
