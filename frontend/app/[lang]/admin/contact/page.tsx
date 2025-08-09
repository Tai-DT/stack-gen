'use client';

import { useEffect, useState, FormEvent } from 'react';
import { getDictionary, type Locale } from '../../../../lib/i18n';

interface Contact {
  email: string;
  phone: string;
  address: string;
}

export default function AdminContactPage({ params }: { params: { lang: Locale } }) {
  const dict = getDictionary(params.lang);
  const [contact, setContact] = useState<Contact>({ email: '', phone: '', address: '' });

  useEffect(() => {
    fetch('http://localhost:8080/api/contact').then(r => r.json()).then(setContact);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await fetch('http://localhost:8080/api/contact', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });
  }

  return (
    <div>
      <h1>{dict.adminContact}</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={contact.email}
          onChange={e => setContact(prev => ({ ...prev, email: e.target.value }))}
        />
        <input
          placeholder="Phone"
          value={contact.phone}
          onChange={e => setContact(prev => ({ ...prev, phone: e.target.value }))}
        />
        <input
          placeholder="Address"
          value={contact.address}
          onChange={e => setContact(prev => ({ ...prev, address: e.target.value }))}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
