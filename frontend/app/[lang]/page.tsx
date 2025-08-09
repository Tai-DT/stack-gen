import { getDictionary, type Locale } from "../../lib/i18n";

export default function HomePage({ params }: { params: { lang: Locale } }) {
  const dict = getDictionary(params.lang);
  return (
    <div>
      <h1>{dict.welcome}</h1>
      <p>{dict.explore}</p>
    </div>
  );
}
