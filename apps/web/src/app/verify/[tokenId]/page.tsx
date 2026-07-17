"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { verifyCertificate } from "@/lib/api";
import type { Certificate } from "@/lib/types";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { StatusBadge } from "@/components/StatusBadge";
import { QrCode, downloadQr } from "@/components/QrCode";

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "done"; data: Certificate };

function Skeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 w-40 rounded bg-ink/10" />
      <div className="h-40 rounded-2xl bg-ink/10" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-16 rounded-xl bg-ink/10" />
        <div className="h-16 rounded-xl bg-ink/10" />
      </div>
    </div>
  );
}

export default function VerifyTokenPage() {
  const params = useParams<{ tokenId: string }>();
  const tokenId = params?.tokenId ?? "";
  const [state, setState] = useState<State>({ status: "idle" });
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(`${window.location.origin}/verify/${tokenId}`);
  }, [tokenId]);

  useEffect(() => {
    if (!tokenId) {
      setState({ status: "idle" });
      return;
    }
    let active = true;
    setState({ status: "loading" });
    verifyCertificate(tokenId)
      .then((data) => {
        if (active) setState({ status: "done", data });
      })
      .catch((e: Error) => {
        if (active)
          setState({
            status: "error",
            message: e.message || "Certificate not found",
          });
      });
    return () => {
      active = false;
    };
  }, [tokenId]);

  return (
    <div className="container-page py-12">
      <div className="mb-8">
        <span className="eyebrow">Certificate lookup</span>
        <h1 className="mt-2 font-serif text-3xl font-semibold">
          Verify a Halaal certificate
        </h1>
        <p className="mt-2 text-ink/60">
          Token ID: <code className="rounded bg-ink/5 px-2 py-1">{tokenId || "—"}</code>
        </p>
      </div>

      {state.status === "idle" && (
        <Card>
          <p className="text-ink/60">
            Enter a token ID in the address bar, or{" "}
            <Link href="/verify" className="text-moss underline">
              use the verify page
            </Link>
            .
          </p>
        </Card>
      )}

      {state.status === "loading" && <Skeleton />}

      {state.status === "error" && (
        <Card className="border-rust/30">
          <p className="font-semibold text-rust">Certificate not found</p>
          <p className="mt-2 text-sm text-ink/60">{state.message}</p>
          <p className="mt-4 text-sm text-ink/60">
            Double-check the token ID, or contact the issuing body.
          </p>
        </Card>
      )}

      {state.status === "done" && (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-serif text-2xl font-semibold">
                  {state.data.businessName}
                </p>
                <p className="text-sm text-ink/60">Issued by {state.data.issuer}</p>
              </div>
              <StatusBadge status={state.data.status} />
            </div>

            <div className="hairline my-5" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="eyebrow">Scope</p>
                <p className="mt-1 text-sm">{state.data.scope}</p>
              </div>
              <div>
                <p className="eyebrow">Issued</p>
                <p className="mt-1 text-sm">
                  {new Date(state.data.issuedAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="eyebrow">Expires</p>
                <p className="mt-1 text-sm">
                  {new Date(state.data.expiresAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="eyebrow">Token ID</p>
                <p className="mt-1 text-sm">#{state.data.tokenId}</p>
              </div>
            </div>

            <div className="hairline my-5" />

            <p className="eyebrow">Audit trail</p>
            <ul className="mt-3 space-y-2">
              {state.data.auditTrail.map((e, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="dot mt-1.5 bg-moss" />
                  <span>
                    <span className="font-medium">{e.action}</span> · {e.actor} ·{" "}
                    {new Date(e.date).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>

            <div className="hairline my-5" />

            <p className="eyebrow">External links</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href={`https://ipfs.io/ipfs/${state.data.ipfsCid}`}
                target="_blank"
                rel="noreferrer"
                className="btn border border-ink/20 hover:bg-ink/5"
              >
                View on IPFS
              </a>
              <a
                href={`https://polygonscan.com/token/${state.data.tokenId}?a=${state.data.tokenId}`}
                target="_blank"
                rel="noreferrer"
                className="btn border border-ink/20 hover:bg-ink/5"
              >
                View on PolygonScan
              </a>
            </div>
          </Card>

          <Card className="flex flex-col items-center">
            <p className="eyebrow self-start">Scan to verify</p>
            <div className="my-4">
              {url && <QrCode value={url} size={220} />}
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => downloadQr(url)}
              disabled={!url}
            >
              Download QR
            </Button>
            <p className="mt-3 text-center text-xs text-sable">
              Encodes the verification URL for this certificate.
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}
