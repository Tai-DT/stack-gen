'use client';

import { useEffect, useState, FormEvent } from 'react';
import { getDictionary, locales, type Locale } from '../../../../lib/i18n';

interface Project {
  id: number;
  title: Record<string, string>;
  summary: Record<string, string>;
}

export default function AdminProjectsPage({ params }: { params: { lang: Locale } }) {
  const dict = getDictionary(params.lang);
  const empty = { title: Object.fromEntries(locales.map(l => [l, ''])), summary: Object.fromEntries(locales.map(l => [l, ''])) };
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState(empty);

  useEffect(() => {
    fetch('http://localhost:8080/api/projects').then(r => r.json()).then(setProjects);
  }, []);

  function handleChange(l: string, field: 'title' | 'summary', value: string) {
    setForm(prev => ({ ...prev, [field]: { ...prev[field], [l]: value } }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await fetch('http://localhost:8080/api/admin/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const list = await fetch('http://localhost:8080/api/projects').then(r => r.json());
    setProjects(list);
    setForm(empty);
  }

  return (
    <div>
      <h1>{dict.adminProjects}</h1>
      <ul>
        {projects.map(p => (
          <li key={p.id}>{p.title[params.lang]}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        {locales.map(l => (
          <div key={l}>
            <input
              placeholder={`Title (${l})`}
              value={form.title[l]}
              onChange={e => handleChange(l, 'title', e.target.value)}
            />
            <textarea
              placeholder={`Summary (${l})`}
              value={form.summary[l]}
              onChange={e => handleChange(l, 'summary', e.target.value)}
            />
          </div>
        ))}
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
