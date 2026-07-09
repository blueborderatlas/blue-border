import Link from "next/link";
import {
  ArrowUpRight,
  BedDouble,
  Bus,
  Coffee,
  Map,
  Pill,
  GraduationCap,
  Utensils,
  Waves,
} from "lucide-react";
import { getLatestPosts } from "@/lib/posts";
import { recommendations } from "@/lib/recommendations";

const heroImage =
  "/images/ai/dahab-diving/DJI_20260626_193515_Edit_Composited_Photo.jpg";

const destinationCards = [
  {
    name: "Germany",
    href: "/destinations/europe",
    status: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1800&q=82",
  },
  {
    name: "Egypt",
    href: "/destinations/dahab",
    status: "Published",
    image:
      "/images/ai/dahab-diving/DJI_20260626_193515_Edit_Composited_Photo.jpg",
  },
  {
    name: "Italy",
    href: "/destinations/europe",
    status: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?auto=format&fit=crop&w=1800&q=82",
  },
  {
    name: "Thailand",
    href: "/destinations/southeast-asia",
    status: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1800&q=82",
  },
  {
    name: "Indonesia",
    href: "/destinations/southeast-asia",
    status: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1800&q=82",
  },
  {
    name: "Nepal",
    href: "/destinations/remote-places",
    status: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1800&q=82",
  },
  {
    name: "Japan",
    href: "/destinations/japan",
    status: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=82",
  },
  {
    name: "China",
    href: "/destinations/china",
    status: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1800&q=82",
  },
];

const categoryCards = [
  {
    label: "Diving",
    href: "/destinations/dahab/diving",
    Icon: Waves,
  },
  {
    label: "Stay",
    href: "/destinations/dahab/stay",
    Icon: BedDouble,
  },
  {
    label: "Food",
    href: "/destinations/dahab/food",
    Icon: Utensils,
  },
  {
    label: "Cafe",
    href: "/destinations/dahab/cafe",
    Icon: Coffee,
  },
  {
    label: "Transport",
    href: "/destinations/dahab/transport",
    Icon: Bus,
  },
  {
    label: "Pharmacy",
    href: "/destinations/dahab/pharmacy",
    Icon: Pill,
  },
  {
    label: "Local Guide",
    href: "/destinations/dahab/local-guide",
    Icon: Map,
  },
  {
    label: "Study",
    href: "/destinations/europe/study",
    Icon: GraduationCap,
  },
];

function VisualLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-12 items-center gap-2 border border-foam/70 px-6 text-sm uppercase tracking-[0.16em] text-foam transition hover:border-sand hover:text-sand"
    >
      {label} <ArrowUpRight size={16} aria-hidden="true" />
    </Link>
  );
}

