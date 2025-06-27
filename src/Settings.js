import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const periodes = ['morning', 'noon', 'afternoon', 'evening'];

function getInitialTimes() {
  const saved = localStorage.getItem('notifTimes');
  if (saved) return JSON.parse(saved);
  return {
    morning: '08:00',
    noon: '12:00',
    afternoon: '16:00',
    evening: '20:00',
  };
}

export default function Settings({ onClose }) {
  const { t } = useTranslation();
  const [notifTimes, setNotifTimes] = useState(getInitialTimes());

  const handleChange = (periode, value) => {
    setNotifTimes(prev => ({ ...prev, [periode]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('notifTimes', JSON.stringify(notifTimes));
    // Demande la permission de notification
    if (window.Notification && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    // Planifie les notifications (simple, pour démo)
    periodes.forEach(p => {
      if (window.Notification && Notification.permission === 'granted') {
        // Annule les notifications précédentes (non supporté nativement)
        // En prod, utiliser un service worker pour plus de contrôle
        // Ici, on envoie une notification immédiate pour la démo
        new Notification(t('notif_title', { periode: t(p) }), {
          body: t('notif_body', { periode: t(p) })
        });
      }
    });
    onClose();
  };

  return (
    <div className="settings-modal">
      <h2>{t('notif_times')}</h2>
      {periodes.map(p => (
        <div key={p} style={{marginBottom:8}}>
          <label>
            {t(p)} :
            <input
              type="time"
              value={notifTimes[p]}
              onChange={e => handleChange(p, e.target.value)}
              style={{marginLeft:8}}
            />
          </label>
        </div>
      ))}
      <button className="button-rose" onClick={handleSave}>{t('save')}</button>
      <button className="button-rose" onClick={onClose}>{t('close')}</button>
    </div>
  );
}
