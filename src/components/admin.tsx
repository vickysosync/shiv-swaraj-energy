import { useState, type ReactNode } from "react";
import { Img, Modal } from "@/components/site";

export type Field = { key: string; label: string; type?: "text" | "textarea" | "checkbox" | "image" | "list" | "select"; options?: string[]; suggestions?: string[] };
type Row = { id: string } & Record<string, unknown>;

export function Confirm({ open, title, text, onCancel, onConfirm, action = "Delete" }: { open: boolean; title: string; text: string; onCancel: () => void; onConfirm: () => void; action?: string }) {
  return (
    <Modal open={open} onClose={onCancel} label={title}>
      <div className="p-6">
        <h2 className="text-lg font-bold text-navy">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{text}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button className="btn btn-outline py-2" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger py-2" onClick={onConfirm}>{action}</button>
        </div>
      </div>
    </Modal>
  );
}

export function Panel({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="rounded-md border bg-card">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4">
        <h2 className="font-bold text-navy">{title}</h2>
        {action}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function FieldInput({ f, value, onChange }: { f: Field; value: unknown; onChange: (v: unknown) => void }) {
  const id = `f-${f.key}`;
  if (f.type === "checkbox")
    return <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-brand" /> {f.label}</label>;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">{f.label}</label>
      {f.type === "textarea" ? (
        <textarea id={id} rows={4} className="field" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />
      ) : f.type === "list" ? (
        <textarea id={id} rows={4} className="field" value={((value as string[]) ?? []).join("\n")} onChange={(e) => onChange(e.target.value.split("\n"))} placeholder="One item per line" />
      ) : f.type === "select" ? (
        <select id={id} className="field" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}>
          {f.options?.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <>
          <input id={id} className="field" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} list={f.suggestions ? `${id}-list` : undefined} placeholder={f.type === "image" ? "https://… image URL" : undefined} />
          {f.suggestions && <datalist id={`${id}-list`}>{f.suggestions.map((s) => <option key={s} value={s} />)}</datalist>}
          {f.type === "image" && !!value && <Img src={String(value)} alt="Preview" className="mt-2 h-32 w-full rounded-sm" />}
        </>
      )}
    </div>
  );
}

export function CrudEditor<T extends Row>({ title, items, fields, onChange, blank, toggleKey, search = true }: {
  title: string; items: T[]; fields: Field[]; onChange: (items: T[]) => void; blank: () => T; toggleKey?: string; search?: boolean;
}) {
  const [editing, setEditing] = useState<T | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [del, setDel] = useState<T | null>(null);
  const [q, setQ] = useState("");
  const [error, setError] = useState("");
  const shown = items.filter((i) => String(i.title ?? "").toLowerCase().includes(q.toLowerCase()));

  function save() {
    if (!editing) return;
    if (!String(editing.title ?? "").trim()) return setError("Title is required.");
    const clean = { ...editing } as Record<string, unknown>;
    for (const f of fields) if (f.type === "list") clean[f.key] = ((clean[f.key] as string[]) ?? []).map((s) => s.trim()).filter(Boolean);
    const next = clean as T;
    onChange(isNew ? [...items, next] : items.map((i) => (i.id === next.id ? next : i)));
    setEditing(null);
  }

  return (
    <Panel title={`${title} (${items.length})`} action={<button className="btn btn-energy py-2" onClick={() => { setEditing(blank()); setIsNew(true); setError(""); }}>+ Add</button>}>
      {search && <input className="field mb-4 max-w-xs" placeholder="Search by title…" value={q} onChange={(e) => setQ(e.target.value)} aria-label={`Search ${title}`} />}
      {shown.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">{items.length ? "No matches." : "Nothing here yet — add your first item."}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead><tr className="border-b text-left text-xs uppercase tracking-wider text-muted-foreground"><th className="py-2 pr-3">Image</th><th className="py-2 pr-3">Title</th><th className="py-2 pr-3">Category</th>{toggleKey && <th className="py-2 pr-3">Status</th>}<th className="py-2 text-right">Actions</th></tr></thead>
            <tbody>
              {shown.map((i) => (
                <tr key={i.id} className="border-b last:border-0">
                  <td className="py-3 pr-3"><Img src={String(i.image ?? "")} alt="" className="h-12 w-16 rounded-sm" /></td>
                  <td className="py-3 pr-3 font-medium text-navy">{String(i.title)}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{String(i.category ?? i.slug ?? "—")}</td>
                  {toggleKey && (
                    <td className="py-3 pr-3">
                      <button onClick={() => onChange(items.map((x) => (x.id === i.id ? { ...x, [toggleKey]: !x[toggleKey] } : x)))} className={`rounded-sm px-2 py-1 text-xs font-semibold ${i[toggleKey] ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
                        {i[toggleKey] ? "Published" : "Unpublished"}
                      </button>
                    </td>
                  )}
                  <td className="py-3 text-right whitespace-nowrap">
                    <button className="link-brand mr-4" onClick={() => { setEditing({ ...i }); setIsNew(false); setError(""); }}>Edit</button>
                    <button className="font-semibold text-destructive hover:underline" onClick={() => setDel(i)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal open={!!editing} onClose={() => setEditing(null)} label={`Edit ${title}`}>
        {editing && (
          <div className="p-6">
            <h2 className="text-lg font-bold text-navy">{isNew ? "Add" : "Edit"} {title.replace(/s$/, "")}</h2>
            <div className="mt-5 space-y-4">
              {fields.map((f) => <FieldInput key={f.key} f={f} value={editing[f.key]} onChange={(val) => setEditing({ ...editing, [f.key]: val })} />)}
            </div>
            {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
            <div className="mt-6 flex justify-end gap-3">
              <button className="btn btn-outline py-2" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn btn-navy py-2" onClick={save}>Save</button>
            </div>
          </div>
        )}
      </Modal>
      <Confirm open={!!del} title="Delete item?" text={`"${String(del?.title ?? "")}" will be permanently removed.`} onCancel={() => setDel(null)} onConfirm={() => { if (del) onChange(items.filter((x) => x.id !== del.id)); setDel(null); }} />
    </Panel>
  );
}
