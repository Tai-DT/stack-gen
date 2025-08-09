import { getDictionary, type Locale } from "../../../lib/i18n";

interface License {
  id: number;
  title: Record<string, string>;
  issuer: string;
  year: number;
}

export default async function LicensesPage({ params }: { params: { lang: Locale } }) {
  const dict = getDictionary(params.lang);
  const res = await fetch("http://localhost:8080/api/licenses", { cache: "no-store" });
  const licenses: License[] = await res.json();
  return (
    <div>
      <h1>{dict.licenses}</h1>
      <ul>
        {licenses.map((l) => (
          <li key={l.id}>
            <strong>{l.title[params.lang]}</strong> - {l.issuer} ({l.year})
          </li>
        ))}
      </ul>
    </div>
  );
}
