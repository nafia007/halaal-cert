import { CertificateStatus } from "@/lib/types";

const map: Record<
  CertificateStatus,
  { label: string; dot: string; bg: string; text: string }
> = {
  VALID: {
    label: "Valid",
    dot: "bg-moss",
    bg: "bg-moss/10",
    text: "text-moss",
  },
  EXPIRED: {
    label: "Expired",
    dot: "bg-sable",
    bg: "bg-sable/10",
    text: "text-sable",
  },
  REVOKED: {
    label: "Revoked",
    dot: "bg-rust",
    bg: "bg-rust/10",
    text: "text-rust",
  },
  PENDING: {
    label: "Pending",
    dot: "bg-clay",
    bg: "bg-clay/10",
    text: "text-clay",
  },
};

export function StatusBadge({ status }: { status: CertificateStatus }) {
  const s = map[status];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${s.bg} ${s.text}`}
    >
      <span className={`dot ${s.dot}`} />
      {s.label}
    </span>
  );
}
