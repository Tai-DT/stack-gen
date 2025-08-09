import { getDictionary, type Locale } from "../../../lib/i18n";

interface Product {
  id: number;
  name: Record<string, string>;
  description: Record<string, string>;
}

export default async function ProductsPage({ params }: { params: { lang: Locale } }) {
  const dict = getDictionary(params.lang);
  const res = await fetch("http://localhost:8080/api/products", { cache: "no-store" });
  const products: Product[] = await res.json();
  return (
    <div>
      <h1>{dict.products}</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <strong>{p.name[params.lang]}</strong> - {p.description[params.lang]}
          </li>
        ))}
      </ul>
    </div>
  );
}
