import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { recommendations, type TrustStatus } from "@/lib/recommendations";

export const metadata: Metadata = {
  title: "Recommended",
  description:
    "Blue Recommended is a curated layer for trusted local businesses, reviewed through real traveler feedback and direct connections.",
};

const filters = [
  "Stay",
  "Food",
  "Coffee",
  "Diving",
  "Nature",
  "Local Experience",
];

const statusStyles: Record<TrustStatus, string> = {
  Recommended: "border-sky-300/35 bg-sky-300/10 text-foam",
  Verified: "border-emerald-300/35 bg-emerald-300/10 text-foam",
  "Under Review": "border-amber-300/35 bg-amber-300/10 text-foam",
};

function getPlaceParts(location: string) {
  const [city, country] = location.split(",").map((item) => item.trim());

  return {
    city,
    country: country ?? location,
  };
}

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

      <section className="px-5 pb-12 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className="min-h-11 border border-white/12 bg-white/[0.03] px-4 text-xs uppercase tracking-[0.16em] text-mist transition hover:border-sand/60 hover:text-foam"
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((recommendation) => {
            const { city, country } = getPlaceParts(recommendation.location);

            return (
              <Link
                key={recommendation.slug}
                href={`/recommended/${recommendation.slug}`}
                className="group overflow-hidden border border-white/10 bg-white/[0.03] transition duration-500 hover:-translate-y-1 hover:border-sand/45 hover:bg-white/[0.05]"
              >
                <div className="relative h-72 overflow-hidden bg-tide">
                  <img
                    src={recommendation.coverImage}
                    alt=""
                    className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/86 via-ink/12 to-transparent" />
                </div>

                <div className="p-6 sm:p-7">
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-sand">
                    <span>{recommendation.category}</span>
                    <span className="h-1 w-1 rounded-full bg-sand/70" />
                    <span>
                      {country} / {city}
                    </span>
                  </div>

                  <h2 className="mt-5 font-serif text-4xl leading-tight text-foam group-hover:text-sand">
                    {recommendation.name}
                  </h2>

                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-mist">
                    {recommendation.summary}
                  </p>

                  <div className="mt-7 flex items-center justify-between gap-4">
                    <span
                      className={`inline-flex min-h-10 items-center gap-2 border px-3 text-xs uppercase tracking-[0.14em] ${statusStyles[recommendation.trustStatus]}`}
                    >
                      <BadgeCheck size={15} strokeWidth={1.6} />
                      {recommendation.trustStatus}
                    </span>
                    <ArrowUpRight
                      className="text-mist transition group-hover:text-sand"
                      size={18}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
