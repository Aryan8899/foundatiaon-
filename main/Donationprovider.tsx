"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Heart, Share2, X } from "lucide-react";
import { useLanguage } from "@/main/Languageprovider";

/* =====================================================================
   DONATION POPUP
   Opens whenever someone clicks ANY link that points to "#donate"
   (header Donate button, hero button, Get Involved card, ...).
   ===================================================================== */

/** While true, the popup shows a "Demo mode" note. Set to false once a real
 *  payment gateway / backend is connected inside submitDonation(). */
// (the "Demo mode" note is switched off in the form below)
const DEMO_MODE = true; // eslint-disable-line @typescript-eslint/no-unused-vars

const MIN_AMOUNT = 10; // minimum donation in ₹
const PRESET_AMOUNTS = [500, 1000, 2500, 5000];
const PURPOSES = ["general", "women", "girl", "health", "rural", "finance", "youth"];

interface DonationData {
  name: string;
  email: string;
  mobile: string; // 10 digits
  amount: number; // ₹
  purpose: string; // one of PURPOSES
}

/** >>> CONNECT PAYMENTS HERE <<<
 *  Replace the body with a call to your payment gateway (Razorpay, PayU, ...)
 *  or your own API route (e.g. fetch("/api/donate", { method: "POST", ... })).
 *  Throw an error if it fails. Right now it only waits a moment (demo). */
async function submitDonation(data: DonationData): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  console.log("Donation submitted (demo):", data);
}

/* ---------- helpers ---------- */

