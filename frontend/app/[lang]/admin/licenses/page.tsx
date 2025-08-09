'use client';

import { useEffect, useState, FormEvent } from 'react';
import { getDictionary, locales, type Locale } from '../../../../lib/i18n';

interface License {
  id: number;
  title: Record<string, string>;
  issuer: string;
  year: number;
}

export default function AdminLicensesPage({ params }: { params: { lang: Locale } }) {
  const dict = getDictionary(params.lang);
  const empty = { title: Object.fromEntries(locales.map(l => [l, ''])), issuer: '', year: new Date().getFullYear() };
  const [licenses, setLicenses] = useState<License[]>([]);
  const [form, setForm] = useState(empty);

  useEffect(() => {
    fetch('http://localhost:8080/api/licenses').then(r => r.json()).then(setLicenses);
  }, []);

  function handleTitleChange(l: string, value: string) {
    setForm(prev => ({ ...prev, title: { ...prev.title, [l]: value } }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await fetch('http://localhost:8080/api/admin/licenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const list = await fetch('http://localhost:8080/api/licenses').then(r => r.json());
    setLicenses(list);
    setForm(empty);
  }

  return (
    <div>
      <h1>{dict.adminLicenses}</h1>
      <ul>
        {licenses.map(l => (
          <li key={l.id}>{l.title[params.lang]} - {l.issuer} ({l.year})</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        {locales.map(l => (
          <div key={l}>
            <input
              placeholder={`Title (${l})`}
              value={form.title[l]}
              onChange={e => handleTitleChange(l, e.target.value)}
            />
          </div>
        ))}
        <input
          placeholder="Issuer"
          value={form.issuer}
          onChange={e => setForm(prev => ({ ...prev, issuer: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Year"
          value={form.year}
          onChange={e => setForm(prev => ({ ...prev, year: Number(e.target.value) }))}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
