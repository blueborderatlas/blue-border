import type { Metadata } from "next";
import { PageHero } from "@/components/editorial";
import { recommendations } from "@/lib/recommendations";
import { RecommendationCollection } from "./recommendation-collection";

export const metadata: Metadata = {
  title: "Recommended",
  description:
    "Blue Recommended is a curated layer for trusted local businesses, reviewed through real traveler feedback and direct connections.",
};

export default function RecommendedPage() {
  return (
    <main>
      <PageHero
        eyebrow="Blue Recommended"
        title="Places worth opening first."
        copy="A curated collection of local businesses, people and experiences reviewed through Blue's trust layer."
        image={recommendations[0]?.coverImage}
      />
      <RecommendationCollection recommendations={recommendations} />
    </main>
  );
}
