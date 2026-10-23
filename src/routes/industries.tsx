import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, Img, PageBanner, SiteLayout } from "@/components/site";
import { IMAGES, useData } from "@/lib/store";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/industries")({
  head: () => seo("Industries We Serve", "Potential sectors for industrial electricity, gas, steam and air-conditioning supply: manufacturing, processing, warehousing, commercial, infrastructure and institutions."),
  component: Industries,
});

function Industries() {
  const { industries } = useData();
  return (
    <SiteLayout>
      <PageBanner eyebrow="Industries" title="Sectors where utilities matter most" text="Potential industry sectors whose operations depend on reliable electricity, gas, steam and cooling. These describe sectors we aim to serve, not a list of existing clients." image={IMAGES.manufacturing} />
      <section className="container-x grid gap-x-8 gap-y-14 py-20 md:grid-cols-2 lg:grid-cols-3">
        {industries.map((i) => (
          <article key={i.id}>
            <Img src={i.image} alt={i.title} className="aspect-[4/3] w-full rounded-md" />
            <h2 className="mt-5 text-xl font-bold text-navy">{i.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.description}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand">Typical utility requirements</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {i.needs.map((n) => <li key={n} className="rounded-sm bg-muted px-2.5 py-1 text-xs font-medium text-foreground">{n}</li>)}
            </ul>
          </article>
        ))}
      </section>
      <CtaBand />
    </SiteLayout>
  );
}
