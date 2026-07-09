import Link from "next/link";
import {
  ArrowUpRight,
  BedDouble,
  Bus,
  Coffee,
  Map,
  Pill,
  Utensils,
  Waves,
} from "lucide-react";
import { destinations } from "@/lib/archive";

const heroImage =
  "/images/ai/dahab-diving/DJI_20260626_193515_Edit_Composited_Photo.jpg";

const dahabGallery = [
  "/images/ai/dahab-diving/DJI_20260626_193515_Edit_Composited_Photo.jpg",
  "/images/ai/dahab-diving/DJI_20260626_193649_Edit_Composited_Photo.jpg",
  "/images/ai/dahab-diving/DJI_20260626_194018_Edit_Composited_Photo.jpg",
];

const destinationSlugs = ["dahab", "europe", "china", "japan"];

const destinationImages: Record<string, string> = {
  dahab:
    "/images/ai/dahab-diving/DJI_20260626_193515_Edit_Composited_Photo.jpg",
  europe:
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1800&q=82",
  china:
    "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1800&q=82",
  japan:
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=82",
};

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
  const featuredDestinations = destinationSlugs
    .map((slug) =>
      destinations.find((destination) => destination.slug === slug),
    )
    .filter(
      (destination): destination is (typeof destinations)[number] =>
        Boolean(destination),
    );

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
            <VisualLink href="/destinations/dahab" label="Explore Dahab" />
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
          <div className="mb-14 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-sand">
                Featured Destination
              </p>
              <h2 className="mt-5 font-serif text-6xl leading-none text-foam sm:text-8xl">
                Dahab
              </h2>
            </div>
            <div className="hidden sm:block">
              <VisualLink href="/destinations/dahab" label="Open" />
            </div>
          </div>

          <Link
            href="/destinations/dahab"
            className="group grid gap-5 lg:grid-cols-[1.25fr_0.75fr]"
          >
            <div className="relative min-h-[78vh] overflow-hidden bg-tide">
              <img
                src={dahabGallery[0]}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-[0.86] transition duration-700 group-hover:scale-[1.025] group-hover:opacity-100"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-7 sm:p-10">
                <p className="text-xs uppercase tracking-[0.18em] text-sand">
                  Red Sea
                </p>
                <h3 className="mt-4 max-w-3xl font-serif text-5xl leading-none text-foam sm:text-7xl">
                  Diving, desert light and trusted local notes.
                </h3>
              </div>
            </div>

            <div className="grid gap-5">
              {dahabGallery.slice(1).map((image, index) => (
                <div
                  key={image}
                  className="relative min-h-[36vh] overflow-hidden bg-tide"
                >
                  <img
                    src={image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-[0.78] transition duration-700 group-hover:opacity-95"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/78 via-transparent to-transparent" />
                  <p className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.18em] text-foam/86">
                    0{index + 2}
                  </p>
                </div>
              ))}
            </div>
          </Link>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-32 sm:px-8 lg:py-44">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-sand">
                Explore by Category
              </p>
              <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-none text-foam sm:text-7xl">
                Choose a need.
              </h2>
            </div>
            <VisualLink href="/destinations/dahab" label="Dahab hub" />
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
                    Dahab
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
                Destinations
              </p>
              <h2 className="mt-5 font-serif text-5xl leading-none text-foam sm:text-7xl">
                Keep moving.
              </h2>
            </div>
            <VisualLink href="/destinations" label="All destinations" />
          </div>

          <div className="grid gap-5 lg:grid-cols-4">
            {featuredDestinations.map((destination) => (
              <Link
                key={destination.slug}
                href={`/destinations/${destination.slug}`}
                className="group relative min-h-[62vh] overflow-hidden bg-tide"
              >
                <img
                  src={destinationImages[destination.slug]}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.78] transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-serif text-5xl leading-none text-foam">
                    {destination.name}
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
