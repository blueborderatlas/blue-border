import { publishedRecommendations } from "@/lib/published-recommendations";

export type TrustStatus =
  | "Recommended"
  | "Verified"
  | "Under Review"
  | "Paused";

export const recommendationCategories = [
  "Stay",
  "Food",
  "Coffee",
  "Cafe",
  "Diving",
  "Nature",
  "Local Experience",
  "Beach",
  "Restaurant",
  "Transportation",
  "SIM Card",
  "ATM",
  "Pharmacy",
  "Safety",
  "Local Guide",
  "Housing",
  "Study",
] as const;

export type RecommendationCategory = (typeof recommendationCategories)[number];

export const destinationCategoryGroups = [
  {
    label: "Diving",
    slug: "diving",
    categories: ["Diving"],
  },
  {
    label: "Stay",
    slug: "stay",
    categories: ["Stay"],
  },
  {
    label: "Food",
    slug: "food",
    categories: ["Food", "Restaurant"],
  },
  {
    label: "Cafe",
    slug: "cafe",
    categories: ["Cafe", "Coffee"],
  },
  {
    label: "Transport",
    slug: "transport",
    categories: ["Transportation"],
  },
  {
    label: "Pharmacy",
    slug: "pharmacy",
    categories: ["Pharmacy"],
  },
  {
    label: "Local Guide",
    slug: "local-guide",
    categories: ["Local Guide"],
  },
] as const satisfies ReadonlyArray<{
  label: string;
  slug: string;
  categories: readonly RecommendationCategory[];
}>;

export type DestinationCategoryGroup = (typeof destinationCategoryGroups)[number];

export type TravelerType =
  | "Solo travelers"
  | "Couples"
  | "Digital nomads"
  | "Families"
  | "Backpackers";

export type PriceLevel = "Free" | "$" | "$$" | "$$$";

export type RecommendationTrust = {
  blueVerified: boolean;
  personallyVisited: boolean;
  lastUpdated: string;
  priceLevel: PriceLevel;
  whyBlueChoseThis: string;
};

export type BusinessVerificationStatus = "Blue Verified" | "Under Review";

export type BusinessProfile = {
  id: string;
  name: string;
  verified: BusinessVerificationStatus;
  category: string;
  destination: string;
  country: string;
  city: string;
  address: string;
  website: string;
  googleMaps: string;
  instagram: string;
  email: string;
  phone: string;
  openingHours: string;
  priceRange: string;
  languages: string[];
  shortDescription: string;
};

export type BlueExperience = {
  visitedByBlue: boolean;
  visitDate: string;
  reviewer: string;
  blueRating: string;
  recommendedFor: string[];
  highlights: string[];
  cautions: string[];
  editorNotes: string;
};

export type AiObservations = {
  label: string;
  underwater: string[];
  shore: string[];
  equipment: string[];
  facilities: string[];
  people: string[];
  visibleSigns: string[];
};

export type Recommendation = {
  id: string;
  slug: string;
  name: string;
  category: RecommendationCategory;
  country: string;
  city: string;
  coverImage: string;
  gallery: string[];
  summary: string;
  whyBlueRecommends: string[];
  bestFor: TravelerType[];
  thingsToKnow: {
    openingHours: string;
    payment: string;
    reservation: string;
    accessibility: string;
  };
  trustStatus: TrustStatus;
  trust: RecommendationTrust;
  languages: string[];
  contact: {
    label: string;
    instructions: string;
  };
  bookingLink: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  nearbyRecommendations: Array<{
    name: string;
    category: RecommendationCategory;
    location: string;
  }>;
  relatedGuides: Array<{
    title: string;
    href: string;
  }>;
  businessProfile?: BusinessProfile;
  blueExperience?: BlueExperience;
  aiObservations?: AiObservations;
};

