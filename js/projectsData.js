/**
 * UNSEEN STUDIO - Centralized Projects & Case Studies Repository
 * Official Portfolio Data for UNSEEN STUDIO
 */

export const PORTFOLIO_FILTERS = [
  { id: "all", label: "All Projects" },
  { id: "Jewellery", label: "Jewellery" },
  { id: "Fashion", label: "Fashion" },
  { id: "Electronics", label: "Electronics" },
  { id: "Healthcare", label: "Healthcare" },
  { id: "Beauty", label: "Beauty" },
  { id: "Furniture", label: "Furniture" },
  { id: "B2B", label: "B2B" },
  { id: "Other", label: "Other" }
];

export const PROJECTS = [
  {
    slug: "handybee-designs",
    name: "Handybee Designs",
    headline: "Artisan Handcrafted Polymer Clay Jewellery & Botanical Resin Art",
    industry: "Jewellery",
    category: "Jewellery",
    year: "2024",
    client: "Handybee Designs Studio",
    isVerifiedClient: true,
    badgeText: "Client Project",
    liveUrl: "https://handybeedesigns.com/",
    heroImage: "/images/handybee-showcase.png",
    gallery: [
      "/images/handybee-showcase.png",
      "/images/img7.webp",
      "/images/img14.webp",
      "/images/img2.webp"
    ],
    overview: "HandyBee Designs is an artisan studio creating handcrafted polymer clay jewellery, botanical resin art, home décor and bespoke gifts shaped with love in small batches.",
    businessRequirements: [
      "Modernize digital presence with an immersive, high-conversion direct-to-consumer storefront.",
      "Support seasonal drop launches, limited-run inventory caps, and high-fidelity botanical macro product galleries.",
      "Integrate friction-free global checkout with Stripe and mobile payment methods (Apple Pay & Google Pay).",
      "Deliver instant edge loading speeds across mobile devices with lightweight modern frontend architecture."
    ],
    designConcept: "Artisanal warmth intersects with contemporary editorial minimalism. Earthy organic hues and tactile micro-interactions emphasize the human touch behind every sculpted clay earring and botanical resin piece, giving collectors an intimate studio experience.",
    shoppingExperience: "Intuitive collection browsing segmented by craft medium (Polymer Clay, Botanical Resin, Home Accents). Features include real-time stock allocation badges, dynamic gemstone & color palette filters, an expressive slide-out cart drawer, and single-click checkout.",
    adminCapabilities: "Modern headless Supabase backend infrastructure providing real-time stock deduction, automated low-inventory alerts for one-of-a-kind pieces, customer order receipt dispatch, and waitlist management for upcoming limited drops.",
    featuresDelivered: [
      { title: "Custom Headless Storefront", desc: "Built with React, Vite and modern CSS for lightning-fast sub-second page loads." },
      { title: "Stripe Global Payment Gateway", desc: "Full checkout integration supporting multi-currency, credit cards, and mobile wallets." },
      { title: "Supabase Cloud Inventory", desc: "Real-time stock management with instant deduction upon checkout completion." },
      { title: "Attribute-Based Filtering", desc: "Effortless navigation by craft medium, botanical elements, and seasonal drops." },
      { title: "Responsive Multi-Touch UI", desc: "Smooth touch gestures, optimized image lazy loading, and fluid mobile ergonomics." },
      { title: "SEO & Product Schema Markup", desc: "Structured Google Merchant data for enhanced organic search visibility." }
    ],
    techStack: ["React", "Vite", "Stripe API", "Supabase", "Lenis Smooth Scroll", "Tailwind / CSS3"],
    results: "Delivered a refined, artisanal shopping platform enabling direct customer engagement and effortless seasonal drops."
  },
  {
    slug: "aura-atelier",
    name: "AURA Atelier",
    headline: "Architectural Runway Collections & Sustainable Digital Boutique",
    industry: "Fashion",
    category: "Fashion",
    year: "2024",
    client: "AURA Fashion Group",
    isVerifiedClient: false,
    badgeText: "Concept Experience",
    liveUrl: null,
    heroImage: "/images/img1.webp",
    gallery: [
      "/images/img1.webp",
      "/images/img5.webp",
      "/images/img6.webp",
      "/images/img17.webp"
    ],
    overview: "An avant-garde digital flagship showcasing sculptural silhouettes, sustainable garment provenance, and high-fashion editorial styling.",
    businessRequirements: [
      "Create a high-fashion digital editorial flagship that blurs runway presentation and direct-to-consumer commerce.",
      "Showcase intricate garment textiles, weave compositions, and sustainable supply-chain transparency.",
      "Support global multi-currency checkout with bespoke concierge order packaging options."
    ],
    designConcept: "Brutalist editorial typography combined with fluid silk-like motion. Monochromatic surfaces provide a high-contrast canvas that allows textile textures and silhouette drape to dominate the visual hierarchy.",
    shoppingExperience: "Full-bleed digital lookbook with seamless 'Shop the Look' hotspots, high-resolution interactive fabric zoom, dynamic sizing advisory engine, and multi-currency localized pricing.",
    adminCapabilities: "Boutique tier order routing, VIP client reservation portal for limited atelier runs, and automated garment care guide delivery.",
    featuresDelivered: [
      { title: "Interactive Lookbook Hotspots", desc: "Direct garment purchase overlay embedded inside high-fashion editorial imagery." },
      { title: "Textile Texture Inspector", desc: "Micro-zoom capability exploring fabric weave, GSM weight, and sustainable composition." },
      { title: "Intelligent Size Advisory", desc: "Interactive sizing guide reducing fashion return rates through precise measurement mapping." },
      { title: "Global Luxury Checkout", desc: "Multi-currency calculation with localized duties, taxes, and express air dispatch." }
    ],
    techStack: ["Next.js", "Three.js / WebGL", "Shopify Storefront API", "Tailwind CSS", "Lenis"],
    results: "Demonstration of luxury fashion commerce blending editorial aesthetics with instantaneous conversion paths."
  },
  {
    slug: "lumen-audio",
    name: "LUMEN Acoustics",
    headline: "Spatial Acoustic Hardware & Precision Sound Engineering Storefront",
    industry: "Electronics",
    category: "Electronics",
    year: "2024",
    client: "LUMEN Acoustics",
    isVerifiedClient: false,
    badgeText: "Concept Experience",
    liveUrl: null,
    heroImage: "/images/img3.webp",
    gallery: [
      "/images/img3.webp",
      "/images/img10.webp",
      "/images/img15.webp",
      "/images/img19.webp"
    ],
    overview: "A precision audiophile hardware commerce platform engineered for studio professionals, sound designers, and discerning listeners.",
    businessRequirements: [
      "Present complex acoustic engineering specifications through clear, interactive visual storytelling.",
      "Provide custom finish configurators for anodized aluminum, walnut, and matte ceramic speaker enclosures.",
      "Offer split-financing payment solutions for high-ticket studio monitoring systems."
    ],
    designConcept: "Dark minimalist laboratory precision. Matte obsidian surfaces, fine orange frequency lines, and clean technical schematics that mirror the exacting tolerances of acoustic engineering.",
    shoppingExperience: "Interactive 3D enclosure configurator, acoustic frequency response curve comparison tool, component exploded views, and modular accessory bundle builder.",
    adminCapabilities: "Serial number registration database, warranty tracking portal, and certified repair technician order routing.",
    featuresDelivered: [
      { title: "Interactive 3D Hardware Configurator", desc: "Real-time material swap between aerospace aluminum and solid hardwood finishes." },
      { title: "Frequency Curve Benchmark Tool", desc: "Interactive graph comparing sound isolation and frequency curves against industry standards." },
      { title: "Flexible Split Financing", desc: "Integration with modern payment plans for frictionless high-ticket hardware sales." },
      { title: "Technical Spec Comparison", desc: "Side-by-side spec comparison table with instantaneous filter updates." }
    ],
    techStack: ["WebGL", "Three.js", "Vite", "Stripe Payment Element", "Tailwind CSS"],
    results: "Interactive demonstration of technical hardware commerce highlighting sensory sound design and industrial engineering."
  },
  {
    slug: "verdant-botanicals",
    name: "VERDANT Clinical",
    headline: "Bio-Adaptive Botanical Skincare & Personalized Regimen Engine",
    industry: "Beauty",
    category: "Beauty",
    year: "2024",
    client: "VERDANT Labs",
    isVerifiedClient: false,
    badgeText: "Concept Experience",
    liveUrl: null,
    heroImage: "/images/img4.webp",
    gallery: [
      "/images/img4.webp",
      "/images/img8.webp",
      "/images/img16.webp",
      "/images/img21.webp"
    ],
    overview: "Clean active botanical skincare formulated with clinically validated plant actives and delivered through a flexible auto-replenishment subscription model.",
    businessRequirements: [
      "Guide shoppers through a multi-step clinical diagnostic quiz to recommend personalized skincare routines.",
      "Build a high-retention recurring subscription engine with flexible delivery cadence and swap capabilities.",
      "Transparently display clinical test efficacy data and ingredient origin documentation."
    ],
    designConcept: "Clinical purity paired with lush organic photography. Crisp typographic grids, subtle leaf green and warm amber accents, and clean scientific data presentation.",
    shoppingExperience: "60-second skin quiz algorithm, customized 3-step morning/evening regimen builder, one-click subscription management portal, and transparent batch COA lookups.",
    adminCapabilities: "Subscription churn prediction dashboard, automated refill trigger scheduling, and batch quality certification database.",
    featuresDelivered: [
      { title: "Adaptive Skin Diagnostic Quiz", desc: "Rule-based recommendation engine matching formulas to specific dermal concerns." },
      { title: "Recurring Subscription Engine", desc: "Full subscriber portal for easy skip, swap, or interval modification." },
      { title: "Batch Ingredient Provenance", desc: "QR/batch lookup displaying harvest dates and clinical purity test results." },
      { title: "Bundle & Save Cart Architecture", desc: "Dynamic tiered discount calculation incentivizing multi-product orders." }
    ],
    techStack: ["React", "Vite", "Recharge API", "Shopify Storefront", "Tailwind CSS"],
    results: "Demonstration of beauty commerce focused on personalization, clinical transparency, and recurring revenue retention."
  },
  {
    slug: "solis-living",
    name: "SOLIS Living",
    headline: "Architectural Nordic Hardwood Furniture & Spatial Room Builder",
    industry: "Furniture",
    category: "Furniture",
    year: "2024",
    client: "SOLIS Design Studio",
    isVerifiedClient: false,
    badgeText: "Concept Experience",
    liveUrl: null,
    heroImage: "/images/img9.webp",
    gallery: [
      "/images/img9.webp",
      "/images/img11.webp",
      "/images/img13.webp",
      "/images/img18.webp"
    ],
    overview: "Timeless Scandinavian furniture handcrafted from sustainable European hardwoods, designed for contemporary architectural spaces.",
    businessRequirements: [
      "Overcome online furniture purchase hesitation through accurate spatial scale visualization and wood grain detail.",
      "Provide a trade professional portal offering wholesale pricing and CAD/BIM model downloads for interior designers.",
      "Incorporate dynamic white-glove delivery scheduling based on postal code geography."
    ],
    designConcept: "Spacious architectural layout celebrating quiet Scandinavian craftsmanship. Warm neutral backgrounds, generous negative space, and macro wood texture showcases.",
    shoppingExperience: "AR mobile quick-look for real-world room preview, wood sample swatch order system, live wood grain texture switcher, and white-glove delivery slot picker.",
    adminCapabilities: "Trade account verification system, freight carrier logistics integration, and custom lead-time management for made-to-order pieces.",
    featuresDelivered: [
      { title: "Spatial Room Scale Visualizer", desc: "True-to-scale dimensional rendering comparing pieces to human scale." },
      { title: "Material & Finish Switcher", desc: "Instant visual preview of natural oak, smoked walnut, and blackened ash." },
      { title: "Interior Designer Trade Portal", desc: "Password-protected portal for trade pricing, invoice generation, and 3D assets." },
      { title: "White-Glove Freight Calculator", desc: "Automated volumetric shipping calculation with residential assembly booking." }
    ],
    techStack: ["Next.js", "Three.js", "WebXR", "PostgreSQL", "Tailwind CSS"],
    results: "Interactive demonstration of high-end furniture commerce bridging digital shopping and physical craftsmanship."
  },
  {
    slug: "kinetic-labs",
    name: "KINETIC Ortho",
    headline: "Clinical Ergonomic Recovery Apparel & Medical Wellness Commerce",
    industry: "Healthcare",
    category: "Healthcare",
    year: "2024",
    client: "KINETIC Medical Systems",
    isVerifiedClient: false,
    badgeText: "Concept Experience",
    liveUrl: null,
    heroImage: "/images/img20.webp",
    gallery: [
      "/images/img20.webp",
      "/images/img2.webp",
      "/images/img10.webp",
      "/images/img14.webp"
    ],
    overview: "Medical-grade orthopedic joint support apparel and physical therapy recovery equipment engineered with clinical orthopedic specialists.",
    businessRequirements: [
      "Enable seamless HSA / FSA card checkout compliance alongside standard payment gateways.",
      "Provide precise anatomical measurement guides to ensure medical efficacy and optimal compression fit.",
      "Support dual B2C consumer orders and B2B hospital/clinic bulk procurement."
    ],
    designConcept: "Ergonomic clarity and clinical authority. Crisp white and graphite grey contrast, orange clinical accent markers, and anatomical 3D joint diagrams.",
    shoppingExperience: "Anatomical injury selector routing users to physician-recommended brace designs, HSA/FSA instant card verification at checkout, and guided measurement calculator.",
    adminCapabilities: "FSA/HSA automated itemized medical receipt generation and clinic wholesale volume pricing tiers.",
    featuresDelivered: [
      { title: "HSA / FSA Checkout Payment", desc: "Compliant SIGIS healthcare card processing for pre-tax medical benefit spending." },
      { title: "Anatomical Injury Navigator", desc: "Body map selector pinpointing specific knee, spine, and shoulder support requirements." },
      { title: "Physician & Clinic Bulk Portal", desc: "Wholesale ordering system for physical therapy clinics with Net-30 invoicing." },
      { title: "Clinical Efficacy Library", desc: "Downloadable clinical trial whitepapers and physician recommendation letters." }
    ],
    techStack: ["React", "Vite", "Stripe Healthcare Billing", "Supabase", "Tailwind CSS"],
    results: "Demonstration of compliant healthcare commerce combining medical rigor with consumer-grade checkout simplicity."
  },
  {
    slug: "nexus-wholesale",
    name: "NEXUS Supply Co.",
    headline: "High-Volume Enterprise Procurement & Dynamic Tiered Wholesale Portal",
    industry: "B2B",
    category: "B2B",
    year: "2024",
    client: "NEXUS Global Supply",
    isVerifiedClient: false,
    badgeText: "Concept Experience",
    liveUrl: null,
    heroImage: "/images/img6.webp",
    gallery: [
      "/images/img6.webp",
      "/images/img12.webp",
      "/images/img17.webp",
      "/images/img19.webp"
    ],
    overview: "A scalable B2B procurement platform built for enterprise supply distribution, bulk volume discounts, custom quote approvals, and automated ERP sync.",
    businessRequirements: [
      "Accommodate complex B2B buyer workflows: multi-user corporate accounts, purchase orders, and tiered volume pricing.",
      "Provide instant PDF quote generation with 30-day price locks for corporate procurement departments.",
      "Seamlessly synchronize bulk warehouse inventory and pallet logistics with enterprise ERP backbones."
    ],
    designConcept: "High-density enterprise utility refined with editorial clarity. Monospace data coordinates, orange status markers, and rapid keyboard-friendly tabular layouts.",
    shoppingExperience: "Quick bulk order pad (CSV upload or SKU quick-add), real-time volume price curve calculation, instant PDF quote generation, and Net-30 credit application.",
    adminCapabilities: "Corporate buyer credit approval dashboard, custom contract price rule manager, and multi-warehouse pallet allocation system.",
    featuresDelivered: [
      { title: "Volume Tiered Pricing Matrix", desc: "Real-time discount brackets adjusting based on quantity, pallet count, and buyer contract." },
      { title: "CSV Bulk Order Pad", desc: "Instant order entry for 500+ SKUs via spreadsheet upload or rapid keyboard input." },
      { title: "Automated PDF Quote Generator", desc: "One-click formal quotation dispatch with 30-day locked pricing for purchasing teams." },
      { title: "Net-30 Enterprise Credit Terms", desc: "Integrated digital trade credit application with automated business verification." }
    ],
    techStack: ["Next.js", "GraphQL API", "PostgreSQL", "Redis Cache", "Tailwind CSS"],
    results: "High-performance enterprise B2B platform demonstrating how modern frontend engineering transforms cumbersome procurement."
  },
  {
    slug: "aeris-precision",
    name: "AERIS Chrono",
    headline: "Mechanical Horology & Numbered Limited Edition Aerospace Chronographs",
    industry: "Other",
    category: "Other",
    year: "2024",
    client: "AERIS Watchmaker Workshop",
    isVerifiedClient: false,
    badgeText: "Concept Experience",
    liveUrl: null,
    heroImage: "/images/img5.webp",
    gallery: [
      "/images/img5.webp",
      "/images/img1.webp",
      "/images/img15.webp",
      "/images/img14.webp"
    ],
    overview: "Aerospace-grade mechanical chronographs and limited-edition micro-brand horology presented through high-precision digital storytelling.",
    businessRequirements: [
      "Showcase intricate micro-mechanical movements and titanium case finishing with photographic fidelity.",
      "Manage numbered limited-edition drops with anti-bot reservation queues and serialized certificates.",
      "Facilitate armored courier delivery tracking and blockchain certificate of authenticity registration."
    ],
    designConcept: "Technical precision meets luxury horology. Fine millimeter coordinate grids, obsidian backgrounds, and high-definition macro inspection views.",
    shoppingExperience: "360-degree case rotation with sapphire caseback transparency view, serialized edition number selector, bespoke alligator/titanium strap customizer, and insured courier booking.",
    adminCapabilities: "Serialized warranty ledger, anti-bot drop queuing throttle, and VIP collector invitation engine.",
    featuresDelivered: [
      { title: "Interactive Calibre 3D Inspector", desc: "Exploded mechanical view highlighting balance wheel, escapement, and automatic rotor." },
      { title: "Numbered Edition Selector", desc: "Interactive serial reservation picking available production numbers in real time." },
      { title: "Insured Armored Courier Dispatch", desc: "Integrated high-value logistics with signature confirmation and real-time tracking." },
      { title: "Digital Authenticity Certificate", desc: "Cryptographic ownership verification tied to individual watch case serial." }
    ],
    techStack: ["WebGL", "Three.js", "Vite", "Stripe Elements", "Tailwind CSS"],
    results: "Luxury horology commerce concept demonstrating how fine mechanical craftsmanship is elevated in a digital environment."
  }
];

export function getProjectBySlug(slug) {
  return PROJECTS.find(p => p.slug === slug);
}

export function getNextProject(currentSlug) {
  const currentIndex = PROJECTS.findIndex(p => p.slug === currentSlug);
  if (currentIndex === -1) return PROJECTS[0];
  const nextIndex = (currentIndex + 1) % PROJECTS.length;
  return PROJECTS[nextIndex];
}
