"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  listApplications,
  mintCertificate,
  updateApplicationStatus,
} from "@/lib/api";
import type { Application, ApplicationStatus } from "@/lib/types";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

const statusStyle: Record<ApplicationStatus, string> = {
  SUBMITTED: "bg-clay/10 text-clay",
  UNDER_REVIEW: "bg-clay/10 text-clay",
  APPROVED: "bg-moss/10 text-moss",
  MINTED: "bg-ink/10 text-ink",
  REJECTED: "bg-rust/10 text-rust",
};

function ConfirmModal({
  application,
  onConfirm,
  onCancel,
  busy,
}: {
  application: Application;
  onConfirm: () => void;
  onCancel: () => void;
  busy: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass max-w-sm p-6"
      >
        <h3 className="font-serif text-xl font-semibold">Approve &amp; mint?</h3>
        <p className="mt-2 text-sm text-ink/70">
          This will mark <strong>{application.businessName}</strong> as approved
          and mint a Polygon certificate. This action is on-chain.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={onConfirm} disabled={busy}>
            {busy ? "Minting…" : "Confirm mint"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<Application | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      setApps(await listApplications());
    } catch (e) {
      setError((e as Error).message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function approve(id: string) {
    setBusyId(id);
    try {
      await updateApplicationStatus(id, "APPROVED");
      setApps((a) =>
        a.map((x) => (x.id === id ? { ...x, status: "APPROVED" } : x))
      );
    } catch (e) {
      setError((e as Error).message || "Failed to approve");
    } finally {
      setBusyId(null);
    }
  }

  async function doMint(app: Application) {
    setBusyId(app.id);
    try {
      const { tokenId } = await mintCertificate(app.id);
      await updateApplicationStatus(app.id, "MINTED");
      setApps((a) =>
        a.map((x) => (x.id === app.id ? { ...x, status: "MINTED", tokenId } : x))
      );
      setPending(null);
    } catch (e) {
      setError((e as Error).message || "Failed to mint");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="container-page py-12">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <span className="eyebrow">Certifying body · Admin</span>
          <h1 className="mt-2 font-serif text-3xl font-semibold">
            Applications
          </h1>
        </div>
        <Button variant="ghost" onClick={load} disabled={loading}>
          Refresh
        </Button>
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-rust/10 px-4 py-2 text-sm text-rust">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-sable">Loading applications…</p>
      ) : apps.length === 0 ? (
        <Card>No applications yet.</Card>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-sable">
                <th className="py-3 pr-4">Business</th>
                <th className="py-3 pr-4">Scope</th>
                <th className="py-3 pr-4">Submitted</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Token</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((a) => (
                <tr key={a.id} className="border-t border-ink/10">
                  <td className="py-4 pr-4 font-medium">{a.businessName}</td>
                  <td className="py-4 pr-4 text-ink/70">{a.scope}</td>
                  <td className="py-4 pr-4 text-ink/70">
                    {new Date(a.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 pr-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[a.status]}`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="py-4 pr-4 font-mono text-xs">
                    {a.tokenId ? `#${a.tokenId}` : "—"}
                  </td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      {a.status !== "APPROVED" && a.status !== "MINTED" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={busyId === a.id}
                          onClick={() => approve(a.id)}
                        >
                          Approve
                        </Button>
                      )}
                      {a.status === "APPROVED" && (
                        <Button
                          size="sm"
                          variant="secondary"
                          disabled={busyId === a.id}
                          onClick={() => setPending(a)}
                        >
                          Mint
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {pending && (
          <ConfirmModal
            application={pending}
            busy={busyId === pending.id}
            onCancel={() => setPending(null)}
            onConfirm={() => doMint(pending)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
