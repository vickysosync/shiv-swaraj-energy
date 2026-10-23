import { useSyncExternalStore } from "react";
import hero from "@/assets/hero.jpg";
import electricity from "@/assets/electricity.jpg";
import gas from "@/assets/gas.jpg";
import steam from "@/assets/steam.jpg";
import hvac from "@/assets/hvac.jpg";
import manufacturing from "@/assets/manufacturing.jpg";
import warehouse from "@/assets/warehouse.jpg";
import commercial from "@/assets/commercial.jpg";
import substation from "@/assets/substation.jpg";
import controlRoom from "@/assets/control-room.jpg";
import sustainability from "@/assets/sustainability.jpg";
import chiller from "@/assets/chiller.jpg";
import processing from "@/assets/processing.jpg";
import institutional from "@/assets/institutional.jpg";
import heatRecovery from "@/assets/heat-recovery.jpg";

export const IMAGES = {
  hero, electricity, gas, steam, hvac, manufacturing, warehouse, commercial,
  substation, controlRoom, sustainability, chiller, processing, institutional, heatRecovery,
};

export const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="540" viewBox="0 0 800 540"><rect width="800" height="540" fill="#10243A"/><path d="M410 170l-60 110h50l-20 90 70-120h-52z" fill="#F59E0B"/><text x="400" y="440" fill="#94A3B8" font-family="sans-serif" font-size="20" text-anchor="middle">Image unavailable</text></svg>',
  );

export type Service = { id: string; slug: string; title: string; short: string; description: string; points: string[]; image: string; published: boolean };
export type Industry = { id: string; title: string; description: string; needs: string[]; image: string };
export type Project = { id: string; title: string; category: string; location: string; description: string; details: string; image: string; published: boolean };
export type GalleryItem = { id: string; title: string; description: string; category: string; image: string };
export type EnquiryStatus = "New" | "Reviewed" | "Closed";
export type Enquiry = {
  id: string; createdAt: string; name: string; company: string; phone: string; email: string;
  service: string; industry: string; requirements: string; method: string; status: EnquiryStatus;
};
export type Company = {
  name: string; shortName: string; tagline: string; intro: string; overview: string; mission: string; vision: string;
  values: string[]; phone: string; email: string; address: string; cin: string; incorporated: string; roc: string; business: string;
};
export type Home = {
  heroTitle: string; heroText: string; heroImage: string; ctaPrimary: string; ctaSecondary: string;
  featuredServices: string[]; featuredProjects: string[];
  showIndustries: boolean; showProjects: boolean; showSustainability: boolean;
};
export type Settings = { navy: string; brand: string; energy: string; footerText: string };
export type SiteData = {
  company: Company; home: Home; settings: Settings; services: Service[]; industries: Industry[];
  projects: Project[]; gallery: GalleryItem[]; enquiries: Enquiry[];
};

