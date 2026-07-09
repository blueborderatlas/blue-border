import dahabDiving from "@/lib/generated-recommendations/dahab-diving.json";
import type {
  Recommendation,
  RecommendationCategory,
  TravelerType,
} from "@/lib/recommendations";

type GeneratedRecommendation = {
  title: string;
  destination: string;
  country: string;
  category: string;
  summary: string;
  whyBlueRecommends: string[];
  bestFor: string[];
  thingsToKnow: string[];
  trustStatus: string;
  suggestedGallery: string[];
  tags: string[];
};

type PublishedGeneratedRecommendation = {
  id: string;
  slug: string;
  generated: GeneratedRecommendation;
  imageBasePath: string;
  city: string;
  trust: Recommendation["trust"];
  languages: string[];
  contact: Recommendation["contact"];
  bookingLink: string;
  coordinates: Recommendation["coordinates"];
  nearbyRecommendations: Recommendation["nearbyRecommendations"];
  relatedGuides: Recommendation["relatedGuides"];
};

const generatedRecommendationSources: PublishedGeneratedRecommendation[] = [
  {
    id: "ai-egypt-dahab-diving-001",
    slug: "dahab-diving-beyond-the-water",
    generated: dahabDiving,
    imageBasePath: "/images/ai/dahab-diving",
    city: "Dahab",
    trust: {
      blueVerified: false,
      personallyVisited: false,
      lastUpdated: "2026-07-09",
      priceLevel: "$$",
      whyBlueChoseThis:
        "This is Blue's first AI-assisted recommendation draft, grounded in traveler photos and kept under review until local business details are verified.",
    },
    languages: ["Arabic", "English"],
    contact: {
      label: "Contact placeholder",
      instructions:
        "This AI-assisted recommendation is under review. Direct contact details will be added only after Blue verifies the local operator.",
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
        title: "Egypt coastal month notes",
        href: "/journal/egypt-coastal-month-red-sea-notes",
      },
      {
        title: "How Blue reviews local recommendations",
        href: "/about",
      },
    ],
  },
];

function toCategory(category: string): RecommendationCategory {
  const allowed: RecommendationCategory[] = [
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
  ];

  return allowed.includes(category as RecommendationCategory)
    ? (category as RecommendationCategory)
    : "Local Experience";
}

function toBestFor(category: RecommendationCategory): TravelerType[] {
  if (category === "Diving") {
    return ["Solo travelers", "Couples", "Backpackers"];
  }

  return ["Solo travelers", "Couples", "Digital nomads"];
}

function toThingsToKnow(items: string[]): Recommendation["thingsToKnow"] {
  return {
    openingHours: items[0] ?? "Opening hours not verified",
    payment: items[1] ?? "Payment details not verified",
    reservation: items[3] ?? "Booking process not verified",
    accessibility: items[4] ?? "Accessibility details not verified",
  };
}

function toPublicImagePath(basePath: string, fileName: string) {
  return `${basePath}/${fileName}`;
}

function adaptGeneratedRecommendation(
  source: PublishedGeneratedRecommendation,
): Recommendation {
  const category = toCategory(source.generated.category);
  const gallery = source.generated.suggestedGallery.map((fileName) =>
    toPublicImagePath(source.imageBasePath, fileName),
  );

  return {
    id: source.id,
    slug: source.slug,
    name: source.generated.title,
    category,
    country: source.generated.country,
    city: source.city || source.generated.destination,
    coverImage: gallery[0],
    gallery,
    summary: source.generated.summary,
    whyBlueRecommends: source.generated.whyBlueRecommends,
    bestFor: toBestFor(category),
    thingsToKnow: toThingsToKnow(source.generated.thingsToKnow),
    trustStatus: "Under Review",
    trust: source.trust,
    languages: source.languages,
    contact: source.contact,
    bookingLink: source.bookingLink,
    coordinates: source.coordinates,
    nearbyRecommendations: source.nearbyRecommendations,
    relatedGuides: source.relatedGuides,
  };
}

export const publishedAiRecommendations: Recommendation[] =
  generatedRecommendationSources.map(adaptGeneratedRecommendation);
