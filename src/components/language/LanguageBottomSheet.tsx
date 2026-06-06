import { StyleSheet, Text } from "react-native";
import React from "react";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import AppText from "../texts/AppText";
import { AppColors } from "@/styles/colors";
import { ms, s, vs } from "react-native-size-matters";
import AppButton from "../buttons/AppButton";
import AppRadioInput from "../inputs/AppRadioInput";
import { useTranslation } from "react-i18next";
import { languages } from "./Languages";
import { useState } from "react";
import i18n from "./i18n";

const LanguageBottomSheet = () => {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const changeLanguage = () => {
    i18n.changeLanguage(selectedLanguage);
    SheetManager.hide("LANG_SHEET");
  };
  return (
    <ActionSheet id={"LANG_SHEET"} containerStyle={styles.container}>
      <AppText variant="bold" style={styles.title}>
        {t("change-language")}
      </AppText>
      {languages.map((language, index) => (
        <AppRadioInput
          key={index}
          title={language.name}
          selected={selectedLanguage === language.code}
          onPress={() => setSelectedLanguage(language.code)}
        />
      ))}
      <AppButton
        title={t("save-language")}
        backgroundColor={AppColors.primary}
        textColor={AppColors.white}
        onPress={changeLanguage}
      />
    </ActionSheet>
  );
};

export default LanguageBottomSheet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    padding: s(15),
  },
  title: {
    fontSize: ms(16),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: vs(20),
  },
});
