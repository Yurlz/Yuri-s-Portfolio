import { useRef, useState, type FormEvent } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Copy } from "lucide-react";
import { LiquidMetalShader } from "@/components/ui/liquid-metal-shader";
import { HoverWaveText } from "@/components/ui/hover-wave-text";
import { contactEmail } from "@/data/contact";

type ContactSectionProps = { onPrivacyClick: () => void };

export function ContactSection({ onPrivacyClick }: ContactSectionProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { amount: 0.2 });
  const reducedMotion = useReducedMotion() ?? false;
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const reason = String(formData.get("reason") || "Freelance project");
    const message = String(formData.get("message") || "").trim();
    for (const [fieldName, value, prompt] of [
      ["name", name, "Please enter your name."],
      ["message", message, "Please tell me a little about your idea."],
    ]) {
      const field = event.currentTarget.elements.namedItem(fieldName);
      if (!value && (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) {
        field.setCustomValidity(prompt);
        field.reportValidity();
        return;
      }
    }
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      ...(phone ? [`Phone: ${phone}`] : []),
      `Reason: ${reason}`,
      "",
      message,
    ].join("\n");

    setDraft(body);
    setStatus("Your email draft is ready. Send it from your email app, or copy the message below.");
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(`${reason} — ${name}`)}&body=${encodeURIComponent(body)}`;
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft);
      setStatus(`Message copied. You can email it to ${contactEmail}.`);
    } catch {
      setStatus("You can select and copy your message below.");
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
          <h2 id="contact-heading" className="contact-heading" aria-label="Open the door">
            <span aria-hidden="true">
              SEND ME A MESSAGE
            </span>
          </h2>
          <p className="contact-direct">
            <span>Or just write:</span>
            <a className="hover-wave" href={`mailto:${contactEmail}`}>
              <HoverWaveText text={contactEmail} />
            </a>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="contact-fields">
              <div className="contact-field">
                <label htmlFor="contact-name">NAME</label>
                <input id="contact-name" name="name" autoComplete="name" placeholder="Your full name" maxLength={120} onInput={(event) => event.currentTarget.setCustomValidity("")} required />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-email">EMAIL</label>
                <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="name@company.com" maxLength={254} required />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-phone">PHONE <span className="sr-only">(optional)</span></label>
                <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="+55" maxLength={40} />
              </div>
              <div className="contact-field contact-select">
                <label htmlFor="contact-reason">REASON</label>
                <select id="contact-reason" name="reason" defaultValue="Freelance project">
                  <option>Freelance project</option>
                  <option>Just saying hi</option>
                </select>
                <ChevronDown aria-hidden="true" size={15} strokeWidth={1.5} />
              </div>
              <div className="contact-field contact-message">
                <label htmlFor="contact-message">MESSAGE</label>
                <textarea id="contact-message" name="message" placeholder="A few words about your idea" rows={1} maxLength={2000} onInput={(event) => event.currentTarget.setCustomValidity("")} required />
              </div>
            </div>

            <div className="contact-submit-row">
              <button type="submit" className="contact-submit hover-wave" aria-describedby="contact-send-note">
                <HoverWaveText text="Send Details" />
                <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
              </button>
              <p id="contact-send-note">Your email app opens with the details ready to send.</p>
            </div>
            <p className="contact-privacy">
              A direct conversation, from your inbox to mine —{" "}
              <button type="button" onClick={onPrivacyClick}>privacy policy</button>
            </p>

            <div role="status" aria-live="polite" className="contact-status">{status}</div>
            {draft && (
              <div className="contact-draft">
                <button type="button" onClick={copyDraft} className="hover-wave">
                  <HoverWaveText text="Copy message" />
                  <Copy aria-hidden="true" size={14} />
                </button>
                <details>
                  <summary>View your message</summary>
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
