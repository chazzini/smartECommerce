import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSafeAreaView from "../../components/views/AppSafeAreaView";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { s, vs } from "react-native-size-matters";
import AppButton from "@/components/buttons/AppButton";
import { AppColors } from "@/styles/colors";
import { AppImages } from "@/constants/image_path";
import AppText from "@/components/texts/AppText";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import AppInputController from "@/components/inputs/AppInputController";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { showMessage } from "react-native-flash-message";
import { createUser } from "@/config/dataService";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/reducer/userSlice";
import { useTranslation } from "react-i18next";

const signUpSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type FormData = yup.InferType<typeof signUpSchema>;

const SignUp = () => {
  const { t } = useTranslation();
  const navigator = useNavigation<any>();
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const handleLogin = () => {
    navigator.navigate("signIn");
  };
  const handleSignUp = async (data: FormData) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;

        //store extra user data
        const userData = {
          userName: data.username,
          email: data.email,
          uid: user.uid,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        createUser(userData);

        dispatch(
          setUser({
            email: data.email,
            name: data.username ?? "",
            uid: user.uid,
          }),
        );
        showMessage({
          message: "User created successfully",
          type: "success",
        });

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
  return (
    <AppSafeAreaView style={styles.container}>
      <Image source={AppImages.AppLogo} style={styles.logo} />

      <AppInputController
        control={control}
        name="username"
        placeholder={t("auth.username")}
      />
      <AppInputController
        control={control}
        name="email"
        placeholder={t("auth.email")}
      />
      <AppInputController
        control={control}
        name="password"
        placeholder={t("auth.password")}
        secureTextEntry
      />
      <AppText variant="regular" style={styles.appName}>
        {t("auth.smart-e-commerce")}
      </AppText>
      <AppButton
        title={t("auth.signup")}
        onPress={handleSubmit(handleSignUp)}
        backgroundColor={AppColors.primary}
        textColor={AppColors.white}
      />
      <AppButton
        title={t("auth.go-to-sign-in")}
        onPress={handleLogin}
        borderColor={AppColors.borderGray}
        textColor={AppColors.black}
        backgroundColor="transparent"
      />
    </AppSafeAreaView>
  );
};

export default SignUp;

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
    marginBottom: vs(20),
    fontSize: s(16),
  },
});
