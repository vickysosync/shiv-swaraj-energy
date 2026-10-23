import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Img, Logo } from "@/components/site";
import { DEMO_CREDENTIALS, IMAGES, isAuthed, login } from "@/lib/store";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ ...seo("Admin Login", "Demo admin login for managing website content."), meta: [...seo("Admin Login", "Demo admin login for managing website content.").meta, { name: "robots", content: "noindex" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => { if (isAuthed()) navigate({ to: "/admin/dashboard" }); }, [navigate]);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) return setError("Enter both email and password.");
    if (login(email, password)) navigate({ to: "/admin/dashboard" });
    else setError("Incorrect demo credentials. Use the credentials shown below.");
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden bg-navy lg:block">
        <Img src={IMAGES.controlRoom} alt="" eager className="absolute inset-0 h-full w-full opacity-40" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Logo />
          <div>
            <h1 className="text-4xl font-extrabold text-on-dark">Website Administration</h1>
            <p className="mt-3 max-w-md text-on-dark-muted">Manage company profile, services, projects, gallery, homepage content and consultation requests.</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-muted p-6">
        <div className="w-full max-w-md rounded-md border bg-card p-8 shadow-sm">
          <div className="lg:hidden"><Logo light={false} /></div>
          <h2 className="mt-6 text-2xl font-bold text-navy lg:mt-0">Admin sign in</h2>
          <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
            <div><label htmlFor="em" className="mb-1.5 block text-sm font-medium">Email</label><input id="em" type="email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" /></div>
            <div><label htmlFor="pw" className="mb-1.5 block text-sm font-medium">Password</label><input id="pw" type="password" className="field" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" /></div>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <button type="submit" className="btn btn-navy w-full">Sign in</button>
          </form>
          <div className="mt-6 rounded-sm border-l-4 border-energy bg-muted p-4 text-sm">
            <p className="font-semibold text-navy">Demo credentials</p>
            <p className="mt-1 text-muted-foreground">Email: <code className="text-foreground">{DEMO_CREDENTIALS.email}</code></p>
            <p className="text-muted-foreground">Password: <code className="text-foreground">{DEMO_CREDENTIALS.password}</code></p>
            <p className="mt-3 text-xs text-muted-foreground">This demo login runs entirely in your browser and is not production-secure.</p>
          </div>
          <Link to="/" className="link-brand mt-6 inline-block text-sm">← Back to website</Link>
        </div>
      </div>
    </div>
  );
}
