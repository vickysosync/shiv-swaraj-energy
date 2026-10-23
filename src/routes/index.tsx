import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaBand, DemoBadge, Icon, Img, SectionHead, SiteLayout } from "@/components/site";
import { IMAGES, useData } from "@/lib/store";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo("Reliable Energy Solutions for Modern Industry", "Shiv Swaraj Technology Private Limited — industrial electricity, gas, steam and air-conditioning supply solutions from Pune, Maharashtra."),
  component: Home,
});

function Home() {
  const { home, company, services, projects, industries } = useData();
  const featuredServices = home.featuredServices.map((id) => services.find((s) => s.id === id)).filter((s) => s && s.published).slice(0, 4);
  const featuredProjects = home.featuredProjects.map((id) => projects.find((p) => p.id === id)).filter((p) => p && p.published).slice(0, 3);

  return (
    <SiteLayout>
      <section className="relative isolate flex min-h-[78vh] items-center overflow-hidden bg-navy">
        <Img src={home.heroImage} alt="Industrial power plant and substation at dusk" eager className="absolute inset-0 -z-10 h-full w-full" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/80 to-navy/20" />
        <div className="container-x py-24">
          <div className="max-w-2xl animate-rise">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-energy">{Icon.bolt("h-4 w-4")} {company.business}</p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] text-on-dark sm:text-5xl lg:text-6xl">{home.heroTitle}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-on-dark-muted">{home.heroText}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/services" className="btn btn-energy">{home.ctaPrimary} {Icon.arrow()}</Link>
              <Link to="/contact" className="btn btn-outline-light">{home.ctaSecondary}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHead eyebrow="Who we are" title="Utility supply built on reliability" />
          <p className="mt-5 leading-relaxed text-muted-foreground">{company.intro}</p>
          <dl className="mt-8 grid grid-cols-2 gap-6 border-t pt-6 text-sm">
            <div><dt className="text-muted-foreground">Incorporated</dt><dd className="mt-1 font-semibold text-navy">{company.incorporated}</dd></div>
            <div><dt className="text-muted-foreground">Registered with</dt><dd className="mt-1 font-semibold text-navy">ROC {company.roc}</dd></div>
          </dl>
          <Link to="/about" className="link-brand mt-8 inline-flex items-center gap-2">Learn More About Us {Icon.arrow()}</Link>
        </div>
        <Img src={IMAGES.controlRoom} alt="Engineers monitoring utility systems in a control room" className="aspect-[4/3] w-full rounded-md" />
      </section>

      <section className="bg-muted py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="Services" title="Four utility areas, one coordinated approach" />
            <Link to="/services" className="link-brand inline-flex items-center gap-2">Explore Services {Icon.arrow()}</Link>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((s) => s && (
              <Link key={s.id} to="/services" hash={s.slug} className="group bg-background">
                <Img src={s.image} alt={s.title} className="aspect-[3/2] w-full transition-transform duration-500 group-hover:scale-[1.02]" />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {home.showIndustries && (
        <section className="container-x py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="Industries" title="Sectors with demanding utility needs" />
            <Link to="/industries" className="link-brand inline-flex items-center gap-2">View All Industries {Icon.arrow()}</Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {industries.slice(0, 3).map((i) => (
              <div key={i.id} className="relative overflow-hidden rounded-md">
                <Img src={i.image} alt={i.title} className="aspect-[4/3] w-full" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy to-transparent p-6 pt-16">
                  <h3 className="text-lg font-bold text-on-dark">{i.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {home.showProjects && featuredProjects.length > 0 && (
        <section className="bg-navy py-20">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-energy">Projects</p>
                <h2 className="mt-3 text-3xl font-bold text-on-dark md:text-4xl">Illustrative project concepts</h2>
                <p className="mt-4 text-on-dark-muted">Sample concepts showing the kind of work in our sector. These are demo examples, not completed company projects.</p>
              </div>
              <Link to="/projects" className="inline-flex items-center gap-2 font-semibold text-energy hover:underline">View All Projects {Icon.arrow()}</Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {featuredProjects.map((p) => p && (
                <article key={p.id} className="overflow-hidden rounded-md bg-background">
                  <Img src={p.image} alt={p.title} className="aspect-[16/10] w-full" />
                  <div className="p-6">
                    <DemoBadge />
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-brand">{p.category}</p>
                    <h3 className="mt-1 text-lg font-bold text-navy">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {home.showSustainability && (
        <section className="container-x grid gap-12 py-20 lg:grid-cols-2 lg:items-center">
          <Img src={IMAGES.sustainability} alt="Industrial building with rooftop solar panels and cooling towers" className="aspect-[4/3] w-full rounded-md" />
          <div>
            <SectionHead eyebrow="Sustainability" title="Energy-conscious utility planning" text="We believe efficient utilities and responsible energy use go hand in hand — from careful load planning to resource optimisation across electricity, steam and cooling." />
            <Link to="/sustainability" className="link-brand mt-8 inline-flex items-center gap-2">Learn More {Icon.arrow()}</Link>
          </div>
        </section>
      )}

      <CtaBand />
    </SiteLayout>
  );
}
