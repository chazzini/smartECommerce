import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { AppColors } from "../../styles/colors";
import AppText from "../texts/AppText";
import { ms, s, vs } from "react-native-size-matters";

interface AppRadioInputProps {
  title: string;
  selected: boolean;
  onPress: () => void;
}

const AppRadioInput: React.FC<AppRadioInputProps> = ({
  title,
  selected,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.radio, selected && styles.radioSelected]} />
      <AppText variant="regular" style={styles.text}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

export default AppRadioInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: vs(10),
  },
  radio: {
    width: ms(20),
    height: ms(20),
    borderRadius: ms(10),
    borderWidth: ms(2),
    borderColor: AppColors.primary,
    marginRight: ms(10),
  },
  radioSelected: {
    backgroundColor: AppColors.primary,
  },
  text: {
    fontSize: ms(16),
  },
});
