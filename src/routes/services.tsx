import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaBand, Icon, Img, PageBanner, SiteLayout } from "@/components/site";
import { IMAGES, useData } from "@/lib/store";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () => seo("Services", "Electricity, gas, steam and air-conditioning supply services for industrial and commercial facilities."),
  component: Services,
});

function Services() {
  const { services } = useData();
  const list = services.filter((s) => s.published);
  return (
    <SiteLayout>
      <PageBanner eyebrow="Services" title="Utility services for industrial operations" text="An overview of the four utility areas we work across. Select a service to request a consultation with that service pre-selected." image={IMAGES.substation} />
      <div className="container-x pt-10">
        <p className="rounded-sm border-l-4 border-energy bg-muted px-4 py-3 text-sm text-muted-foreground">
          Note: service descriptions below are general demo descriptions of each utility area. Specific company capabilities should be confirmed directly with our team.
        </p>
        <nav aria-label="Services" className="mt-8 flex flex-wrap gap-2">
          {list.map((s) => <a key={s.id} href={`#${s.slug}`} className="btn btn-outline py-2">{s.title}</a>)}
        </nav>
      </div>
      <div className="container-x divide-y py-10">
        {list.length === 0 && <p className="py-20 text-center text-muted-foreground">No services are published at the moment.</p>}
        {list.map((s, i) => (
          <section key={s.id} id={s.slug} className="grid scroll-mt-28 gap-10 py-14 lg:grid-cols-2 lg:items-center">
            <Img src={s.image} alt={s.title} className={`aspect-[4/3] w-full rounded-md ${i % 2 ? "lg:order-2" : ""}`} />
            <div>
              <p className="eyebrow">Service 0{i + 1}</p>
              <h2 className="mt-3 text-3xl font-bold text-navy">{s.title}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{s.description}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-foreground"><span className="mt-1 text-energy">{Icon.bolt("h-4 w-4")}</span>{p}</li>
                ))}
              </ul>
              <Link to="/contact" search={{ service: s.title }} className="btn btn-energy mt-8">Request a Consultation {Icon.arrow()}</Link>
            </div>
          </section>
        ))}
      </div>
      <CtaBand />
    </SiteLayout>
  );
}
