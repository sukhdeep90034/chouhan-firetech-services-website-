import {
  Wrench,
  Droplets,
  Flame,
  Building2,
  ShieldAlert,
  Siren,
  Factory,
  School,
  HeartPulse,
  House,
  ShieldCheck,
  RotateCcw,
  Scale,
  Award,
} from "lucide-react";

// Asset images
import pipelineImage from "@/assets/fire-fighting-pipeline.jpg";
import sprinklerImage from "@/assets/fire-sprinkler-system.jpg";
import extinguisherImage from "@/assets/fire-extinguishers.jpg";
import fabricationImage from "@/assets/structure-fabrication.jpg";
import hydrantImage from "@/assets/hydrant-system.jpg";
import alarmImage from "@/assets/fire-alarm-system.jpg";
import projectIndustrialImage from "@/assets/project-industrial-plant.jpg";
import projectCommercialImage from "@/assets/project-commercial-complex.jpg";
import projectLogisticsImage from "@/assets/project-logistics-warehouse.jpg";
import projectCampusImage from "@/assets/project-educational-campus.jpg";
import projectPharmaImage from "@/assets/project-pharma-plant.jpg";
import projectPumproomImage from "@/assets/project-fire-pumproom.jpg";

// Company contact & legal info
export const PHONE = "9417828887";
export const FORMATTED_PHONE = "+91 94178-28887";
export const PHONE_SECONDARY = "9877044142";
export const FORMATTED_PHONE_SECONDARY = "+91 98770-44142";
export const PHONES = [PHONE, PHONE_SECONDARY];
export const FORMATTED_PHONES = [FORMATTED_PHONE, FORMATTED_PHONE_SECONDARY];
export const EMAIL = "chouhanfiretech53@gmail.com";
export const GSTIN = "03DVBPS7608H1ZI";
export const ADDRESS = "Shop No. 1, Urna, Sub Division Banur, District Mohali, Punjab, India";
export const MAPS_URL = "https://maps.app.goo.gl/4y2458yBEWQnX3rz9";
export const INSTAGRAM_HANDLE = "chouhan53786";
export const INSTAGRAM_URL = "https://www.instagram.com/chouhan53786/";

export const WHATSAPP_BASE = "https://wa.me/919417828887";
export const DEFAULT_WHATSAPP_TEXT = "Hello Chouhan Firetech Services, I would like to discuss a fire safety requirement.";
export const WHATSAPP = `${WHATSAPP_BASE}?text=${encodeURIComponent(DEFAULT_WHATSAPP_TEXT)}`;

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  features: string[];
  specs: {
    components: string[];
    applications: string[];
    maintenance: string;
  };
}

