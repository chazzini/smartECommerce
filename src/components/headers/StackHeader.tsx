import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppImages } from "@/constants/image_path";
import { AppColors } from "@/styles/colors";
import { s, vs } from "react-native-size-matters";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import AppText from "../texts/AppText";
import { Feather } from "@expo/vector-icons";

const StackHeader = ({
  headerTitle,
  backButtonText,
}: {
  headerTitle: string;
  backButtonText?: string;
}) => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={() => navigation.goBack()}
      >
        <Feather name="chevron-left" size={24} color={AppColors.black} />
        <AppText variant="regular" style={styles.backButtonText}>
          {backButtonText || "Back"}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export default StackHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    width: "100%",
    height: vs(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  backButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  backButtonText: {
    fontSize: s(14),
    color: AppColors.black,
    marginLeft: s(5),
  },
});
