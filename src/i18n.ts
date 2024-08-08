import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "in-memory-of": "In Memory of",
      "mehdi-ezzabady": "Seyed Mehdi Kamaladdini Ezzabady",
      timeline: "Timeline",
      location: "Location",
      bio: "Biography",
      loading: "Loading...",
    },
  },
  fa: {
    translation: {
      "in-memory-of": "به یاد",
      "mehdi-ezzabady": "سید مهدی کمال الدینی عزآبادی",
      timeline: "تایم لاین",
      location: "آرامگاه",
      bio: "بیوگرافی",
      loading: "در حال بارگذاری...",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "fa", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
