export const destinations = [
  {
    name: "Canary Islands",
    slug: "canary-islands",
    places: ["Tenerife", "Lanzarote", "Fuerteventura"],
  },
  {
    name: "Greece",
    slug: "greece",
    places: ["Crete", "Santorini", "Zakynthos"],
  },
  {
    name: "Italy",
    slug: "italy",
    places: ["Sardinia", "Sicily", "Genoa", "Nice"],
  },
  {
    name: "Croatia",
    slug: "croatia",
    places: ["Dubrovnik"],
  },
  {
    name: "Turkey",
    slug: "turkey",
    places: ["Fethiye"],
  },
  {
    name: "Egypt",
    slug: "egypt",
    places: ["Red Sea", "Hurghada", "Sharm El Sheikh", "Cairo", "Marsa Matruh"],
  },
] as const;

export const topics = [
  "Beaches",
  "Fishing",
  "Stays",
  "Coffee",
  "Sunsets",
  "Walking",
  "Transport",
] as const;

export type Destination = (typeof destinations)[number];
export type Topic = (typeof topics)[number];

export function getDestinationBySlug(slug: string) {
  return destinations.find((destination) => destination.slug === slug);
}

export function getTopicSlug(topic: string) {
  return topic.toLowerCase().replace(/\s+/g, "-");
}

export function getTopicBySlug(slug: string) {
  return topics.find((topic) => getTopicSlug(topic) === slug);
}
