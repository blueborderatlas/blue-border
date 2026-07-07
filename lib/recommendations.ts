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
  "Housing",
  "Study",
] as const;

export type RecommendationCategory = (typeof recommendationCategories)[number];

export type TravelerType =
  | "Solo travelers"
  | "Couples"
  | "Digital nomads"
  | "Families"
  | "Backpackers";

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
};

export const recommendations: Recommendation[] = [
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
      "A Dahab diving recommendation for travelers who care about safety, equipment clarity and a calm introduction to the Red Sea.",
    whyBlueRecommends: [
      "Dahab is a strong base for shore-access diving and slower Red Sea travel.",
      "Good fit for travelers comparing dive centers beyond price.",
      "Safety process, equipment clarity and sea conditions are treated as part of the recommendation.",
      "Useful for first-time Red Sea visitors who want direct questions answered before committing.",
    ],
    bestFor: ["Solo travelers", "Couples", "Backpackers"],
    thingsToKnow: {
      openingHours: "Dive schedules depend on weather, site conditions and certification level.",
      payment: "Confirm deposit, cash/card terms and cancellation policy directly.",
      reservation: "Advance reservation is recommended in high season.",
      accessibility: "Ask about boat access, equipment weight and water-entry support.",
    },
    trustStatus: "Under Review",
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
      "A Dahab accommodation profile for travelers who want walkable routines, quiet nights and easy access to diving, cafes and the sea.",
    whyBlueRecommends: [
      "Dahab works well for travelers who want a simple base rather than resort isolation.",
      "Helpful for longer stays, dive weeks and remote work routines.",
      "Neighborhood choice matters here: sea access, noise and walkability can change the whole trip.",
    ],
    bestFor: ["Solo travelers", "Couples", "Digital nomads"],
    thingsToKnow: {
      openingHours: "Check-in hours should be confirmed before arrival.",
      payment: "Direct payment terms vary by season and length of stay.",
      reservation: "Reserve early around holidays, diving weeks and winter high season.",
      accessibility: "Ask about elevator access and room floor before booking.",
    },
    trustStatus: "Recommended",
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
    ],
    relatedGuides: [
      {
        title: "Choosing a stay base before sea trips",
        href: "/guides",
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
      "A Dahab coffee recommendation for slow mornings, laptop hours and meeting before a dive or coastal walk.",
    whyBlueRecommends: [
      "Useful as a meeting point before diving, transport or a long sea walk.",
      "Fits Dahab's slower rhythm better than a rushed breakfast stop.",
      "Good for travelers who want a pause, not a scene.",
    ],
    bestFor: ["Solo travelers", "Couples", "Digital nomads"],
    thingsToKnow: {
      openingHours: "Morning hours should be checked locally.",
      payment: "Cash and card availability may vary.",
      reservation: "Usually not needed.",
      accessibility: "Street access should be checked for mobility needs.",
    },
    trustStatus: "Under Review",
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
    ],
    relatedGuides: [
      {
        title: "Planning slow mornings before transfers",
        href: "/guides",
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
