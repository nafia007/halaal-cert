"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const BACKGROUNDS = [
  "https://skiy9cizul.ufs.sh/f/kOxGBlH1ZBglWfCSMO9Juv5DnMhVU8tBT3QGAfj9mWzkEy4S",
  "https://skiy9cizul.ufs.sh/f/kOxGBlH1ZBglSBtOB1xLtAIc9i3WGmnyUHPDu61QXf75VYTk",
  "https://skiy9cizul.ufs.sh/f/kOxGBlH1ZBglZmRvqLJUx0DY86sBwNeb9LSyjniOGoFQk5RE",
  "https://skiy9cizul.ufs.sh/f/kOxGBlH1ZBglxM1LKh8RlcprI79XCgOLZuHxQe6DP4J3o2ij",
  "https://skiy9cizul.ufs.sh/f/kOxGBlH1ZBglr1FU0Ep9ougVNXT8S7PfUDldLhM1R4Fwexib",
  "https://skiy9cizul.ufs.sh/f/kOxGBlH1ZBglsLHwOoaYXiIhajsuc6vKLxNwZeW8o9dpn7gS",
];

interface Overlay {
  zone: string;
  range: [number, number];
  node: React.ReactNode;
}

const Section = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`glass p-6 sm:p-8 ${className}`}>{children}</div>
);

function Hero() {
  return (
    <Section className="max-w-xl">
      <span className="eyebrow">Polygon · ERC-721</span>
      <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
        Every Halaal certificate, anchored on-chain.
      </h1>
      <p className="mt-4 max-w-md text-base text-ink/70">
        Tamper-proof certificates issued as Polygon NFTs. Verify any badge by
        token ID or QR scan in seconds.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href="/verify" className="btn bg-ink text-paper hover:bg-ink/90">
          Verify a certificate
        </a>
        <a href="/apply" className="btn border border-ink/20 hover:bg-ink/5">
          Apply as a body
        </a>
      </div>
    </Section>
  );
}

function Stats() {
  const items = [
    { v: "< $0.01", l: "per mint" },
    { v: "2s", l: "finality" },
    { v: "300+", l: "bodies" },
  ];
  return (
    <Section className="w-72">
      <span className="eyebrow">By the numbers</span>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {items.map((i) => (
          <div key={i.l}>
            <p className="font-serif text-2xl font-semibold text-moss">
              {i.v}
            </p>
            <p className="text-xs text-sable">{i.l}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function SampleCertificate() {
  return (
    <Section className="w-80">
      <div className="flex items-center justify-between">
        <span className="eyebrow">Sample certificate</span>
        <span className="inline-flex items-center gap-2 rounded-full bg-moss/10 px-3 py-1 text-xs font-semibold text-moss">
          <span className="dot bg-moss" /> VALID
        </span>
      </div>
      <p className="mt-3 font-serif text-xl font-semibold">Al-Baraka Foods</p>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
        <div className="h-full w-[90%] rounded-full bg-moss" />
      </div>
      <p className="mt-2 text-xs text-sable">364 days remaining</p>
      <p className="mt-3 text-xs text-ink/60">
        Audit trail: issued → inspected → verified on Polygon.
      </p>
    </Section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Issue on-chain", d: "Mint a tamper-proof ERC-721 badge." },
    { n: "02", t: "Inspect & audit", d: "Track the full audit trail." },
    { n: "03", t: "Verify in seconds", d: "Scan or search any token ID." },
  ];
  return (
    <Section className="max-w-md">
      <span className="eyebrow">How it works</span>
      <ul className="mt-4 space-y-4">
        {steps.map((s) => (
          <li key={s.n} className="flex gap-4">
            <span className="font-serif text-lg font-semibold text-moss">
              {s.n}
            </span>
            <div>
              <p className="font-semibold">{s.t}</p>
              <p className="text-sm text-ink/60">{s.d}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function CtaFooter() {
  return (
    <Section className="max-w-xl text-center">
      <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
        Make every certificate impossible to forge.
      </h2>
      <div className="mt-5 flex justify-center">
        <a href="/apply" className="btn bg-moss text-paper hover:bg-moss/90">
          Get certified
        </a>
      </div>
    </Section>
  );
}

function SecondaryBlock() {
  return (
    <Section className="w-72">
      <span className="eyebrow">Trust layer</span>
      <p className="mt-3 font-serif text-xl font-semibold">
        The trust layer for every Halaal body.
      </p>
      <p className="mt-2 text-sm text-ink/60">
        One verifiable standard, shared across the Ummah.
      </p>
    </Section>
  );
}

const OVERLAYS: Overlay[] = [
  { zone: "left-center", range: [0, 0.22], node: <Hero /> },
  { zone: "right-bottom", range: [0.2, 0.45], node: <Stats /> },
  { zone: "right-top", range: [0.4, 0.65], node: <SampleCertificate /> },
  { zone: "left-center", range: [0.6, 0.85], node: <HowItWorks /> },
  { zone: "bottom-center", range: [0.82, 1], node: <CtaFooter /> },
  { zone: "top-left", range: [0.82, 1], node: <SecondaryBlock /> },
];

const zoneClass: Record<string, string> = {
  "left-center": "left-5 top-1/2 -translate-y-1/2 sm:left-12",
  "right-bottom": "right-5 bottom-10 sm:right-12",
  "right-top": "right-5 top-24 sm:right-12",
  "bottom-center": "left-1/2 bottom-10 -translate-x-1/2",
  "top-left": "left-5 top-24 sm:left-12",
};

function BgLayer({
  progress,
  src,
  index,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  src: string;
  index: number;
}) {
  const segment = 1 / BACKGROUNDS.length;
  const start = index * segment;
  const end = (index + 1) * segment;
  const opacity = useTransform(
    progress,
    [start - 0.06, start, end - 0.06, end],
    [0, 1, 1, 0]
  );
  const scale = useTransform(progress, [start, end], [1.08, 1]);
  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 bg-cover bg-center"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover"
        loading={index === 0 ? "eager" : "lazy"}
      />
    </motion.div>
  );
}

function OverlayLayer({
  progress,
  overlay,
  index,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  overlay: Overlay;
  index: number;
}) {
  const [start, end] = overlay.range;
  const opacity = useTransform(
    progress,
    [start, start + 0.06, end - 0.06, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [start, end], [24, -24]);
  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute z-10 ${zoneClass[overlay.zone]}`}
    >
      {overlay.node}
    </motion.div>
  );
}

export function ScrollWorld() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className="relative h-[600vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
        {BACKGROUNDS.map((src, i) => (
          <BgLayer
            key={src}
            progress={scrollYProgress}
            src={src}
            index={i}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/50" />

        {OVERLAYS.map((o, i) => (
          <OverlayLayer
            key={i}
            progress={scrollYProgress}
            overlay={o}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
