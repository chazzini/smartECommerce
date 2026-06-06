import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from "react-native";
import React from "react";
import { AppColors } from "../../styles/colors";
import {
  IS_ANDROID,
  IS_IOS,
  STATUS_BAR_HEIGHT,
} from "../../constants/constants";

interface AppSafeAreaViewProps extends ViewProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

const AppSafeAreaView: React.FC<AppSafeAreaViewProps> = ({
  children,
  backgroundColor,
  ...props
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, props.style]}>{children}</View>
    </SafeAreaView>
  );
};

export default AppSafeAreaView;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: IS_IOS ? 0 : STATUS_BAR_HEIGHT || 0,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
});
