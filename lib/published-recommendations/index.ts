import dahabDivingObservations from "@/lib/published-recommendations/dahab-diving/ai-observations.json";
import dahabDivingBlueExperience from "@/lib/published-recommendations/dahab-diving/blue-experience.json";
import dahabDivingBusinessProfile from "@/lib/published-recommendations/dahab-diving/business-profile.json";
import dahabDivingRecommendation from "@/lib/published-recommendations/dahab-diving/recommendation.json";
import type {
  AiObservations,
  BlueExperience,
  BusinessProfile,
  Recommendation,
  RecommendationCategory,
  TravelerType,
  TrustStatus,
} from "@/lib/recommendations";

type PublishedBlueRecommendation = {
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

type PublishedRecommendationRecord = {
  id: string;
  slug: string;
  businessProfile: BusinessProfile;
  blueExperience: BlueExperience;
  blueRecommendation: PublishedBlueRecommendation;
  aiObservations: AiObservations;
  imageBasePath: string;
  trust: Recommendation["trust"];
  languages: string[];
  contact: Recommendation["contact"];
  bookingLink: string;
  coordinates: Recommendation["coordinates"];
  nearbyRecommendations: Recommendation["nearbyRecommendations"];
  relatedGuides: Recommendation["relatedGuides"];
};

const publishedRecommendationRecords: PublishedRecommendationRecord[] = [
  {
    id: "ai-egypt-dahab-diving-001",
    slug: "dahab-diving-beyond-the-water",
    businessProfile: dahabDivingBusinessProfile as BusinessProfile,
    blueExperience: dahabDivingBlueExperience as BlueExperience,
    blueRecommendation: dahabDivingRecommendation,
    aiObservations: dahabDivingObservations,
    imageBasePath: "/images/ai/dahab-diving",
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

function toTrustStatus(status: string): TrustStatus {
  const allowed: TrustStatus[] = [
    "Recommended",
    "Verified",
    "Under Review",
    "Paused",
  ];

  return allowed.includes(status as TrustStatus)
    ? (status as TrustStatus)
    : "Under Review";
}

function toPublicImagePath(basePath: string, fileName: string) {
  return `${basePath}/${fileName}`;
}

function adaptPublishedRecommendation(
  record: PublishedRecommendationRecord,
): Recommendation {
  const category = toCategory(record.blueRecommendation.category);
  const gallery = record.blueRecommendation.suggestedGallery.map((fileName) =>
    toPublicImagePath(record.imageBasePath, fileName),
  );

  return {
    id: record.id,
    slug: record.slug,
    name: record.blueRecommendation.title,
    category,
    country: record.blueRecommendation.country,
    city: record.blueRecommendation.destination,
    coverImage: gallery[0],
    gallery,
    summary: record.blueRecommendation.summary,
    whyBlueRecommends: record.blueRecommendation.whyBlueRecommends,
    bestFor: toBestFor(category),
    thingsToKnow: toThingsToKnow(record.blueRecommendation.thingsToKnow),
    trustStatus: toTrustStatus(record.blueRecommendation.trustStatus),
    trust: record.trust,
    languages: record.languages,
    contact: record.contact,
    bookingLink: record.bookingLink,
    coordinates: record.coordinates,
    nearbyRecommendations: record.nearbyRecommendations,
    relatedGuides: record.relatedGuides,
    businessProfile: record.businessProfile,
    blueExperience: record.blueExperience,
    aiObservations: record.aiObservations,
  };
}

export const publishedRecommendations: Recommendation[] =
  publishedRecommendationRecords.map(adaptPublishedRecommendation);