const curatedRecommendations: Recommendation[] = [
  {
    id: "egypt-diving-001",
    slug: "dahab-dive-center",
    name: "Dahab Dive Center",
    category: "Diving",
    country: "Egypt",
    city: "Dahab",
    coverImage:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1682687982501-1e58ab814714?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
    ],
    summary:
      "A Dahab dive-center recommendation for travelers who want shore-access Red Sea diving with clear safety checks, realistic site advice and calm communication before getting in the water.",
    whyBlueRecommends: [
      "Dahab is one of the Red Sea's most practical bases for shore-entry dives, but quality still varies by instructor, equipment and briefing style.",
      "Blue prioritizes centers that explain site difficulty, current, entry points and certification limits before selling a trip.",
      "Good for travelers who want a clear safety conversation instead of choosing only by price.",
      "A useful anchor for first-time Red Sea visitors who need equipment, weather and cancellation expectations explained plainly.",
    ],
    bestFor: ["Solo travelers", "Couples", "Backpackers"],
    thingsToKnow: {
      openingHours: "Dive schedules depend on weather, site conditions and certification level.",
      payment: "Confirm deposit, cash/card terms and cancellation policy directly.",
      reservation: "Advance reservation is recommended in high season.",
      accessibility: "Ask about shore-entry difficulty, equipment weight and support for nervous or returning divers.",
    },
    trustStatus: "Under Review",
    trust: {
      blueVerified: false,
      personallyVisited: false,
      lastUpdated: "2026-07-07",
      priceLevel: "$$",
      whyBlueChoseThis:
        "Dahab diving is trust-sensitive: a good recommendation should help travelers judge safety, instructor communication and realistic sea conditions before money changes hands.",
    },
    languages: ["Arabic", "English"],
    contact: {
      label: "Ask about diving",
      instructions:
        "Contact details are placeholder until Blue completes operator verification.",
    },
    bookingLink: "#",
    coordinates: {
      lat: 27.2579,
      lng: 34.5136,
    },
    nearbyRecommendations: [
      {
        name: "Dahab Accommodation",
        category: "Stay",
        location: "Dahab town",
      },
      {
        name: "Dahab Coffee",
        category: "Coffee",
        location: "Lighthouse area",
      },
      {
        name: "Dahab Transport Desk",
        category: "Transportation",
        location: "Dahab to Sharm route",
      },
    ],
    relatedGuides: [
      {
        title: "How Blue checks dive operators",
        href: "/guides",
      },
      {
        title: "Egypt coastal month notes",
        href: "/journal/egypt-coastal-month-red-sea-notes",
      },
      {
        title: "Dahab first-timer practical checklist",
        href: "/guides",
      },
    ],
  },
  {
    id: "egypt-stay-001",
    slug: "dahab-accommodation",
    name: "Dahab Accommodation",
    category: "Stay",
    country: "Egypt",
    city: "Dahab",
    coverImage:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=80",
    ],
    summary:
      "A Dahab accommodation recommendation for travelers who want a walkable base near the sea, quiet nights, simple logistics and enough routine for diving, remote work or a longer pause.",
    whyBlueRecommends: [
      "Dahab works best when the stay supports daily rhythm: walking distance, noise level, Wi-Fi and easy food access matter.",
      "Helpful for travelers staying more than a few nights, especially divers and remote workers.",
      "Blue treats neighborhood choice as part of the recommendation because a cheap room far from the right routine can become expensive in time and stress.",
    ],
    bestFor: ["Solo travelers", "Couples", "Digital nomads"],
    thingsToKnow: {
      openingHours: "Check-in hours should be confirmed before arrival.",
      payment: "Direct payment terms vary by season and length of stay.",
      reservation: "Reserve early around holidays, diving weeks and winter high season.",
      accessibility: "Ask about elevator access and room floor before booking.",
    },
    trustStatus: "Recommended",
    trust: {
      blueVerified: true,
      personallyVisited: false,
      lastUpdated: "2026-07-07",
      priceLevel: "$$",
      whyBlueChoseThis:
        "A good Dahab base shapes the entire trip: it affects sleep, walking routes, dive mornings, work calls and how easy it feels to stay longer.",
    },
    languages: ["Arabic", "English"],
    contact: {
      label: "Ask about availability",
      instructions:
        "Blue will replace this with verified direct contact once the accommodation is reviewed.",
    },
    bookingLink: "#",
    coordinates: {
      lat: 27.1908,
      lng: 34.5165,
    },
    nearbyRecommendations: [
      {
        name: "Dahab Dive Center",
        category: "Diving",
        location: "Lighthouse and dive shop area",
      },
      {
        name: "Dahab Coffee",
        category: "Coffee",
        location: "Lighthouse area",
      },
      {
        name: "Dahab Pharmacy & Clinic",
        category: "Pharmacy",
        location: "Central Dahab",
      },
    ],
    relatedGuides: [
      {
        title: "Choosing a stay base before sea trips",
        href: "/guides",
      },
      {
        title: "Egypt coastal month notes",
        href: "/journal/egypt-coastal-month-red-sea-notes",
      },
    ],
  },
  {
    id: "egypt-coffee-001",
    slug: "dahab-coffee",
    name: "Dahab Coffee",
    category: "Coffee",
    country: "Egypt",
    city: "Dahab",
    coverImage:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=2200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=80",
    ],
    summary:
      "A Dahab coffee recommendation for slow mornings, practical meetups, laptop hours and a softer start before diving, errands or a long coastal walk.",
    whyBlueRecommends: [
      "Useful as a low-pressure meeting point before dives, transfers or local guide walks.",
      "Fits Dahab's slower rhythm better than a rushed hotel breakfast or busy beachfront stop.",
      "A practical place to check messages, confirm pickup times and settle into the day.",
    ],
    bestFor: ["Solo travelers", "Couples", "Digital nomads"],
    thingsToKnow: {
      openingHours: "Morning hours should be checked locally.",
      payment: "Cash and card availability may vary.",
      reservation: "Usually not needed.",
      accessibility: "Street access should be checked for mobility needs.",
    },
    trustStatus: "Under Review",
    trust: {
      blueVerified: false,
      personallyVisited: false,
      lastUpdated: "2026-07-07",
      priceLevel: "$",
      whyBlueChoseThis:
        "Coffee stops are small but important trust anchors in Dahab: they help travelers orient, meet people, confirm plans and slow down before making decisions.",
    },
    languages: ["Arabic", "English"],
    contact: {
      label: "Contact placeholder",
      instructions: "Direct contact will be added after Blue verifies details.",
    },
    bookingLink: "#",
    coordinates: {
      lat: 27.2226,
      lng: 34.517,
    },
    nearbyRecommendations: [
      {
        name: "Dahab Accommodation",
        category: "Stay",
        location: "Dahab town",
      },
      {
        name: "Dahab Dive Center",
        category: "Diving",
        location: "Lighthouse and dive shop area",
      },
      {
        name: "Dahab ATM & Cash Point",
        category: "ATM",
        location: "Central Dahab",
      },
    ],
    relatedGuides: [
      {
        title: "Planning slow mornings before transfers",
        href: "/guides",
      },
    ],
  },
  {
    id: "egypt-restaurant-001",
    slug: "dahab-restaurant",
    name: "Dahab Restaurant",
    category: "Restaurant",
    country: "Egypt",
    city: "Dahab",
    coverImage:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1400&q=80",
    ],
    summary:
      "A Dahab restaurant recommendation for travelers who want a grounded dinner after diving or a long walking day, with simple food, clear prices and a relaxed local pace.",
    whyBlueRecommends: [
      "Food recommendations in Dahab should be practical: clean, consistent, fairly priced and easy to return to.",
      "A good dinner place becomes part of the travel routine, especially for longer stays.",
      "Blue favors restaurants where travelers can understand portions, prices and payment before sitting down.",
    ],
    bestFor: ["Solo travelers", "Couples", "Families", "Backpackers"],
    thingsToKnow: {
      openingHours: "Evening hours may shift by season and prayer time.",
      payment: "Carry cash; card availability should be confirmed before ordering.",
      reservation: "Usually not needed, but groups should call ahead.",
      accessibility: "Ask about steps, bathroom access and outdoor seating if needed.",
    },
    trustStatus: "Under Review",
    trust: {
      blueVerified: false,
      personallyVisited: false,
      lastUpdated: "2026-07-07",
      priceLevel: "$",
      whyBlueChoseThis:
        "A reliable restaurant is part of Dahab's everyday infrastructure for travelers; Blue is looking for places that feel repeatable, fair and easy to understand.",
    },
    languages: ["Arabic", "English"],
    contact: {
      label: "Ask about opening hours",
      instructions: "Direct contact will be added after Blue verifies details.",
    },
    bookingLink: "#",
    coordinates: {
      lat: 28.4964,
      lng: 34.5147,
    },
    nearbyRecommendations: [
      {
        name: "Dahab Accommodation",
        category: "Stay",
        location: "Dahab town",
      },
      {
        name: "Dahab Safety Tips",
        category: "Safety",
        location: "Dahab practical notes",
      },
    ],
    relatedGuides: [
      {
        title: "How Blue evaluates everyday food stops",
        href: "/guides",
      },
      {
        title: "Egypt coastal month notes",
        href: "/journal/egypt-coastal-month-red-sea-notes",
      },
    ],
  },
  {
    id: "egypt-transport-001",
    slug: "dahab-transport-desk",
    name: "Dahab Transport Desk",
    category: "Transportation",
    country: "Egypt",
    city: "Dahab",
    coverImage:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=2200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    ],
    summary:
      "A practical Dahab transport recommendation for airport transfers, Sharm connections and day-trip logistics where clarity matters more than chasing the cheapest ride.",
    whyBlueRecommends: [
      "Transport is one of the first trust moments in Dahab, especially after late flights into Sharm El Sheikh.",
      "Blue favors clear pickup points, transparent pricing and drivers who confirm timing without pressure.",
      "Useful for travelers who do not want to negotiate every movement from zero.",
    ],
    bestFor: ["Solo travelers", "Couples", "Families", "Backpackers"],
    thingsToKnow: {
      openingHours: "Airport and intercity transfers should be arranged in advance.",
      payment: "Agree the price, currency and waiting policy before departure.",
      reservation: "Book ahead for late-night arrivals and early departures.",
      accessibility: "Confirm luggage space, car size and air conditioning before booking.",
    },
    trustStatus: "Recommended",
    trust: {
      blueVerified: true,
      personallyVisited: false,
      lastUpdated: "2026-07-07",
      priceLevel: "$$",
      whyBlueChoseThis:
        "Reliable transport reduces stress in Dahab because most travelers arrive via Sharm and need clear expectations before the desert road transfer.",
    },
    languages: ["Arabic", "English"],
    contact: {
      label: "Ask about transfer",
      instructions: "Verified driver or desk contact will be added after review.",
    },
    bookingLink: "#",
    coordinates: {
      lat: 28.5001,
      lng: 34.5156,
    },
    nearbyRecommendations: [
      {
        name: "Dahab SIM Card",
        category: "SIM Card",
        location: "Central Dahab",
      },
      {
        name: "Dahab Accommodation",
        category: "Stay",
        location: "Dahab town",
      },
    ],
    relatedGuides: [
      {
        title: "Sharm to Dahab arrival checklist",
        href: "/guides",
      },
      {
        title: "Egypt coastal month notes",
        href: "/journal/egypt-coastal-month-red-sea-notes",
      },
    ],
  },
  {
    id: "egypt-sim-001",
    slug: "dahab-sim-card",
    name: "Dahab SIM Card",
    category: "SIM Card",
    country: "Egypt",
    city: "Dahab",
    coverImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=80",
    ],
    summary:
      "A Dahab SIM card recommendation for travelers who need reliable data for maps, transfers, dive communication and remote work backup.",
    whyBlueRecommends: [
      "Connectivity is practical safety in Dahab: maps, drivers, dive shops and accommodation all depend on messaging.",
      "Blue recommends checking passport requirements, package validity and hotspot rules before buying.",
      "Useful for travelers arriving from Sharm who did not set up data at the airport.",
    ],
    bestFor: ["Solo travelers", "Digital nomads", "Backpackers"],
    thingsToKnow: {
      openingHours: "Shop hours vary; avoid leaving SIM setup until late evening.",
      payment: "Cash is safest; ask for the final package price before activation.",
      reservation: "No reservation needed.",
      accessibility: "Bring passport and confirm the shop can activate the SIM on the spot.",
    },
    trustStatus: "Under Review",
    trust: {
      blueVerified: false,
      personallyVisited: false,
      lastUpdated: "2026-07-07",
      priceLevel: "$",
      whyBlueChoseThis:
        "A working SIM card is a small purchase with large consequences: it affects transport, safety, diving logistics and daily confidence.",
    },
    languages: ["Arabic", "English"],
    contact: {
      label: "Contact placeholder",
      instructions: "Direct contact is not necessary unless Blue verifies a specific shop.",
    },
    bookingLink: "#",
    coordinates: {
      lat: 28.4972,
      lng: 34.514,
    },
    nearbyRecommendations: [
      {
        name: "Dahab ATM & Cash Point",
        category: "ATM",
        location: "Central Dahab",
      },
      {
        name: "Dahab Transport Desk",
        category: "Transportation",
        location: "Dahab to Sharm route",
      },
    ],
    relatedGuides: [
      {
        title: "First 24 hours in Dahab",
        href: "/guides",
      },
    ],
  },
  {
    id: "egypt-atm-001",
    slug: "dahab-atm-cash-point",
    name: "Dahab ATM & Cash Point",
    category: "ATM",
    country: "Egypt",
    city: "Dahab",
    coverImage:
      "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?auto=format&fit=crop&w=2200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80",
    ],
    summary:
      "A practical Dahab cash recommendation for travelers who need local currency without making every meal, taxi or small errand more complicated.",
    whyBlueRecommends: [
      "Cash still matters for Dahab transport, small shops and casual restaurants.",
      "Blue recommends having backup cash before remote beach trips or late transfers.",
      "ATM reliability, fees and card acceptance should be checked before relying on one machine.",
    ],
    bestFor: ["Solo travelers", "Couples", "Backpackers", "Families"],
    thingsToKnow: {
      openingHours: "ATM access may be 24/7, but machine availability can vary.",
      payment: "Withdraw Egyptian pounds; keep small notes for taxis and tips.",
      reservation: "No reservation needed.",
      accessibility: "Use well-lit, central locations and avoid depending on one machine.",
    },
    trustStatus: "Recommended",
    trust: {
      blueVerified: true,
      personallyVisited: false,
      lastUpdated: "2026-07-07",
      priceLevel: "Free",
      whyBlueChoseThis:
        "Cash access is part of Dahab's practical trust layer: travelers need to know where money logistics are easy before problems appear.",
    },
    languages: ["Arabic", "English"],
    contact: {
      label: "No direct contact",
      instructions: "This is a practical place note, not a business booking.",
    },
    bookingLink: "#",
    coordinates: {
      lat: 28.498,
      lng: 34.5148,
    },
    nearbyRecommendations: [
      {
        name: "Dahab SIM Card",
        category: "SIM Card",
        location: "Central Dahab",
      },
      {
        name: "Dahab Restaurant",
        category: "Restaurant",
        location: "Central Dahab",
      },
    ],
    relatedGuides: [
      {
        title: "Money and cash notes for independent travelers",
        href: "/guides",
      },
    ],
  },
  {
    id: "egypt-pharmacy-001",
    slug: "dahab-pharmacy-clinic",
    name: "Dahab Pharmacy & Clinic",
    category: "Pharmacy",
    country: "Egypt",
    city: "Dahab",
    coverImage:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=2200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80",
    ],
    summary:
      "A Dahab health-support recommendation for travelers who need a pharmacy, basic clinic direction or a plan before minor illness becomes a trip problem.",
    whyBlueRecommends: [
      "Health logistics should be known before they are urgent, especially in a small desert town.",
      "Blue prioritizes clear language support, opening hours and whether travelers can get basic advice quickly.",
      "Useful for divers, long-stay travelers and anyone managing heat, stomach issues or small injuries.",
    ],
    bestFor: ["Solo travelers", "Couples", "Families", "Backpackers"],
    thingsToKnow: {
      openingHours: "Confirm pharmacy and clinic hours locally; emergency options may differ.",
      payment: "Carry cash and ask about receipts for insurance claims.",
      reservation: "Clinic visits may require calling ahead.",
      accessibility: "Ask about location, stairs and English-speaking support if needed.",
    },
    trustStatus: "Under Review",
    trust: {
      blueVerified: false,
      personallyVisited: false,
      lastUpdated: "2026-07-07",
      priceLevel: "$",
      whyBlueChoseThis:
        "A complete destination needs basic health orientation; Blue should help travelers know where to start without pretending to offer medical advice.",
    },
    languages: ["Arabic", "English"],
    contact: {
      label: "Ask about hours",
      instructions:
        "Direct contact will be added only after Blue verifies the pharmacy or clinic information.",
    },
    bookingLink: "#",
    coordinates: {
      lat: 28.4976,
      lng: 34.5154,
    },
    nearbyRecommendations: [
      {
        name: "Dahab Safety Tips",
        category: "Safety",
        location: "Dahab practical notes",
      },
      {
        name: "Dahab Accommodation",
        category: "Stay",
        location: "Dahab town",
      },
    ],
    relatedGuides: [
      {
        title: "Health and safety basics before slow travel",
        href: "/guides",
      },
    ],
  },
  {
    id: "egypt-safety-001",
    slug: "dahab-safety-tips",
    name: "Dahab Safety Tips",
    category: "Safety",
    country: "Egypt",
    city: "Dahab",
    coverImage:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=2200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80",
    ],
    summary:
      "A Dahab safety note for independent travelers covering heat, sea conditions, night movement, desert trips, money habits and basic communication.",
    whyBlueRecommends: [
      "Safety in Dahab is less about fear and more about habits: water, sun, sea conditions, transport clarity and cash awareness.",
      "Blue keeps this as a practical reference point across the Dahab collection.",
      "Useful for travelers who prefer calm preparation over alarmist advice.",
    ],
    bestFor: ["Solo travelers", "Couples", "Families", "Backpackers"],
    thingsToKnow: {
      openingHours: "Use as a before-you-go checklist.",
      payment: "Free practical note.",
      reservation: "No reservation needed.",
      accessibility: "Ask guides, hosts or dive centers for current local conditions.",
    },
    trustStatus: "Verified",
    trust: {
      blueVerified: true,
      personallyVisited: false,
      lastUpdated: "2026-07-07",
      priceLevel: "Free",
      whyBlueChoseThis:
        "Safety tips complete the destination layer by turning scattered advice into a clear, calm checklist travelers can actually use.",
    },
    languages: ["English"],
    contact: {
      label: "No direct contact",
      instructions: "This is an editorial safety note, not emergency assistance.",
    },
    bookingLink: "#",
    coordinates: {
      lat: 28.4959,
      lng: 34.5144,
    },
    nearbyRecommendations: [
      {
        name: "Dahab Pharmacy & Clinic",
        category: "Pharmacy",
        location: "Central Dahab",
      },
      {
        name: "Dahab Local Guide",
        category: "Local Guide",
        location: "Dahab town and desert routes",
      },
    ],
    relatedGuides: [
      {
        title: "Dahab safety and arrival checklist",
        href: "/guides",
      },
      {
        title: "Egypt coastal month notes",
        href: "/journal/egypt-coastal-month-red-sea-notes",
      },
    ],
  },
  {
    id: "egypt-local-guide-001",
    slug: "dahab-local-guide",
    name: "Dahab Local Guide",
    category: "Local Guide",
    country: "Egypt",
    city: "Dahab",
    coverImage:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1400&q=80",
    ],
    summary:
      "A Dahab local guide recommendation for travelers who want context around neighborhoods, desert routes, sea days and how to move respectfully without being over-managed.",
    whyBlueRecommends: [
      "A good local guide can reduce uncertainty without turning the trip into a packaged tour.",
      "Useful for travelers considering desert walks, local etiquette, markets or first-day orientation.",
      "Blue favors guides who explain pace, risk, price and expectations before confirming a plan.",
    ],
    bestFor: ["Solo travelers", "Couples", "Families", "Backpackers"],
    thingsToKnow: {
      openingHours: "By arrangement.",
      payment: "Agree price, inclusions and cancellation terms before meeting.",
      reservation: "Book ahead for desert routes or full-day plans.",
      accessibility: "Discuss walking distance, heat exposure and transport needs in advance.",
    },
    trustStatus: "Under Review",
    trust: {
      blueVerified: false,
      personallyVisited: false,
      lastUpdated: "2026-07-07",
      priceLevel: "$$",
      whyBlueChoseThis:
        "Dahab benefits from human context: the right guide can help travelers understand pace, place and practical boundaries without selling a generic tour.",
    },
    languages: ["Arabic", "English"],
    contact: {
      label: "Ask about a local walk",
      instructions: "Direct guide contact will be added after Blue review.",
    },
    bookingLink: "#",
    coordinates: {
      lat: 28.4988,
      lng: 34.5149,
    },
    nearbyRecommendations: [
      {
        name: "Dahab Safety Tips",
        category: "Safety",
        location: "Dahab practical notes",
      },
      {
        name: "Dahab Transport Desk",
        category: "Transportation",
        location: "Dahab to Sharm route",
      },
    ],
    relatedGuides: [
      {
        title: "How Blue evaluates local guides",
        href: "/guides",
      },
      {
        title: "Egypt coastal month notes",
        href: "/journal/egypt-coastal-month-red-sea-notes",
      },
    ],
  },
  {
    id: "sardinia-stay-001",
    slug: "sardinia-accommodation",
    name: "Sardinia Accommodation",
    category: "Stay",
    country: "Italy",
    city: "Sardinia",
    coverImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80",
    ],
    summary:
      "A quiet Cagliari-area stay direction for travelers who want buses, beach access and residential calm rather than a resort mood.",
    whyBlueRecommends: [
      "Works well for travelers combining beach time with city errands.",
      "A useful base if you prefer public transport and walking.",
      "Matches Blue's Sardinia notes on quiet, practical coastal travel.",
    ],
    bestFor: ["Solo travelers", "Couples", "Digital nomads"],
    thingsToKnow: {
      openingHours: "Check-in depends on the host or property manager.",
      payment: "Direct payment or platform payment terms should be confirmed.",
      reservation: "Reserve early for summer; shoulder season is calmer.",
      accessibility: "Ask about stairs, bus distance and luggage access.",
    },
    trustStatus: "Recommended",
    trust: {
      blueVerified: true,
      personallyVisited: true,
      lastUpdated: "2026-07-07",
      priceLevel: "$$",
      whyBlueChoseThis:
        "This stay direction matches Blue's observed Sardinia rhythm: practical buses, quieter residential areas and access to the sea without resort pressure.",
    },
    languages: ["Italian", "English"],
    contact: {
      label: "Ask about the stay",
      instructions:
        "Contact is placeholder until Blue verifies the direct booking path.",
    },
    bookingLink: "#",
    coordinates: {
      lat: 39.2418,
      lng: 9.1929,
    },
    nearbyRecommendations: [
      {
        name: "Poetto Beach",
        category: "Beach",
        location: "Poetto coastline",
      },
      {
        name: "Cagliari Marina Restaurant",
        category: "Restaurant",
        location: "Cagliari center",
      },
    ],
    relatedGuides: [
      {
        title: "Sardinia stay notes near Margine Rosso",
        href: "/journal/sardinia-stay-near-margine-rosso",
      },
    ],
  },
  {
    id: "sardinia-beach-001",
    slug: "poetto-beach",
    name: "Poetto Beach",
    category: "Beach",
    country: "Italy",
    city: "Sardinia",
    coverImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80",
    ],
    summary:
      "A simple beach recommendation for early walks, soft light and low-pressure sea time near Cagliari.",
    whyBlueRecommends: [
      "Easy to reach without a car from parts of Cagliari.",
      "Best experienced early before the beach becomes busy.",
      "Useful for travelers who want practical coast access, not a postcard chase.",
    ],
    bestFor: ["Solo travelers", "Couples", "Families", "Backpackers"],
    thingsToKnow: {
      openingHours: "Open public beach; services vary by season.",
      payment: "Beach access is generally free; chairs or services may cost extra.",
      reservation: "No reservation for public access.",
      accessibility: "Promenade access is easier than many rocky beaches.",
    },
    trustStatus: "Verified",
    trust: {
      blueVerified: true,
      personallyVisited: true,
      lastUpdated: "2026-07-07",
      priceLevel: "Free",
      whyBlueChoseThis:
        "Poetto is a simple, usable beach recommendation because access, timing and public transport matter more than novelty.",
    },
    languages: ["Italian"],
    contact: {
      label: "No direct contact",
      instructions:
        "This is a place recommendation, not a booking or managed service.",
    },
    bookingLink: "#",
    coordinates: {
      lat: 39.2036,
      lng: 9.1647,
    },
    nearbyRecommendations: [
      {
        name: "Sardinia Accommodation",
        category: "Stay",
        location: "Residential coast side",
      },
      {
        name: "Cagliari Marina Restaurant",
        category: "Restaurant",
        location: "Cagliari center",
      },
    ],
    relatedGuides: [
      {
        title: "Sardinia coastal bus video notes",
        href: "/journal/sardinia-stay-near-margine-rosso",
      },
    ],
  },
  {
    id: "sardinia-restaurant-001",
    slug: "cagliari-marina-restaurant",
    name: "Cagliari Marina Restaurant",
    category: "Restaurant",
    country: "Italy",
    city: "Sardinia",
    coverImage:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1400&q=80",
    ],
    summary:
      "A Sardinian dinner direction for travelers who want a grounded local meal after a beach day, without chasing overhyped lists.",
    whyBlueRecommends: [
      "Works as a practical end point after a coastal day.",
      "Good fit for travelers who value simple service and local pacing.",
      "Blue would verify consistency before upgrading status.",
    ],
    bestFor: ["Solo travelers", "Couples", "Families"],
    thingsToKnow: {
      openingHours: "Evening hours vary; check before going.",
      payment: "Card is likely, but confirm locally.",
      reservation: "Reservation recommended on weekends.",
      accessibility: "Ask directly for entrance and seating details.",
    },
    trustStatus: "Under Review",
    trust: {
      blueVerified: false,
      personallyVisited: false,
      lastUpdated: "2026-07-07",
      priceLevel: "$$",
      whyBlueChoseThis:
        "A grounded restaurant near Cagliari's marina can become a useful local endpoint after beach days, but consistency still needs review.",
    },
    languages: ["Italian", "English"],
    contact: {
      label: "Ask about a table",
      instructions: "Direct contact will be added after Blue review.",
    },
    bookingLink: "#",
    coordinates: {
      lat: 39.2153,
      lng: 9.111,
    },
    nearbyRecommendations: [
      {
        name: "Poetto Beach",
        category: "Beach",
        location: "Poetto coastline",
      },
      {
        name: "Sardinia Accommodation",
        category: "Stay",
        location: "Residential coast side",
      },
    ],
    relatedGuides: [
      {
        title: "Slow travel notes from Sardinia",
        href: "/journal/sardinia-stay-near-margine-rosso",
      },
    ],
  },
  {
    id: "japan-coffee-001",
    slug: "tokyo-coffee",
    name: "Tokyo Coffee",
    category: "Coffee",
    country: "Japan",
    city: "Tokyo",
    coverImage:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=2200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1400&q=80",
    ],
    summary:
      "A small Tokyo coffee direction for travelers who need a quiet reset between neighborhoods, trains and long walking days.",
    whyBlueRecommends: [
      "Good for slow solo travel and route pauses.",
      "Feels more useful than another crowded cafe checklist.",
      "Neighborhood context matters more than novelty here.",
    ],
    bestFor: ["Solo travelers", "Couples", "Digital nomads"],
    thingsToKnow: {
      openingHours: "Check morning and weekly closing days.",
      payment: "Cashless payment may be available; carry cash as backup.",
      reservation: "Usually not needed.",
      accessibility: "Small interiors can be tight.",
    },
    trustStatus: "Recommended",
    trust: {
      blueVerified: true,
      personallyVisited: false,
      lastUpdated: "2026-07-07",
      priceLevel: "$",
      whyBlueChoseThis:
        "A calm Tokyo coffee stop helps independent travelers reset between dense neighborhoods without relying on trend-driven cafe lists.",
    },
    languages: ["Japanese", "Basic English"],
    contact: {
      label: "Contact placeholder",
      instructions: "Blue will add verified contact details after review.",
    },
    bookingLink: "#",
    coordinates: {
      lat: 35.6764,
      lng: 139.65,
    },
    nearbyRecommendations: [
      {
        name: "Kyoto Local Experience",
        category: "Local Experience",
        location: "West Tokyo",
      },
    ],
    relatedGuides: [
      {
        title: "How to choose a Tokyo base",
        href: "/guides",
      },
    ],
  },
  {
    id: "japan-local-001",
    slug: "kyoto-local-experience",
    name: "Kyoto Local Experience",
    category: "Local Experience",
    country: "Japan",
    city: "Kyoto",
    coverImage:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=1400&q=80",
    ],
    summary:
      "A local experience profile for travelers who want orientation, etiquette context and a quieter way into Kyoto.",
    whyBlueRecommends: [
      "Prioritizes context over performance.",
      "Useful for first-time visitors who want to move more respectfully.",
      "A strong fit for Blue's trust-based local introduction model.",
    ],
    bestFor: ["Solo travelers", "Couples", "Families"],
    thingsToKnow: {
      openingHours: "By arrangement.",
      payment: "Direct payment terms should be confirmed before meeting.",
      reservation: "Book ahead; small-group availability is limited.",
      accessibility: "Walking pace and route can be discussed in advance.",
    },
    trustStatus: "Under Review",
    trust: {
      blueVerified: false,
      personallyVisited: false,
      lastUpdated: "2026-07-07",
      priceLevel: "$$",
      whyBlueChoseThis:
        "Local context in Kyoto can meaningfully change how travelers move through the city, especially around etiquette, pacing and neighborhood choice.",
    },
    languages: ["Japanese", "English"],
    contact: {
      label: "Ask about a walk",
      instructions:
        "Direct contact remains placeholder until Blue completes review.",
    },
    bookingLink: "#",
    coordinates: {
      lat: 35.0116,
      lng: 135.7681,
    },
    nearbyRecommendations: [
      {
        name: "Tokyo Coffee",
        category: "Coffee",
        location: "Tokyo route planning stop",
      },
    ],
    relatedGuides: [
      {
        title: "Local etiquette before joining small experiences",
        href: "/guides",
      },
    ],
  },
  {
    id: "germany-housing-001",
    slug: "germany-housing",
    name: "Germany Housing",
    category: "Housing",
    country: "Germany",
    city: "Berlin",
    coverImage:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
    ],
    summary:
      "A housing support profile for students and newcomers who need clearer expectations before contacting landlords or agents.",
    whyBlueRecommends: [
      "Housing is a high-risk category where trust signals matter.",
      "Useful for students who need process clarity before paying deposits.",
      "Blue would review communication quality and scam-prevention behavior over time.",
    ],
    bestFor: ["Solo travelers", "Digital nomads"],
    thingsToKnow: {
      openingHours: "Consultation hours by arrangement.",
      payment: "Never transfer deposits before verification and written terms.",
      reservation: "Book a consultation slot before sending documents.",
      accessibility: "Remote communication should be available.",
    },
    trustStatus: "Under Review",
    trust: {
      blueVerified: false,
      personallyVisited: false,
      lastUpdated: "2026-07-07",
      priceLevel: "$$",
      whyBlueChoseThis:
        "Housing support is high stakes for students and newcomers, so Blue should surface process clarity and scam-prevention signals before any recommendation is upgraded.",
    },
    languages: ["German", "English", "Chinese"],
    contact: {
      label: "Ask about housing support",
      instructions:
        "Placeholder contact only; Blue must verify this category carefully before launch.",
    },
    bookingLink: "#",
    coordinates: {
      lat: 52.52,
      lng: 13.405,
    },
    nearbyRecommendations: [
      {
        name: "Berlin Cafe",
        category: "Cafe",
        location: "Prenzlauer Berg",
      },
      {
        name: "Germany Study-Friendly Place",
        category: "Study",
        location: "University district",
      },
    ],
    relatedGuides: [
      {
        title: "How to evaluate housing contacts in Germany",
        href: "/guides",
      },
    ],
  },
  {
    id: "germany-cafe-001",
    slug: "berlin-cafe",
    name: "Berlin Cafe",
    category: "Cafe",
    country: "Germany",
    city: "Berlin",
    coverImage:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=2200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=80",
    ],
    summary:
      "A calm cafe direction for students, remote workers and travelers who want a reliable place to read or plan without pressure.",
    whyBlueRecommends: [
      "Good fit for long planning mornings and low-volume work.",
      "Useful for travelers settling into Berlin for more than a weekend.",
      "A practical local anchor rather than a trend-driven cafe stop.",
    ],
    bestFor: ["Solo travelers", "Digital nomads", "Couples"],
    thingsToKnow: {
      openingHours: "Check weekday and weekend hours.",
      payment: "Card is common; carry cash as backup.",
      reservation: "Usually not needed.",
      accessibility: "Ask locally about step-free access and seating.",
    },
    trustStatus: "Recommended",
    trust: {
      blueVerified: true,
      personallyVisited: false,
      lastUpdated: "2026-07-07",
      priceLevel: "$",
      whyBlueChoseThis:
        "For students and remote workers, a reliable Berlin cafe is less about hype and more about calm seating, practical hours and repeat usability.",
    },
    languages: ["German", "English"],
    contact: {
      label: "Contact placeholder",
      instructions: "Direct contact will be added only if useful to travelers.",
    },
    bookingLink: "#",
    coordinates: {
      lat: 52.532,
      lng: 13.417,
    },
    nearbyRecommendations: [
      {
        name: "Germany Housing",
        category: "Housing",
        location: "Berlin newcomer support",
      },
    ],
    relatedGuides: [
      {
        title: "Finding useful work cafes without relying on hype",
        href: "/guides",
      },
    ],
  },
  {
    id: "germany-study-001",
    slug: "germany-study-friendly-place",
    name: "Germany Study-Friendly Place",
    category: "Study",
    country: "Germany",
    city: "Munich",
    coverImage:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=2200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80",
    ],
    summary:
      "A study-oriented local recommendation for students and long-stay travelers who need quiet structure more than sightseeing tips.",
    whyBlueRecommends: [
      "Supports the student side of Blue's audience.",
      "Useful for exam weeks, application work and quiet planning days.",
      "Blue can evaluate reliability through repeated traveler feedback.",
    ],
    bestFor: ["Solo travelers", "Digital nomads"],
    thingsToKnow: {
      openingHours: "Hours can change around holidays and university breaks.",
      payment: "Some study spaces require membership or day pass.",
      reservation: "Reserve if seats are limited.",
      accessibility: "Check desk access, elevator and quiet-room rules.",
    },
    trustStatus: "Under Review",
    trust: {
      blueVerified: false,
      personallyVisited: false,
      lastUpdated: "2026-07-07",
      priceLevel: "$",
      whyBlueChoseThis:
        "Study-friendly spaces support Blue's student audience and can be evaluated over time through repeated traveler feedback.",
    },
    languages: ["German", "English"],
    contact: {
      label: "Ask about access",
      instructions: "Access details will be verified before public launch.",
    },
    bookingLink: "#",
    coordinates: {
      lat: 48.1351,
      lng: 11.582,
    },
    nearbyRecommendations: [
      {
        name: "Berlin Cafe",
        category: "Cafe",
        location: "Berlin planning stop",
      },
    ],
    relatedGuides: [
      {
        title: "Study and settling-in notes for Germany",
        href: "/guides",
      },
    ],
  },
];

