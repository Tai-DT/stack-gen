interface License {
  id: number;
  title: string;
  issuer: string;
  year: number;
}

export default async function LicensesPage() {
  const res = await fetch("http://localhost:8080/api/licenses", { cache: "no-store" });
  const licenses: License[] = await res.json();
  return (
    <div>
      <h1>Licenses</h1>
      <ul>
        {licenses.map((l) => (
          <li key={l.id}>
            <strong>{l.title}</strong> ({l.year}) - {l.issuer}
          </li>
        ))}
      </ul>
    </div>
  );
}
