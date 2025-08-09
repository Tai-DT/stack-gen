"use client";

import { useState, useEffect, FormEvent } from "react";
import { getDictionary, type Locale } from "../../../../lib/i18n";

export default function AdminContactPage({ params }: { params: { lang: Locale } }) {
  const dict = getDictionary(params.lang);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/contact")
      .then((res) => res.json())
      .then((c) => {
        setEmail(c.email);
        setPhone(c.phone);
        setAddress(c.address);
      });
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    await fetch("http://localhost:8080/api/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone, address }),
    });
  }

  return (
    <div>
      <h1>{dict.adminContact}</h1>
      <form onSubmit={submit}>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
