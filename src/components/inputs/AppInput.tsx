import { StyleSheet, TextInput, TextInputProps } from "react-native";
import React from "react";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";
import AppText from "../texts/AppText";

interface AppInputProps extends TextInputProps {
  error: any;
}
const AppInput: React.FC<AppInputProps> = (props) => {
  const { error, style, ...otherProps } = props;
  return (
    <>
      <TextInput {...otherProps} style={[styles.input, style]} />
      {error && (
        <AppText variant="light" style={styles.errorText}>
          {error.message}
        </AppText>
      )}
    </>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  input: {
    height: vs(40),
    width: "100%",
    borderWidth: 1,
    borderColor: AppColors.borderGray,
    paddingHorizontal: s(15),
    borderRadius: s(25),
    fontSize: s(16),
    marginBottom: vs(10),
  },
  errorText: {
    width: "100%",
    fontSize: s(14),
    marginLeft: s(8),
    color: "red",
    textAlign: "left",
    marginBottom: vs(10),
  },
});