export const services: ServiceItem[] = [
  {
    id: "pipeline",
    title: "Fire Fighting Pipeline & Sealing",
    category: "Piping & Suppression",
    image: pipelineImage,
    description: "Installation and maintenance of fire fighting pipelines with professional sealing solutions.",
    features: [
      "Heavy-duty MS / GI pressure piping networks",
      "Precision fire stop & penetration sealing solutions",
      "Flow switches, zone control valves & pressure gauges",
      "Seamless integration with booster pumps and overhead tanks",
    ],
    specs: {
      components: [
        "UL/FM listed or IS standard pipe fittings & couplings",
        "Alarm check valve assemblies with water motor gong",
        "Penetration sealants complying with fire safety norms",
        "Drain & test valve manifolds",
      ],
      applications: ["Warehouses", "Factories", "Hotels", "Hospitals", "Multi-story Commercial Buildings", "Residential Complexes"],
      maintenance: "Periodic pressure testing, flow inspection, and annual leak audits.",
    },
  },
  {
    id: "sprinkler",
    title: "Sprinkler System",
    category: "Automatic Suppression",
    image: sprinklerImage,
    description: "Design, installation and maintenance of automatic sprinkler systems.",
    features: [
      "Pendent, upright & sidewall sprinkler heads with heat-sensitive bulbs",
      "Automated rapid thermal reaction at 68°C / 79°C ratings",
      "Flexible drop connections for false ceilings & grids",
      "Zone-controlled riser connections with pressure relief valves",
    ],
    specs: {
      components: [
        "UL/FM listed quick-response sprinkler heads",
        "Zone control station with tamper switches",
        "Flexible stainless steel braided drops",
        "End-of-line inspector test connections",
      ],
      applications: ["Malls & Retail Stores", "Corporate Offices", "Warehouses", "Apartment Buildings", "Hotels"],
      maintenance: "Quarterly water flow alarms test, annual sprinkler head visual audit.",
    },
  },
  {
    id: "extinguisher",
    title: "Extinguisher Refilling",
    category: "Refilling & Servicing",
    image: extinguisherImage,
    description: "Refilling and servicing of all types of fire extinguishers with testing and certification.",
    features: [
      "ABC Dry Chemical Powder (MAP based) refilling",
      "CO2 (Carbon Dioxide) high pressure refilling & valve servicing",
      "Water CO2 & Mechanical Foam (AFFF) refilling",
      "Hydrostatic pressure testing, replacement nozzles & tamper seals",
    ],
    specs: {
      components: [
        "Certified refilling agents complying with Indian Standards",
        "Pressure gauges, safety pins & tamper-evident seals",
        "Wall mounting brackets and protective canvas covers",
        "Refill inspection & testing date tag certification",
      ],
      applications: ["Retail Shops", "Offices", "Apartments", "Vehicles", "Workshops", "Schools & Institutes"],
      maintenance: "Recommended annual refilling / 3-year hydraulic testing depending on chemical class.",
    },
  },
  {
    id: "fabrication",
    title: "Structure Fabrication",
    category: "Industrial Fabrication",
    image: fabricationImage,
    description: "Custom fabrication for fire fighting structures and supports.",
    features: [
      "Heavy structural steel pipe supports and trapeze hangers",
      "Riser clamp assemblies and anti-sway seismic bracings",
      "Fire pump house skid fabrication and protective fencing",
      "Custom anti-corrosive primer and safety red enamel finishing",
    ],
    specs: {
      components: [
        "ISMC channels, equal angles & heavy base plates",
        "Threaded drop rods, anchor fasteners & U-bolts",
        "Vibration isolators and sound damping pad mounts",
        "Weatherproof external safety red coatings",
      ],
      applications: ["Industrial Sheds", "Pump Rooms", "External Yard Pipelines", "Rooftop Tank Headers"],
      maintenance: "Visual inspection for corrosion, weld integrity, and anchor tightness.",
    },
  },
  {
    id: "hydrant",
    title: "Hydrant Systems",
    category: "Water Network",
    image: hydrantImage,
    description: "Installation and maintenance of hydrant systems as per safety standards.",
    features: [
      "Single / Double headed landing valves with instantaneous couplings",
      "Swinging type first-aid fire hose reels with shut-off nozzles",
      "Reinforced canvas fire delivery hoses (Type A & Type B)",
      "Weatherproof outdoor hose boxes and breeching inlets",
    ],
    specs: {
      components: [
        "Gunmetal / Stainless steel landing valves (IS:5290)",
        "Thermoplastic / Rubber hose reel tubing (IS:12585)",
        "Cast iron / Mild steel fire brigade breeching connections",
        "Lockable MS / FRP hose cabinet enclosures",
      ],
      applications: ["Large Factories", "Textile Mills", "Commercial Malls", "High-rise Towers", "Institutions"],
      maintenance: "Monthly valve flushing, nozzle inspection, and periodic pump pressure runs.",
    },
  },
  {
    id: "alarm",
    title: "Fire Alarm Systems",
    category: "Detection & Alert",
    image: alarmImage,
    description: "Supply, installation and maintenance of advanced fire alarm systems.",
    features: [
      "Microprocessor-based conventional & addressable alarm panels",
      "Optical photoelectric smoke detectors & rate-of-rise heat sensors",
      "Manual call points (Break-glass units) with hammer/chain",
      "High-decibel dual hooters with flashing strobe beacons",
    ],
    specs: {
      components: [
        "Multi-zone fire alarm control panels (FACP) with battery backup",
        "UL / EN54 compliant optical smoke & multi-criteria detectors",
        "Weather-resistant sounder strobes (100dB+ alert output)",
        "Fire-retardant armored signal cabling",
      ],
      applications: ["Commercial Offices", "Hotels", "Schools & Colleges", "Hospitals", "Banks", "Warehouses"],
      maintenance: "Quarterly detector sensitivity testing, panel battery backup checks, and audible drills.",
    },
  },
];

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  capacities: string;
  rating: string;
  description: string;
  standards: string;
}

export const productsList: ProductItem[] = [
  {
    id: "abc-extinguisher",
    name: "ABC Dry Powder Fire Extinguisher",
    category: "Extinguishers",
    capacities: "1kg, 2kg, 4kg, 6kg, 9kg",
    rating: "Class A, B, C & Electrical",
    description: "Multi-purpose dry chemical powder extinguisher with pressure gauge, safety pin, and bracket.",
    standards: "IS:15683 Certified",
  },
  {
    id: "co2-extinguisher",
    name: "CO2 Gas Fire Extinguisher",
    category: "Extinguishers",
    capacities: "2kg, 3kg, 4.5kg",
    rating: "Class B & Live Electrical Fire",
    description: "High-pressure seamless carbon dioxide cylinder with discharge horn. Leaves no residue, ideal for server rooms & panels.",
    standards: "IS:15683 / PESO Approved",
  },
  {
    id: "foam-extinguisher",
    name: "Mechanical Foam (AFFF) Extinguisher",
    category: "Extinguishers",
    capacities: "9 Litres / 50L Trolley",
    rating: "Class A & Flammable Liquids (Class B)",
    description: "Aqueous Film Forming Foam creates a blanket over flammable fuels, oils, paints, and petrol.",
    standards: "IS:15683 Compliant",
  },
  {
    id: "sprinkler-heads",
    name: "Automatic Ceiling Sprinkler Heads",
    category: "Suppression",
    capacities: "1/2\" & 3/4\" NPT",
    rating: "68°C / 79°C / 93°C Bulb",
    description: "Pendent, upright, and horizontal sidewall sprinkler heads with heat-reactive red liquid quartz bulbs.",
    standards: "UL Listed / FM Approved / IS Standards",
  },
  {
    id: "hose-reel",
    name: "First-Aid Fire Hose Reel Drum",
    category: "Hydrants",
    capacities: "30 Metre Length (19mm / 25mm)",
    rating: "High-Pressure Hydraulic Tubing",
    description: "Swinging type wall mounting drum with brass shut-off jet & spray nozzle for immediate occupant fire attack.",
    standards: "IS:884 Certified",
  },
  {
    id: "smoke-detector",
    name: "Photoelectric Optical Smoke Detector",
    category: "Alarms & Detection",
    capacities: "Conventional & Addressable",
    rating: "360° Smoke Chamber",
    description: "High-sensitivity dual LED smoke detector with dust-compensation and insect-proof screen.",
    standards: "EN 54-7 / UL Listed",
  },
];

