import { getDictionary, type Locale } from "../../../lib/i18n";

async function getProjects() {
  const res = await fetch("http://localhost:8080/api/projects", { cache: "no-store" });
  return res.json();
}

export default async function ProjectsPage({ params }: { params: { lang: Locale } }) {
  const dict = getDictionary(params.lang);
  const projects = await getProjects();
  return (
    <div>
      <h1>{dict.projects}</h1>
      <ul>
        {projects.map((p: any) => (
          <li key={p.id}>
            <h2>{p.title[params.lang]}</h2>
            <p>{p.summary[params.lang]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
