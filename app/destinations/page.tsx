import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "A quiet Blue Border archive of coastal regions, islands and seaside towns across Europe and nearby seas.",
};

const destinationGroups = [
  {
    name: "Europe",
    copy: "Historic cities, regional stays and independent routes across familiar and overlooked corners.",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "China",
    copy: "Local context for domestic travel, city life, food, stays and slower regional journeys.",
    image:
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Japan",
    copy: "Calm neighborhoods, practical routes, small businesses and travel notes beyond first impressions.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Southeast Asia",
    copy: "Warm-weather bases, local operators, transport notes and independent travel planning.",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Middle East",
    copy: "Cities, desert routes, coastal stops and trusted local connections for curious travelers.",
    image:
      "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Remote Islands",
    copy: "Farther places for slow arrivals, simple stays, practical routes and rare local knowledge.",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
  },
];

const destinationStructure = [
  "Overview",
  "Recommended",
  "Guides",
  "Journal",
  "Local businesses",
  "Travel planning",
  "Accommodation",
  "Transportation",
];

export default function DestinationsPage() {
  return (
    <main>
      <section className="px-5 pb-20 pt-36 sm:px-8 lg:pb-28 lg:pt-44">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.24em] text-sand">
            Destinations
          </p>
          <h1 className="mt-5 max-w-5xl font-serif text-6xl leading-[0.98] text-foam sm:text-8xl">
            Explore Destinations
          </h1>
          <p className="mt-7 max-w-3xl text-xl leading-9 text-mist">
            Trusted local recommendations, practical guides and real travel
            stories from destinations around the world.
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {destinationGroups.map((destination) => (
            <article
              key={destination.name}
              className="group overflow-hidden border border-white/10 bg-white/[0.03] transition duration-500 hover:-translate-y-1 hover:border-sand/45 hover:bg-white/[0.05]"
            >
              <div className="relative h-72 overflow-hidden bg-tide">
                <img
                  src={destination.image}
                  alt=""
                  className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/82 via-ink/12 to-transparent" />
              </div>
              <div className="p-6 sm:p-7">
                <h2 className="font-serif text-4xl leading-tight text-foam">
                  {destination.name}
                </h2>
                <p className="mt-4 min-h-20 text-sm leading-7 text-mist">
                  {destination.copy}
                </p>
                <Link
                  href="#"
                  className="mt-7 inline-flex min-h-11 items-center gap-2 border border-white/18 px-4 text-xs uppercase tracking-[0.16em] text-foam transition hover:border-sand hover:text-sand"
                >
                  Explore <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-sand">
              How Blue Organizes Destinations
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-foam sm:text-5xl">
              Each place can grow from a simple guide into a full local trust
              layer.
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {destinationStructure.map((item) => (
              <div key={item} className="flex gap-3 bg-deep p-5 sm:p-6">
                <CheckCircle2
                  className="mt-1 shrink-0 text-sand"
                  size={17}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <p className="text-base leading-7 text-foam/88">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl border border-white/10 bg-white/[0.035] p-7 sm:p-10 lg:p-14">
          <h2 className="max-w-3xl font-serif text-4xl leading-tight text-foam sm:text-6xl">
            Start exploring the world.
          </h2>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="#"
              className="inline-flex min-h-12 items-center gap-2 bg-foam px-5 text-sm uppercase tracking-[0.16em] text-ink transition hover:bg-sand"
            >
              Explore Europe <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="#"
              className="inline-flex min-h-12 items-center border border-white/24 px-5 text-sm uppercase tracking-[0.16em] text-foam transition hover:border-sand hover:text-sand"
            >
              Explore China
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
