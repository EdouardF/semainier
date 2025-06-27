import React, { useState } from 'react';
import SemainierTable from './SemainierTable';
import Settings from './Settings';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t, i18n } = useTranslation();
  const [showSettings, setShowSettings] = useState(false);
  const [lang, setLang] = useState(i18n.language);

  const handleLangChange = (e) => {
    i18n.changeLanguage(e.target.value);
    setLang(e.target.value);
  };

  return (
    <div className="app-container">
      <h1>{t('title_main')}</h1>
      <div style={{textAlign:'right', marginBottom:8}}>
        <select value={lang} onChange={handleLangChange}>
          <option value="fr">Français</option>
          <option value="en">English</option>
        </select>
      </div>
      <SemainierTable />
      <button className="button-rose" onClick={() => setShowSettings(true)}>{t('settings')}</button>
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  );
}
