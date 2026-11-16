import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, LoaderCircle } from "lucide-react";
import { LiquidMetalShader } from "@/components/ui/liquid-metal-shader";
import { HoverWaveText } from "@/components/ui/hover-wave-text";
import { contactEmail } from "@/data/contact";
import { useLanguage } from "@/i18n/language-context";

type ContactSectionProps = { onPrivacyClick: () => void };
type SendStatus = "sending" | "sent" | "error" | "activationRequired" | "connectionError" | "timeout" | null;

export function ContactSection({ onPrivacyClick }: ContactSectionProps) {
  const { t } = useLanguage();
  const copy = t.contact;
  const formRef = useRef<HTMLFormElement>(null);
  const sendingRef = useRef(false);
  const requestRef = useRef<AbortController | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { amount: 0.2 });
  const reducedMotion = useReducedMotion() ?? false;
  const [status, setStatus] = useState<SendStatus>(null);
  const sending = status === "sending";

  useEffect(() => () => requestRef.current?.abort(), []);

  useEffect(() => {
    formRef.current?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea")
      .forEach((field) => field.setCustomValidity(""));
  }, [copy]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingRef.current) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus(null);

    // Bots that fill this hidden field should never trigger an email.
    if (formData.get("_honey")) return;

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
      const field = form.elements.namedItem(fieldName);
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
        field.setCustomValidity("");
        if (!value || field.validity.typeMismatch) {
          field.setCustomValidity(!value ? prompt : copy.emailInvalid);
          field.reportValidity();
          return;
        }
      }
    }
    const subjectReason = reason === "hello" ? copy.helloReason : copy.projectReason;
    const controller = new AbortController();
    requestRef.current = controller;
    sendingRef.current = true;
    setStatus("sending");
    const timeout = window.setTimeout(() => controller.abort(), 30000);

    try {
      // Keep the address in the provider's documented URL format. Encoding @ as
      // %40 can be blocked before the request reaches its CORS-enabled endpoint.
      const recipient = encodeURIComponent(contactEmail).replace(/%40/gi, "@");
      const body = new URLSearchParams({
        name,
        email,
        phone,
        reason: subjectReason,
        message,
        _subject: `Portfolio — ${subjectReason} — ${name}`,
        _replyto: email,
        _template: "table",
        _captcha: "false",
        _honey: "",
        _url: window.location.href,
      });
      // Native form encoding avoids the JSON request's CORS preflight.
      const response = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        signal: controller.signal,
        body,
      });
      const result: { success?: boolean | string; message?: string } = await response.json();

      // The service can return HTTP 200 with success set to the string "false".
      if (!response.ok || (result.success !== true && result.success !== "true")) {
        if (typeof result.message === "string" && /activat/i.test(result.message)) {
          setStatus("activationRequired");
          return;
        }
        throw new Error("Contact form submission failed");
      }

      form.reset();
      setStatus("sent");
    } catch (error) {
      setStatus(controller.signal.aborted ? "timeout" : error instanceof TypeError ? "connectionError" : "error");
    } finally {
      window.clearTimeout(timeout);
      requestRef.current = null;
      sendingRef.current = false;
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

          <form ref={formRef} onSubmit={handleSubmit} aria-busy={sending} noValidate>
            <div className="contact-honeypot" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input id="contact-website" name="_honey" autoComplete="off" tabIndex={-1} />
            </div>
            <fieldset className="contact-fields" disabled={sending}>
              <legend className="sr-only">{copy.heading}</legend>
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
            </fieldset>

            <div className="contact-submit-row">
              <button type="submit" className="contact-submit hover-wave" aria-describedby="contact-send-note" disabled={sending}>
                <HoverWaveText text={sending ? copy.sending : copy.send} />
                {sending
                  ? <LoaderCircle aria-hidden="true" className="animate-spin" size={17} strokeWidth={1.5} />
                  : <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />}
              </button>
              <p id="contact-send-note">{copy.sendNote}</p>
            </div>
            <div role="status" aria-live="polite" aria-atomic="true" className="contact-status" data-status={status}>
              {status && copy[status]}
            </div>
            <p className="contact-privacy">
              {copy.privacyNote}{" "}
              <button type="button" onClick={onPrivacyClick}>{copy.privacyLink}</button>
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
