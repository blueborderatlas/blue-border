import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { destinations } from "@/lib/archive";
import { getPostsByRegion } from "@/lib/posts";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "A quiet Blue Border archive of coastal regions, islands and seaside towns across Europe and nearby seas.",
};

export default function DestinationsPage() {
  return (
    <main className="px-5 pb-24 pt-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Destinations"
          title="A growing coastal archive, sorted by region."
          copy="Small island notes, port towns, beaches, ferry edges and unfinished routes gathered slowly over time."
        />

        <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => {
            const posts = getPostsByRegion(destination.name);

            return (
              <Link
                key={destination.slug}
                href={`/destinations/${destination.slug}`}
                className="group bg-deep p-6 transition hover:bg-tide/80 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-sand">
                      {posts.length} {posts.length === 1 ? "note" : "notes"}
                    </p>
                    <h2 className="mt-3 font-serif text-3xl text-foam">
                      {destination.name}
                    </h2>
                  </div>
                  <ArrowUpRight
                    className="mt-1 text-mist transition group-hover:text-sand"
                    size={18}
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-5 text-sm leading-7 text-mist">
                  {destination.places.join(" · ")}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
