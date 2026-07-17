import Link from "next/link";
import { Card } from "@/components/Card";

export default function SignUpPage() {
  return (
    <div className="container-page flex min-h-[60vh] items-center justify-center py-12">
      <Card className="max-w-md text-center">
        <span className="eyebrow">Sign up</span>
        <h1 className="mt-3 font-serif text-3xl font-semibold">
          Authentication is disabled
        </h1>
        <p className="mt-3 text-ink/60">
          Sign-up is a placeholder shell. The app runs without auth in this
          demo.
        </p>
        <div className="mt-6">
          <Link href="/" className="btn border border-ink/20 hover:bg-ink/5">
            Back to home
          </Link>
        </div>
      </Card>
    </div>
  );
}
