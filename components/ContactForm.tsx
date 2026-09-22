"use client";

import { useRef, useState, type FormEvent } from "react";
import styles from "./ContactForm.module.css";
import { Mascot } from "./Mascot";

type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Render order of the required fields, for deciding which invalid field gets focus. */
const FIELD_ORDER = ["school", "district", "name", "email"] as const;

function validate(data: FormData): FieldErrors {
  const errors: FieldErrors = {};

  const school = String(data.get("school") ?? "").trim();
  if (!school) errors.school = "Tell us the school's name.";

  const district = String(data.get("district") ?? "").trim();
  if (!district) errors.district = "District and state are required.";

  const name = String(data.get("name") ?? "").trim();
  if (!name) errors.name = "Your name is required.";

  const email = String(data.get("email") ?? "").trim();
  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) errors.email = "That doesn't look like a valid email.";

  return errors;
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors = validate(data);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidField = FIELD_ORDER.find((field) => nextErrors[field]);
      if (firstInvalidField) {
        const el = event.currentTarget.elements.namedItem(firstInvalidField);
        if (el instanceof HTMLElement) el.focus();
      }
      return;
    }

    // TODO: POST `data` to the pilot-request endpoint once it exists.
    // For now this is client-side only, per the working agreement.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={styles.ok}>
        <Mascot pose="hello" size={58} title="Avai" />
        <p>
          <strong>Request received.</strong> We will be in touch within two working days —
          usually sooner.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      <div className={styles.form}>
        <Field id="school" label="School name" error={errors.school}>
          <input
            id="school"
            name="school"
            aria-invalid={Boolean(errors.school)}
            aria-describedby={errors.school ? "school-error" : undefined}
          />
        </Field>

        <div className={styles.fld}>
          <label htmlFor="board">Board</label>
          <select id="board" name="board" defaultValue="CBSE">
            <option>CBSE</option>
            <option>State board — Tamil Nadu</option>
            <option>ICSE</option>
            <option>Other</option>
          </select>
        </div>

        <Field id="district" label="District and state" error={errors.district}>
          <input
            id="district"
            name="district"
            placeholder="Krishnagiri, Tamil Nadu"
            aria-invalid={Boolean(errors.district)}
            aria-describedby={errors.district ? "district-error" : undefined}
          />
        </Field>

        <div className={styles.fld}>
          <label htmlFor="role">Your role</label>
          <select id="role" name="role" defaultValue="Principal">
            <option>Principal</option>
            <option>Correspondent or trustee</option>
            <option>Academic coordinator</option>
            <option>Head of department</option>
            <option>Other</option>
          </select>
        </div>

        <Field id="name" label="Your name" error={errors.name}>
          <input
            id="name"
            name="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </Field>

        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </Field>

        <div className={styles.fld}>
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" />
        </div>

        <div className={styles.fld}>
          <label htmlFor="grades">Grades you want analysed</label>
          <select id="grades" name="grades" defaultValue="Class X only">
            <option>Class X only</option>
            <option>Class XII only</option>
            <option>Classes X and XII</option>
            <option>Other</option>
          </select>
        </div>

        <div className={`${styles.fld} ${styles.full}`}>
          <label htmlFor="size">Students per grade</label>
          <input id="size" name="size" placeholder="e.g. 240 in Class X, 186 in Class XII" />
        </div>

        <div className={`${styles.fld} ${styles.full}`}>
          <label htmlFor="msg">Anything we should know</label>
          <textarea
            id="msg"
            name="msg"
            placeholder="Your exam calendar this term, what you have already tried, what you are hoping to find out."
          />
        </div>

        <div className={`${styles.fld} ${styles.full} ${styles.submitRow}`}>
          <button className="btn btn-primary" type="submit">
            Send request
          </button>
          <p className="small">
            We reply within two working days. Nothing is shared with anyone outside INAT Venture.
          </p>
        </div>
      </div>
    </form>
  );
}

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
};

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className={`${styles.fld} ${error ? styles.invalid : ""}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? (
        <span className={styles.error} id={`${id}-error`} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
