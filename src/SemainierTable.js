import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const periodes = ['morning', 'noon', 'afternoon', 'evening'];
const jours = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

function getInitialState() {
  const saved = localStorage.getItem('semainier');
  if (saved) return JSON.parse(saved);
  const state = {};
  periodes.forEach(p => {
    state[p] = Array(7).fill(false);
  });
  return state;
}

export default function SemainierTable() {
  const { t } = useTranslation();
  const [taken, setTaken] = useState(getInitialState());

  useEffect(() => {
    localStorage.setItem('semainier', JSON.stringify(taken));
  }, [taken]);

  const toggle = (periode, jour) => {
    setTaken(prev => {
      const copy = { ...prev };
      copy[periode] = [...copy[periode]];
      copy[periode][jour] = !copy[periode][jour];
      return copy;
    });
  };

  return (
    <table className="table-semainier">
      <thead>
        <tr>
          <th></th>
          {jours.map(j => <th key={j}>{t(j)}</th>)}
        </tr>
      </thead>
      <tbody>
        {periodes.map((p) => (
          <tr key={p}>
            <td className="rose">{t(p)}</td>
            {jours.map((_, j) => (
              <td key={j}>
                <span
                  className={taken[p][j] ? 'check checked' : 'check unchecked'}
                  onClick={() => toggle(p, j)}
                  role="button"
                  aria-label={taken[p][j] ? t('checked') : t('unchecked')}
                >
                  {taken[p][j] ? '✔️' : '○'}
                </span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
