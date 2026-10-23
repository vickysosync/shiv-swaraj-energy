<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Project rules
- All site content lives in `src/lib/store.ts` (defaults + localStorage via useSyncExternalStore); public pages and admin read/write only through it — user required mock data, no database.
- Admin auth is a demo localStorage flag; never treat it as security.
- Shared public chrome (header/footer/banner/modal) lives in `src/components/site.tsx`; admin widgets in `src/components/admin.tsx`.
- Brand colors are CSS vars (--navy/--brand/--energy) overridable at runtime from admin settings.
