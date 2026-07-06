import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { destinations } from "@/lib/archive";
import { getFeaturedPosts } from "@/lib/posts";
import { recommendations } from "@/lib/recommendations";

const heroImage =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2400&q=85";

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
  europe: "Old cities, local rooms and quieter routes.",
  china: "A deeper way to read modern travel in China.",
  japan: "Small rituals, neighborhood stays and careful movement.",
  "southeast-asia": "Warm routes, trusted people and practical rhythm.",
};

function SectionIntro({
  label,
  title,
  href,
  cta,
}: {
  label: string;
  title: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-sand">
          {label}
        </p>
        <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-none text-foam sm:text-7xl">
          {title}
        </h2>
      </div>
      <Link
        href={href}
        className="inline-flex w-fit items-center gap-2 text-sm uppercase tracking-[0.18em] text-foam hover:text-sand"
      >
        {cta} <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </div>
  );
}

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
          className="absolute inset-0 h-full w-full object-cover opacity-[0.54]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,17,31,0.98),rgba(6,17,31,0.7),rgba(6,17,31,0.2)),linear-gradient(0deg,rgba(6,17,31,0.95),transparent_54%)]" />
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
            Explore <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-xs uppercase tracking-[0.18em] text-mist sm:flex">
          <span className="h-px w-10 bg-white/28" />
          Scroll
          <span className="h-px w-10 bg-white/28" />
        </div>
      </section>

      <section className="flex min-h-[100svh] items-center px-5 py-24 sm:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <SectionIntro
            label="Destinations"
            title="Four ways into the world."
            href="/destinations"
            cta="View destinations"
          />

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {featuredDestinations.map((destination) => (
              <Link
                key={destination.slug}
                href={`/destinations/${destination.slug}`}
                className="group relative min-h-[34vh] overflow-hidden bg-tide sm:min-h-[38vh]"
              >
                <img
                  src={destinationImages[destination.slug]}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.84] group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <h3 className="font-serif text-5xl leading-none text-foam">
                    {destination.name}
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-7 text-mist">
                    {destinationNotes[destination.slug]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-[100svh] items-center border-y border-white/10 bg-white/[0.025] px-5 py-24 sm:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <SectionIntro
            label="Recommended"
            title="People and places worth knowing."
            href="/recommended"
            cta="View all"
          />

          <div className="mt-16 grid gap-6 lg:grid-cols-12 lg:grid-rows-2">
            {featuredRecommendations.map((recommendation, index) => (
              <Link
                key={recommendation.slug}
                href={`/recommended/${recommendation.slug}`}
                className={`group relative min-h-[36vh] overflow-hidden bg-tide ${
                  index === 0
                    ? "lg:col-span-7 lg:row-span-2 lg:min-h-[62vh]"
                    : "lg:col-span-5 lg:min-h-[29vh]"
                }`}
              >
                <img
                  src={recommendation.coverImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.84] group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/14 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="text-xs uppercase tracking-[0.16em] text-sand">
                    {recommendation.category} · {recommendation.city}
                  </p>
                  <h3 className="mt-4 max-w-xl font-serif text-4xl leading-tight text-foam group-hover:text-sand">
                    {recommendation.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-[100svh] items-center px-5 py-24 sm:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <SectionIntro
            label="Journal"
            title="Stories with a human trace."
            href="/journal"
            cta="Read journal"
          />

          <div className="mt-16 grid gap-6 lg:grid-cols-12 lg:grid-rows-2">
            {featuredStories.map((story, index) => (
              <Link
                key={story.slug}
                href={`/journal/${story.slug}`}
                className={`group relative overflow-hidden bg-tide ${
                  index === 0
                    ? "min-h-[58vh] lg:col-span-8 lg:row-span-2"
                    : "min-h-[32vh] lg:col-span-4"
                }`}
              >
                <img
                  src={story.coverImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.8] group-hover:opacity-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/16 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="text-xs uppercase tracking-[0.16em] text-sand">
                    {story.category}
                  </p>
                  <h3 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-foam">
                    {story.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-[100svh] items-center px-5 py-24 sm:px-8">
        <div className="mx-auto grid min-h-[68vh] w-full max-w-7xl items-center border border-white/10 bg-white/[0.035] p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:p-16">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-sand">
              Work With Blue
            </p>
            <h2 className="mt-6 max-w-4xl font-serif text-6xl leading-none text-foam sm:text-8xl">
              Trust is the product.
            </h2>
          </div>
          <Link
            href="/about"
            className="mt-12 inline-flex min-h-12 w-fit items-center gap-2 bg-foam px-6 text-sm uppercase tracking-[0.16em] text-ink hover:bg-sand lg:mt-0"
          >
            Learn about Blue <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
