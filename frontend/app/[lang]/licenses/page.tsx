import { getDictionary, type Locale } from "../../../lib/i18n";

async function getLicenses() {
  const res = await fetch("http://localhost:8080/api/licenses", { cache: "no-store" });
  return res.json();
}

export default async function LicensesPage({ params }: { params: { lang: Locale } }) {
  const dict = getDictionary(params.lang);
  const licenses = await getLicenses();
  return (
    <div>
      <h1>{dict.licenses}</h1>
      <ul>
        {licenses.map((l: any) => (
          <li key={l.id}>
            <strong>{l.title[params.lang]}</strong> - {l.issuer} ({l.year})
          </li>
        ))}
      </ul>
    </div>
  );
}
