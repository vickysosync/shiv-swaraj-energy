import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CrudEditor, Confirm, FieldInput, Panel, type Field } from "@/components/admin";
import { Logo, Modal } from "@/components/site";
import {
  isAuthed, logout, newId, resetData, updateData, useAuthed, useData,
  type Company, type Enquiry, type EnquiryStatus, type GalleryItem, type Home, type Project, type Service, type Settings, type SiteData,
} from "@/lib/store";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Admin Dashboard | Shiv Swaraj Technology" }, { name: "description", content: "Demo admin dashboard." }, { property: "og:title", content: "Admin Dashboard" }, { property: "og:description", content: "Demo admin dashboard." }, { name: "robots", content: "noindex" }] }),
  component: Dashboard,
});

const TABS = ["Overview", "Enquiries", "Company", "Homepage", "Services", "Projects", "Gallery", "Settings"] as const;
type Tab = (typeof TABS)[number];

function Dashboard() {
  const navigate = useNavigate();
  const authed = useAuthed();
  const [tab, setTab] = useState<Tab>("Overview");
  const [menu, setMenu] = useState(false);
  useEffect(() => { if (!isAuthed()) navigate({ to: "/admin/login" }); }, [navigate, authed]);
  if (!authed) return <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">Checking demo session…</div>;

  return (
    <div className="min-h-screen bg-muted lg:grid lg:grid-cols-[240px_1fr]">
      <aside className={`bg-navy p-5 lg:sticky lg:top-0 lg:block lg:h-screen ${menu ? "block" : "hidden"}`}>
        <Logo />
        <nav aria-label="Admin" className="mt-8 flex flex-col gap-1">
          {TABS.map((t) => (
            <button key={t} onClick={() => { setTab(t); setMenu(false); }} className={`rounded-sm px-3 py-2.5 text-left text-sm font-medium transition-colors ${tab === t ? "bg-energy text-navy" : "text-on-dark-muted hover:bg-on-dark/10 hover:text-on-dark"}`}>{t}</button>
          ))}
        </nav>
      </aside>
      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b bg-background px-5 py-3">
          <div className="flex items-center gap-3">
            <button className="btn btn-outline px-3 py-2 lg:hidden" onClick={() => setMenu((m) => !m)} aria-label="Toggle admin menu">☰</button>
            <h1 className="text-lg font-bold text-navy">{tab}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" target="_blank" className="link-brand hidden text-sm sm:inline">View website ↗</Link>
            <button className="btn btn-outline py-2" onClick={() => { logout(); navigate({ to: "/admin/login" }); }}>Log out</button>
          </div>
        </header>
        <p className="border-b bg-energy/10 px-5 py-2 text-xs text-foreground">Demo admin: changes are stored in this browser only. This login is not production-secure.</p>
        <main className="space-y-6 p-5 md:p-8">
          {tab === "Overview" && <Overview go={setTab} />}
          {tab === "Enquiries" && <Enquiries />}
          {tab === "Company" && <CompanyForm />}
          {tab === "Homepage" && <HomeForm />}
          {tab === "Services" && <ServicesAdmin />}
          {tab === "Projects" && <ProjectsAdmin />}
          {tab === "Gallery" && <GalleryAdmin />}
          {tab === "Settings" && <SettingsForm />}
        </main>
      </div>
    </div>
  );
}

function set<K extends keyof SiteData>(key: K, value: SiteData[K]) {
  updateData((d) => ({ ...d, [key]: value }));
}

