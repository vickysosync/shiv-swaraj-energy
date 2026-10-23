import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { FALLBACK_IMG, useData } from "@/lib/store";

export function Img({ src, alt, className = "", eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  return (
    <img
      src={failed || !src ? FALLBACK_IMG : src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

export function BrandColors() {
  const { settings } = useData();
  useEffect(() => {
    const s = document.documentElement.style;
    s.setProperty("--navy", settings.navy);
    s.setProperty("--brand", settings.brand);
    s.setProperty("--energy", settings.energy);
  }, [settings.navy, settings.brand, settings.energy]);
  return null;
}

export const Icon = {
  phone: (c = "h-4 w-4") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
  ),
  mail: (c = "h-4 w-4") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>
  ),
  pin: (c = "h-4 w-4") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
  ),
  arrow: (c = "h-4 w-4") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  ),
  bolt: (c = "h-5 w-5") => (
    <svg className={c} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>
  ),
};

export function Logo({ light = true }: { light?: boolean }) {
  const { company } = useData();
  return (
    <Link to="/" className="flex items-center gap-3" aria-label={`${company.name} — Home`}>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-energy text-navy">{Icon.bolt("h-6 w-6")}</span>
      <span className="leading-tight">
        <span className={`block font-display text-[15px] font-extrabold tracking-wide ${light ? "text-on-dark" : "text-navy"}`}>SHIV SWARAJ</span>
        <span className={`block text-[10px] font-medium uppercase tracking-[0.22em] ${light ? "text-on-dark-muted" : "text-muted-foreground"}`}>Technology Pvt. Ltd.</span>
      </span>
    </Link>
  );
}

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/projects", label: "Projects" },
  { to: "/sustainability", label: "Sustainability" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact Us" },
] as const;

function Header() {
  const { company } = useData();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-navy text-on-dark shadow-sm">
      <div className="hidden border-b border-on-dark/10 lg:block">
        <div className="container-x flex h-9 items-center justify-between text-xs text-on-dark-muted">
          <span>{company.tagline}</span>
          <div className="flex items-center gap-6">
            <a href={`tel:${company.phone}`} className="flex items-center gap-2 hover:text-energy">{Icon.phone("h-3.5 w-3.5")} {company.phone}</a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-energy">{Icon.mail("h-3.5 w-3.5")} {company.email}</a>
          </div>
        </div>
      </div>
      <div className="container-x flex h-18 items-center justify-between gap-6 py-3">
        <Logo />
        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  activeOptions={{ exact: n.to === "/" }}
                  className="relative px-3 py-2 text-sm font-medium text-on-dark-muted transition-colors hover:text-on-dark data-[status=active]:text-on-dark data-[status=active]:after:absolute data-[status=active]:after:inset-x-3 data-[status=active]:after:-bottom-[3px] data-[status=active]:after:h-0.5 data-[status=active]:after:bg-energy"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/contact" className="btn btn-energy hidden sm:inline-flex">Request a Consultation</Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-sm border border-on-dark/20 xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t border-on-dark/10 bg-navy-deep xl:hidden">
          <ul className="container-x flex flex-col py-3">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} activeOptions={{ exact: n.to === "/" }} className="block border-l-2 border-transparent px-3 py-3 text-sm font-medium text-on-dark-muted data-[status=active]:border-energy data-[status=active]:text-on-dark">
                  {n.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 flex flex-col gap-2 px-3 pb-2">
              <Link to="/contact" className="btn btn-energy">Request a Consultation</Link>
              <a href={`tel:${company.phone}`} className="flex items-center gap-2 py-2 text-sm text-on-dark-muted">{Icon.phone()} {company.phone}</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  const { company, services, settings } = useData();
  return (
    <footer className="bg-navy text-on-dark-muted">
      <div className="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">{settings.footerText}</p>
          <p className="mt-4 text-xs">CIN: {company.cin}</p>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-on-dark">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-energy">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-on-dark">Services</h2>
          <ul className="space-y-2 text-sm">
            {services.filter((s) => s.published).map((s) => (
              <li key={s.id}><Link to="/services" hash={s.slug} className="hover:text-energy">{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-on-dark">Contact</h2>
          <ul className="space-y-3 text-sm">
            <li><a href={`tel:${company.phone}`} className="flex gap-3 hover:text-energy">{Icon.phone("mt-0.5 h-4 w-4 shrink-0")} {company.phone}</a></li>
            <li><a href={`mailto:${company.email}`} className="flex gap-3 hover:text-energy">{Icon.mail("mt-0.5 h-4 w-4 shrink-0")} {company.email}</a></li>
            <li className="flex gap-3">{Icon.pin("mt-0.5 h-4 w-4 shrink-0")} <span>{company.address}</span></li>
          </ul>
          <Link to="/admin/login" className="btn btn-outline-light mt-6 px-4 py-2 text-xs">Admin Login</Link>
        </div>
      </div>
      <div className="border-t border-on-dark/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/privacy" className="hover:text-energy">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-energy">Terms</Link>
            <Link to="/admin/login" className="hover:text-energy">Admin Login</Link>
            <span className="text-on-dark">Designed and development by SOSynch Ai Tech</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-energy focus:px-4 focus:py-2 focus:text-navy">Skip to content</a>
      <Header />
      <main id="main" className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageBanner({ eyebrow, title, text, image }: { eyebrow: string; title: string; text: string; image: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      <Img src={image} alt="" eager className="absolute inset-0 -z-10 h-full w-full opacity-35" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
      <div className="container-x py-20 md:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-energy">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold text-on-dark md:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-on-dark-muted md:text-lg">{text}</p>
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, text, center = false }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold text-navy md:text-4xl">{title}</h2>
      {text && <p className="mt-4 leading-relaxed text-muted-foreground">{text}</p>}
    </div>
  );
}

export function DemoBadge({ label = "Illustrative Demo Project" }: { label?: string }) {
  return <span className="inline-block rounded-sm bg-energy/15 px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy">{label}</span>;
}

export function Modal({ open, onClose, label, children, wide = false }: { open: boolean; onClose: () => void; label: string; children: ReactNode; wide?: boolean }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={label} className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 p-4 animate-in fade-in" onClick={onClose}>
      <div className={`max-h-[92vh] w-full overflow-auto rounded-md bg-background shadow-2xl ${wide ? "max-w-5xl" : "max-w-2xl"}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export function CtaBand() {
  const { company } = useData();
  return (
    <section className="bg-brand">
      <div className="container-x flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-on-dark md:text-3xl">Planning a utility requirement for your facility?</h2>
          <p className="mt-2 text-on-dark/80">Share your requirements and our team will get in touch.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" className="btn btn-energy">Request a Consultation {Icon.arrow()}</Link>
          <a href={`tel:${company.phone}`} className="btn btn-outline-light">{Icon.phone()} {company.phone}</a>
        </div>
      </div>
    </section>
  );
}