export interface ProjectItem {
  id: string;
  title: string;
  category: "Industrial" | "Commercial" | "Warehouse" | "Institutional" | "Pharma" | "Pump Station";
  tag: string;
  location: string;
  area: string;
  image: string;
  badge: string;
  testPressure: string;
  commissionYear: string;
  keySpecs: string[];
  scope: string;
  highlights: string[];
  components: string[];
  standards: string;
}

export const projects: ProjectItem[] = [
  {
    id: "industrial-banur",
    title: "Heavy Industrial Manufacturing Facility",
    category: "Industrial",
    tag: "Industrial Plant",
    location: "Banur Industrial Corridor, Punjab",
    area: "85,000 Sq. Ft.",
    image: projectIndustrialImage,
    badge: "100% Commissioned",
    testPressure: "22.5 Bar Hydrostatic",
    commissionYear: "2024 Commissioned",
    keySpecs: [
      "2,800 Metres Heavy MS Riser Line",
      "38 External Yard Hydrant Pillars",
      "550 Automatic Ceiling Sprinklers",
      "Main & Diesel Standby Booster Pumps",
    ],
    scope:
      "Complete turnkey execution of industrial fire protection encompassing external ring main piping, deluge valve zone skids, overhead pump room header connections, and structural support fabrication for heavy manufacturing.",
    highlights: [
      "Hydrostatically tested up to 22.5 bar without leakage",
      "Full NBC 2016 Part IV industrial fire compliance approval",
      "Dual 1800 LPM fire booster pump automation integration",
      "Complete seismic trapeze pipe hanger fabrication",
    ],
    components: [
      "150mm & 100mm ERW Heavy Class MS Pipes",
      "Gunmetal Single & Double Landing Valves (IS:5290)",
      "UL-Listed Quick-Response Sprinkler Heads",
      "Pressure Relief & Air Release Safety Assemblies",
    ],
    standards: "NBC 2016 Part IV • IS:15105 • IS:3844",
  },
  {
    id: "commercial-mohali",
    title: "Multi-Storey Corporate & Retail Complex",
    category: "Commercial",
    tag: "Commercial Tower",
    location: "Sector 82, Mohali, Punjab",
    area: "1,20,000 Sq. Ft. (B+G+7)",
    image: projectCommercialImage,
    badge: "NBC 2016 Certified",
    testPressure: "20 Bar Hydrostatic",
    commissionYear: "2023 Commissioned",
    keySpecs: [
      "1,400+ Concealed Quick-Drop Sprinklers",
      "8-Zone Addressable Fire Alarm Matrix",
      "Double Landing Hydrants on Every Floor",
      "Basement Carbon Monoxide Exhaust Control",
    ],
    scope:
      "Engineered design and turnkey installation of comprehensive life-safety infrastructure for a 7-storey commercial building, including false-ceiling sprinkler drops, public address hooters, and emergency stairwell pressurization.",
    highlights: [
      "Seamless aesthetic integration with corporate interior finishes",
      "Independent basement car parking sprinkler grid with dry riser",
      "15-Minute rapid fire department brigade connection inlets",
      "Successful Fire Safety NOC issuance on maiden inspection",
    ],
    components: [
      "Concealed Flush Quartz Bulb Sprinklers (68°C)",
      "Zone Control Valves with Supervisory Tamper Switches",
      "Flow Meters and Digital Pressure Transmitters",
      "Armored Fire-Resistant Signal & Power Cabling",
    ],
    standards: "NBC 2016 Part IV • IS:15105 • IS:2189",
  },
  {
    id: "warehouse-derabassi",
    title: "High-Bay FMCG & Logistics Warehouse",
    category: "Warehouse",
    tag: "Logistics Hub",
    location: "Derabassi - Banur Highway, Punjab",
    area: "1,50,000 Sq. Ft.",
    image: projectLogisticsImage,
    badge: "Turnkey Handover",
    testPressure: "24 Bar Hydrostatic",
    commissionYear: "2024 Commissioned",
    keySpecs: [
      "ESFR Ceiling Sprinkler Protection System",
      "4,200 Metres High-Bay Welded Riser Grid",
      "12 High-Capacity Yard Hydrant Stations",
      "2-Hour Flame-Retardant Penetration Seal",
    ],
    scope:
      "Installation of Early Suppression Fast Response (ESFR) sprinkler network tailored for high-rack storage facilities up to 12 metres roof clearance, featuring specialized water supply manifolds and automated booster skid piping.",
    highlights: [
      "Engineered for high fire hazard rack storage classifications",
      "Grooved victaulic mechanical coupling methodology for zero downtime",
      "Automated pressure maintenance with jockey pump loop",
      "Fire penetration sealing along warehouse perimeter firewalls",
    ],
    components: [
      "K-14 & K-17 Extra Large Orifice ESFR Sprinklers",
      "200mm Heavy-Duty Main Header Distribution Lines",
      "Hydraulic Alarm Water Motor Gong Bells",
      "Certified Fire Stop Intumescent Mortar & Sealants",
    ],
    standards: "NFPA 13 Guidelines • NBC 2016 • IS:15105",
  },
  {
    id: "campus-rajpura",
    title: "University Campus & Student Residence",
    category: "Institutional",
    tag: "Campus Infrastructure",
    location: "Rajpura, Punjab (Near Banur)",
    area: "65,000 Sq. Ft. (Hostel & Labs)",
    image: projectCampusImage,
    badge: "100% Commissioned",
    testPressure: "18 Bar Hydrostatic",
    commissionYear: "2023 Commissioned",
    keySpecs: [
      "Corridor First-Aid Hose Reel Network",
      "Multi-Zone Optical Smoke Detection Array",
      "Manual Break-Glass Stations on All Exits",
      "180 ISI ABC Fire Extinguisher Stations",
    ],
    scope:
      "Complete life safety retrofitting and new installation for educational hostel blocks and chemical science laboratories, focusing on rapid occupant evacuation, audible multi-tone alert sirens, and intuitive first-aid firefighting.",
    highlights: [
      "Zero disruption to active academic semester during execution",
      "Integrated emergency evacuation voice alert synchronization",
      "Hands-on fire drill training provided to 200+ campus staff",
      "Official annual maintenance contract (AMC) active",
    ],
    components: [
      "30M Heavy Duty Thermoplastic Hose Reel Assemblies",
      "Addressable Photoelectric Dual-Spectrum Smoke Detectors",
      "Weatherproof High-Decibel Sounder-Strobe Beacon Units",
      "ISI:15683 Stamped 6kg ABC Stored Pressure Extinguishers",
    ],
    standards: "NBC 2016 Part IV (Group B Educational) • IS:2189",
  },
  {
    id: "pharma-cleanroom",
    title: "Pharmaceutical Formulation Plant",
    category: "Pharma",
    tag: "Pharma Cleanroom",
    location: "Lalru Industrial Area, Mohali",
    area: "42,000 Sq. Ft.",
    image: projectPharmaImage,
    badge: "Clean Agent Certified",
    testPressure: "25 Bar Hydrostatic",
    commissionYear: "2024 Commissioned",
    keySpecs: [
      "Clean Agent Total Flooding Protection",
      "SS304 Hygienic Pipework & Specialized Brackets",
      "Laser Air Sampling Smoke Detection (ASD)",
      "Zero Residue Gas Extinguishing for QA/QC",
    ],
    scope:
      "Design and installation of residue-free gaseous fire extinguishing systems and stainless steel water line routing designed specifically for sterile cleanroom production suites, solvent storage areas, and electrical MCC rooms.",
    highlights: [
      "Zero chemical residue ensures 100% protection of sterile batches",
      "Rapid sub-10 second discharge clean agent flooding system",
      "Early warning aspirating smoke detection for clean environments",
      "Strict GMP / USFDA compliance documentation support",
    ],
    components: [
      "Clean Agent Gas Cylinders with Fast-Acting Solenoids",
      "SS304 Welded Lines with Electropolished Interior Surface",
      "Pneumatic Damper Actuators for Air Handling Isolation",
      "Dedicated Optical Flame Detectors for Solvent Areas",
    ],
    standards: "NFPA 2001 • NBC 2016 • cGMP Norms",
  },
  {
    id: "pumproom-facility",
    title: "Central Fire Pump Room & Ring Main Skid",
    category: "Pump Station",
    tag: "Pump Station",
    location: "Sub Division Banur, Mohali",
    area: "Central Utility Facility",
    image: projectPumproomImage,
    badge: "Heavy Fabrication",
    testPressure: "25 Bar Hydrostatic",
    commissionYear: "2024 Commissioned",
    keySpecs: [
      "Triple Pump Header (Electric, Diesel, Jockey)",
      "Fabricated Vibration-Isolated Steel Skids",
      "Automated Suction & Discharge Manifolds",
      "High-Pressure Hydrostatic Test Certificate",
    ],
    scope:
      "Structural steel fabrication, precision alignment, header piping, and electrical automation for an industrial tripartite fire pump station delivering up to 2850 LPM flow across an interconnected municipal manufacturing grid.",
    highlights: [
      "Engineered structural base skids with anti-vibration spring mounts",
      "Custom safety red epoxy polyurethane heavy-duty protective paint",
      "Automated auto-start sequencing on pressure line drop",
      "Dual pressure-relief valves for surge water hammer control",
    ],
    components: [
      "250mm & 200mm Flanged Heavy MS Header Assemblies",
      "Cast Steel Non-Return Swing Check Valves (IS:5312)",
      "Flexible Stainless Steel Braided Expansion Bellows",
      "UL-Listed Tamper Supervisory Butterfly Valves",
    ],
    standards: "IS:15301 • IS:12469 • NBC 2016",
  },
];

