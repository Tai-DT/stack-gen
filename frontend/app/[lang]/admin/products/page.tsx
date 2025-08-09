"use client";

import { useState, FormEvent } from "react";
import { getDictionary, type Locale } from "../../../../lib/i18n";

interface TextFields {
  en: string;
  ja: string;
  vi: string;
  ko: string;
}

export default function AdminProductsPage({ params }: { params: { lang: Locale } }) {
  const dict = getDictionary(params.lang);
  const [name, setName] = useState<TextFields>({ en: "", ja: "", vi: "", ko: "" });
  const [description, setDescription] = useState<TextFields>({ en: "", ja: "", vi: "", ko: "" });

  async function submit(e: FormEvent) {
    e.preventDefault();
    await fetch("http://localhost:8080/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
    setName({ en: "", ja: "", vi: "", ko: "" });
    setDescription({ en: "", ja: "", vi: "", ko: "" });
  }

  return (
    <div>
      <h1>{dict.adminProducts}</h1>
      <form onSubmit={submit}>
        <h2>Name</h2>
        <input placeholder="EN" value={name.en} onChange={(e) => setName({ ...name, en: e.target.value })} />
        <input placeholder="JA" value={name.ja} onChange={(e) => setName({ ...name, ja: e.target.value })} />
        <input placeholder="VI" value={name.vi} onChange={(e) => setName({ ...name, vi: e.target.value })} />
        <input placeholder="KO" value={name.ko} onChange={(e) => setName({ ...name, ko: e.target.value })} />
        <h2>Description</h2>
        <textarea placeholder="EN" value={description.en} onChange={(e) => setDescription({ ...description, en: e.target.value })} />
        <textarea placeholder="JA" value={description.ja} onChange={(e) => setDescription({ ...description, ja: e.target.value })} />
        <textarea placeholder="VI" value={description.vi} onChange={(e) => setDescription({ ...description, vi: e.target.value })} />
        <textarea placeholder="KO" value={description.ko} onChange={(e) => setDescription({ ...description, ko: e.target.value })} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
