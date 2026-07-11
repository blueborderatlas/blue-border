"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { TrustBadge } from "@/components/editorial";
import {
  recommendationCategories,
  type Recommendation,
  type RecommendationCategory,
} from "@/lib/recommendations";

const filters: RecommendationCategory[] = [...recommendationCategories];

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
      <section className="px-5 pb-12 pt-8 sm:px-8">
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
                    ? "min-h-11 rounded-blue-sm border border-sand/60 bg-sand/10 px-4 text-xs uppercase tracking-[0.16em] text-foam transition duration-300 ease-blue hover:border-sand"
                    : "min-h-11 rounded-blue-sm border border-white/12 bg-white/[0.03] px-4 text-xs uppercase tracking-[0.16em] text-mist transition duration-300 ease-blue hover:border-sand/60 hover:text-foam"
                }
              >
                {filter}
              </button>
            );
          })}
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:pb-32">
        {filteredRecommendations.length > 0 ? (
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredRecommendations.map((recommendation, index) => (
              <Link
                key={recommendation.id}
                href={`/places/${recommendation.slug}`}
                className={`blue-card blue-card-hover group ${
                  index === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden bg-tide ${
                    index === 0 ? "h-[34rem]" : "h-80"
                  }`}
                >
                  <img
                    src={recommendation.coverImage}
                    alt=""
                    className="blue-media-img"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/86 via-ink/12 to-transparent" />
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-sand">
                    <span>{recommendation.category}</span>
                    <span className="h-1 w-1 rounded-full bg-sand/70" />
                    <span>
                      {recommendation.country} / {recommendation.city}
                    </span>
                  </div>

                  <h2
                    className={`mt-5 font-serif leading-tight text-foam group-hover:text-sand ${
                      index === 0 ? "text-5xl sm:text-6xl" : "text-4xl"
                    }`}
                  >
                    {recommendation.name}
                  </h2>

                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-mist">
                    {recommendation.summary}
                  </p>

                  <div className="mt-7 flex items-center justify-between gap-4">
                    <TrustBadge status={recommendation.trustStatus} />
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
          <div className="blue-card mx-auto max-w-7xl p-8 sm:p-10">
            <p className="blue-eyebrow">
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
