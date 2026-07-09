import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { destinations, getDestinationBySlug } from "@/lib/archive";
import { getPostsByRegion } from "@/lib/posts";
import {
  destinationCategoryGroups,
  getRecommendationsForDestination,
  getRecommendationsForDestinationCategory,
} from "@/lib/recommendations";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";

type PageProps = {
  params: Promise<{ region: string }>;
};

export function generateStaticParams() {
  return destinations.map((destination) => ({
    region: destination.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { region } = await params;
  const destination = getDestinationBySlug(region);

  if (!destination) {
    return {};
  }

  return {
    title: destination.name,
    description: `Blue Border notes from ${destination.name}: ${destination.places.join(", ")}.`,
  };
}

export default async function DestinationRegionPage({ params }: PageProps) {
  const { region } = await params;
  const destination = getDestinationBySlug(region);

  if (!destination) {
    notFound();
  }

  const posts = getPostsByRegion(destination.name);
  const recommendations = getRecommendationsForDestination(destination);
  const categoryLinks = destinationCategoryGroups
    .map((category) => ({
      ...category,
      count: getRecommendationsForDestinationCategory(destination, category)
        .length,
    }))
    .filter((category) => destination.slug === "dahab" || category.count > 0);

  return (
    <main className="px-5 pb-24 pt-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Destination"
          title={destination.name}
          copy={`Notes from ${destination.places.join(", ")} and the local routes around them.`}
        />

        <div className="mt-8 flex flex-wrap gap-2 text-sm text-mist">
          {destination.places.map((place) => (
            <span
              key={place}
              className="border border-white/12 bg-white/[0.03] px-3 py-2"
            >
              {place}
            </span>
          ))}
        </div>

        {categoryLinks.length > 0 ? (
          <section className="mt-14 border-y border-white/10 py-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sand">
                  Categories
                </p>
                <h2 className="mt-4 font-serif text-4xl leading-tight text-foam sm:text-5xl">
                  Browse {destination.name} by travel need.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-mist">
                Start with a category, then open a trusted place when you need
                the full profile.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {categoryLinks.map((category) => (
                <Link
                  key={category.slug}
                  href={`/destinations/${destination.slug}/${category.slug}`}
                  className="group border border-white/10 bg-white/[0.03] p-5 transition hover:border-sand/45"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-sand">
                    {category.count} places
                  </p>
                  <h3 className="mt-4 font-serif text-3xl leading-tight text-foam group-hover:text-sand">
                    {category.label}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-10 grid gap-6">
          {posts.map((post, index) => (
            <PostCard key={post.slug} post={post} priority={index === 0} />
          ))}
        </div>

        {recommendations.length > 0 ? (
          <section className="mt-20 border-t border-white/10 pt-14">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sand">
                  Places
                </p>
                <h2 className="mt-4 font-serif text-4xl leading-tight text-foam sm:text-5xl">
                  Trusted local starting points.
                </h2>
              </div>
              {categoryLinks[0] ? (
                <Link
                  href={`/destinations/${destination.slug}/${categoryLinks[0].slug}`}
                  className="text-sm uppercase tracking-[0.16em] text-mist transition hover:text-sand"
                >
                  Browse by category
                </Link>
              ) : null}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {recommendations.map((recommendation) => (
                <Link
                  key={recommendation.id}
                  href={`/places/${recommendation.slug}`}
                  className="group overflow-hidden border border-white/10 bg-white/[0.03] transition hover:border-sand/45"
                >
                  <div className="h-56 overflow-hidden bg-tide">
                    <img
                      src={recommendation.coverImage}
                      alt=""
                      className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-sand">
                      {recommendation.category} · {recommendation.city}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl leading-tight text-foam">
                      {recommendation.name}
                    </h3>
                    <p className="mt-3 text-xs uppercase tracking-[0.14em] text-mist">
                      {recommendation.trustStatus}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
