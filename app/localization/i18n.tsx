import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

import en from "./languages/en.json";
import vi from "./languages/vi.json";
import th from "./languages/th.json";

const translations: I18nLanguageJson = {
  vi,
  en,
  th,
};

const i18n = new I18n(translations);
i18n.defaultLocale = "vi";
i18n.locale = getLocales()[0].languageCode!;
i18n.enableFallback = false;

export default i18n;
