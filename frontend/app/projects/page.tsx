interface Project {
  id: number;
  title: string;
  summary: string;
}

export default async function ProjectsPage() {
  const res = await fetch("http://localhost:8080/api/projects", { cache: "no-store" });
  const projects: Project[] = await res.json();
  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong>: {p.summary}
          </li>
        ))}
      </ul>
    </div>
  );
}
