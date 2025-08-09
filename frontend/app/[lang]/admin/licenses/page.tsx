"use client";

import { useState, FormEvent } from "react";
import { getDictionary, type Locale } from "../../../../lib/i18n";

interface TextFields {
  en: string;
  ja: string;
  vi: string;
  ko: string;
}

export default function AdminLicensesPage({ params }: { params: { lang: Locale } }) {
  const dict = getDictionary(params.lang);
  const [title, setTitle] = useState<TextFields>({ en: "", ja: "", vi: "", ko: "" });
  const [issuer, setIssuer] = useState("");
  const [year, setYear] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    await fetch("http://localhost:8080/api/admin/licenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, issuer, year: parseInt(year, 10) }),
    });
    setTitle({ en: "", ja: "", vi: "", ko: "" });
    setIssuer("");
    setYear("");
  }

  return (
    <div>
      <h1>{dict.adminLicenses}</h1>
      <form onSubmit={submit}>
        <h2>Title</h2>
        <input placeholder="EN" value={title.en} onChange={(e) => setTitle({ ...title, en: e.target.value })} />
        <input placeholder="JA" value={title.ja} onChange={(e) => setTitle({ ...title, ja: e.target.value })} />
        <input placeholder="VI" value={title.vi} onChange={(e) => setTitle({ ...title, vi: e.target.value })} />
        <input placeholder="KO" value={title.ko} onChange={(e) => setTitle({ ...title, ko: e.target.value })} />
        <h2>Issuer</h2>
        <input value={issuer} onChange={(e) => setIssuer(e.target.value)} />
        <h2>Year</h2>
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
