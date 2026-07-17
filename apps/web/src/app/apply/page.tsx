"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Stepper } from "@/components/Stepper";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { createApplication } from "@/lib/api";
import type { NewApplication } from "@/lib/types";

const STEPS = [
  { label: "Business" },
  { label: "Scope" },
  { label: "Contact" },
  { label: "Review" },
];

interface FormState extends NewApplication {
  businessType: string;
  address: string;
  productCategories: string;
  website: string;
  phone: string;
}

const initial: FormState = {
  businessName: "",
  businessType: "",
  address: "",
  scope: "",
  productCategories: "",
  website: "",
  contactName: "",
  contactEmail: "",
  phone: "",
};

function Field({
  label,
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow">
        {label} {required && <span className="text-rust">*</span>}
      </span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-ink/15 bg-paper px-4 py-2.5 text-sm outline-none focus:border-moss"
      />
    </label>
  );
}

export default function ApplyPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof FormState) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const canAdvance =
    (step === 0 && form.businessName && form.businessType) ||
    (step === 1 && form.scope) ||
    (step === 2 && form.contactName && form.contactEmail) ||
    step === 3;

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const { referenceId } = await createApplication({
        businessName: form.businessName,
        scope: form.scope,
        contactName: form.contactName,
        contactEmail: form.contactEmail,
      });
      setReferenceId(referenceId);
    } catch (e) {
      setError((e as Error).message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (referenceId) {
    return (
      <div className="container-page py-16">
        <Card className="mx-auto max-w-lg text-center">
          <span className="eyebrow">Application received</span>
          <h1 className="mt-3 font-serif text-3xl font-semibold">
            You&apos;re in the queue.
          </h1>
          <p className="mt-3 text-ink/60">
            Keep this reference ID to track your application.
          </p>
          <p className="mt-5 inline-block rounded-xl bg-ink px-5 py-3 font-mono text-lg text-paper">
            {referenceId}
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      <div className="mb-8 max-w-2xl">
        <span className="eyebrow">Certification application</span>
        <h1 className="mt-2 font-serif text-3xl font-semibold">
          Apply as a certifying body
        </h1>
      </div>

      <Card className="mx-auto max-w-2xl">
        <Stepper steps={STEPS} current={step} />

        <motion.div
          key={step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8 space-y-5"
        >
          {step === 0 && (
            <>
              <Field
                label="Business name"
                required
                value={form.businessName}
                onChange={set("businessName")}
                placeholder="Al-Baraka Foods"
              />
              <Field
                label="Business type"
                required
                value={form.businessType}
                onChange={set("businessType")}
                placeholder="Slaughterhouse, Restaurant, Producer…"
              />
              <Field
                label="Registered address"
                value={form.address}
                onChange={set("address")}
                placeholder="123 Market St, Cape Town"
              />
            </>
          )}

          {step === 1 && (
            <>
              <Field
                label="Scope of certification"
                required
                value={form.scope}
                onChange={set("scope")}
                placeholder="Halal meat processing & distribution"
              />
              <Field
                label="Product categories"
                value={form.productCategories}
                onChange={set("productCategories")}
                placeholder="Beef, poultry, prepared meals"
              />
              <Field
                label="Website"
                value={form.website}
                onChange={set("website")}
                placeholder="https://example.com"
              />
            </>
          )}

          {step === 2 && (
            <>
              <Field
                label="Contact name"
                required
                value={form.contactName}
                onChange={set("contactName")}
                placeholder="Fatima Khan"
              />
              <Field
                label="Contact email"
                required
                value={form.contactEmail}
                onChange={set("contactEmail")}
                placeholder="fatima@albarka.co.za"
              />
              <Field
                label="Phone"
                value={form.phone}
                onChange={set("phone")}
                placeholder="+27 21 000 0000"
              />
            </>
          )}

          {step === 3 && (
            <div className="space-y-3 text-sm">
              <p className="eyebrow">Review your application</p>
              <dl className="grid grid-cols-2 gap-y-3">
                {(
                  [
                    ["Business", form.businessName],
                    ["Type", form.businessType],
                    ["Address", form.address],
                    ["Scope", form.scope],
                    ["Categories", form.productCategories],
                    ["Website", form.website],
                    ["Contact", form.contactName],
                    ["Email", form.contactEmail],
                    ["Phone", form.phone],
                  ] as [string, string][]
                ).map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-sable">{k}</dt>
                    <dd className="font-medium">{v || "—"}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </motion.div>

        {error && (
          <p className="mt-5 rounded-lg bg-rust/10 px-4 py-2 text-sm text-rust">
            {error}
          </p>
        )}

        <div className="mt-8 flex items-center justify-between">
          <Button variant="ghost" onClick={prev} disabled={step === 0}>
            Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={next} disabled={!canAdvance}>
              Continue
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={submit}
              disabled={submitting}
            >
              {submitting ? "Submitting…" : "Submit application"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
