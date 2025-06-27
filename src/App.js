import React, { useState, useEffect } from 'react';
import SemainierTable from './SemainierTable';
import Settings from './Settings';
import { useTranslation } from 'react-i18next';

function getStoredUser() {
  return localStorage.getItem('semainier_user') || '';
}

export default function App() {
  const { t, i18n } = useTranslation();
  const [showSettings, setShowSettings] = useState(false);
  const [lang, setLang] = useState(i18n.language);
  const [username, setUsername] = useState(getStoredUser());
  const [inputName, setInputName] = useState('');

  useEffect(() => {
    if (username) {
      localStorage.setItem('semainier_user', username);
    }
  }, [username]);

  const handleLangChange = (e) => {
    i18n.changeLanguage(e.target.value);
    setLang(e.target.value);
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (inputName.trim()) {
      setUsername(inputName.trim());
      setInputName('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('semainier_user');
    setUsername('');
  };

  if (!username) {
    return (
      <div className="app-container">
        <h1>{t('title_main')}</h1>
        <form onSubmit={handleUserSubmit} style={{marginTop: 32, textAlign:'center'}}>
          <label style={{fontWeight:'bold'}}>
            {t('enter_username') || 'Entrez votre prénom :'}
            <input
              type="text"
              value={inputName}
              onChange={e => setInputName(e.target.value)}
              style={{marginLeft:8, padding:4, borderRadius:6, border:'1px solid #d72660'}}
              autoFocus
            />
          </label>
          <br/>
          <button className="button-rose" type="submit" style={{marginTop:16}}>
            {t('save')}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1>{t('title_main')}</h1>
      <div style={{textAlign:'right', marginBottom:8}}>
        <select value={lang} onChange={handleLangChange}>
          <option value="fr">Français</option>
          <option value="en">English</option>
        </select>
      </div>
      <div style={{marginBottom:8, fontWeight:'bold', color:'#d72660'}}>
        {t('user') || 'Utilisateur'} : {username}
        <button className="button-rose" style={{marginLeft:12, fontSize:'0.9em', padding:'4px 10px'}} onClick={handleLogout}>{t('change_user') || 'Changer'}</button>
      </div>
      <SemainierTable username={username} />
      <button className="button-rose" onClick={() => setShowSettings(true)}>{t('settings')}</button>
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  );
}
