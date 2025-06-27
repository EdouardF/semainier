import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const periodes = ['morning', 'noon', 'afternoon', 'evening'];

function getWeekDates() {
  const today = new Date();
  const week = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    week.push(d);
  }
  return week;
}

function getInitialState(username, medicament) {
  const saved = localStorage.getItem('semainier_' + username + '_' + medicament);
  if (saved) return JSON.parse(saved);
  const state = {};
  getWeekDates().forEach(date => {
    const key = date.toISOString().slice(0,10);
    state[key] = {};
    periodes.forEach(p => {
      state[key][p] = false;
    });
  });
  return state;
}

export default function SemainierTable({ username, medicament }) {
  const { t } = useTranslation();
  const [taken, setTaken] = useState(() => getInitialState(username, medicament));
  const weekDates = getWeekDates();

  useEffect(() => {
    localStorage.setItem('semainier_' + username + '_' + medicament, JSON.stringify(taken));
  }, [taken, username, medicament]);

  // Met à jour la structure si la semaine change
  useEffect(() => {
    setTaken(prev => {
      const copy = { ...prev };
      weekDates.forEach(date => {
        const key = date.toISOString().slice(0,10);
        if (!copy[key]) {
          copy[key] = {};
          periodes.forEach(p => { copy[key][p] = false; });
        }
      });
      return copy;
    });
    // eslint-disable-next-line
  }, [username, medicament]);

  const toggle = (dateKey, periode) => {
    setTaken(prev => {
      const copy = { ...prev };
      copy[dateKey] = { ...copy[dateKey], [periode]: !copy[dateKey][periode] };
      return copy;
    });
  };

  if (!medicament) return null;

  return (
    <>
      <div style={{marginBottom:8, fontWeight:'bold', color:'#d72660'}}>
        {t('tracking_for') || 'Suivi pour'} : {medicament}
      </div>
      <table className="table-semainier">
        <thead>
          <tr>
            <th></th>
            {weekDates.map(date => {
              const day = date.toLocaleDateString(undefined, { weekday: 'short' });
              const dmy = date.toLocaleDateString(undefined, { day: '2-digit', month: '2-digit' });
              return <th key={date.toISOString()}>{day}<br/>{dmy}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {periodes.map((p) => (
            <tr key={p}>
              <td className="rose">{t(p)}</td>
              {weekDates.map(date => {
                const key = date.toISOString().slice(0,10);
                return (
                  <td key={key}>
                    <span
                      className={taken[key]?.[p] ? 'check checked' : 'check unchecked'}
                      onClick={() => toggle(key, p)}
                      role="button"
                      aria-label={taken[key]?.[p] ? t('checked') : t('unchecked')}
                    >
                      {taken[key]?.[p] ? '✔️' : '○'}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
