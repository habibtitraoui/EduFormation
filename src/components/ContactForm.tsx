import { useId, useState, type FormEvent } from "react";

import { contact, contactMailto } from "../lib/config";
import { fillTemplate } from "../lib/format";
import { useLocale } from "../lib/locale";

import { Alert, Button, Field, fieldErrorId, Input, Spinner, Textarea } from "./ui";

type Values = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Values, boolean>>;
type Submission = "idle" | "submitting" | "success" | "error";

const EMPTY: Values = { name: "", email: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Contact inquiries use the configured endpoint or a prefilled email fallback. */
export function ContactForm() {
  const { t } = useLocale();
  const id = useId();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submission, setSubmission] = useState<Submission>("idle");
  const [sentTo, setSentTo] = useState("");
  const submitting = submission === "submitting";

  function update(key: keyof Values, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const clean: Values = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    };
    const nextErrors: Errors = {};
    if (!clean.name) nextErrors.name = true;
    if (!EMAIL_PATTERN.test(clean.email)) nextErrors.email = true;
    if (!clean.message) nextErrors.message = true;
    setErrors(nextErrors);

    const firstError = (Object.keys(nextErrors) as (keyof Values)[])[0];
    if (firstError !== undefined) {
      setSubmission("idle");
      // Let React attach the error descriptions before focusing the first field.
      requestAnimationFrame(() => document.getElementById(`${id}-${firstError}`)?.focus());
      return;
    }
    if (submitting) return;

    setSubmission("submitting");
    // Until a form service is connected, the validated message opens in the
    // visitor's mail client and is addressed directly to the owner.
    if (contact.endpoint === null) {
      const subject = t.contact.mailtoSubject;
      const body = `${t.contact.mailtoBody}\n\n${t.form.name}: ${clean.name}\n${t.form.email}: ${clean.email}\n\n${clean.message}`;
      window.location.href = contactMailto(subject, body);
      setSubmission("success");
      setValues(EMPTY);
      return;
    }
    try {
      const response = await fetch(contact.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clean),
      });
      if (!response.ok) throw new Error("Contact form submission failed");
      setSentTo(clean.email);
      setSubmission("success");
      setValues(EMPTY);
    } catch {
      setSubmission("error");
    }
  }

  const errorMessage = fillTemplate(t.form.error, { email: contact.email });
  const successMessage = contact.endpoint === null
    ? fillTemplate(t.form.mailtoOpened, { email: contact.email })
    : fillTemplate(t.form.success, { email: sentTo });

  return (
    <div id="contact-form" tabIndex={-1} className="js-only scroll-mt-18 border-t border-line pt-8">
      {submission === "success" ? (
        <Alert tone={contact.endpoint === null ? "info" : "success"}>{successMessage}</Alert>
      ) : (
        <form noValidate onSubmit={(event) => { void submit(event); }}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label={t.form.name} htmlFor={`${id}-name`} error={errors.name ? t.form.errorName : undefined}>
              <Input id={`${id}-name`} name="name" autoComplete="name" required value={values.name}
                onChange={(event) => update("name", event.target.value)} disabled={submitting}
                invalid={Boolean(errors.name)} aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? fieldErrorId(`${id}-name`) : undefined} />
            </Field>
            <Field label={t.form.email} htmlFor={`${id}-email`} error={errors.email ? t.form.errorEmail : undefined}>
              <Input id={`${id}-email`} name="email" type="email" autoComplete="email" required value={values.email}
                onChange={(event) => update("email", event.target.value)} disabled={submitting}
                invalid={Boolean(errors.email)} aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? fieldErrorId(`${id}-email`) : undefined} />
            </Field>
            <Field label={t.form.message} htmlFor={`${id}-message`} error={errors.message ? t.form.errorMessage : undefined} className="md:col-span-2">
              <Textarea id={`${id}-message`} name="message" required value={values.message} rows={5}
                onChange={(event) => update("message", event.target.value)} disabled={submitting}
                invalid={Boolean(errors.message)} aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? fieldErrorId(`${id}-message`) : undefined} />
            </Field>
          </div>
          {submission === "error" ? <Alert tone="danger" className="mt-4">{errorMessage}</Alert> : null}
          <Button type="submit" size="lg" disabled={submitting} className="relative mt-5 min-w-40">
            <span aria-hidden="true" className="invisible">{t.form.submit}</span>
            <span className="absolute flex items-center gap-2">
              {submitting ? <><Spinner />{t.form.submitting}</> : t.form.submit}
            </span>
          </Button>
        </form>
      )}
    </div>
  );
}
