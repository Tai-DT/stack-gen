import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <Link href="/">Home</Link> |{" "}
      <Link href="/products">Products</Link> |{" "}
      <Link href="/projects">Projects</Link> |{" "}
      <Link href="/licenses">Licenses</Link> |{" "}
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
