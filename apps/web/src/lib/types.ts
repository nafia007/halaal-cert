export type CertificateStatus = "VALID" | "EXPIRED" | "REVOKED" | "PENDING";

export interface AuditTrailEntry {
  date: string;
  action: string;
  actor: string;
}

export interface Certificate {
  tokenId: string;
  businessName: string;
  status: CertificateStatus;
  issuer: string;
  issuedAt: string;
  expiresAt: string;
  scope: string;
  ipfsCid: string;
  tokenUri: string;
  txHash: string;
  auditTrail: AuditTrailEntry[];
}

export type ApplicationStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "MINTED"
  | "REJECTED";

export interface Application {
  id: string;
  businessName: string;
  scope: string;
  contactName: string;
  contactEmail: string;
  status: ApplicationStatus;
  submittedAt: string;
  tokenId?: string;
}

export interface NewApplication {
  businessName: string;
  scope: string;
  contactName: string;
  contactEmail: string;
}
