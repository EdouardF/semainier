import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      title_main: 'Semainier de prise de médicaments',
      title_nav: 'Semainier',
      morning: 'Matin',
      noon: 'Midi',
      afternoon: 'Après-midi',
      evening: 'Soir',
      mon: 'Lun',
      tue: 'Mar',
      wed: 'Mer',
      thu: 'Jeu',
      fri: 'Ven',
      sat: 'Sam',
      sun: 'Dim',
      notif_times: 'Horaires des notifications',
      reset_week: 'Réinitialiser la semaine',
      notif_title: 'Rappel Médicament - {{periode}}',
      notif_body: "N'oubliez pas de prendre vos médicaments ({{periode}}) !",
      settings: 'Réglages',
      save: 'Enregistrer',
      close: 'Fermer',
      enter_username: 'Entrez votre prénom :',
      user: 'Utilisateur',
      change_user: 'Changer'
    }
  },
  en: {
    translation: {
      title_main: 'Weekly medication tracker',
      title_nav: 'Weekly',
      morning: 'Morning',
      noon: 'Noon',
      afternoon: 'Afternoon',
      evening: 'Evening',
      mon: 'Mon',
      tue: 'Tue',
      wed: 'Wed',
      thu: 'Thu',
      fri: 'Fri',
      sat: 'Sat',
      sun: 'Sun',
      notif_times: 'Notification times',
      reset_week: 'Reset week',
      notif_title: 'Medication Reminder - {{periode}}',
      notif_body: "Don't forget to take your medication ({{periode}})!",
      settings: 'Settings',
      save: 'Save',
      close: 'Close',
      enter_username: 'Enter your name:',
      user: 'User',
      change_user: 'Change'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
