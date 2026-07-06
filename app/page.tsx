import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { destinations } from "@/lib/archive";
import { getFeaturedPosts } from "@/lib/posts";
import { recommendations } from "@/lib/recommendations";

const heroImage =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2200&q=85";

const destinationSlugs = ["europe", "china", "japan", "southeast-asia"];

const destinationImages: Record<string, string> = {
  europe:
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1800&q=82",
  china:
    "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1800&q=82",
  japan:
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=82",
  "southeast-asia":
    "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1800&q=82",
};

const destinationNotes: Record<string, string> = {
  europe: "Independent cities, coastlines and local stays.",
  china: "Modern travel, deep culture and trusted local context.",
  japan: "Quiet neighborhoods, food rituals and slower routes.",
  "southeast-asia": "Warm movement, practical routes and local rhythm.",
};

export default function HomePage() {
  const featuredDestinations = destinationSlugs
    .map((slug) =>
      destinations.find((destination) => destination.slug === slug),
    )
    .filter(
      (destination): destination is (typeof destinations)[number] =>
        Boolean(destination),
    );
  const featuredRecommendations = recommendations.slice(0, 3);
  const featuredStories = getFeaturedPosts().slice(0, 3);

  return (
    <main>
      <section className="relative flex min-h-[100svh] items-center overflow-hidden px-5 py-24 sm:px-8">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.58]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,17,31,0.96),rgba(6,17,31,0.68),rgba(6,17,31,0.24)),linear-gradient(0deg,rgba(6,17,31,0.96),transparent_48%)]" />
        <div className="relative mx-auto flex min-h-[calc(100svh-12rem)] w-full max-w-7xl flex-col justify-center">
          <p className="text-sm uppercase tracking-[0.38em] text-sand sm:text-base">
            Blue
          </p>
          <h1 className="mt-8 max-w-4xl font-serif text-6xl leading-[0.9] text-foam sm:text-8xl lg:text-9xl">
            Travel, filtered by trust.
          </h1>
          <Link
            href="/destinations"
            className="mt-12 inline-flex min-h-12 w-fit items-center gap-2 bg-foam px-6 text-sm uppercase tracking-[0.16em] text-ink hover:bg-sand"
          >
            Explore destinations <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-xs uppercase tracking-[0.18em] text-mist sm:flex">
          <span className="h-px w-10 bg-white/28" />
          Scroll
          <span className="h-px w-10 bg-white/28" />
        </div>
      </section>

      <section className="flex min-h-[100svh] items-center px-5 py-28 sm:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-sand">
                Destinations
              </p>
              <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-none text-foam sm:text-7xl">
                The world, edited.
              </h2>
            </div>
            <Link
              href="/destinations"
              className="inline-flex w-fit items-center gap-2 text-sm uppercase tracking-[0.18em] text-foam hover:text-sand"
            >
              View destinations <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredDestinations.map((destination) => (
              <Link
                key={destination.slug}
                href={`/destinations/${destination.slug}`}
                className="group relative min-h-[58vh] overflow-hidden bg-tide"
              >
                <img
                  src={destinationImages[destination.slug]}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.86] group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/18 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <h3 className="font-serif text-5xl leading-none text-foam">
                    {destination.name}
                  </h3>
                  <p className="mt-5 max-w-xs text-sm leading-7 text-mist">
                    {destinationNotes[destination.slug]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-[100svh] items-center border-y border-white/10 bg-white/[0.025] px-5 py-28 sm:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-sand">
                Recommended
              </p>
              <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-none text-foam sm:text-7xl">
                People and places worth knowing.
              </h2>
            </div>
            <Link
              href="/recommended"
              className="inline-flex w-fit items-center gap-2 text-sm uppercase tracking-[0.18em] text-foam hover:text-sand"
            >
              View all <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-20 grid gap-8 lg:grid-cols-3">
            {featuredRecommendations.map((recommendation) => (
              <Link
                key={recommendation.slug}
                href={`/recommended/${recommendation.slug}`}
                className="group block"
              >
                <div className="relative h-[58vh] min-h-[28rem] overflow-hidden bg-tide">
                  <img
                    src={recommendation.coverImage}
                    alt=""
                    className="h-full w-full object-cover opacity-[0.84] group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <p className="text-xs uppercase tracking-[0.16em] text-sand">
                      {recommendation.category} · {recommendation.city}
                    </p>
                    <h3 className="mt-4 font-serif text-3xl leading-tight text-foam group-hover:text-sand">
                      {recommendation.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-[100svh] items-center px-5 py-28 sm:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-sand">
                Journal
              </p>
              <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-none text-foam sm:text-7xl">
                Stories with a human trace.
              </h2>
            </div>
            <Link
              href="/journal"
              className="inline-flex w-fit items-center gap-2 text-sm uppercase tracking-[0.18em] text-foam hover:text-sand"
            >
              Read journal <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {featuredStories.map((story) => (
              <Link
                key={story.slug}
                href={`/journal/${story.slug}`}
                className="group relative min-h-[48vh] overflow-hidden bg-tide"
              >
                <img
                  src={story.coverImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.78] group-hover:opacity-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/16 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="text-xs uppercase tracking-[0.16em] text-sand">
                    {story.category}
                  </p>
                  <h3 className="font-serif text-4xl leading-tight text-foam">
                    {story.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-[100svh] items-center px-5 py-28 sm:px-8">
        <div className="mx-auto flex min-h-[66vh] w-full max-w-7xl flex-col justify-center border border-white/10 bg-white/[0.035] p-8 sm:p-12 lg:p-16">
          <p className="text-xs uppercase tracking-[0.22em] text-sand">
            Work With Blue
          </p>
          <h2 className="mt-6 max-w-4xl font-serif text-6xl leading-none text-foam sm:text-8xl">
            Trust is the product.
          </h2>
          <Link
            href="/about"
            className="mt-12 inline-flex min-h-12 w-fit items-center gap-2 bg-foam px-6 text-sm uppercase tracking-[0.16em] text-ink hover:bg-sand"
          >
            Learn about Blue <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
