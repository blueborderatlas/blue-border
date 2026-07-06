import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { destinations } from "@/lib/archive";
import { recommendations } from "@/lib/recommendations";

const heroImage =
  "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=2400&q=85";

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
  europe: "Historic routes, local rooms, slower arrivals.",
  china: "Modern movement with deeper local context.",
  japan: "Quiet rituals and careful neighborhood travel.",
  "southeast-asia": "Warm routes shaped by local rhythm.",
};

const guideCards = [
  {
    title: "Planning",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1400&q=82",
  },
  {
    title: "Stays",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1400&q=82",
  },
  {
    title: "Local Trust",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=82",
  },
];

function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex w-fit items-center gap-2 text-sm uppercase tracking-[0.18em] text-foam hover:text-sand"
    >
      {children} <ArrowUpRight size={16} aria-hidden="true" />
    </Link>
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
  const [featuredRecommendation, ...secondaryRecommendations] =
    recommendations.slice(0, 3);

  return (
    <main>
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 text-center sm:px-8">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.5]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,17,31,0.34),rgba(6,17,31,0.9)_72%),linear-gradient(0deg,rgba(6,17,31,0.92),rgba(6,17,31,0.14)_46%,rgba(6,17,31,0.78))]" />

        <div className="relative mx-auto max-w-5xl">
          <h1 className="font-serif text-7xl leading-none text-foam sm:text-9xl lg:text-[11rem]">
            Blue
          </h1>
          <p className="mt-8 text-xs uppercase tracking-[0.42em] text-foam/85 sm:text-sm">
            Travel Begins With Trust
          </p>
          <Link
            href="/destinations"
            className="mx-auto mt-12 inline-flex min-h-12 items-center gap-2 border border-foam/70 px-6 text-sm uppercase tracking-[0.16em] text-foam hover:border-sand hover:text-sand"
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

      <section className="px-5 py-28 sm:px-8 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-sand">
                Destinations
              </p>
              <h2 className="mt-5 max-w-2xl font-serif text-5xl leading-none text-foam sm:text-7xl">
                Explore with confidence.
              </h2>
            </div>
            <TextLink href="/destinations">View all</TextLink>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {featuredDestinations.map((destination, index) => (
              <Link
                key={destination.slug}
                href={`/destinations/${destination.slug}`}
                className={`group grid gap-8 lg:grid-cols-12 lg:items-center ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative min-h-[62vh] overflow-hidden bg-tide lg:col-span-8">
                  <img
                    src={destinationImages[destination.slug]}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-[0.86] group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/82 via-ink/8 to-transparent" />
                </div>
                <div className="lg:col-span-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-sand">
                    0{index + 1}
                  </p>
                  <h3 className="mt-5 font-serif text-6xl leading-none text-foam sm:text-7xl">
                    {destination.name}
                  </h3>
                  <p className="mt-6 max-w-sm text-sm leading-7 text-mist">
                    {destinationNotes[destination.slug]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-28 sm:px-8 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-sand">
                Recommended
              </p>
              <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-none text-foam sm:text-7xl">
                A shorter path to people worth trusting.
              </h2>
            </div>
            <TextLink href="/recommended">View all</TextLink>
          </div>

          {featuredRecommendation ? (
            <div className="grid gap-8 lg:grid-cols-12">
              <Link
                href={`/recommended/${featuredRecommendation.slug}`}
                className="group relative min-h-[70vh] overflow-hidden bg-tide lg:col-span-8"
              >
                <img
                  src={featuredRecommendation.coverImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.84] group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/12 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
                  <p className="text-xs uppercase tracking-[0.16em] text-sand">
                    {featuredRecommendation.category} ·{" "}
                    {featuredRecommendation.city}
                  </p>
                  <h3 className="mt-5 max-w-2xl font-serif text-5xl leading-none text-foam sm:text-6xl">
                    {featuredRecommendation.name}
                  </h3>
                </div>
              </Link>

              <div className="grid gap-8 lg:col-span-4">
                {secondaryRecommendations.map((recommendation) => (
                  <Link
                    key={recommendation.slug}
                    href={`/recommended/${recommendation.slug}`}
                    className="group relative min-h-[32vh] overflow-hidden bg-tide"
                  >
                    <img
                      src={recommendation.coverImage}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-[0.8] group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/16 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="text-xs uppercase tracking-[0.16em] text-sand">
                        {recommendation.category} · {recommendation.city}
                      </p>
                      <h3 className="mt-3 font-serif text-3xl leading-tight text-foam">
                        {recommendation.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="px-5 py-28 sm:px-8 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-sand">
                Guides
              </p>
              <h2 className="mt-5 max-w-2xl font-serif text-5xl leading-none text-foam sm:text-7xl">
                Read less noise.
              </h2>
            </div>
            <TextLink href="/guides">Read guides</TextLink>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {guideCards.map((guide, index) => (
              <Link
                key={guide.title}
                href="/guides"
                className={`group relative overflow-hidden bg-tide ${
                  index === 1
                    ? "min-h-[68vh] md:mt-20"
                    : "min-h-[58vh]"
                }`}
              >
                <img
                  src={guide.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.78] group-hover:opacity-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/14 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="font-serif text-5xl leading-none text-foam">
                    {guide.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-[100svh] items-center px-5 py-28 sm:px-8">
        <div className="mx-auto flex min-h-[72vh] w-full max-w-7xl flex-col items-center justify-center border border-white/10 bg-white/[0.035] px-6 text-center sm:px-12">
          <p className="text-xs uppercase tracking-[0.22em] text-sand">
            Work With Blue
          </p>
          <h2 className="mt-8 max-w-4xl font-serif text-6xl leading-none text-foam sm:text-8xl">
            Trust is the product.
          </h2>
          <Link
            href="/about"
            className="mt-12 inline-flex min-h-12 items-center gap-2 bg-foam px-6 text-sm uppercase tracking-[0.16em] text-ink hover:bg-sand"
          >
            Learn about Blue <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
