import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site";
import { useData } from "@/lib/store";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => seo("Privacy Policy", "How this website handles information submitted through the consultation form."),
  component: Privacy,
});

function Privacy() {
  const { company } = useData();
  return (
    <SiteLayout>
      <article className="container-x max-w-3xl py-20">
        <h1 className="text-4xl font-bold text-navy">Privacy Policy</h1>
        <div className="mt-8 space-y-5 leading-relaxed text-muted-foreground">
          <p>This website is currently a demonstration. Information entered in the consultation form is stored only in your own browser's local storage and is not transmitted to {company.name} or any third party.</p>
          <p>You can clear this data at any time by clearing your browser's site data. No cookies are used for tracking.</p>
          <p>For any privacy questions, contact us at <a className="link-brand" href={`mailto:${company.email}`}>{company.email}</a>.</p>
        </div>
      </article>
    </SiteLayout>
  );
}
