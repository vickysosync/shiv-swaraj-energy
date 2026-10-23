import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, Img, PageBanner, SectionHead, SiteLayout } from "@/components/site";
import { IMAGES } from "@/lib/store";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/sustainability")({
  head: () => seo("Sustainability", "Our approach to responsible energy consumption, efficient utility planning and resource optimisation in industrial operations."),
  component: Sustainability,
});

const PILLARS = [
  { title: "Responsible energy consumption", text: "Matching utility supply to actual demand so facilities avoid waste from oversized or poorly controlled systems." },
  { title: "Efficient utility planning", text: "Considering efficiency early — when loads, distribution and equipment are planned — rather than as an afterthought." },
  { title: "Resource optimisation", text: "Looking at how electricity, steam, gas and cooling interact, and where recovery or reuse of energy can make sense." },
  { title: "Energy-conscious operations", text: "Encouraging monitoring and measurement so operating teams can see consumption and act on it." },
  { title: "Sustainable infrastructure concepts", text: "Exploring infrastructure concepts that support long-term efficiency, such as better insulation, controls and heat recovery." },
];

function Sustainability() {
  return (
    <SiteLayout>
      <PageBanner eyebrow="Sustainability" title="Efficiency as a utility principle" text="Reliable utilities and responsible energy use are closely linked. This page outlines the principles we bring to energy-conscious utility planning." image={IMAGES.sustainability} />
      <section className="container-x py-20">
        <SectionHead eyebrow="Our approach" title="Five principles for energy-conscious utilities" />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-md border bg-border md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <li key={p.title} className="bg-background p-8">
              <span className="font-display text-sm font-bold text-energy">0{i + 1}</span>
              <h2 className="mt-3 text-lg font-bold text-navy">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </li>
          ))}
          <li className="bg-navy p-8 text-on-dark-muted">
            <p className="text-sm leading-relaxed">We do not publish environmental statistics or certifications on this website. Any efficiency outcome depends on the specific facility and should be assessed case by case.</p>
          </li>
        </ol>
      </section>
      <section className="bg-muted py-20">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <figure>
            <Img src={IMAGES.heatRecovery} alt="Heat exchanger and energy meter in a utility room" className="aspect-[4/3] w-full rounded-md" />
            <figcaption className="mt-3 text-sm text-muted-foreground">Heat exchange and metering help make energy use visible and recoverable.</figcaption>
          </figure>
          <figure>
            <Img src={IMAGES.chiller} alt="Central chiller plant" className="aspect-[4/3] w-full rounded-md" />
            <figcaption className="mt-3 text-sm text-muted-foreground">Efficient cooling plants are central to energy-conscious buildings.</figcaption>
          </figure>
        </div>
      </section>
      <CtaBand />
    </SiteLayout>
  );
}
