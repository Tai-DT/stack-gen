interface Product {
  id: number;
  name: string;
  description: string;
}

export default async function ProductsPage() {
  const res = await fetch("http://localhost:8080/api/products", { cache: "no-store" });
  const products: Product[] = await res.json();
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong>: {p.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
