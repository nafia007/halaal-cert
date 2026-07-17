import Link from "next/link";

const links = [
  { href: "/verify", label: "Verify" },
  { href: "/apply", label: "Apply" },
  { href: "/admin/applications", label: "Admin" },
];

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/80 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="font-serif text-xl font-semibold tracking-tight">
          Halaal<span className="text-moss">.</span>
        </Link>
        <ul className="flex items-center gap-6 text-sm font-medium">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-ink/80 transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