export interface PropertySolution {
  name: string;
  icon: typeof House;
  description: string;
  recommendations: string[];
}

export const propertySolutions: PropertySolution[] = [
  {
    name: "Residential & Apartments",
    icon: House,
    description: "Compact, efficient and code-compliant fire safety for homes, flats and residential complexes.",
    recommendations: ["Clean Agent / ABC Extinguishers", "Ceiling Smoke Detectors", "Emergency Exit Signage", "Annual Refilling Service"],
  },
  {
    name: "Offices & Corporate Spaces",
    icon: Building2,
    description: "Code-compliant fire alarms, sprinkler drops, server room protection, and designated extinguisher stations.",
    recommendations: ["Ceiling Sprinkler Grids", "Addressable Smoke Detectors", "CO2 Extinguishers for IT/Servers", "First-Aid Hose Reels"],
  },
  {
    name: "Factories & Manufacturing",
    icon: Factory,
    description: "Heavy-duty industrial fire systems with external hydrants, riser pipes, robust pumps, and structural fabrication.",
    recommendations: ["Yard & Internal Hydrant Network", "Heavy MS Pipe Fabrication", "Bulk Mechanical Foam & Dry Powder Units", "Industrial Alarm Panels"],
  },
  {
    name: "Schools & Educational Institutes",
    icon: School,
    description: "High-occupancy safety with rapid evacuation sirens, audible hooters, and visible emergency firefighting stations.",
    recommendations: ["Multi-Zone Fire Alarm System", "Manual Break-Glass Points", "Corridor Extinguishers", "Hose Reel Cabinets"],
  },
  {
    name: "Hospitals & Healthcare",
    icon: HeartPulse,
    description: "Sensitive life-safety systems with early detection, non-toxic fire extinguishing agents, and reliable piping networks.",
    recommendations: ["Fast-Response Sprinkler Network", "Sensitive Optical Smoke Detection", "Clean Agent Fire Extinguishers", "24/7 Monitored Systems"],
  },
];