function normaliseMobile(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

const inputClass = (hasError: boolean) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition
   placeholder:text-slate-400 focus:ring-2
   ${
     hasError
       ? "border-red-500 focus:border-red-500 focus:ring-red-200"
       : "border-slate-300 focus:border-brand-orange focus:ring-brand-orange/25"
   }`;

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-800">
        {label}
        {required && <span className="text-brand-orange"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/* ---------- the form ---------- */

function DonationForm({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [choice, setChoice] = useState<string>(""); // "500" | ... | "other" | ""
  const [custom, setCustom] = useState("");
  const [purpose, setPurpose] = useState("general");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [submitError, setSubmitError] = useState("");
  const [receipt, setReceipt] = useState<DonationData | null>(null);

  const amount = choice === "other" ? Math.floor(Number(custom) || 0) : Number(choice) || 0;

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = t("donate.required");
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = t("donate.badEmail");
    if (!mobile.trim()) e.mobile = t("donate.required");
    else if (!/^[6-9]\d{9}$/.test(normaliseMobile(mobile))) e.mobile = t("donate.badMobile");
    if (!choice || amount <= 0) e.amount = t("donate.amountRequired");
    else if (amount < MIN_AMOUNT) e.amount = t("donate.amountMin").replace("{min}", String(MIN_AMOUNT));
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (status === "submitting") return;
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const data: DonationData = {
      name: name.trim(),
      email: email.trim(),
      mobile: normaliseMobile(mobile),
      amount,
      purpose,
    };
    setStatus("submitting");
    setSubmitError("");
    try {
      await submitDonation(data);
      setReceipt(data);
      setStatus("done");
    } catch {
      setSubmitError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  /* ----- thank-you screen ----- */
  if (status === "done" && receipt) {
    const summary: [string, string][] = [
      [t("donate.summaryAmount"), `₹${receipt.amount.toLocaleString("en-IN")}`],
      [t("donate.purpose"), t(`donate.purpose.${receipt.purpose}`)],
      [t("donate.name"), receipt.name],
      [t("donate.mobile"), receipt.mobile],
    ];
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(
      `${t("donate.shareText")} ${window.location.origin}`
    )}`;

    return (
      <div className="px-6 pb-8 pt-10 text-center sm:px-8">
        <CheckCircle2 className="mx-auto h-14 w-14 text-brand-leaf" aria-hidden="true" />
        <h2 id="donate-title" className="mt-4 text-2xl font-extrabold text-brand-green">
          {t("donate.thanksTitle").replace("{name}", receipt.name.split(" ")[0])}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          {t("donate.thanksBody")
            .replace("{amount}", receipt.amount.toLocaleString("en-IN"))
            .replace("{purpose}", t(`donate.purpose.${receipt.purpose}`))
            .replace("{mobile}", receipt.mobile)}
        </p>

        {/* Summary of what was entered */}
        <dl className="mt-6 divide-y divide-slate-200 rounded-xl bg-brand-blush px-4 text-left text-sm">
          {summary.map(([label, value]) => (
            <div key={label} className="flex items-start justify-between gap-4 py-2.5">
              <dt className="text-slate-500">{label}</dt>
              <dd className="text-right font-semibold text-slate-900">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-green/30 px-6 py-3
              text-sm font-semibold text-brand-green transition-colors hover:bg-brand-blush
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
          >
            <Share2 size={16} aria-hidden="true" />
            {t("donate.share")}
          </a>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full bg-brand-green px-8 py-3 text-sm
              font-semibold text-white shadow-md transition-colors hover:bg-brand-green-dark
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
          >
            {t("donate.ok")}
          </button>
        </div>
      </div>
    );
  }

  /* ----- the form ----- */
  const submitLabel =
    status === "submitting"
      ? t("donate.submitting")
      : amount >= MIN_AMOUNT
        ? t("donate.submitAmount").replace("{amount}", amount.toLocaleString("en-IN"))
        : t("donate.submit");

  return (
    <form onSubmit={handleSubmit} noValidate className="px-6 pb-7 pt-6 sm:px-8">
      <h2 id="donate-title" className="pr-10 text-xl font-extrabold leading-snug text-brand-green sm:text-2xl">
        {t("donate.title")}
      </h2>
      <p className="mt-2 text-sm text-slate-600">{t("donate.intro")}</p>

      <div className="mt-6 space-y-4">
        <Field id="donor-name" label={t("donate.name")} required error={errors.name}>
          <input
            id="donor-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("donate.namePh")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "donor-name-error" : undefined}
            className={inputClass(!!errors.name)}
          />
        </Field>

        <Field id="donor-email" label={t("donate.email")} error={errors.email}>
          <input
            id="donor-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("donate.emailPh")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "donor-email-error" : undefined}
            className={inputClass(!!errors.email)}
          />
        </Field>

        <Field id="donor-mobile" label={t("donate.mobile")} required error={errors.mobile}>
          <input
            id="donor-mobile"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder={t("donate.mobilePh")}
            aria-invalid={!!errors.mobile}
            aria-describedby={errors.mobile ? "donor-mobile-error" : undefined}
            className={inputClass(!!errors.mobile)}
          />
        </Field>
      </div>

      <hr className="my-6 border-slate-200" />

      {/* Amount */}
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-slate-800">
          {t("donate.amount")}
          <span className="text-brand-orange"> *</span>
        </legend>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {[...PRESET_AMOUNTS.map(String), "other"].map((value) => (
            <label key={value} className="relative cursor-pointer">
              <input
                type="radio"
                name="donation-amount"
                value={value}
                checked={choice === value}
                onChange={() => setChoice(value)}
                className="peer sr-only"
              />
              <span
                className="flex items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm
                  font-semibold text-slate-800 transition
                  hover:border-brand-orange peer-checked:border-brand-orange peer-checked:bg-orange-50
                  peer-checked:text-brand-orange peer-focus-visible:outline peer-focus-visible:outline-2
                  peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-orange"
              >
                {value === "other" ? t("donate.other") : `₹${Number(value).toLocaleString("en-IN")}`}
              </span>
            </label>
          ))}
        </div>

        {choice === "other" && (
          <input
            type="number"
            inputMode="numeric"
            min={MIN_AMOUNT}
            step={1}
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder={t("donate.otherPh")}
            aria-label={t("donate.other")}
            autoFocus
            className={`mt-3 ${inputClass(!!errors.amount)}`}
          />
        )}
        {errors.amount && (
          <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
            {errors.amount}
          </p>
        )}
      </fieldset>

      {/* Purpose */}
      <div className="mt-5">
        <label htmlFor="donor-purpose" className="mb-1.5 block text-sm font-semibold text-slate-800">
          {t("donate.purpose")}
        </label>
        <select
          id="donor-purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className={inputClass(false)}
        >
          {PURPOSES.map((p) => (
            <option key={p} value={p}>
              {t(`donate.purpose.${p}`)}
            </option>
          ))}
        </select>
      </div>

      {submitError && (
        <p role="alert" className="mt-4 text-sm font-medium text-red-600">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r
          from-brand-orange to-brand-green px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg
          shadow-brand-orange/30 transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
      >
        <Heart size={18} fill="currentColor" aria-hidden="true" />
        {submitLabel}
      </button>

      {/* {DEMO_MODE && (
        <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-center text-xs text-amber-800">
          {t("donate.demo")}
        </p>
      )} */}
    </form>
  );
}

/* ---------- popup + click listener ---------- */

export function DonationProvider({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  // Any click on a link to "#donate" opens the popup instead of scrolling
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href="#donate"]');
      if (!link) return;
      event.preventDefault();
      event.stopPropagation();
      setOpen(true);
    };
    document.addEventListener("click", onClick, true);
    if (window.location.hash === "#donate") setOpen(true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Open / close the native <dialog> (gives focus trap + Esc key for free)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {children}
      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          // clicking the dark area outside the card closes it
          if (e.target === e.currentTarget) setOpen(false);
        }}
        aria-labelledby="donate-title"
        className="m-auto max-h-[92vh] w-[calc(100%-1.5rem)] max-w-lg overflow-y-auto rounded-2xl bg-white p-0
          text-slate-900 shadow-2xl backdrop:bg-black/55 backdrop:backdrop-blur-sm"
      >
        {/* <div
          aria-hidden="true"
          className="h-1.5 w-full bg-gradient-to-r from-brand-green via-brand-orange to-brand-gold-light"
        /> */}
        {open && <DonationForm onClose={() => setOpen(false)} />}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={t("donate.close")}
          className="absolute right-3 top-4 rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100
            hover:text-brand-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange"
        >
          <X size={22} aria-hidden="true" />
        </button>
      </dialog>
    </>
  );
}