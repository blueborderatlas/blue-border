import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { destinations } from "@/lib/archive";
import { recommendations } from "@/lib/recommendations";

const heroImage =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2200&q=85";

const destinationImages: Record<string, string> = {
  europe:
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1400&q=80",
  china:
    "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1400&q=80",
  japan:
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=80",
  "southeast-asia":
    "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1400&q=80",
  "middle-east":
    "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=1400&q=80",
  islands:
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80",
  "remote-places":
    "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1400&q=80",
};

const featuredGuides = [
  "Planning",
  "Accommodation",
  "Local trust",
];

export default function HomePage() {
  const featuredDestinations = destinations.slice(0, 4);
  const featuredRecommendations = recommendations.slice(0, 3);

  return (
    <main>
      <section className="relative flex min-h-[100svh] items-center overflow-hidden px-5 py-28 sm:px-8">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,17,31,0.97),rgba(6,17,31,0.74),rgba(6,17,31,0.36)),linear-gradient(0deg,rgba(6,17,31,0.96),transparent_48%)]" />
        <div className="relative mx-auto w-full max-w-7xl">
          <p className="text-xs uppercase tracking-[0.26em] text-sand">
            Blue
          </p>
          <h1 className="mt-7 max-w-5xl font-serif text-7xl leading-[0.9] text-foam sm:text-8xl lg:text-9xl">
            Travel, filtered by trust.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-8 text-foam/86 sm:text-lg">
            Blue connects independent travelers with places and local people
            worth knowing.
          </p>
          <Link
            href="/destinations"
            className="mt-12 inline-flex min-h-12 items-center gap-2 bg-foam px-6 text-sm uppercase tracking-[0.16em] text-ink hover:bg-sand"
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

      <section className="flex min-h-[92svh] items-center px-5 py-28 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-sand">
                Destinations
              </p>
              <h2 className="mt-5 max-w-3xl font-serif text-6xl leading-none text-foam sm:text-7xl">
                The world, edited.
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-7 text-mist">
                Begin with regions built for slower, more independent travel.
              </p>
            </div>
            <Link
              href="/destinations"
              className="inline-flex w-fit items-center gap-2 text-sm uppercase tracking-[0.18em] text-foam hover:text-sand"
            >
              View destinations <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {featuredDestinations.map((destination) => (
              <Link
                key={destination.slug}
                href={`/destinations/${destination.slug}`}
                className="group relative min-h-[54vh] overflow-hidden bg-tide"
              >
                <img
                  src={destinationImages[destination.slug]}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.84] group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/18 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <h3 className="font-serif text-5xl leading-none text-foam">
                    {destination.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-[92svh] items-center border-y border-white/10 bg-white/[0.025] px-5 py-28 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-sand">
                Recommended
              </p>
              <h2 className="mt-5 max-w-3xl font-serif text-6xl leading-none text-foam sm:text-7xl">
                Local recommendations, held to a higher standard.
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-7 text-mist">
                A curated index of places and people Blue would introduce with
                confidence.
              </p>
            </div>
            <Link
              href="/recommended"
              className="inline-flex w-fit items-center gap-2 text-sm uppercase tracking-[0.18em] text-foam hover:text-sand"
            >
              View recommended <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {featuredRecommendations.map((recommendation) => (
              <Link
                key={recommendation.slug}
                href={`/recommended/${recommendation.slug}`}
                className="group overflow-hidden border border-white/10 bg-white/[0.03] hover:border-sand/45"
              >
                <div className="relative h-[46vh] min-h-80 overflow-hidden bg-tide">
                  <img
                    src={recommendation.coverImage}
                    alt=""
                    className="h-full w-full object-cover opacity-[0.82] group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/82 via-ink/12 to-transparent" />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-sand">
                    {recommendation.category} · {recommendation.city}
                  </p>
                  <h3 className="mt-4 font-serif text-3xl leading-tight text-foam group-hover:text-sand">
                    {recommendation.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-[92svh] items-center px-5 py-28 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-sand">
                Guides
              </p>
              <h2 className="mt-5 max-w-3xl font-serif text-6xl leading-none text-foam sm:text-7xl">
                Clearer ways to move.
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-7 text-mist">
                Practical guides for planning, staying and choosing with less
                noise.
              </p>
            </div>
            <Link
              href="/guides"
              className="inline-flex w-fit items-center gap-2 text-sm uppercase tracking-[0.18em] text-foam hover:text-sand"
            >
              Read guides <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
            {featuredGuides.map((guide) => (
              <article key={guide} className="min-h-64 bg-deep p-7 sm:p-8">
                <h3 className="font-serif text-4xl leading-tight text-foam">
                  {guide}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-[92svh] items-center px-5 py-28 sm:px-8">
        <div className="mx-auto w-full max-w-7xl border border-white/10 bg-white/[0.035] p-8 sm:p-12 lg:p-16">
          <p className="text-xs uppercase tracking-[0.22em] text-sand">
            Work With Blue
          </p>
          <h2 className="mt-5 max-w-4xl font-serif text-6xl leading-none text-foam sm:text-8xl">
            Trust is the product.
          </h2>
          <p className="mt-8 max-w-xl text-sm leading-7 text-mist">
            Blue works with local businesses that can serve travelers with
            care, consistency and honesty.
          </p>
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