export const DEFAULT_DATA: SiteData = {
  company: {
    name: "SHIV SWARAJ TECHNOLOGY PRIVATE LIMITED",
    shortName: "Shiv Swaraj Technology",
    tagline: "Electricity · Gas · Steam · Air-Conditioning Supply",
    intro:
      "Shiv Swaraj Technology Private Limited is a Pune-based company incorporated in 2026 in the electricity, gas, steam and air-conditioning supply sector, focused on dependable utility solutions for industrial and commercial facilities.",
    overview:
      "Registered in Pune, Maharashtra, Shiv Swaraj Technology Private Limited operates in the electricity, gas, steam and air-conditioning supply sector. The company is built around a simple idea: industrial operations depend on utilities that are planned carefully, coordinated well and run reliably. Our focus is on understanding each facility's utility requirements and approaching them with technical discipline and clear communication.",
    mission:
      "To support industrial and commercial facilities with well-planned utility solutions that prioritise reliability, safety and efficient use of energy.",
    vision:
      "To become a trusted name for industrial utility supply in Maharashtra and beyond, known for dependable service and responsible energy practice.",
    values: ["Reliability in every commitment", "Safety as a non-negotiable", "Transparency with clients", "Efficient, responsible energy use"],
    phone: "3412341325",
    email: "shivswaraj@gmail.com",
    address: "Plot No. T-80, Gala No. F-02, Mangalmurti T Block, Bhosari Industrial Area, Pune City, Pune, Maharashtra, India",
    cin: "U35105PN2026PTC258764",
    incorporated: "5 August 2026",
    roc: "Pune",
    business: "Electricity, Gas, Steam and Air-Conditioning Supply",
  },
  home: {
    heroTitle: "Reliable Energy Solutions for Modern Industry",
    heroText:
      "Explore industrial utility solutions across electricity, gas, steam and air-conditioning supply, designed around operational reliability and efficient infrastructure.",
    heroImage: hero,
    ctaPrimary: "Explore Our Services",
    ctaSecondary: "Contact Our Team",
    featuredServices: ["svc-electricity", "svc-gas", "svc-steam", "svc-ac"],
    featuredProjects: ["prj-1", "prj-3", "prj-4"],
    showIndustries: true,
    showProjects: true,
    showSustainability: true,
  },
  settings: {
    navy: "#10243A",
    brand: "#1769AA",
    energy: "#F59E0B",
    footerText: "Industrial utility solutions across electricity, gas, steam and air-conditioning supply, from Pune, Maharashtra.",
  },
  services: [
    {
      id: "svc-electricity", slug: "electricity", title: "Electricity Supply", image: electricity, published: true,
      short: "Industrial electricity supply concepts built around stable power and dependable infrastructure.",
      description:
        "Industrial facilities need power that is stable, adequately sized and well coordinated with the local utility. This service area covers the planning and coordination considerations behind industrial electricity supply.",
      points: ["Industrial electricity supply concepts", "Power infrastructure planning", "Electrical utility coordination", "Energy efficiency and operational reliability"],
    },
    {
      id: "svc-gas", slug: "gas", title: "Gas Supply", image: gas, published: true,
      short: "Industrial gas supply planning with attention to safety and continuity.",
      description:
        "Gas is central to many heating and process operations. This service area focuses on supply planning, infrastructure support and operational coordination for industrial gas usage.",
      points: ["Industrial gas supply concepts", "Utility infrastructure support", "Supply planning", "Operational coordination"],
    },
    {
      id: "svc-steam", slug: "steam", title: "Steam Supply", image: steam, published: true,
      short: "Steam utility concepts for process heating and industrial applications.",
      description:
        "Steam remains one of the most effective carriers of process heat. This service area addresses steam utility planning, process heating applications and the efficiency of steam distribution.",
      points: ["Industrial steam utility concepts", "Process heating applications", "Steam efficiency", "Utility planning"],
    },
    {
      id: "svc-ac", slug: "air-conditioning", title: "Air-Conditioning Supply", image: hvac, published: true,
      short: "Industrial and commercial cooling with a focus on energy-efficient climate control.",
      description:
        "Cooling loads in factories, warehouses and commercial buildings are significant energy consumers. This service area covers HVAC supply concepts, climate control and cooling efficiency.",
      points: ["Industrial and commercial cooling", "HVAC supply concepts", "Climate control", "Energy efficiency"],
    },
  ],
  industries: [
    { id: "ind-1", title: "Manufacturing Facilities", image: manufacturing, description: "Production lines depend on uninterrupted power, process heat and controlled environments.", needs: ["Stable electricity", "Process steam", "Shop-floor cooling"] },
    { id: "ind-2", title: "Industrial Processing", image: processing, description: "Processing plants rely on precise heating, gas availability and dependable utilities.", needs: ["Process gas", "Steam for heating", "Reliable power"] },
    { id: "ind-3", title: "Warehousing & Logistics", image: warehouse, description: "Large storage spaces need efficient lighting, power distribution and climate management.", needs: ["Power distribution", "Temperature control", "Efficient lighting loads"] },
    { id: "ind-4", title: "Commercial Buildings", image: commercial, description: "Offices and commercial complexes need comfortable, efficient air-conditioning and power.", needs: ["Central air-conditioning", "Electrical supply", "Energy monitoring"] },
    { id: "ind-5", title: "Infrastructure", image: substation, description: "Infrastructure assets require robust electrical systems and coordinated utility planning.", needs: ["High-capacity power", "Utility coordination", "Redundancy planning"] },
    { id: "ind-6", title: "Institutional Facilities", image: institutional, description: "Campuses and hospitals need continuous utilities and comfortable indoor environments.", needs: ["Continuous power", "HVAC", "Hot water and steam"] },
  ],
  projects: [
    { id: "prj-1", title: "Substation Upgrade Concept", category: "Electrical Infrastructure", location: "Location to be confirmed", image: substation, published: true, description: "An illustrative concept for upgrading an industrial substation for higher load reliability.", details: "This illustrative project shows how an industrial site might plan a substation upgrade: assessing existing loads, planning transformer capacity, and coordinating with the electricity utility for a phased changeover with minimal downtime." },
    { id: "prj-2", title: "Process Gas Distribution Layout", category: "Industrial Gas Utilities", location: "Location to be confirmed", image: gas, published: true, description: "An illustrative gas distribution layout for a processing facility.", details: "This illustrative project outlines a gas distribution concept with metering, pressure regulation and isolation points planned around a processing facility's production areas." },
    { id: "prj-3", title: "Boiler House Efficiency Review", category: "Steam Systems", location: "Location to be confirmed", image: steam, published: true, description: "An illustrative review of steam generation and distribution efficiency.", details: "This illustrative project describes how a boiler house review might examine steam generation, condensate return and insulation to identify efficiency opportunities." },
    { id: "prj-4", title: "Chiller Plant Modernisation Concept", category: "HVAC & Cooling", location: "Location to be confirmed", image: chiller, published: true, description: "An illustrative concept for modernising a central chiller plant.", details: "This illustrative project explores how a central chiller plant could be modernised with efficient chillers, variable-speed pumping and better controls for a commercial building." },
    { id: "prj-5", title: "Utility Monitoring Control Room", category: "Energy Efficiency", location: "Location to be confirmed", image: controlRoom, published: true, description: "An illustrative concept for centralised utility monitoring.", details: "This illustrative project shows how a facility might centralise monitoring of electricity, steam and cooling consumption to support informed energy decisions." },
    { id: "prj-6", title: "Heat Recovery Integration Study", category: "Energy Efficiency", location: "Location to be confirmed", image: heatRecovery, published: true, description: "An illustrative study of recovering waste heat for process use.", details: "This illustrative project describes a heat recovery concept where waste heat from utility systems is captured through heat exchangers and reused for process or water heating." },
  ],
  gallery: [
    { id: "gal-1", title: "Power Plant at Dusk", category: "Industrial Facilities", image: hero, description: "A modern power generation facility with transmission infrastructure." },
    { id: "gal-2", title: "Switchgear Room", category: "Electrical Systems", image: electricity, description: "Rows of industrial switchgear panels during inspection." },
    { id: "gal-3", title: "Outdoor Substation", category: "Electrical Systems", image: substation, description: "High-voltage transformer and insulators at a substation." },
    { id: "gal-4", title: "Gas Pipeline Valves", category: "Gas Infrastructure", image: gas, description: "Industrial gas piping with gauges and valves." },
    { id: "gal-5", title: "Boiler House", category: "Steam Equipment", image: steam, description: "Industrial boilers and insulated steam lines." },
    { id: "gal-6", title: "Heat Exchanger", category: "Steam Equipment", image: heatRecovery, description: "Heat exchanger and metering in a utility room." },
    { id: "gal-7", title: "Rooftop HVAC Units", category: "Air-Conditioning", image: hvac, description: "Commercial rooftop air-conditioning units." },
    { id: "gal-8", title: "Chiller Plant", category: "Air-Conditioning", image: chiller, description: "Central chillers and chilled water piping." },
    { id: "gal-9", title: "Manufacturing Floor", category: "Industrial Facilities", image: manufacturing, description: "Automated production line inside a factory." },
    { id: "gal-10", title: "Processing Plant", category: "Utility Environments", image: processing, description: "Stainless process tanks and piping." },
    { id: "gal-11", title: "Utility Control Room", category: "Utility Environments", image: controlRoom, description: "Engineers monitoring utility dashboards." },
    { id: "gal-12", title: "Solar and Cooling Towers", category: "Utility Environments", image: sustainability, description: "Rooftop solar beside cooling towers at an industrial building." },
  ],
  enquiries: [],
};

