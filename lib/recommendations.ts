export type TrustStatus =
  | "Recommended"
  | "Verified"
  | "Under Review"
  | "Paused";

export type RecommendationCategory =
  | "Stay"
  | "Food"
  | "Coffee"
  | "Diving"
  | "Nature"
  | "Local Experience";

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
};

export const recommendations: Recommendation[] = [
  {
    id: "rec-001",
    slug: "aegean-family-stay",
    name: "Aegean Family Stay",
    category: "Stay",
    country: "Greece",
    city: "Crete",
    coverImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&w=1400&q=80",
    ],
    summary:
      "A calm, locally run stay for travelers who want a slower base, clear communication and practical local context before committing to a place.",
    whyBlueRecommends: [
      "Helpful host communication before arrival.",
      "Quiet location suited to slower independent travel.",
      "Useful local context for transport, food and nearby routes.",
      "Good fit for travelers who prefer simple, personal stays over large resort areas.",
    ],
    bestFor: [
      "Solo travelers",
      "Couples",
      "Digital nomads",
      "Families",
      "Backpackers",
    ],
    thingsToKnow: {
      openingHours: "Check-in by arrangement.",
      payment: "Direct payment with the business.",
      reservation: "Contact ahead before arrival.",
      accessibility: "Ask directly for room and stair details.",
    },
    trustStatus: "Recommended",
    languages: ["English", "Greek"],
    contact: {
      label: "Message the host",
      instructions:
        "Use the verified contact instructions once this listing is live.",
    },
    bookingLink: "#",
    coordinates: {
      lat: 35.2401,
      lng: 24.8093,
    },
    nearbyRecommendations: [
      {
        name: "Harbor Coffee Room",
        category: "Coffee",
        location: "Old port area",
      },
      {
        name: "Quiet Coast Walk",
        category: "Nature",
        location: "Nearby village trail",
      },
      {
        name: "Village Table",
        category: "Food",
        location: "Hill village",
      },
    ],
  },
  {
    id: "rec-002",
    slug: "hutong-morning-coffee",
    name: "Hutong Morning Coffee",
    category: "Coffee",
    country: "China",
    city: "Beijing",
    coverImage:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=2200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=80",
    ],
    summary:
      "A small coffee stop for slow mornings, neighborhood reading and travelers who want a softer entry into the city.",
    whyBlueRecommends: [
      "Good place to pause before a long walking day.",
      "Easy neighborhood context for first-time visitors.",
      "Calm atmosphere without a rushed chain-store feeling.",
    ],
    bestFor: ["Solo travelers", "Couples", "Digital nomads"],
    thingsToKnow: {
      openingHours: "Morning to late afternoon.",
      payment: "Mobile payment and cash details should be checked locally.",
      reservation: "Usually not needed.",
      accessibility: "Historic lanes may have uneven pavement.",
    },
    trustStatus: "Under Review",
    languages: ["Chinese", "Basic English"],
    contact: {
      label: "Contact placeholder",
      instructions: "Contact details will be added after Blue review.",
    },
    bookingLink: "#",
    coordinates: {
      lat: 39.9336,
      lng: 116.3975,
    },
    nearbyRecommendations: [
      {
        name: "Old City Walk",
        category: "Local Experience",
        location: "Central Beijing",
      },
      {
        name: "Courtyard Stay",
        category: "Stay",
        location: "Historic lane",
      },
    ],
  },
  {
    id: "rec-003",
    slug: "osaka-counter-kitchen",
    name: "Osaka Counter Kitchen",
    category: "Food",
    country: "Japan",
    city: "Osaka",
    coverImage:
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=2200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?auto=format&fit=crop&w=1400&q=80",
    ],
    summary:
      "A compact food counter for travelers who care about pace, atmosphere and a direct view of the kitchen.",
    whyBlueRecommends: [
      "Small-format dining that feels personal without being performative.",
      "Good for travelers who prefer one clear recommendation over endless lists.",
      "Useful location for an evening route through the city.",
    ],
    bestFor: ["Solo travelers", "Couples", "Backpackers"],
    thingsToKnow: {
      openingHours: "Evening hours vary.",
      payment: "Confirm card or cash before ordering.",
      reservation: "Reservation may be useful for peak nights.",
      accessibility: "Counter seating can be tight.",
    },
    trustStatus: "Recommended",
    languages: ["Japanese", "Basic English"],
    contact: {
      label: "Ask about seats",
      instructions: "Blue will add preferred contact instructions later.",
    },
    bookingLink: "#",
    coordinates: {
      lat: 34.6937,
      lng: 135.5023,
    },
    nearbyRecommendations: [
      {
        name: "Late Coffee Window",
        category: "Coffee",
        location: "Station side street",
      },
      {
        name: "Night Market Walk",
        category: "Local Experience",
        location: "Central Osaka",
      },
    ],
  },
  {
    id: "rec-004",
    slug: "chiang-mai-river-work-stay",
    name: "Chiang Mai River Work Stay",
    category: "Stay",
    country: "Thailand",
    city: "Chiang Mai",
    coverImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80",
    ],
    summary:
      "A low-key stay for remote workers who need calm mornings, usable routines and access to the city without being inside the busiest area.",
    whyBlueRecommends: [
      "Good rhythm for longer stays and remote work.",
      "Close enough to food, errands and local transport.",
      "Better suited to routine than quick sightseeing.",
    ],
    bestFor: ["Digital nomads", "Solo travelers", "Couples"],
    thingsToKnow: {
      openingHours: "Reception hours should be confirmed.",
      payment: "Direct monthly or nightly payment terms may vary.",
      reservation: "Reserve early for longer stays.",
      accessibility: "Ask about elevator access and workspace setup.",
    },
    trustStatus: "Verified",
    languages: ["Thai", "English"],
    contact: {
      label: "Ask for availability",
      instructions: "Future contact details will be verified by Blue.",
    },
    bookingLink: "#",
    coordinates: {
      lat: 18.7883,
      lng: 98.9853,
    },
    nearbyRecommendations: [
      {
        name: "Slow Breakfast Table",
        category: "Food",
        location: "Riverside neighborhood",
      },
      {
        name: "Mountain Day Driver",
        category: "Nature",
        location: "Doi Suthep route",
      },
    ],
  },
  {
    id: "rec-005",
    slug: "red-sea-dive-operator",
    name: "Red Sea Dive Operator",
    category: "Diving",
    country: "Egypt",
    city: "Hurghada",
    coverImage:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1682687982501-1e58ab814714?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
    ],
    summary:
      "A placeholder dive operator profile for travelers who want safety clarity, equipment transparency and realistic expectations before booking.",
    whyBlueRecommends: [
      "Safety process is the first thing Blue would verify.",
      "Useful for travelers comparing operators beyond price.",
      "Good example of a service where trust matters more than marketing.",
    ],
    bestFor: ["Solo travelers", "Couples", "Backpackers"],
    thingsToKnow: {
      openingHours: "Trip schedules depend on weather and sea conditions.",
      payment: "Deposit and cancellation terms should be confirmed directly.",
      reservation: "Advance reservation is recommended.",
      accessibility: "Ask about boat access and equipment support.",
    },
    trustStatus: "Under Review",
    languages: ["Arabic", "English"],
    contact: {
      label: "Ask about dive schedule",
      instructions: "Verified operator contact will be added after review.",
    },
    bookingLink: "#",
    coordinates: {
      lat: 27.2579,
      lng: 33.8116,
    },
    nearbyRecommendations: [
      {
        name: "Marina Fish Table",
        category: "Food",
        location: "Harbor area",
      },
      {
        name: "Red Sea Transfer",
        category: "Local Experience",
        location: "Hotel pickup route",
      },
    ],
  },
  {
    id: "rec-006",
    slug: "madeira-ridge-walk-guide",
    name: "Madeira Ridge Walk Guide",
    category: "Nature",
    country: "Portugal",
    city: "Madeira",
    coverImage:
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=2200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80",
    ],
    summary:
      "A local walking guide profile for travelers who want mountain routes explained with weather, pace and risk in mind.",
    whyBlueRecommends: [
      "Strong fit for travelers who need practical route judgment.",
      "Weather and pacing matter more than generic trail lists.",
      "Good bridge between independent travel and local knowledge.",
    ],
    bestFor: ["Solo travelers", "Couples", "Families", "Backpackers"],
    thingsToKnow: {
      openingHours: "Route timing depends on weather.",
      payment: "Direct guide payment.",
      reservation: "Book ahead for safer planning.",
      accessibility: "Route difficulty varies significantly.",
    },
    trustStatus: "Recommended",
    languages: ["Portuguese", "English"],
    contact: {
      label: "Ask about routes",
      instructions: "Blue will show verified route-contact details later.",
    },
    bookingLink: "#",
    coordinates: {
      lat: 32.7607,
      lng: -16.9595,
    },
    nearbyRecommendations: [
      {
        name: "Cliffside Stay",
        category: "Stay",
        location: "North coast",
      },
      {
        name: "Village Bakery Stop",
        category: "Coffee",
        location: "Trailhead village",
      },
    ],
  },
];

export function getRecommendationBySlug(slug: string) {
  return recommendations.find((recommendation) => recommendation.slug === slug);
}
