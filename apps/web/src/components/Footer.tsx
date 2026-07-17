import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-sand">
      <div className="container-page flex flex-col items-start justify-between gap-4 py-10 sm:flex-row sm:items-center">
        <div>
          <p className="font-serif text-lg font-semibold">
            Halaal<span className="text-moss">.</span>
          </p>
          <p className="mt-1 text-sm text-sable">
            The trust layer for every Halaal body.
          </p>
        </div>
        <ul className="flex flex-wrap gap-6 text-sm text-sable">
          <li>
            <Link href="/verify" className="hover:text-ink">
              Verify
            </Link>
          </li>
          <li>
            <Link href="/apply" className="hover:text-ink">
              Apply
            </Link>
          </li>
          <li>
            <Link href="/admin/applications" className="hover:text-ink">
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
