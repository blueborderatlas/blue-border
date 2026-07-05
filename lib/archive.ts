export const destinations = [
  {
    name: "Europe",
    slug: "europe",
    places: ["France", "Italy", "Spain", "Greece", "Portugal"],
  },
  {
    name: "China",
    slug: "china",
    places: ["Shanghai", "Beijing", "Yunnan", "Chengdu", "Hong Kong"],
  },
  {
    name: "Japan",
    slug: "japan",
    places: ["Tokyo", "Kyoto", "Osaka", "Hokkaido", "Okinawa"],
  },
  {
    name: "Southeast Asia",
    slug: "southeast-asia",
    places: ["Thailand", "Vietnam", "Indonesia", "Malaysia", "Philippines"],
  },
  {
    name: "Middle East",
    slug: "middle-east",
    places: ["United Arab Emirates", "Turkey", "Egypt", "Jordan", "Oman"],
  },
  {
    name: "Islands",
    slug: "islands",
    places: ["Sardinia", "Sicily", "Malta", "Canary Islands", "Bali"],
  },
  {
    name: "Remote Places",
    slug: "remote-places",
    places: ["Patagonia", "Faroe Islands", "Iceland", "Mongolia", "Arctic routes"],
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
