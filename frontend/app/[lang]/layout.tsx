import Nav from "../../components/Nav";
import type { ReactNode } from "react";
import { getDictionary, locales, type Locale } from "../../lib/i18n";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  const dict = getDictionary(params.lang);
  return (
    <html lang={params.lang}>
      <body>
        <Nav dict={dict} lang={params.lang} />
        <main>{children}</main>
      </body>
    </html>
  );
}
