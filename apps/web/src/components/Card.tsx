import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export function Card({
  glass = false,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-ink/10 bg-paper p-6 shadow-sm ${
        glass ? "glass" : ""
      } ${className}`}
      {...props}
    />
  );
}
