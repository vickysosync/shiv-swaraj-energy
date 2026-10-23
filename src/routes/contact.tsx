import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Icon, PageBanner, SiteLayout } from "@/components/site";
import { IMAGES, newId, updateData, useData, validateEnquiry, type EnquiryInput } from "@/lib/store";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): { service?: string | undefined } => ({
    service: typeof s["service"] === "string" ? s["service"].slice(0, 80) : undefined,
  }),
  head: () => seo("Contact Us", "Contact Shiv Swaraj Technology Private Limited, Bhosari Industrial Area, Pune. Call 3412341325 or email shivswaraj@gmail.com."),
  component: Contact,
});

function Contact() {
  const { company, services, industries } = useData();
  const { service } = Route.useSearch();
  const blank: EnquiryInput = { name: "", company: "", phone: "", email: "", service: service ?? "", industry: "", requirements: "", method: "Email" };
  const [v, setV] = useState<EnquiryInput>(blank);
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryInput, string>>>({});
  const [status, setStatus] = useState<"idle" | "saving" | "done">("idle");

  const set = (k: keyof EnquiryInput) => (e: { target: { value: string } }) => setV((p) => ({ ...p, [k]: e.target.value }));

  function submit(e: FormEvent) {
    e.preventDefault();
    const errs = validateEnquiry(v);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("saving");
    setTimeout(() => {
      updateData((d) => ({
        ...d,
        enquiries: [{ ...v, name: v.name.trim(), email: v.email.trim(), id: newId("enq"), createdAt: new Date().toISOString(), status: "New" }, ...d.enquiries],
      }));
      setStatus("done");
      setV({ ...blank, service: "" });
    }, 500);
  }

  const err = (k: keyof EnquiryInput) => errors[k] && <p id={`${k}-err`} className="mt-1.5 text-xs text-destructive">{errors[k]}</p>;
  const label = "mb-1.5 block text-sm font-medium text-foreground";

  return (
    <SiteLayout>
      <PageBanner eyebrow="Contact Us" title="Talk to our team" text="Request a consultation for electricity, gas, steam or air-conditioning supply requirements." image={IMAGES.commercial} />
      <section className="container-x grid gap-12 py-20 lg:grid-cols-[1fr_1.5fr]">
        <aside className="space-y-8">
          <div>
            <p className="eyebrow">Company</p>
            <h2 className="mt-2 text-xl font-bold text-navy">{company.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{company.business}</p>
          </div>
          <ul className="space-y-5">
            <li><a href={`tel:${company.phone}`} className="flex items-start gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-navy text-energy">{Icon.phone()}</span><span><span className="block text-xs text-muted-foreground">Phone</span><span className="font-semibold text-brand">{company.phone}</span></span></a></li>
            <li><a href={`mailto:${company.email}`} className="flex items-start gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-navy text-energy">{Icon.mail()}</span><span><span className="block text-xs text-muted-foreground">Email</span><span className="font-semibold text-brand">{company.email}</span></span></a></li>
            <li className="flex items-start gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-navy text-energy">{Icon.pin()}</span><span><span className="block text-xs text-muted-foreground">Registered Office</span><span className="text-sm text-foreground">{company.address}</span></span></li>
          </ul>
          <div className="grid aspect-[4/3] place-items-center rounded-md border border-dashed bg-muted p-6 text-center text-sm text-muted-foreground">
            Map placeholder — Bhosari Industrial Area, Pune.<br />An exact map location will be added once confirmed.
          </div>
        </aside>

        <div className="rounded-md border bg-card p-6 shadow-sm md:p-10">
          <h2 className="text-2xl font-bold text-navy">Request a Consultation</h2>
          <p className="mt-2 rounded-sm bg-energy/10 px-3 py-2 text-xs text-foreground">Demo notice: enquiries are saved only in this browser and are not sent to the company. To reach us, please call or email.</p>
          {status === "done" ? (
            <div role="status" className="mt-8 rounded-md border border-success/40 bg-success/10 p-8 text-center">
              <h3 className="text-xl font-bold text-navy">Thank you — your enquiry has been recorded.</h3>
              <p className="mt-2 text-sm text-muted-foreground">It is saved as a demo entry in this browser and visible in the admin dashboard.</p>
              <button className="btn btn-brand mt-6" onClick={() => setStatus("idle")}>Submit another enquiry</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
              <div><label htmlFor="name" className={label}>Full name *</label><input id="name" className="field" value={v.name} onChange={set("name")} maxLength={100} aria-invalid={!!errors.name} aria-describedby="name-err" />{err("name")}</div>
              <div><label htmlFor="company" className={label}>Company name</label><input id="company" className="field" value={v.company} onChange={set("company")} maxLength={120} />{err("company")}</div>
              <div><label htmlFor="phone" className={label}>Phone number *</label><input id="phone" type="tel" inputMode="tel" className="field" value={v.phone} onChange={set("phone")} maxLength={20} aria-invalid={!!errors.phone} aria-describedby="phone-err" />{err("phone")}</div>
              <div><label htmlFor="email" className={label}>Email address *</label><input id="email" type="email" className="field" value={v.email} onChange={set("email")} maxLength={255} aria-invalid={!!errors.email} aria-describedby="email-err" />{err("email")}</div>
              <div><label htmlFor="service" className={label}>Service required *</label>
                <select id="service" className="field" value={v.service} onChange={set("service")} aria-invalid={!!errors.service}>
                  <option value="">Select a service</option>
                  {services.filter((s) => s.published).map((s) => <option key={s.id}>{s.title}</option>)}
                  <option>Other / Not sure</option>
                </select>{err("service")}</div>
              <div><label htmlFor="industry" className={label}>Industry</label>
                <select id="industry" className="field" value={v.industry} onChange={set("industry")}>
                  <option value="">Select an industry</option>
                  {industries.map((i) => <option key={i.id}>{i.title}</option>)}
                  <option>Other</option>
                </select></div>
              <div className="sm:col-span-2"><label htmlFor="req" className={label}>Project requirements *</label><textarea id="req" rows={5} className="field" value={v.requirements} onChange={set("requirements")} maxLength={1500} aria-invalid={!!errors.requirements} aria-describedby="requirements-err" />{err("requirements")}</div>
              <fieldset className="sm:col-span-2">
                <legend className={label}>Preferred contact method *</legend>
                <div className="flex gap-6">
                  {["Email", "Phone"].map((m) => (
                    <label key={m} className="flex items-center gap-2 text-sm"><input type="radio" name="method" value={m} checked={v.method === m} onChange={set("method")} className="accent-brand" /> {m}</label>
                  ))}
                </div>{err("method")}
              </fieldset>
              <div className="sm:col-span-2">
                <button type="submit" disabled={status === "saving"} className="btn btn-energy w-full sm:w-auto">{status === "saving" ? "Submitting…" : "Submit Enquiry"}</button>
                {Object.keys(errors).length > 0 && <p role="alert" className="mt-3 text-sm text-destructive">Please correct the highlighted fields.</p>}
              </div>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
