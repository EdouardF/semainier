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
  const [medicaments, setMedicaments] = useState(() => {
    const saved = localStorage.getItem('semainier_meds_' + username);
    return saved ? JSON.parse(saved) : [];
  });
  const [newMed, setNewMed] = useState('');
  const [selectedMed, setSelectedMed] = useState(() => {
    const saved = localStorage.getItem('semainier_selected_med_' + username);
    return saved || '';
  });

  useEffect(() => {
    if (username) {
      localStorage.setItem('semainier_user', username);
      localStorage.setItem('semainier_meds_' + username, JSON.stringify(medicaments));
      localStorage.setItem('semainier_selected_med_' + username, selectedMed);
    }
  }, [username, medicaments, selectedMed]);

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

  const handleAddMed = (e) => {
    e.preventDefault();
    if (newMed.trim() && !medicaments.includes(newMed.trim())) {
      setMedicaments([...medicaments, newMed.trim()]);
      setSelectedMed(newMed.trim());
      setNewMed('');
    }
  };

  const handleSelectMed = (e) => {
    setSelectedMed(e.target.value);
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
      <form onSubmit={handleAddMed} style={{marginBottom:8, display:'flex', gap:8, alignItems:'center'}}>
        <input
          type="text"
          value={newMed}
          onChange={e => setNewMed(e.target.value)}
          placeholder={t('add_med_placeholder') || 'Ajouter un médicament'}
          style={{padding:4, borderRadius:6, border:'1px solid #d72660', flex:1}}
        />
        <button className="button-rose" type="submit">{t('add_med') || 'Ajouter'}</button>
      </form>
      {medicaments.length > 0 && (
        <div style={{marginBottom:12}}>
          <label style={{fontWeight:'bold', color:'#d72660'}}>
            {t('select_med') || 'Médicament :'}
            <select value={selectedMed} onChange={handleSelectMed} style={{marginLeft:8, padding:4, borderRadius:6, border:'1px solid #d72660'}}>
              {medicaments.map(med => (
                <option key={med} value={med}>{med}</option>
              ))}
            </select>
          </label>
        </div>
      )}
      {selectedMed && (
        <SemainierTable username={username} medicament={selectedMed} />
      )}
      <button className="button-rose" onClick={() => setShowSettings(true)}>{t('settings')}</button>
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  );
}
