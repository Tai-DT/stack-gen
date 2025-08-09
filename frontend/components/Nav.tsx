import Link from "next/link";

interface Props {
  dict: Record<string, string>;
  lang: string;
}

export default function Nav({ dict, lang }: Props) {
  return (
    <nav>
      <Link href={`/${lang}`}>{dict.home}</Link> |{" "}
      <Link href={`/${lang}/products`}>{dict.products}</Link> |{" "}
      <Link href={`/${lang}/projects`}>{dict.projects}</Link> |{" "}
      <Link href={`/${lang}/licenses`}>{dict.licenses}</Link> |{" "}
      <Link href={`/${lang}/contact`}>{dict.contact}</Link> |{" "}
      <Link href={`/${lang}/admin/products`}>{dict.adminProducts}</Link> |{" "}
      <Link href={`/${lang}/admin/projects`}>{dict.adminProjects}</Link> |{" "}
      <Link href={`/${lang}/admin/licenses`}>{dict.adminLicenses}</Link> |{" "}
      <Link href={`/${lang}/admin/contact`}>{dict.adminContact}</Link>
    </nav>
  );
}
