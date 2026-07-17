# Halaal — On-chain certificate verification

Public-facing web app for verifying tamper-proof Halaal certificates issued as
Polygon NFTs. Built with **Next.js 14 (App Router)**, **Tailwind CSS**,
**Framer Motion**, and `qrcode`.

## Monorepo layout

```
.
├── apps/web              # Next.js app (Vercel root directory)
├── package.json         # workspace + scripts
└── vercel.json         # Vercel deploy config
```

## Develop

```bash
npm install
npm run dev          # apps/web on :3000
```

Set `apps/web/.env.local` from `.env.local.example`:

```
NEXT_PUBLIC_API_BASE=http://localhost:3001
NEXT_PUBLIC_API_KEY=
```

## Vercel deployment

Configured in `vercel.json` and also usable via the dashboard:

| Setting          | Value            |
| ---------------- | ---------------- |
| Root directory   | `apps/web`       |
| Build command    | `npm run build`  |
| Install command  | `npm install`    |
| Output directory | `.next`          |
| Framework        | `nextjs`         |

API surface consumed by the client lives in `src/lib/api.ts` and points at
`NEXT_PUBLIC_API_BASE` (default `http://localhost:3001`):

- `GET  /api/verify/:tokenId`
- `GET  /api/applications`            (Bearer)
- `PATCH /api/applications/:id/status`
- `POST /api/applications`
- `POST /api/certificates/mint`        (Bearer)

## Routes

- `/` — ScrollWorld animated landing (3D scroll experience)
- `/verify/[tokenId]` — live certificate lookup, status, QR, IPFS/Polygon links
- `/apply` — 4-step application wizard
- `/admin/applications` — approve → mint flow with confirmation modal
- `/sign-in`, `/sign-up` — placeholders (auth disabled)
