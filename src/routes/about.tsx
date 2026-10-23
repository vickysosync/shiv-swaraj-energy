import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, Icon, Img, PageBanner, SectionHead, SiteLayout } from "@/components/site";
import { IMAGES, useData } from "@/lib/store";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => seo("About Us", "Company profile, mission, vision, values and registration details of Shiv Swaraj Technology Private Limited, Pune."),
  component: About,
});

function About() {
  const { company } = useData();
  const reg = [
    ["Company Name", company.name],
    ["CIN", company.cin],
    ["Date of Incorporation", company.incorporated],
    ["Registrar of Companies", `ROC ${company.roc}`],
    ["Business Activity", company.business],
  ];
  return (
    <SiteLayout>
      <PageBanner eyebrow="About Us" title="A Pune company focused on industrial utilities" text={company.intro} image={IMAGES.electricity} />

      <section className="container-x grid gap-12 py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <SectionHead eyebrow="Company Overview" title="Who we are" />
          <p className="mt-5 leading-relaxed text-muted-foreground">{company.overview}</p>
        </div>
        <Img src={IMAGES.controlRoom} alt="Utility monitoring control room" className="aspect-[4/3] w-full rounded-md" />
      </section>

      <section className="bg-muted py-20">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <div className="rounded-md border-t-4 border-energy bg-background p-8">
            <p className="eyebrow">Mission</p>
            <p className="mt-4 text-lg leading-relaxed text-navy">{company.mission}</p>
          </div>
          <div className="rounded-md border-t-4 border-brand bg-background p-8">
            <p className="eyebrow">Vision</p>
            <p className="mt-4 text-lg leading-relaxed text-navy">{company.vision}</p>
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHead eyebrow="Core Values" title="What guides our work" />
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {company.values.map((v, i) => (
            <li key={v} className="border-l-2 border-energy pl-5">
              <span className="font-display text-3xl font-extrabold text-brand/30">0{i + 1}</span>
              <p className="mt-2 font-semibold text-navy">{v}</p>
            </li>
          ))}
        </ol>
        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold text-navy">Commitment to reliability and efficiency</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">Utility interruptions are costly for any facility. Our approach emphasises careful planning, clear coordination with stakeholders and attention to the efficient use of energy at every stage.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-navy">Industrial energy and utility focus</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">Our activity spans the four utility streams that keep industry running — electricity, gas, steam and air-conditioning — with an emphasis on industrial and commercial requirements.</p>
          </div>
        </div>
      </section>

      <section className="bg-navy py-20">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-energy">Registration</p>
            <h2 className="mt-3 text-3xl font-bold text-on-dark">Company registration information</h2>
            <dl className="mt-8 divide-y divide-on-dark/10 border-y border-on-dark/10">
              {reg.map(([k, v]) => (
                <div key={k} className="grid gap-1 py-4 sm:grid-cols-[200px_1fr]">
                  <dt className="text-sm text-on-dark-muted">{k}</dt>
                  <dd className="font-medium text-on-dark">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-md bg-navy-deep p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-energy">Registered Office</p>
            <p className="mt-4 flex gap-3 text-lg leading-relaxed text-on-dark">{Icon.pin("mt-1.5 h-5 w-5 shrink-0 text-energy")} {company.address}</p>
            <div className="mt-6 space-y-3 text-on-dark-muted">
              <a href={`tel:${company.phone}`} className="flex items-center gap-3 hover:text-energy">{Icon.phone()} {company.phone}</a>
              <a href={`mailto:${company.email}`} className="flex items-center gap-3 hover:text-energy">{Icon.mail()} {company.email}</a>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </SiteLayout>
  );
}
