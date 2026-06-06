import { s } from "react-native-size-matters";
import { StyleSheet } from "react-native";
import { AppColors } from "./colors";

export const sharedPaddingHorizontal = s(15);

export const commonStyles = StyleSheet.create({
  shadow: {
    //android
    elevation: 4,

    //ios
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
});