export const recommendations: Recommendation[] = [
  ...curatedRecommendations,
  ...publishedRecommendations,
];

const destinationCountryMap: Record<string, string[]> = {
  Europe: ["Germany", "Italy", "France", "Spain", "Greece", "Portugal"],
  China: ["China"],
  Japan: ["Japan"],
  "Southeast Asia": ["Thailand", "Vietnam", "Indonesia", "Malaysia", "Philippines"],
  "Middle East": ["Egypt", "Turkey", "United Arab Emirates", "Jordan", "Oman"],
  Islands: ["Italy", "Malta", "Indonesia"],
  "Remote Places": [],
};

export function getRecommendationBySlug(slug: string) {
  return recommendations.find((recommendation) => recommendation.slug === slug);
}

export function getRecommendationsForDestination(destination: {
  name: string;
  places: readonly string[];
}) {
  const countries = destinationCountryMap[destination.name] ?? [];
  const places = new Set(destination.places.map((place) => place.toLowerCase()));

  return recommendations.filter((recommendation) => {
    const country = recommendation.country.toLowerCase();
    const city = recommendation.city.toLowerCase();

    return (
      countries.includes(recommendation.country) ||
      places.has(country) ||
      places.has(city)
    );
  });
}

export function getDestinationCategoryBySlug(slug: string) {
  return destinationCategoryGroups.find((category) => category.slug === slug);
}

export function getRecommendationsForDestinationCategory(
  destination: {
    name: string;
    places: readonly string[];
  },
  category: DestinationCategoryGroup,
) {
  const categorySet = new Set<RecommendationCategory>(category.categories);

  return getRecommendationsForDestination(destination).filter((recommendation) =>
    categorySet.has(recommendation.category),
  );
}