export interface FaqData {
  index: string;
  category: string;
  q: string;
  a: string;
}

export const faqs: FaqData[] = [
  {
    index: "01",
    category: "Emergency & Dispatch",
    q: "How quickly can Chouhan Firetech Services attend to emergency requests in Banur, Mohali, and Tricity?",
    a: "Our central workshop and rapid response unit is stationed at Shop No. 1, Urna, Sub Division Banur, Mohali. Operating 24 hours a day, 7 days a week allows our emergency mobile engineering units to arrive on-site within 15 to 45 minutes across Banur, Mohali, Rajpura, Zirakpur, Patiala, Derabassi, and industrial corridors throughout Punjab.",
  },
  {
    index: "02",
    category: "Refill & Hydro-Test",
    q: "What is the mandatory schedule for fire extinguisher refilling and hydrostatic pressure testing?",
    a: "Under Indian Standard IS:2190 guidelines, all portable and trolley fire extinguishers (ABC powder, CO2 gas, Clean Agent, and Mechanical Foam AFFF) require formal servicing and chemical refilling annually, or immediately after any discharge. Additionally, all high-pressure cylinders must undergo hydrostatic pressure testing at 30 to 35 bar every 3 to 5 years, which we certify with official inspection punch tags.",
  },
  {
    index: "03",
    category: "Turnkey Pipelines",
    q: "Do you supply and install complete turnkey fire fighting pipelines and ceiling sprinkler networks?",
    a: "Yes. We execute end-to-end fire fighting pipeline systems—from CAD blueprints to pressure handover. Our turnkey scope covers ERW/MS/GI pipe sizing, certified welding, victaulic grooved couplings, automatic quartz bulb ceiling sprinklers (68°C/79°C pendent, upright, sidewall), zone control valves, water flow switches, and central booster pump skids tested to 1.5× working pressure.",
  },
  {
    index: "04",
    category: "Fire NOC & NBC 2016",
    q: "Can Chouhan Firetech Services assist our commercial or industrial facility in obtaining a Fire Safety NOC?",
    a: "Yes. We provide complete technical assistance for Fire Safety NOC approvals and annual renewals. Our certified engineers conduct on-site audits, prepare Bill of Quantities (BOQ), ensure compliance with National Building Code (NBC 2016 Part IV), execute requisite hydrant/sprinkler upgrades, and issue stamped hydrostatic test reports and safety readiness certificates for fire officers.",
  },
  {
    index: "05",
    category: "Heavy Fabrication",
    q: "What types of fire structural fabrication work do you execute for industrial and commercial premises?",
    a: "We custom-fabricate heavy structural steel pump skids, rooftop pump room headers, seismic pipe trapeze hangers, vertical riser clamps, outdoor hydrant pillar protection bollards, and secure high-pressure cylinder manifold cages tailored specifically for manufacturing plants, logistics warehouses, and multistory buildings.",
  },
  {
    index: "06",
    category: "AMC Maintenance",
    q: "Do you offer Annual Maintenance Contracts (AMC) for factories, institutions, and residential societies?",
    a: "Yes. We provide comprehensive 24/7 Fire Safety AMCs. Our AMC packages include scheduled quarterly inspections, alarm panel and backup battery health checks, smoke detector optical cleaning, hydrant valve flushing, pressure gauge recalibrations, diesel pump test runs, and priority 24-hour emergency technician dispatch across Punjab.",
  },
  {
    index: "07",
    category: "GST & Invoicing",
    q: "Are all equipment supplies, pipeline installations, and refill services provided with official GST tax invoices?",
    a: "Yes. Chouhan Firetech Services is a registered government tax compliance entity with GSTIN: 03DVBPS7608H1ZI. We issue authentic B2B tax invoices with official HSN/SAC codes for all equipment sales, refilling jobs, and engineering contracts, enabling corporate and industrial clients to claim 100% Input Tax Credit (ITC).",
  },
  {
    index: "08",
    category: "Warranty & Guarantee",
    q: "What warranty coverage is included with your fire safety equipment, refilled cylinders, and pipelines?",
    a: "All fire extinguisher refills include a 12-month inspection warranty and pressure retention guarantee. New equipment (sprinklers, landing valves, hose reels) is protected by our 30-day 100% free defect replacement guarantee, while structural pipe fabrication and welded networks carry an extended 24-month structural leakage warranty.",
  },
  {
    index: "09",
    category: "Detection & Alarms",
    q: "Do you install and service addressable and conventional fire alarm and smoke detection systems?",
    a: "Yes. We supply, configure, and maintain multi-zone conventional and intelligent addressable Fire Alarm Control Panels (FACP), photoelectric optical smoke detectors, rate-of-rise thermal heat sensors, manual call stations (MCP), and high-decibel electronic hooters/strobes designed for rapid early warning across hotels, schools, hospitals, and industrial plants.",
  },
  {
    index: "10",
    category: "Free Quote & Survey",
    q: "How can I request a free on-site fire safety evaluation or an instant quotation?",
    a: "You can call our 24/7 emergency hotlines at +91 94178-28887 or +91 98770-44142, start an instant 1-click WhatsApp consultation, or complete the online quotation form on this website. We provide 100% free preliminary site surveys, technical consultations, and BOQ estimates across Banur, Mohali, and Northern India with zero obligation.",
  },
];

