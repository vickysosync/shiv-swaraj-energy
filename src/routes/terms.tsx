import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site";
import { useData } from "@/lib/store";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => seo("Terms of Use", "Terms of use for the Shiv Swaraj Technology Private Limited website."),
  component: Terms,
});

function Terms() {
  const { company } = useData();
  return (
    <SiteLayout>
      <article className="container-x max-w-3xl py-20">
        <h1 className="text-4xl font-bold text-navy">Terms of Use</h1>
        <div className="mt-8 space-y-5 leading-relaxed text-muted-foreground">
          <p>Content on this website is provided for general information about {company.name}. Service descriptions and projects marked "Illustrative Demo Project" are examples and do not represent completed work or guaranteed capabilities.</p>
          <p>Nothing on this website constitutes a binding offer. Specific requirements should be discussed directly with our team.</p>
          <p>Questions: <a className="link-brand" href={`tel:${company.phone}`}>{company.phone}</a> · <a className="link-brand" href={`mailto:${company.email}`}>{company.email}</a></p>
        </div>
      </article>
    </SiteLayout>
  );
}
