# Shiv Swaraj Energy

# LOVABLE AI PROMPT — SHIV SWARAJ TECHNOLOGY PRIVATE LIMITED
## Premium Dynamic Corporate Portfolio Website

Build a premium, professional, fully responsive, dynamic corporate portfolio website for **SHIV SWARAJ TECHNOLOGY PRIVATE LIMITED**, a company in the electricity, gas, steam and air-conditioning supply sector.

The website must look like a genuine industrial energy company's corporate website, with professional branding, realistic industrial photography, clean layouts, meaningful content, separate pages, and a fully functional demo admin panel.

**IMPORTANT: Do not create a single-page website where every navigation item displays content on the homepage. Every main navigation item must open its own dedicated page. The homepage must show only essential highlights.**

## 1. Strict Technology Rules

- Use React + Vite + Tailwind CSS only.
- Use JavaScript, not TypeScript.
- Do not use Next.js.
- Do not use any additional libraries, frameworks, UI kits, icon libraries, or routing libraries.
- Use native React functionality, CSS, HTML, and browser APIs.
- Use mock data only.
- Do not create or connect any database.
- Do not use backend APIs, external authentication, or paid services.
- Use local storage for demo content management and consultation form submissions.
- Keep the source code organized, reusable, and easy to maintain.

## 2. Company Details

**Company Name:** SHIV SWARAJ TECHNOLOGY PRIVATE LIMITED

**Business Type:** Electricity, Gas, Steam and Air-Conditioning Supply

**Phone:** 3412341325

**Email:** shivswaraj@gmail.com

**Registered Office Address:** Plot No. T-80, Gala No. F-02, Mangalmurti T Block, Bhosari Industrial Area, Pune City, Pune, Maharashtra, India.

**CIN:** U35105PN2026PTC258764

**Incorporation Date:** 5 August 2026

**ROC:** Pune

Use the provided business information consistently throughout the website. Make phone and email clickable using `tel:3412341325` and `mailto:shivswaraj@gmail.com`.

Do not invent additional phone numbers, addresses, licenses, certifications, awards, customer names, completed projects, or financial statistics. Clearly label sample projects and testimonials as illustrative demo content.

## 3. Brand Colors and Visual Identity

Use a premium industrial energy color palette:

- Primary navy: `#10243A`
- Industrial blue: `#1769AA`
- Energy orange: `#F59E0B`
- White: `#FFFFFF`
- Light background: `#F1F5F9`
- Text: `#1E293B`
- Secondary grey: `#64748B`

Use navy for the header, footer, and important corporate elements. Use blue for links and secondary buttons, and orange for important calls to action.

The overall style must be premium, clean, corporate, and industrial.

Avoid generic AI website styling, excessive gradients, repetitive card grids, oversized rounded corners, excessive animation, and unnecessary decorative elements. Use realistic photography, balanced whitespace, clear typography, and a consistent design system.

## 4. Separate Pages and Navigation — CRITICAL REQUIREMENT

Create a proper multi-page website with the following independent routes:

1. `/` — Home
2. `/about` — About Us
3. `/services` — Services
4. `/industries` — Industries We Serve
5. `/projects` — Projects and Case Studies
6. `/sustainability` — Sustainability
7. `/gallery` — Gallery
8. `/contact` — Contact Us
9. `/admin/login` — Admin Login
10. `/admin/dashboard` — Admin Dashboard

Use a lightweight custom React router built with the browser History API. Do not install any routing library.

### Navigation behavior

- Clicking About Us must open `/about`.
- Clicking Services must open `/services`.
- Clicking Industries must open `/industries`.
- Clicking Projects must open `/projects`.
- Clicking Sustainability must open `/sustainability`.
- Clicking Gallery must open `/gallery`.
- Clicking Contact Us must open `/contact`.
- Clicking the logo must return to `/`.
- Each page must display its own relevant content, not the same homepage content.
- Browser back and forward buttons must work.
- Directly opening or refreshing any route must display the correct page.
- The active navigation item must be visually highlighted.
- The mobile hamburger menu must work correctly.
- Unknown routes must display a proper 404 page with a link back to the homepage.
- No navigation link should be a dead link or point to `#` as a substitute for a real page.