export interface CompanyPolicy {
  id: string;
  shortTitle: string;
  subtitle: string;
  fullTitle: string;
  badge: string;
  icon: typeof ShieldCheck;
  summary: string;
  effectiveDate: string;
  highlights: string[];
  sections: {
    heading: string;
    points: string[];
  }[];
}

export const COMPANY_POLICIES: CompanyPolicy[] = [
  {
    id: "warranty",
    shortTitle: "Warranty & Refill Policy",
    subtitle: "12-Month Guarantee, Hydro-Testing & Leak Coverage",
    fullTitle: "Fire Safety Equipment Warranty & Cylinder Refill Policy",
    badge: "12-Month Refill Warranty",
    icon: ShieldCheck,
    summary:
      "All extinguisher refills, pressure parts, and engineering installations provided by Chouhan Firetech Services are backed by comprehensive performance warranties, pressure retention guarantees, and certified inspection tagging.",
    effectiveDate: "Effective & Stamped: 2026",
    highlights: [
      "12-Month 100% pressure retention warranty on all refilled fire extinguishers",
      "Free immediate pressure top-up if gauge indicator dips below green safety sector",
      "Hydrostatic cylinder body integrity certified for 3 to 5 years per IS:2190",
      "24-Month structural fabrication & welded pipeline joint guarantee",
    ],
    sections: [
      {
        heading: "1. Scope of Warranty Coverage",
        points: [
          "This policy covers all portable and mobile fire extinguishers (ABC Dry Powder, CO2 Gas, Mechanical Foam, Clean Agent) refilled or overhauled by Chouhan Firetech Services.",
          "Automatic sprinkler systems, hydrant landing valves, and piping networks installed by our certified engineering team are covered against manufacturing flaws and installation defects.",
        ],
      },
      {
        heading: "2. Refill Inspection & Pressure Guarantee Terms",
        points: [
          "Each serviced cylinder receives an tamper-evident security seal and an official punch tag documenting the date of service, chemical class, and mandatory next inspection due date.",
          "If any refilled cylinder exhibits pressure drop on the built-in gauge under normal storage conditions within 12 months, we provide zero-cost re-servicing and recalibration.",
        ],
      },
      {
        heading: "3. Hydrostatic Pressure Testing Standard",
        points: [
          "High-pressure CO2 cylinders and stored-pressure extinguishers undergo hydrostatic pressure testing at 25 to 35 bar as mandated by BIS codes.",
          "Any cylinder failing hydrostatic expansion testing is permanently condemned to prevent site hazards, and an official failure certificate is provided.",
        ],
      },
      {
        heading: "4. Limitations & Exclusions",
        points: [
          "Warranty does not cover mechanical damage caused by external vehicle impacts, corrosive chemical spillage, deliberate tampering, or non-authorized disassembly.",
          "Cylinders discharged during real fire occurrences or emergency drills must be submitted for prompt refilling and are not covered under free refills.",
        ],
      },
    ],
  },
  {
    id: "privacy",
    shortTitle: "Privacy & Site Confidentiality",
    subtitle: "Customer Data, Site Blueprints & NDA Protection",
    fullTitle: "Customer Privacy, Data Protection & Facility NDA Policy",
    badge: "Confidentiality Protected",
    icon: Award,
    summary:
      "We treat all customer contact data, industrial architectural blueprints, fire pump room layouts, and security schematics with strict military-grade confidentiality and never disclose them to third parties.",
    effectiveDate: "Strict Compliance with IT Act (India)",
    highlights: [
      "100% confidential handling of architectural drawings & fire layouts",
      "Non-Disclosure Agreement (NDA) sign-off available for industrial plants",
      "Zero sharing or reselling of customer contact numbers, emails, or quotes",
      "Encrypted internal lead storage and restricted administrator access",
    ],
    sections: [
      {
        heading: "1. Information We Collect",
        points: [
          "Contact details provided during quotation requests: full name, mobile number, email address, property type, and requirements.",
          "Technical premises details: floor area (sq. ft.), structural layout drawings, and existing fire hydrant / sprinkler specifications shared for estimation purposes.",
        ],
      },
      {
        heading: "2. How We Utilize Your Information",
        points: [
          "To calculate Bill of Quantities (BOQ), dispatch technical proposal quotes, and arrange certified on-site inspections.",
          "To send annual refilling due reminders and mandatory hydrostatic test expiry alerts for statutory safety compliance.",
        ],
      },
      {
        heading: "3. Non-Disclosure & Facility Security",
        points: [
          "All building blueprints, emergency exit schematics, and chemical storage layouts provided by commercial and pharma clients are protected under strict internal non-disclosure protocol.",
          "We willingly sign customized corporate Non-Disclosure Agreements (NDAs) prior to visiting high-security industrial facilities.",
        ],
      },
      {
        heading: "4. Customer Rights & Data Inquiries",
        points: [
          "You may request deletion or revision of your contact details at any time by emailing us at chouhanfiretech53@gmail.com or calling +91 94178-28887 / +91 98770-44142.",
        ],
      },
    ],
  },
  {
    id: "terms",
    shortTitle: "Terms of Service & Invoicing",
    subtitle: "GST Compliance, Site Access & Contract Protocols",
    fullTitle: "Terms of Service, Project Execution & Commercial Billing Policy",
    badge: "GSTIN: 03DVBPS7608H1ZI",
    icon: Scale,
    summary:
      "Official operational terms governing on-site fire fighting pipeline installations, cylinder collection, emergency dispatch, and government GST tax invoicing protocols.",
    effectiveDate: "Governed by Punjab State Commercial Laws",
    highlights: [
      "Authentic B2B Tax Invoices with GSTIN: 03DVBPS7608H1ZI for 100% ITC",
      "Clear payment milestones for turnkey pipeline and fabrication projects",
      "Standard 15–45 minute emergency dispatch response window across Punjab",
      "Certified safety engineers equipped with personal protective equipment (PPE)",
    ],
    sections: [
      {
        heading: "1. Commercial Terms & GST Invoicing",
        points: [
          "All engineering quotes and supply invoices are issued under GSTIN: 03DVBPS7608H1ZI with official HSN/SAC classification codes.",
          "Corporate clients are entitled to claim 100% Input Tax Credit (ITC) on all equipment sales, refilling services, and AMCs.",
        ],
      },
      {
        heading: "2. Site Access & Safety Compliance",
        points: [
          "Clients must facilitate reasonable access to pump rooms, riser shafts, and overhead water tanks during scheduled installation or inspection visits.",
          "Our engineering crew adheres to strict on-site Industrial Safety Protocols, donning helmets, safety boots, and certified harness gear during high-altitude welding or pipe fabrication.",
        ],
      },
      {
        heading: "3. Milestone Payments for Large Installations",
        points: [
          "Turnkey installations require mutually agreed milestone disbursements: advance material procurement, piping erection, pressure testing, and final Fire NOC handover.",
        ],
      },
      {
        heading: "4. Force Majeure & Severe Delays",
        points: [
          "Neither party shall be held liable for delivery delays arising from extreme climatic events, regional grid shutdowns, or statutory governmental restrictions.",
        ],
      },
      {
        heading: "5. Legal Jurisdiction",
        points: [
          "All contractual relationships and service terms are governed by the laws of India, subject to the exclusive jurisdiction of the competent courts in District Mohali / Punjab.",
        ],
      },
    ],
  },
  {
    id: "refund",
    shortTitle: "Replacement & Refund Policy",
    subtitle: "30-Day Defect Replacement, Cancellation & Refunds",
    fullTitle: "Equipment Replacement, Service Cancellation & Refund Policy",
    badge: "30-Day Defect Replacement",
    icon: RotateCcw,
    summary:
      "Guaranteed 30-day free defect replacement on new fire safety equipment, transparent refill cancellation rules, and 3-5 business day refund processing.",
    effectiveDate: "100% Free Replacement on Factory Defects",
    highlights: [
      "30-Day 100% free on-site replacement for defective equipment or valves",
      "Zero cancellation charge on refilling bookings prior to vehicle dispatch",
      "3 to 5 business days direct refund turnaround via original payment mode",
      "6-Month defect replacement warranty on all replaced spare parts",
    ],
    sections: [
      {
        heading: "1. 30-Day Defective Equipment Replacement Guarantee",
        points: [
          "Any brand-new fire extinguisher, automatic sprinkler head, hydrant landing valve, or hose reel drum purchased from us that exhibits pressure loss, casting defect, or valve leakage within 30 days is replaced 100% free.",
          "Our technician visits your site to collect the defective unit and install the new tested replacement with zero transit fee.",
        ],
      },
      {
        heading: "2. Refill Service Cancellation Protocol",
        points: [
          "Scheduled cylinder collection or refilling appointments can be modified, rescheduled, or cancelled with zero cancellation fees prior to our service van departing our facility.",
          "If a cancellation is requested after a technician has arrived on-site for emergency same-day dispatch, only standard transit cost is applicable.",
        ],
      },
      {
        heading: "3. Transparent Refund Timelines (3–5 Working Days)",
        points: [
          "In cases where advance payments were made for specialized fire equipment or non-standard cylinders that cannot be fulfilled due to inventory or technical constraints, 100% of the advance amount is promptly refunded.",
          "Refunds are processed via original payment mode (Bank Transfer / NEFT / UPI) within 3 to 5 business days with written confirmation.",
        ],
      },
      {
        heading: "4. Spares & Consumables Warranty",
        points: [
          "All replacement components installed during refilling (O-rings, delivery hoses, discharge horns, pressure gauges, safety pins) carry a 6-month defect replacement warranty.",
        ],
      },
    ],
  },
  {
    id: "compliance",
    shortTitle: "Safety Standards & Quality Compliance",
    subtitle: "NBC 2016 Part IV & Bureau of Indian Standards (BIS)",
    fullTitle: "Indian Standards (IS), NBC 2016 Guidelines & Quality Compliance",
    badge: "IS:15683, IS:5290 & NBC 2016",
    icon: Scale,
    summary:
      "Complete compliance with Indian Standards (BIS / ISI), National Building Code (NBC 2016 Part IV), and environmentally responsible chemical agent recycling.",
    effectiveDate: "Adherence to Indian Fire & Life Safety Standards",
    highlights: [
      "Strict engineering adherence to National Building Code (NBC 2016 Part IV)",
      "ISI & BIS certified equipment: IS:15683, IS:5290, IS:884 & IS:2190",
      "Assistance with Fire NOC technical readiness and audit documentation",
      "Eco-friendly, non-toxic ABC chemical powders & closed-loop disposal",
    ],
    sections: [
      {
        heading: "1. National Building Code (NBC 2016 Part IV) Adherence",
        points: [
          "All fire engineering layouts, hydrant riser configurations, sprinkler grid densities, and fire alarm sensor placements strictly comply with the National Building Code (NBC 2016 Part IV Fire & Life Safety).",
          "We assist factories, commercial towers, schools, and hospitals with Fire Safety NOC technical audits and site inspection readiness.",
        ],
      },
      {
        heading: "2. Indian Standards (BIS / ISI Specifications)",
        points: [
          "Portable Fire Extinguishers: Built and tested as per IS:15683 standards.",
          "Fire Hydrant Landing Valves: Gunmetal construction meeting IS:5290 specifications.",
          "First Aid Fire Hose Reels: Hydraulic pressure tested in accordance with IS:884.",
          "Periodic Maintenance & Refilling: Executed strictly under IS:2190 Code of Practice.",
        ],
      },
      {
        heading: "3. Eco-Friendly Chemical Agents & Environmental Care",
        points: [
          "Our ABC dry chemical powders utilize non-ozone-depleting siliconized Monoammonium Phosphate (MAP) compounds.",
          "Spent chemical powders and expired foam residues are collected into closed recycling barrels adhering to Punjab Pollution Control Board environmental norms.",
        ],
      },
    ],
  },
];

