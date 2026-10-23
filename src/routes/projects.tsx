import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CtaBand, DemoBadge, Icon, Img, Modal, PageBanner, SiteLayout } from "@/components/site";
import { IMAGES, useData, type Project } from "@/lib/store";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/projects")({
  head: () => seo("Projects & Case Studies", "Illustrative demo project concepts across electrical infrastructure, gas utilities, steam systems, HVAC and energy efficiency."),
  component: Projects,
});

function Projects() {
  const { projects } = useData();
  const list = projects.filter((p) => p.published);
  const cats = ["All", ...Array.from(new Set(list.map((p) => p.category)))];
  const [cat, setCat] = useState("All");
  const [active, setActive] = useState<Project | null>(null);
  const shown = cat === "All" ? list : list.filter((p) => p.category === cat);

  return (
    <SiteLayout>
      <PageBanner eyebrow="Projects" title="Project concepts and case studies" text="All projects shown are Illustrative Demo Projects that represent typical work in our sector. They are not presented as completed projects of the company." image={IMAGES.steam} />
      <section className="container-x py-16">
        <div role="tablist" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`btn py-2 ${cat === c ? "btn-navy" : "btn-outline"}`}>{c}</button>
          ))}
        </div>
        {shown.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">No projects in this category yet.</p>
        ) : (
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <article key={p.id} className="group flex flex-col overflow-hidden rounded-md border bg-card">
                <Img src={p.image} alt={p.title} className="aspect-[16/10] w-full" />
                <div className="flex flex-1 flex-col p-6">
                  <DemoBadge />
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-brand">{p.category}</p>
                  <h2 className="mt-1 text-lg font-bold text-navy">{p.title}</h2>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">{Icon.pin("h-3.5 w-3.5")} {p.location}</p>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.description}</p>
                  <button onClick={() => setActive(p)} className="link-brand mt-5 inline-flex items-center gap-2 self-start">View Details {Icon.arrow()}</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      <Modal open={!!active} onClose={() => setActive(null)} label={active?.title ?? "Project"}>
        {active && (
          <div>
            <Img src={active.image} alt={active.title} className="aspect-[16/9] w-full" eager />
            <div className="p-8">
              <DemoBadge />
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand">{active.category}</p>
              <h2 className="mt-1 text-2xl font-bold text-navy">{active.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{active.location}</p>
              <p className="mt-5 leading-relaxed text-foreground">{active.details}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="btn btn-energy">Discuss a Similar Requirement</Link>
                <button className="btn btn-outline" onClick={() => setActive(null)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <CtaBand />
    </SiteLayout>
  );
}
