"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import {
  recommendationCategories,
  type Recommendation,
  type RecommendationCategory,
  type TrustStatus,
} from "@/lib/recommendations";

const filters: RecommendationCategory[] = [...recommendationCategories];

const statusStyles: Record<TrustStatus, string> = {
  Recommended: "border-sky-300/35 bg-sky-300/10 text-foam",
  Verified: "border-emerald-300/35 bg-emerald-300/10 text-foam",
  "Under Review": "border-amber-300/35 bg-amber-300/10 text-foam",
  Paused: "border-rose-300/35 bg-rose-300/10 text-foam",
};

export function RecommendationCollection({
  recommendations,
}: {
  recommendations: Recommendation[];
}) {
  const [activeFilter, setActiveFilter] =
    useState<RecommendationCategory | null>(null);

  const filteredRecommendations = activeFilter
    ? recommendations.filter(
        (recommendation) => recommendation.category === activeFilter,
      )
    : recommendations;

  return (
    <>
      <section className="px-5 pb-12 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(isActive ? null : filter)}
                className={
                  isActive
                    ? "min-h-11 border border-sand/60 bg-sand/10 px-4 text-xs uppercase tracking-[0.16em] text-foam transition hover:border-sand"
                    : "min-h-11 border border-white/12 bg-white/[0.03] px-4 text-xs uppercase tracking-[0.16em] text-mist transition hover:border-sand/60 hover:text-foam"
                }
              >
                {filter}
              </button>
            );
          })}
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        {filteredRecommendations.length > 0 ? (
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredRecommendations.map((recommendation) => (
              <Link
                key={recommendation.id}
                href={`/places/${recommendation.slug}`}
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
                      {recommendation.country} / {recommendation.city}
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
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-7xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.18em] text-sand">
              No recommendations yet
            </p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-foam sm:text-5xl">
              This category is still being curated.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-mist">
              Blue will add recommendations here once enough trust signals and
              local context are available.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