**Do not render every page section on the homepage.** The homepage should contain only a short hero, company introduction, selected service highlights, a few industry highlights, featured project previews, and a contact CTA. Full content belongs on its respective page.

Use shared header and footer components across public pages.

## 5. Header and Hero Section

### Header

Create a responsive corporate header with:

- Company logo and company name.
- Home
- About Us
- Services
- Industries
- Projects
- Sustainability
- Gallery
- Contact Us

Include a prominent **Request a Consultation** button.

Make the phone number available in a convenient contact area without overcrowding the header.

### Hero banner

Use a large, high-quality banner image showing a realistic industrial energy facility, electrical infrastructure, industrial utility equipment, or a modern power plant.

Headline:

**Reliable Energy Solutions for Modern Industry**

Supporting text:

“Explore industrial utility solutions across electricity, gas, steam and air-conditioning supply, designed around operational reliability and efficient infrastructure.”

Primary button: **Explore Our Services**

Secondary button: **Contact Our Team**

Requirements:
- Full-width photographic hero banner.
- Professional image overlay for readable text.
- Responsive layout for desktop, tablet, and mobile.
- Proper text contrast.
- Working CTA navigation.
- Subtle, purposeful animations only.
- Do not use a plain gradient or blank background instead of the required banner image.

## 6. Homepage — Essential Highlights Only

The homepage must remain concise and professional.

Include only:

1. Hero banner.
2. Short company introduction.
3. Four featured service previews.
4. Selected industries.
5. Two or three illustrative project previews.
6. A brief sustainability highlight.
7. A consultation CTA.
8. Footer.

Each preview should have a **View All**, **Explore Services**, or **Learn More** link that opens the appropriate dedicated page.

Do not put the full About Us content, all service descriptions, the complete project catalogue, the entire gallery, or the full contact form on the homepage.

## 7. About Us Page — `/about`

Create a complete company profile page with:

- Company overview.
- Mission and vision.
- Core values.
- Commitment to reliability and operational efficiency.
- Industrial energy and utility supply focus.
- Company registration information.
- Registered office information.

Use a dedicated page banner and relevant industrial photography.

Present company details in a clean corporate layout. Do not invent unsupported company achievements or operational capabilities.

## 8. Services Page — `/services`

Create a complete services page with individual service descriptions, dedicated images, and consultation links.

### Electricity Supply
- Industrial electricity supply concepts.
- Power infrastructure.
- Electrical utility coordination.
- Energy efficiency and operational reliability.

### Gas Supply
- Industrial gas supply concepts.
- Utility infrastructure support.
- Supply planning and operational coordination.

### Steam Supply
- Industrial steam utility concepts.
- Process heating applications.
- Steam efficiency and utility planning.

### Air-Conditioning Supply
- Industrial and commercial cooling.
- HVAC supply concepts.
- Climate control and energy efficiency.

Each service must have its own title, description, relevant image, and **Request a Consultation** action.

Make it possible to select a service and automatically prefill that selection in the contact form.

Clearly distinguish demo descriptions from verified company-specific service capabilities.

## 9. Industries Page — `/industries`

Create a separate page for potential industry sectors, including:

- Manufacturing facilities.
- Industrial processing.
- Warehousing and logistics.
- Commercial buildings.
- Infrastructure.
- Institutional facilities.

Give each industry its own image, heading, concise description, and relevant utility requirements.

Use realistic and distinct photography rather than repeating one image.

Do not claim that these are confirmed existing clients or customers.

## 10. Projects Page — `/projects`

Create a complete project showcase using mock data.

Example project categories:

- Electrical infrastructure.
- Industrial gas utilities.
- Steam systems.
- HVAC and cooling.
- Energy efficiency.

