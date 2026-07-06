export type TrustStatus = "Recommended" | "Verified" | "Under Review";

export type TravelerType =
  | "Solo travelers"
  | "Couples"
  | "Digital nomads"
  | "Families"
  | "Backpackers";

export type Recommendation = {
  slug: string;
  name: string;
  location: string;
  category: string;
  coverImage: string;
  summary: string;
  reasons: string[];
  bestFor: TravelerType[];
  thingsToKnow: {
    openingHours: string;
    language: string;
    payment: string;
    reservation: string;
    accessibility: string;
  };
  trustStatus: TrustStatus;
  gallery: string[];
  nearby: Array<{
    name: string;
    category: string;
    location: string;
  }>;
};

export const recommendations: Recommendation[] = [
  {
    slug: "aegean-family-stay",
    name: "Aegean Family Stay",
    location: "Crete, Greece",
    category: "Stay",
    coverImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=85",
    summary:
      "A calm, locally run stay for travelers who want a slower base, clear communication and practical local context before committing to a place.",
    reasons: [
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
      language: "English and local language.",
      payment: "Direct payment with the business.",
      reservation: "Contact ahead before arrival.",
      accessibility: "Ask directly for room and stair details.",
    },
    trustStatus: "Recommended",
    gallery: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&w=1400&q=80",
    ],
    nearby: [
      {
        name: "Harbor Coffee Room",
        category: "Cafe",
        location: "Old port area",
      },
      {
        name: "Local Route Driver",
        category: "Transport",
        location: "Regional transfer",
      },
      {
        name: "Quiet Coast Walk",
        category: "Outdoor",
        location: "Nearby village trail",
      },
    ],
  },
];

export function getRecommendationBySlug(slug: string) {
  return recommendations.find((recommendation) => recommendation.slug === slug);
}
