import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Copy } from "lucide-react";
import { LiquidMetalShader } from "@/components/ui/liquid-metal-shader";
import { HoverWaveText } from "@/components/ui/hover-wave-text";
import { contactEmail } from "@/data/contact";
import { useLanguage } from "@/i18n/language-context";
import { interpolate, type Translations } from "@/i18n/translations";

type ContactSectionProps = { onPrivacyClick: () => void };
type DraftDetails = { name: string; email: string; phone: string; reason: "project" | "hello"; message: string };

function formatDraft(details: DraftDetails, copy: Translations["contact"]) {
  return [
    `${copy.draftName}: ${details.name}`,
    `${copy.draftEmail}: ${details.email}`,
    ...(details.phone ? [`${copy.draftPhone}: ${details.phone}`] : []),
    `${copy.draftReason}: ${details.reason === "hello" ? copy.helloReason : copy.projectReason}`,
    "",
    details.message,
  ].join("\n");
}

export function ContactSection({ onPrivacyClick }: ContactSectionProps) {
  const { t } = useLanguage();
  const copy = t.contact;
  const formRef = useRef<HTMLFormElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { amount: 0.2 });
  const reducedMotion = useReducedMotion() ?? false;
  const [details, setDetails] = useState<DraftDetails | null>(null);
  const [status, setStatus] = useState<"ready" | "copied" | "copyFallback" | null>(null);
  const draft = details ? formatDraft(details, copy) : "";

  useEffect(() => {
    formRef.current?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea")
      .forEach((field) => field.setCustomValidity(""));
  }, [copy]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const reason = formData.get("reason") === "hello" ? "hello" : "project";
    const message = String(formData.get("message") || "").trim();
    for (const [fieldName, value, prompt] of [
      ["name", name, copy.nameRequired],
      ["email", email, copy.emailRequired],
      ["message", message, copy.messageRequired],
    ]) {
      const field = event.currentTarget.elements.namedItem(fieldName);
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
        field.setCustomValidity("");
        if (!value || field.validity.typeMismatch) {
          field.setCustomValidity(!value ? prompt : copy.emailInvalid);
          field.reportValidity();
          return;
        }
      }
    }
    const nextDetails: DraftDetails = { name, email, phone, reason, message };
    const body = formatDraft(nextDetails, copy);
    const subjectReason = reason === "hello" ? copy.helloReason : copy.projectReason;

    setDetails(nextDetails);
    setStatus("ready");
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(`${subjectReason} — ${name}`)}&body=${encodeURIComponent(body)}`;
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft);
      setStatus("copied");
    } catch {
      setStatus("copyFallback");
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="contact-section">
      <LiquidMetalShader
        className="contact-metal"
        baseColor="#17191f"
        metalColor="#a9adb9"
        highlightColor="#f7f5f0"
        distortion={0.85}
        scale={1.35}
        speed={0.45}
        pixelRatio={1}
      />
      <div className="contact-container mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-12">
        <motion.div
          ref={cardRef}
          className="contact-card"
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          data-animating={inView && !reducedMotion}
        >
          <h2 id="contact-heading" className="contact-heading" aria-label={copy.heading}>
            <span aria-hidden="true">
              {copy.heading}
            </span>
          </h2>
          <p className="contact-direct">
            <span>{copy.direct}</span>
            <a className="hover-wave" href={`mailto:${contactEmail}`}>
              <HoverWaveText text={contactEmail} />
            </a>
          </p>

          <form ref={formRef} onSubmit={handleSubmit} noValidate>
            <div className="contact-fields">
              <div className="contact-field">
                <label htmlFor="contact-name">{copy.name}</label>
                <input id="contact-name" name="name" autoComplete="name" placeholder={copy.namePlaceholder} maxLength={120} onInput={(event) => event.currentTarget.setCustomValidity("")} required />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-email">{copy.email}</label>
                <input id="contact-email" name="email" type="email" autoComplete="email" placeholder={copy.emailPlaceholder} maxLength={254} onInput={(event) => event.currentTarget.setCustomValidity("")} required />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-phone">{copy.phone} <span className="sr-only">{copy.optional}</span></label>
                <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="+55" maxLength={40} />
              </div>
              <div className="contact-field contact-select">
                <label htmlFor="contact-reason">{copy.reason}</label>
                <select id="contact-reason" name="reason" defaultValue="project">
                  <option value="project">{copy.projectReason}</option>
                  <option value="hello">{copy.helloReason}</option>
                </select>
                <ChevronDown aria-hidden="true" size={15} strokeWidth={1.5} />
              </div>
              <div className="contact-field contact-message">
                <label htmlFor="contact-message">{copy.message}</label>
                <textarea id="contact-message" name="message" placeholder={copy.messagePlaceholder} rows={1} maxLength={2000} onInput={(event) => event.currentTarget.setCustomValidity("")} required />
              </div>
            </div>

            <div className="contact-submit-row">
              <button type="submit" className="contact-submit hover-wave" aria-describedby="contact-send-note">
                <HoverWaveText text={copy.send} />
                <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
              </button>
              <p id="contact-send-note">{copy.sendNote}</p>
            </div>
            <p className="contact-privacy">
              {copy.privacyNote}{" "}
              <button type="button" onClick={onPrivacyClick}>{copy.privacyLink}</button>
            </p>

            <div role="status" aria-live="polite" className="contact-status">{status && interpolate(copy[status], { email: contactEmail })}</div>
            {draft && (
              <div className="contact-draft">
                <button type="button" onClick={copyDraft} className="hover-wave">
                  <HoverWaveText text={copy.copy} />
                  <Copy aria-hidden="true" size={14} />
                </button>
                <details>
                  <summary>{copy.viewMessage}</summary>
                  <pre>{draft}</pre>
                </details>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