Every project must have:
- A unique photograph.
- Project title.
- Category.
- Location placeholder.
- Short description.
- Project detail page or detail modal.
- Working category filters.

Label sample projects **Illustrative Demo Project**. Do not falsely present them as completed projects of the company.

Project content must be editable through the admin panel.

## 11. Sustainability Page — `/sustainability`

Create a dedicated sustainability page featuring:

- Responsible energy consumption.
- Efficient utility planning.
- Resource optimization.
- Energy-conscious industrial operations.
- Sustainable infrastructure concepts.

Use appropriate photography of modern industrial infrastructure and energy-efficient systems.

Avoid unverified environmental statistics, carbon reduction claims, or green certifications.

## 12. Gallery Page — `/gallery`

Create a dedicated, image-rich gallery page featuring:

- Industrial facilities.
- Electrical systems.
- Gas infrastructure.
- Steam equipment.
- Air-conditioning installations.
- Industrial utility environments.

Features:
- Responsive image grid.
- Category filters.
- Image preview modal.
- Previous and next navigation.
- Image titles and descriptions.
- Lazy loading.
- Graceful fallback for broken images.

The gallery must contain multiple distinct and relevant images, not a grid of duplicated photographs.

## 13. Contact Page — `/contact`

Create a dedicated contact page with company information and a functional demo enquiry form.

Display:

- Company name.
- Phone: 3412341325.
- Email: shivswaraj@gmail.com.
- Registered office address.
- Business category.
- Working contact links.

### Consultation form

Include:
- Full name.
- Company name.
- Phone number.
- Email address.
- Service required.
- Industry.
- Project requirements.
- Preferred contact method.

Implement required-field validation, email and phone validation, clear error messages, and a success confirmation.

Store submitted requests in local storage and show them inside the admin dashboard. Clearly state that demo enquiries are saved only in the current browser and are not sent to the actual company.

Include a map placeholder if needed, but do not invent geographic coordinates or a map URL.

## 14. Admin Login — `/admin/login`

Create a dedicated admin login page with a premium, simple design.

Provide documented demo credentials in the login interface or setup instructions.

Use React state and local storage for demonstration-only login persistence.

After a successful demo login, navigate to `/admin/dashboard`.

Protect admin routes against casual unauthenticated navigation in the demo.

Include logout functionality and a clear notice that the login is not production-secure because there is no backend.

Do not use real credentials or expose confidential information.

## 15. Admin Dashboard — `/admin/dashboard`

Build a full admin dashboard with a sidebar, header, overview cards, tables, search, filters, forms, and confirmation dialogs.

### Dashboard overview
- Total consultation requests.
- New enquiries.
- Reviewed enquiries.
- Number of service categories.
- Published projects.
- Recent demo activity.

### Company profile management
- Edit company introduction.
- Edit mission and vision.
- Manage contact information and registered office details.
- Update company branding.

### Services management
- Add services.
- Edit services.
- Delete services.
- Update images and descriptions.
- Publish or unpublish services.

### Projects management
- Add and edit projects.
- Update project images and categories.
- Publish or unpublish projects.
- Label demo projects clearly.

### Gallery management
- Add image URLs.
- Edit titles and descriptions.
- Manage categories.
- Remove images.
- Preview images.

### Homepage management
- Edit hero headline and description.
- Update the hero banner image.
- Update CTA labels.
- Select featured services.
- Select featured projects.
- Control which highlights appear on the homepage.

### Consultation management
- View submitted enquiries.
- Search and filter enquiries.
- View complete enquiry details.
- Change enquiry status.
- Delete entries after confirmation.

### Website settings
- Manage brand colors.
- Edit footer text.
- Update contact details.
- Configure demo content.
- Reset mock data after confirmation.

All supported content changes must persist using local storage and update the public website dynamically.

Use sensible sample data and professional empty states.

## 16. Footer Requirements