const KEY = "sst-site-data-v1";
const listeners = new Set<() => void>();
let cache: SiteData | null = null;

function read(): SiteData {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? { ...DEFAULT_DATA, ...(JSON.parse(raw) as Partial<SiteData>) } : DEFAULT_DATA;
  } catch {
    cache = DEFAULT_DATA;
  }
  return cache;
}
function emit() { listeners.forEach((l) => l()); }
function subscribe(l: () => void) { listeners.add(l); return () => listeners.delete(l); }

export function useData(): SiteData {
  return useSyncExternalStore(subscribe, read, () => DEFAULT_DATA);
}
export function updateData(fn: (d: SiteData) => SiteData) {
  cache = fn(read());
  try { window.localStorage.setItem(KEY, JSON.stringify(cache)); } catch { /* storage full */ }
  emit();
}
export function resetData() {
  window.localStorage.removeItem(KEY);
  cache = DEFAULT_DATA;
  emit();
}
export function newId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}`;
}

/* Demo admin auth — NOT secure, browser-only */
export const DEMO_CREDENTIALS = { email: "admin@shivswaraj.demo", password: "Demo@2026" };
const AUTH_KEY = "sst-admin-session";
const authListeners = new Set<() => void>();
export function isAuthed() {
  try { return window.localStorage.getItem(AUTH_KEY) === "1"; } catch { return false; }
}
export function useAuthed() {
  return useSyncExternalStore(
    (l) => { authListeners.add(l); return () => authListeners.delete(l); },
    isAuthed,
    () => false,
  );
}
export function login(email: string, password: string) {
  if (email.trim().toLowerCase() === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
    window.localStorage.setItem(AUTH_KEY, "1");
    authListeners.forEach((l) => l());
    return true;
  }
  return false;
}
export function logout() {
  window.localStorage.removeItem(AUTH_KEY);
  authListeners.forEach((l) => l());
}

/* Validation for consultation form */
export type EnquiryInput = Omit<Enquiry, "id" | "createdAt" | "status">;
export function validateEnquiry(v: EnquiryInput) {
  const e: Partial<Record<keyof EnquiryInput, string>> = {};
  if (!v.name.trim()) e.name = "Please enter your full name.";
  else if (v.name.length > 100) e.name = "Name must be under 100 characters.";
  if (v.company.length > 120) e.company = "Company name must be under 120 characters.";
  const digits = v.phone.replace(/[\s+\-()]/g, "");
  if (!v.phone.trim()) e.phone = "Please enter your phone number.";
  else if (!/^\d{10,13}$/.test(digits)) e.phone = "Enter a valid phone number (10–13 digits).";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (!v.service) e.service = "Please select a service.";
  if (!v.requirements.trim()) e.requirements = "Please describe your requirements.";
  else if (v.requirements.length > 1500) e.requirements = "Please keep requirements under 1500 characters.";
  if (!v.method) e.method = "Choose a preferred contact method.";
  return e;
}
