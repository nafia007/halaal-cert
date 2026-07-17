"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

export function QrCode({
  value,
  size = 200,
}: {
  value: string;
  size?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    QRCode.toCanvas(ref.current, value, {
      width: size,
      margin: 1,
      color: { dark: "#16140f", light: "#faf9f6" },
    }).catch(() => {});
  }, [value, size]);

  return (
    <canvas
      ref={ref}
      width={size}
      height={size}
      className="rounded-lg"
      aria-label={`QR code for ${value}`}
    />
  );
}

export async function downloadQr(
  value: string,
  filename = "halaal-certificate-qr.png"
) {
  const url = await QRCode.toDataURL(value, {
    margin: 1,
    color: { dark: "#16140f", light: "#faf9f6" },
  });
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