Create a shared footer across all public pages containing:

- Company name and short introduction.
- Quick links to each dedicated page.
- Service links.
- Phone and email.
- Registered office address.
- Copyright information.
- Privacy Policy and Terms links.
- Admin Login link.

**The Admin Login link must be clearly visible in the footer and open `/admin/login`.**

Include the exact development credit:

**Designed and development by SOSynch Ai Tech**

Use a professional navy footer with clean typography and responsive columns.

## 17. Images and Image Handling

Use multiple distinct, high-quality photographs across the hero, company profile, services, industries, projects, sustainability, and gallery pages.

Requirements:
- Select photographs relevant to each section.
- Avoid repeated images across unrelated sections.
- Use suitable aspect ratios and consistent cropping.
- Add meaningful alt text.
- Lazy-load noncritical images.
- Provide fallback images or graceful error states.
- Store image URLs in centralized mock data for admin editing.
- Verify image URLs load correctly before final delivery.
- Never leave broken image placeholders or empty hero sections.

Do not add unnecessary stock imagery to every section; use images where they improve the company's presentation.

## 18. Design and Responsive Experience

Support:
- Mobile phones.
- Tablets.
- Laptops.
- Desktop screens.

Implement:
- Consistent spacing and typography.
- Accessible contrast and keyboard focus.
- Responsive navigation and tables.
- Mobile-friendly forms.
- Semantic HTML.
- Loading, success, error, and empty states.
- Subtle transitions.
- Reduced-motion support.

The design must feel intentionally crafted for an industrial energy company rather than copied from a generic template.

## 19. SEO and Performance

Implement:
- Appropriate page titles and meta descriptions.
- Semantic heading hierarchy.
- Descriptive image alt text.
- Consistent branding.
- Favicon.
- Custom 404 page.
- Optimized image loading.
- Clean, reusable components.

Do not claim verified search rankings or performance scores without actual testing.

## 20. Routing, Build and Deployment

The project must be ready for deployment to Vercel or Netlify.

Use only React, Vite, Tailwind CSS, JavaScript, and browser-native functionality.

Before completion:

1. Run `npm install`.
2. Run `npm run build`.
3. Resolve all build errors.
4. Run `npm run preview`.
5. Test every dedicated route.
6. Test browser back and forward navigation.
7. Refresh nested routes to verify SPA routing.
8. Test mobile navigation.
9. Test all homepage CTAs.
10. Test contact form validation and submission.
11. Test admin login and logout.
12. Test CRUD operations in admin modules.
13. Confirm that admin edits update the public website.
14. Verify images and links.
15. Check the browser console for critical errors.

Configure appropriate SPA rewrites for deployment so refreshing `/about`, `/services`, `/projects`, `/gallery`, `/contact`, and admin routes does not produce a hosting 404.

Provide clear publishing instructions for Vercel or Netlify, including repository import, build command, output directory, routing configuration, and live-site verification.

Do not invent a deployment URL or claim deployment is successful unless it has actually been published and verified.

## 21. Final Non-Negotiable Requirements

- React + Vite + Tailwind CSS only.
- No additional libraries or frameworks.
- Mock data only; no database.
- Premium corporate energy-sector design.
- Multiple distinct, relevant images.
- A proper hero banner image.
- Dedicated pages for every main navigation item.
- Homepage contains only important highlights.
- All navigation links open the correct pages.
- Functional demo admin login and dashboard.
- Admin manages the majority of website content.
- Admin Login link in the footer.
- Functional consultation form with local demo persistence.
- Exact footer credit: “Designed and development by SOSynch Ai Tech”.
- Responsive design and deployment readiness.

**Final instruction:** Build the complete website with working page navigation, not just a visual mockup. Do not place all sections on the homepage. Do not make every navigation link point to the same content. Finish and test the public website and admin dashboard before considering the demo complete.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/59341f1f-a5fb-44d0-ad03-65d5bfa4aaed).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
