import { getDictionary, type Locale } from "../../../lib/i18n";

async function getProducts() {
  const res = await fetch("http://localhost:8080/api/products", { cache: "no-store" });
  return res.json();
}

export default async function ProductsPage({ params }: { params: { lang: Locale } }) {
  const dict = getDictionary(params.lang);
  const products = await getProducts();
  return (
    <div>
      <h1>{dict.products}</h1>
      <ul>
        {products.map((p: any) => (
          <li key={p.id}>
            <h2>{p.name[params.lang]}</h2>
            <p>{p.description[params.lang]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