function Overview({ go }: { go: (t: Tab) => void }) {
  const d = useData();
  const stats = [
    ["Total requests", d.enquiries.length, "Enquiries"],
    ["New enquiries", d.enquiries.filter((e) => e.status === "New").length, "Enquiries"],
    ["Reviewed", d.enquiries.filter((e) => e.status === "Reviewed").length, "Enquiries"],
    ["Service categories", d.services.length, "Services"],
    ["Published projects", d.projects.filter((p) => p.published).length, "Projects"],
    ["Gallery images", d.gallery.length, "Gallery"],
  ] as const;
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map(([l, n, t]) => (
          <button key={l} onClick={() => go(t)} className="rounded-md border border-l-4 border-l-brand bg-card p-5 text-left hover:shadow-sm">
            <p className="text-sm text-muted-foreground">{l}</p>
            <p className="mt-1 font-display text-3xl font-extrabold text-navy">{n}</p>
          </button>
        ))}
      </div>
      <Panel title="Recent demo activity">
        {d.enquiries.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No consultation requests yet. Submissions from the Contact page will appear here.</p>
        ) : (
          <ul className="divide-y">
            {d.enquiries.slice(0, 5).map((e) => (
              <li key={e.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                <span><span className="font-semibold text-navy">{e.name}</span> requested <span className="text-brand">{e.service}</span></span>
                <span className="text-xs text-muted-foreground">{new Date(e.createdAt).toLocaleString()} · {e.status}</span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </>
  );
}

function Enquiries() {
  const { enquiries } = useData();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [view, setView] = useState<Enquiry | null>(null);
  const [del, setDel] = useState<Enquiry | null>(null);
  const shown = enquiries.filter((e) =>
    (status === "All" || e.status === status) &&
    [e.name, e.company, e.email, e.service, e.phone].join(" ").toLowerCase().includes(q.toLowerCase()));
  const setSt = (id: string, s: EnquiryStatus) => set("enquiries", enquiries.map((e) => (e.id === id ? { ...e, status: s } : e)));

  return (
    <Panel title={`Consultation requests (${enquiries.length})`}>
      <div className="mb-4 flex flex-wrap gap-3">
        <input className="field max-w-xs" placeholder="Search name, email, service…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search enquiries" />
        <select className="field max-w-[160px]" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter status">
          {["All", "New", "Reviewed", "Closed"].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      {shown.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">{enquiries.length ? "No enquiries match your filters." : "No enquiries yet."}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead><tr className="border-b text-left text-xs uppercase tracking-wider text-muted-foreground"><th className="py-2 pr-3">Date</th><th className="py-2 pr-3">Name</th><th className="py-2 pr-3">Service</th><th className="py-2 pr-3">Contact</th><th className="py-2 pr-3">Status</th><th className="py-2 text-right">Actions</th></tr></thead>
            <tbody>
              {shown.map((e) => (
                <tr key={e.id} className="border-b last:border-0">
                  <td className="py-3 pr-3 text-muted-foreground">{new Date(e.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 pr-3"><span className="font-medium text-navy">{e.name}</span><br /><span className="text-xs text-muted-foreground">{e.company || "—"}</span></td>
                  <td className="py-3 pr-3">{e.service}</td>
                  <td className="py-3 pr-3 text-xs">{e.email}<br />{e.phone}</td>
                  <td className="py-3 pr-3">
                    <select className="field py-1.5" value={e.status} onChange={(ev) => setSt(e.id, ev.target.value as EnquiryStatus)} aria-label="Status">
                      {["New", "Reviewed", "Closed"].map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="py-3 text-right whitespace-nowrap">
                    <button className="link-brand mr-4" onClick={() => setView(e)}>View</button>
                    <button className="font-semibold text-destructive hover:underline" onClick={() => setDel(e)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal open={!!view} onClose={() => setView(null)} label="Enquiry details">
        {view && (
          <div className="p-6">
            <h2 className="text-lg font-bold text-navy">Enquiry from {view.name}</h2>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              {([["Company", view.company], ["Phone", view.phone], ["Email", view.email], ["Service", view.service], ["Industry", view.industry], ["Preferred contact", view.method], ["Submitted", new Date(view.createdAt).toLocaleString()], ["Status", view.status]] as const).map(([k, v]) => (
                <div key={k}><dt className="text-xs text-muted-foreground">{k}</dt><dd className="font-medium">{v || "—"}</dd></div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-muted-foreground">Requirements</p>
            <p className="mt-1 whitespace-pre-wrap rounded-sm bg-muted p-3 text-sm">{view.requirements}</p>
            <div className="mt-6 flex justify-end"><button className="btn btn-outline py-2" onClick={() => setView(null)}>Close</button></div>
          </div>
        )}
      </Modal>
      <Confirm open={!!del} title="Delete enquiry?" text={`The enquiry from ${del?.name ?? ""} will be permanently removed.`} onCancel={() => setDel(null)} onConfirm={() => { if (del) set("enquiries", enquiries.filter((x) => x.id !== del.id)); setDel(null); }} />
    </Panel>
  );
}

function useDraft<T>(source: T) {
  const [draft, setDraft] = useState(source);
  const [saved, setSaved] = useState(false);
  useEffect(() => setDraft(source), [source]);
  useEffect(() => { if (!saved) return; const t = setTimeout(() => setSaved(false), 2500); return () => clearTimeout(t); }, [saved]);
  return { draft, setDraft, saved, setSaved };
}

function FormPanel<T extends object>({ title, source, fields, onSave }: { title: string; source: T; fields: Field[]; onSave: (v: T) => void }) {
  const { draft, setDraft, saved, setSaved } = useDraft(source);
  const r = draft as Record<string, unknown>;
  return (
    <Panel title={title} action={saved && <span role="status" className="text-sm font-semibold text-success">Saved ✓</span>}>
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((f) => (
          <div key={f.key} className={f.type === "textarea" || f.type === "list" || f.type === "image" ? "md:col-span-2" : ""}>
            <FieldInput f={f} value={r[f.key]} onChange={(v) => setDraft({ ...draft, [f.key]: v })} />
          </div>
        ))}
      </div>
      <button className="btn btn-navy mt-6" onClick={() => { onSave(draft); setSaved(true); }}>Save changes</button>
    </Panel>
  );
}

function CompanyForm() {
  const { company } = useData();
  return (
    <FormPanel<Company> title="Company profile" source={company} onSave={(v) => set("company", { ...v, values: v.values.map((s) => s.trim()).filter(Boolean) })} fields={[
      { key: "name", label: "Company name" }, { key: "shortName", label: "Short name" },
      { key: "tagline", label: "Header tagline" }, { key: "business", label: "Business category" },
      { key: "intro", label: "Company introduction", type: "textarea" }, { key: "overview", label: "Company overview (About page)", type: "textarea" },
      { key: "mission", label: "Mission", type: "textarea" }, { key: "vision", label: "Vision", type: "textarea" },
      { key: "values", label: "Core values (one per line)", type: "list" },
      { key: "phone", label: "Phone" }, { key: "email", label: "Email" },
      { key: "address", label: "Registered office address", type: "textarea" },
      { key: "cin", label: "CIN" }, { key: "incorporated", label: "Incorporation date" }, { key: "roc", label: "ROC" },
    ]} />
  );
}

function HomeForm() {
  const { home, services, projects } = useData();
  const { draft, setDraft, saved, setSaved } = useDraft<Home>(home);
  const toggle = (k: "featuredServices" | "featuredProjects", id: string) =>
    setDraft({ ...draft, [k]: draft[k].includes(id) ? draft[k].filter((x) => x !== id) : [...draft[k], id] });
  const r = draft as unknown as Record<string, unknown>;
  return (
    <Panel title="Homepage content" action={saved && <span role="status" className="text-sm font-semibold text-success">Saved ✓</span>}>
      <div className="grid gap-4 md:grid-cols-2">
        {([{ key: "heroTitle", label: "Hero headline" }, { key: "ctaPrimary", label: "Primary CTA label" }, { key: "heroText", label: "Hero description", type: "textarea" }, { key: "ctaSecondary", label: "Secondary CTA label" }, { key: "heroImage", label: "Hero banner image URL", type: "image" }] as Field[]).map((f) => (
          <div key={f.key} className={f.type ? "md:col-span-2" : ""}><FieldInput f={f} value={r[f.key]} onChange={(v) => setDraft({ ...draft, [f.key]: v })} /></div>
        ))}
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <fieldset><legend className="mb-2 text-sm font-semibold">Featured services (max 4)</legend>
          {services.map((s) => <label key={s.id} className="flex items-center gap-2 py-1 text-sm"><input type="checkbox" className="accent-brand" checked={draft.featuredServices.includes(s.id)} onChange={() => toggle("featuredServices", s.id)} /> {s.title}</label>)}
        </fieldset>
        <fieldset><legend className="mb-2 text-sm font-semibold">Featured projects (max 3)</legend>
          {projects.map((p) => <label key={p.id} className="flex items-center gap-2 py-1 text-sm"><input type="checkbox" className="accent-brand" checked={draft.featuredProjects.includes(p.id)} onChange={() => toggle("featuredProjects", p.id)} /> {p.title}</label>)}
        </fieldset>
        <fieldset><legend className="mb-2 text-sm font-semibold">Homepage sections</legend>
          {([["showIndustries", "Industries"], ["showProjects", "Projects"], ["showSustainability", "Sustainability"]] as const).map(([k, l]) => (
            <label key={k} className="flex items-center gap-2 py-1 text-sm"><input type="checkbox" className="accent-brand" checked={draft[k]} onChange={(e) => setDraft({ ...draft, [k]: e.target.checked })} /> Show {l}</label>
          ))}
        </fieldset>
      </div>
      <button className="btn btn-navy mt-6" onClick={() => { set("home", draft); setSaved(true); }}>Save homepage</button>
    </Panel>
  );
}

function ServicesAdmin() {
  const { services } = useData();
  return (
    <CrudEditor<Service> title="Services" items={services} toggleKey="published" onChange={(v) => set("services", v)}
      blank={() => ({ id: newId("svc"), slug: "", title: "", short: "", description: "", points: [], image: "", published: true })}
      fields={[{ key: "title", label: "Title" }, { key: "slug", label: "Anchor (e.g. electricity)" }, { key: "short", label: "Short summary", type: "textarea" }, { key: "description", label: "Full description", type: "textarea" }, { key: "points", label: "Key points (one per line)", type: "list" }, { key: "image", label: "Image URL", type: "image" }, { key: "published", label: "Published", type: "checkbox" }]} />
  );
}

function ProjectsAdmin() {
  const { projects } = useData();
  const cats = Array.from(new Set(projects.map((p) => p.category)));
  return (
    <>
      <p className="text-sm text-muted-foreground">All projects display the “Illustrative Demo Project” label on the public site.</p>
      <CrudEditor<Project> title="Projects" items={projects} toggleKey="published" onChange={(v) => set("projects", v)}
        blank={() => ({ id: newId("prj"), title: "", category: cats[0] ?? "", location: "Location to be confirmed", description: "", details: "", image: "", published: true })}
        fields={[{ key: "title", label: "Title" }, { key: "category", label: "Category", suggestions: cats }, { key: "location", label: "Location" }, { key: "description", label: "Short description", type: "textarea" }, { key: "details", label: "Detail text", type: "textarea" }, { key: "image", label: "Image URL", type: "image" }, { key: "published", label: "Published", type: "checkbox" }]} />
    </>
  );
}

function GalleryAdmin() {
  const { gallery } = useData();
  const cats = Array.from(new Set(gallery.map((g) => g.category)));
  return (
    <CrudEditor<GalleryItem> title="Gallery images" items={gallery} onChange={(v) => set("gallery", v)}
      blank={() => ({ id: newId("gal"), title: "", category: cats[0] ?? "", description: "", image: "" })}
      fields={[{ key: "title", label: "Title" }, { key: "category", label: "Category (type a new one to create it)", suggestions: cats }, { key: "description", label: "Description", type: "textarea" }, { key: "image", label: "Image URL", type: "image" }]} />
  );
}

function SettingsForm() {
  const { settings } = useData();
  const { draft, setDraft, saved, setSaved } = useDraft<Settings>(settings);
  const [confirm, setConfirm] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <>
      <Panel title="Branding & footer" action={saved && <span role="status" className="text-sm font-semibold text-success">Saved ✓</span>}>
        <div className="grid gap-4 sm:grid-cols-3">
          {([["navy", "Primary navy"], ["brand", "Industrial blue"], ["energy", "Energy orange"]] as const).map(([k, l]) => (
            <label key={k} className="text-sm font-medium">{l}
              <span className="mt-1.5 flex items-center gap-2">
                <input type="color" value={draft[k]} onChange={(e) => setDraft({ ...draft, [k]: e.target.value })} className="h-10 w-12 cursor-pointer rounded-sm border" />
                <input className="field" value={draft[k]} onChange={(e) => setDraft({ ...draft, [k]: e.target.value })} aria-label={`${l} hex`} />
              </span>
            </label>
          ))}
        </div>
        <div className="mt-4"><FieldInput f={{ key: "footerText", label: "Footer text", type: "textarea" }} value={draft.footerText} onChange={(v) => setDraft({ ...draft, footerText: String(v) })} /></div>
        <p className="mt-3 text-xs text-muted-foreground">Contact details are edited under Company.</p>
        <button className="btn btn-navy mt-6" onClick={() => { set("settings", draft); setSaved(true); }}>Save settings</button>
      </Panel>
      <Panel title="Demo content">
        <p className="text-sm text-muted-foreground">Restore all website content to the original sample data. This also removes all saved enquiries.</p>
        <button className="btn btn-danger mt-4" onClick={() => setConfirm(true)}>Reset mock data</button>
        {done && <p role="status" className="mt-3 text-sm font-semibold text-success">All content has been reset.</p>}
      </Panel>
      <Confirm open={confirm} title="Reset all demo data?" text="Every content change and enquiry stored in this browser will be lost." action="Reset" onCancel={() => setConfirm(false)} onConfirm={() => { resetData(); setConfirm(false); setDone(true); }} />
    </>
  );
}
