"use client";

import { useLanguage } from "@/main/Languageprovider";
import type { Lang } from "@/main/translation";

const OPTIONS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "or", label: "ଓଡ଼ିଆ" },
];

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("lang.label")}
      className={`inline-flex shrink-0 rounded-full border border-brand-green/20 bg-white p-0.5 text-xs font-semibold shadow-sm ${className}`}
    >
      {OPTIONS.map(({ code, label }) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            lang={code}
            className={`rounded-full px-3 py-1.5 transition-colors
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange
              ${active ? "bg-brand-green text-white" : "text-brand-green hover:bg-brand-blush"}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}