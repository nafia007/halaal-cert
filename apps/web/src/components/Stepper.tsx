"use client";

interface Step {
  label: string;
}

export function Stepper({
  steps,
  current,
}: {
  steps: Step[];
  current: number;
}) {
  return (
    <ol className="flex w-full items-center gap-2">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={step.label} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                active
                  ? "bg-ink text-paper"
                  : done
                  ? "bg-moss text-paper"
                  : "bg-ink/10 text-sable"
              }`}
            >
              {done ? "✓" : i + 1}
            </span>
            <span
              className={`hidden text-xs font-medium sm:block ${
                active ? "text-ink" : "text-sable"
              }`}
            >
              {step.label}
            </span>
            {i < steps.length - 1 && (
              <span className="hairline mx-1 hidden flex-1 sm:block" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
