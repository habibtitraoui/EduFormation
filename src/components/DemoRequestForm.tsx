import { useId, useState, type FormEvent } from "react";

import { contact } from "../lib/config";
import { fillTemplate } from "../lib/format";
import { useLocale } from "../lib/locale";

import { Alert, Button, Field, fieldErrorId, Input, Spinner } from "./ui";

type Values = { name: string; email: string; company: string };
type Errors = Partial<Record<keyof Values, boolean>>;
type Submission = "idle" | "submitting" | "success" | "error";

const EMPTY: Values = { name: "", email: "", company: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** The form exists only when the owner has provided a real POST endpoint. */
export function DemoRequestForm() {
  const { t } = useLocale();
  const id = useId();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submission, setSubmission] = useState<Submission>("idle");
  const [sentTo, setSentTo] = useState("");
  const submitting = submission === "submitting";

  if (!contact.hasForm) return null;

  function update(key: keyof Values, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const clean: Values = {
      name: values.name.trim(),
      email: values.email.trim(),
      company: values.company.trim(),
    };
    const nextErrors: Errors = {};
    if (!clean.name) nextErrors.name = true;
    if (!EMAIL_PATTERN.test(clean.email)) nextErrors.email = true;
    if (!clean.company) nextErrors.company = true;
    setErrors(nextErrors);

    const firstError = (Object.keys(nextErrors) as (keyof Values)[])[0];
    if (firstError !== undefined) {
      setSubmission("idle");
      // Let React attach the error descriptions before focusing the first field.
      requestAnimationFrame(() => document.getElementById(`${id}-${firstError}`)?.focus());
      return;
    }
    if (contact.endpoint === null || submitting) return;

    setSubmission("submitting");
    try {
      const response = await fetch(contact.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clean),
      });
      if (!response.ok) throw new Error("Demo request failed");
      setSentTo(clean.email);
      setSubmission("success");
      setValues(EMPTY);
    } catch {
      setSubmission("error");
    }
  }

  const errorMessage = contact.email === null
    ? t.form.errorNoEmail
    : fillTemplate(t.form.error, { email: contact.email });

  return (
    <div id="demo" tabIndex={-1} className="js-only scroll-mt-18 border-t border-line pt-8">
      {submission === "success" ? (
        <Alert tone="success">{fillTemplate(t.form.success, { email: sentTo })}</Alert>
      ) : (
        <form noValidate onSubmit={(event) => { void submit(event); }}>
          <div className="grid gap-4 md:grid-cols-3">
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
            <Field label={t.form.company} htmlFor={`${id}-company`} error={errors.company ? t.form.errorCompany : undefined}>
              <Input id={`${id}-company`} name="company" autoComplete="organization" required value={values.company}
                onChange={(event) => update("company", event.target.value)} disabled={submitting}
                invalid={Boolean(errors.company)} aria-invalid={Boolean(errors.company)}
                aria-describedby={errors.company ? fieldErrorId(`${id}-company`) : undefined} />
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