export const serviceSubmenuItems = [
  {
    title: "Pipeline & Fire Sealing",
    desc: "Heavy MS/GI pipes & intumescent fire stop penetrations",
    icon: Wrench,
    href: "/services",
  },
  {
    title: "Automatic Sprinkler System",
    desc: "UL/FM 68°C quartz-bulb sprinkler heads & zone valves",
    icon: Droplets,
    href: "/services",
  },
  {
    title: "Extinguisher Refill & Hydro-Test",
    desc: "ABC, CO2, Foam & Clean Agent with certified tags",
    icon: Flame,
    href: "/services",
  },
  {
    title: "Fire Structure Fabrication",
    desc: "Heavy pump skids, seismic trapeze & pipe clamps",
    icon: Building2,
    href: "/services",
  },
  {
    title: "Hydrant Systems & Water Lines",
    desc: "IS:5290 gunmetal landing valves & canvas hoses",
    icon: ShieldAlert,
    href: "/services",
  },
  {
    title: "Fire Alarm & Smoke Detection",
    desc: "Addressable panels, optical detectors & 100dB hooters",
    icon: Siren,
    href: "/services",
  },
];

export const productSubmenuItems = [
  {
    title: "ABC Powder Extinguishers",
    desc: "IS:15683 stamped multi-purpose 1kg to 9kg",
    icon: Flame,
    href: "/products",
  },
  {
    title: "CO2 Gas Extinguishers",
    desc: "Seamless PESO approved server & panel cylinders",
    icon: ShieldAlert,
    href: "/products",
  },
  {
    title: "Mechanical Foam Units",
    desc: "AFFF rapid foam blanket for liquid fuels & oils",
    icon: Droplets,
    href: "/products",
  },
  {
    title: "Automatic Sprinklers",
    desc: "Pendent, upright & sidewall quick-response heads",
    icon: Droplets,
    href: "/products",
  },
  {
    title: "First-Aid Hose Reels",
    desc: "IS:884 hydraulic 30m drum with brass shut-off jet",
    icon: Wrench,
    href: "/products",
  },
  {
    title: "Optical Smoke Detectors",
    desc: "Dual LED 360° sensor with dust auto-compensation",
    icon: Siren,
    href: "/products",
  },
];
