import { StyleSheet, Text, TextInputProps, View } from "react-native";
import React from "react";
import { Control, Controller } from "react-hook-form";
import AppInput from "./AppInput";

interface IAppInputController {
  control: Control<any>;
  name: string;
  rules?: any;
  props?: TextInputProps;
}

const AppInputController = ({
  control,
  name,
  rules,
  ...props
}: IAppInputController) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <AppInput
            {...props}
            onChangeText={onChange}
            value={value ?? ""}
            style={error ? styles.errorInput : {}}
            error={error}
          />
        );
      }}
    />
  );
};

export default AppInputController;

const styles = StyleSheet.create({
  errorInput: {
    borderColor: "red",
    borderWidth: 1,
  },
});
