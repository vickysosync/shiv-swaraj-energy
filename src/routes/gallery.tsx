import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Img, Modal, PageBanner, SiteLayout } from "@/components/site";
import { IMAGES, useData } from "@/lib/store";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () => seo("Gallery", "Photographs of industrial facilities, electrical systems, gas infrastructure, steam equipment and air-conditioning installations."),
  component: Gallery,
});

function Gallery() {
  const { gallery } = useData();
  const cats = ["All", ...Array.from(new Set(gallery.map((g) => g.category)))];
  const [cat, setCat] = useState("All");
  const [idx, setIdx] = useState<number | null>(null);
  const shown = cat === "All" ? gallery : gallery.filter((g) => g.category === cat);
  const close = useCallback(() => setIdx(null), []);
  const step = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + shown.length) % shown.length)), [shown.length]);

  useEffect(() => {
    if (idx === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [idx, step]);

  const item = idx !== null ? shown[idx] : null;
  return (
    <SiteLayout>
      <PageBanner eyebrow="Gallery" title="Industrial utility environments" text="A visual look at the facilities, equipment and infrastructure across the electricity, gas, steam and air-conditioning sector." image={IMAGES.gas} />
      <section className="container-x py-16">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter gallery">
          {cats.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`btn py-2 ${cat === c ? "btn-navy" : "btn-outline"}`}>{c}</button>
          ))}
        </div>
        {shown.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">No images in this category yet.</p>
        ) : (
          <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {shown.map((g, i) => (
              <li key={g.id}>
                <button onClick={() => setIdx(i)} className="group relative block w-full overflow-hidden rounded-sm text-left" aria-label={`Open ${g.title}`}>
                  <Img src={g.image} alt={g.title} className="aspect-square w-full transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent p-3 pt-10 text-sm font-semibold text-on-dark">{g.title}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
      <Modal open={!!item} onClose={close} label={item?.title ?? "Image"} wide>
        {item && (
          <div>
            <div className="relative bg-navy">
              <Img src={item.image} alt={item.title} eager className="max-h-[70vh] w-full object-contain" />
              <button onClick={() => step(-1)} aria-label="Previous image" className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-sm bg-navy/70 text-on-dark hover:bg-navy">‹</button>
              <button onClick={() => step(1)} aria-label="Next image" className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-sm bg-navy/70 text-on-dark hover:bg-navy">›</button>
            </div>
            <div className="flex items-start justify-between gap-6 p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">{item.category}</p>
                <h2 className="mt-1 text-xl font-bold text-navy">{item.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-sm text-muted-foreground">{(idx ?? 0) + 1} / {shown.length}</span>
                <button onClick={close} className="btn btn-outline py-2">Close</button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </SiteLayout>
  );
}
