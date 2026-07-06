import type { Metadata } from "next";
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
      <section className="px-5 pb-16 pt-36 sm:px-8 lg:pb-24 lg:pt-44">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.24em] text-sand">
            Blue Recommended
          </p>
          <h1 className="mt-5 max-w-5xl font-serif text-6xl leading-[0.98] text-foam sm:text-8xl">
            Trusted local recommendations.
          </h1>
          <p className="mt-7 max-w-3xl text-xl leading-9 text-mist">
            A curated index of places, people and experiences reviewed through
            Blue&apos;s editorial trust system.
          </p>
        </div>
      </section>
      <RecommendationCollection recommendations={recommendations} />
    </main>
  );
}