export default function HomePage() {
  const publishedPlaces = recommendations.filter(
    (recommendation) => recommendation.businessProfile,
  );
  const latestStories = getLatestPosts(3);

  return (
    <main>
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 text-center sm:px-8">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.64]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,17,31,0.12),rgba(6,17,31,0.84)_74%),linear-gradient(0deg,rgba(6,17,31,0.92),rgba(6,17,31,0.18)_42%,rgba(6,17,31,0.72))]" />

        <div className="relative mx-auto max-w-5xl">
          <h1 className="font-serif text-7xl leading-none text-foam sm:text-9xl lg:text-[12rem]">
            Blue
          </h1>
          <p className="mt-8 text-xs uppercase tracking-[0.42em] text-foam/88 sm:text-sm">
            Travel Begins With Trust
          </p>
          <div className="mt-12">
            <VisualLink href="/destinations" label="Explore Destinations" />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-xs uppercase tracking-[0.18em] text-mist sm:flex">
          <span className="h-px w-10 bg-white/28" />
          Scroll
          <span className="h-px w-10 bg-white/28" />
        </div>
      </section>

      <section className="px-5 py-32 sm:px-8 lg:py-44">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-sand">
                Explore Destinations
              </p>
              <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-none text-foam sm:text-7xl">
                Start with a place in the world.
              </h2>
            </div>
            <VisualLink href="/destinations" label="All destinations" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinationCards.map((destination, index) => (
              <Link
                key={destination.name}
                href={destination.href}
                className={`group relative min-h-[58vh] overflow-hidden bg-tide ${
                  index === 1 ? "lg:col-span-2" : ""
                }`}
              >
                <img
                  src={destination.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.76] transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                  loading={index < 2 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/12 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <p className="text-xs uppercase tracking-[0.16em] text-sand">
                    {destination.status}
                  </p>
                  <h3 className="mt-4 font-serif text-5xl leading-none text-foam sm:text-6xl">
                    {destination.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-32 sm:px-8 lg:py-44">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-sand">
                Browse by Category
              </p>
              <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-none text-foam sm:text-7xl">
                Choose a need.
              </h2>
            </div>
            <VisualLink href="/destinations/dahab" label="Egypt is live" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categoryCards.map(({ label, href, Icon }, index) => (
              <Link
                key={label}
                href={href}
                className={`group flex min-h-60 flex-col justify-between border border-white/10 bg-deep p-6 transition hover:border-sand/45 hover:bg-white/[0.045] ${
                  index === 0 ? "lg:col-span-2 lg:min-h-72" : ""
                }`}
              >
                <Icon
                  className="text-sand transition group-hover:text-foam"
                  size={30}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-serif text-4xl leading-none text-foam sm:text-5xl">
                    {label}
                  </h3>
                  <p className="mt-5 text-xs uppercase tracking-[0.16em] text-mist">
                    Explore
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-32 sm:px-8 lg:py-44">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-sand">
                Featured Places
              </p>
              <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-none text-foam sm:text-7xl">
                Published by Blue.
              </h2>
            </div>
            <VisualLink href="/destinations/dahab" label="Dahab hub" />
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {publishedPlaces.map((place, index) => (
              <Link
                key={place.id}
                href={`/places/${place.slug}`}
                className={`group relative min-h-[68vh] overflow-hidden bg-tide ${
                  index === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <img
                  src={place.coverImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.82] transition duration-700 group-hover:scale-[1.025] group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/14 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
                  <p className="text-xs uppercase tracking-[0.16em] text-sand">
                    {place.category} · {place.city}
                  </p>
                  <h3 className="mt-5 max-w-3xl font-serif text-5xl leading-none text-foam sm:text-7xl">
                    {place.businessProfile?.name || place.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-32 sm:px-8 lg:py-44">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-sand">
                Latest Stories
              </p>
              <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-none text-foam sm:text-7xl">
                Field notes.
              </h2>
            </div>
            <VisualLink href="/journal" label="Journal" />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {latestStories.map((story) => (
              <Link
                key={story.slug}
                href={`/journal/${story.slug}`}
                className="group relative min-h-[58vh] overflow-hidden bg-tide"
              >
                {story.coverImage ? (
                  <img
                    src={story.coverImage}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-[0.78] transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    loading="lazy"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-sand">
                    {story.category}
                  </p>
                  <h3 className="mt-4 font-serif text-4xl leading-tight text-foam sm:text-5xl">
                    {story.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-[100svh] items-center px-5 py-32 sm:px-8">
        <div className="relative mx-auto flex min-h-[74vh] w-full max-w-7xl items-end overflow-hidden bg-tide p-7 sm:p-12">
          <img
            src="/images/ai/dahab-diving/DJI_20260626_194122_Edit_Composited_Photo.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-[0.68]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/22 to-transparent" />
          <div className="relative max-w-3xl">
            <p className="text-xs uppercase tracking-[0.22em] text-sand">
              Work With Blue
            </p>
            <h2 className="mt-6 font-serif text-6xl leading-none text-foam sm:text-8xl">
              Trust is the product.
            </h2>
            <div className="mt-10">
              <VisualLink href="/about" label="Learn about Blue" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
