import { API_BASE, API_KEY } from "./config";
import type {
  Application,
  Certificate,
  NewApplication,
} from "./types";

async function request<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(message || `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function verifyCertificate(
  tokenId: string
): Promise<Certificate> {
  return request<Certificate>(`/api/verify/${encodeURIComponent(tokenId)}`);
}

export async function listApplications(): Promise<Application[]> {
  return request<Application[]>("/api/applications", {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
}

export async function updateApplicationStatus(
  id: string,
  status: Application["status"]
): Promise<Application> {
  return request<Application>(`/api/applications/${encodeURIComponent(id)}/status`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({ status }),
  });
}

export async function createApplication(
  data: NewApplication
): Promise<{ referenceId: string }> {
  return request<{ referenceId: string }>("/api/applications", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function mintCertificate(
  applicationId: string
): Promise<{ tokenId: string; txHash: string }> {
  return request<{ tokenId: string; txHash: string }>(
    "/api/certificates/mint",
    {
      method: "POST",
      headers: { Authorization: `Bearer ${API_KEY}` },
      body: JSON.stringify({ applicationId }),
    }
  );
}
