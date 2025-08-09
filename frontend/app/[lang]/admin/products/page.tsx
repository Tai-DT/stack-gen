'use client';

import { useEffect, useState, FormEvent } from 'react';
import { getDictionary, locales, type Locale } from '../../../../lib/i18n';

interface Product {
  id: number;
  name: Record<string, string>;
  description: Record<string, string>;
}

export default function AdminProductsPage({ params }: { params: { lang: Locale } }) {
  const dict = getDictionary(params.lang);
  const empty = { name: Object.fromEntries(locales.map(l => [l, ''])), description: Object.fromEntries(locales.map(l => [l, ''])) };
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(empty);

  useEffect(() => {
    fetch('http://localhost:8080/api/products').then(r => r.json()).then(setProducts);
  }, []);

  function handleChange(l: string, field: 'name' | 'description', value: string) {
    setForm(prev => ({ ...prev, [field]: { ...prev[field], [l]: value } }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await fetch('http://localhost:8080/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const list = await fetch('http://localhost:8080/api/products').then(r => r.json());
    setProducts(list);
    setForm(empty);
  }

  return (
    <div>
      <h1>{dict.adminProducts}</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name[params.lang]}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        {locales.map(l => (
          <div key={l}>
            <input
              placeholder={`Name (${l})`}
              value={form.name[l]}
              onChange={e => handleChange(l, 'name', e.target.value)}
            />
            <textarea
              placeholder={`Description (${l})`}
              value={form.description[l]}
              onChange={e => handleChange(l, 'description', e.target.value)}
            />
          </div>
        ))}
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
