import { getDictionary, type Locale } from "../../../lib/i18n";

interface Project {
  id: number;
  title: Record<string, string>;
  summary: Record<string, string>;
}

export default async function ProjectsPage({ params }: { params: { lang: Locale } }) {
  const dict = getDictionary(params.lang);
  const res = await fetch("http://localhost:8080/api/projects", { cache: "no-store" });
  const projects: Project[] = await res.json();
  return (
    <div>
      <h1>{dict.projects}</h1>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <strong>{p.title[params.lang]}</strong> - {p.summary[params.lang]}
          </li>
        ))}
      </ul>
    </div>
  );
}
