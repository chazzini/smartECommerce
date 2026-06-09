import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import de from "./de.json";
import es from "./es.json";
import fr from "./fr.json";
import ru from "./ru.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LANGUAGES = {
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
  es: {
    translation: es,
  },
  fr: {
    translation: fr,
  },
  ru: {
    translation: ru,
  },
};

const LANGUAGE_DETECTOR = {
  type: "languageDetector",
  async: true,
  detect: async (callback: (lng: string) => void) => {
    const language = await AsyncStorage.getItem("language");
    if (language) {
      callback(language);
    } else {
      callback("en");
    }
  },
  cacheUserLanguage: async (lng: string) => {
    await AsyncStorage.setItem("language", lng);
  },
};

i18n
  .use(LANGUAGE_DETECTOR as any)
  .use(initReactI18next)
  .init({
    resources: LANGUAGES,
    fallbackLng: "en",
    defaultNS: "translation",
    ns: ["translation"],
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
