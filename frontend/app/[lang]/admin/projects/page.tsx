"use client";

import { useState, FormEvent } from "react";
import { getDictionary, type Locale } from "../../../../lib/i18n";

interface TextFields {
  en: string;
  ja: string;
  vi: string;
  ko: string;
}

export default function AdminProjectsPage({ params }: { params: { lang: Locale } }) {
  const dict = getDictionary(params.lang);
  const [title, setTitle] = useState<TextFields>({ en: "", ja: "", vi: "", ko: "" });
  const [summary, setSummary] = useState<TextFields>({ en: "", ja: "", vi: "", ko: "" });

  async function submit(e: FormEvent) {
    e.preventDefault();
    await fetch("http://localhost:8080/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, summary }),
    });
    setTitle({ en: "", ja: "", vi: "", ko: "" });
    setSummary({ en: "", ja: "", vi: "", ko: "" });
  }

  return (
    <div>
      <h1>{dict.adminProjects}</h1>
      <form onSubmit={submit}>
        <h2>Title</h2>
        <input placeholder="EN" value={title.en} onChange={(e) => setTitle({ ...title, en: e.target.value })} />
        <input placeholder="JA" value={title.ja} onChange={(e) => setTitle({ ...title, ja: e.target.value })} />
        <input placeholder="VI" value={title.vi} onChange={(e) => setTitle({ ...title, vi: e.target.value })} />
        <input placeholder="KO" value={title.ko} onChange={(e) => setTitle({ ...title, ko: e.target.value })} />
        <h2>Summary</h2>
        <textarea placeholder="EN" value={summary.en} onChange={(e) => setSummary({ ...summary, en: e.target.value })} />
        <textarea placeholder="JA" value={summary.ja} onChange={(e) => setSummary({ ...summary, ja: e.target.value })} />
        <textarea placeholder="VI" value={summary.vi} onChange={(e) => setSummary({ ...summary, vi: e.target.value })} />
        <textarea placeholder="KO" value={summary.ko} onChange={(e) => setSummary({ ...summary, ko: e.target.value })} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
