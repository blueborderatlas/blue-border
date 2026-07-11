import Link from "next/link";
import {
  ArrowUpRight,
  BedDouble,
  Bus,
  Coffee,
  Map,
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
    focus: "50% 48%",
  },
  {
    name: "Egypt",
    href: "/destinations/dahab",
    status: "Published",
    image:
      "/images/ai/dahab-diving/DJI_20260626_193515_Edit_Composited_Photo.jpg",
    focus: "50% 50%",
  },
  {
    name: "Italy",
    href: "/destinations/europe",
    status: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?auto=format&fit=crop&w=1800&q=82",
    focus: "46% 58%",
  },
  {
    name: "Japan",
    href: "/destinations/japan",
    status: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=82",
    focus: "52% 55%",
  },
  {
    name: "Thailand",
    href: "/destinations/southeast-asia",
    status: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1800&q=82",
    focus: "50% 58%",
  },
  {
    name: "Indonesia",
    href: "/destinations/southeast-asia",
    status: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1800&q=82",
    focus: "50% 50%",
  },
  {
    name: "Nepal",
    href: "/destinations/remote-places",
    status: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1800&q=82",
    focus: "50% 44%",
  },
  {
    name: "China",
    href: "/destinations/china",
    status: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1800&q=82",
    focus: "50% 52%",
  },
];

const categoryCards = [
  {
    label: "Dive",
    href: "/destinations/dahab/diving",
    Icon: Waves,
    image:
      "/images/ai/dahab-diving/DJI_20260626_193515_Edit_Composited_Photo.jpg",
    focus: "50% 50%",
  },
  {
    label: "Stay",
    href: "/destinations/dahab/stay",
    Icon: BedDouble,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=82",
    focus: "50% 58%",
  },
  {
    label: "Food",
    href: "/destinations/dahab/food",
    Icon: Utensils,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=82",
    focus: "50% 54%",
  },
  {
    label: "Cafe",
    href: "/destinations/dahab/cafe",
    Icon: Coffee,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=82",
    focus: "50% 48%",
  },
  {
    label: "Transport",
    href: "/destinations/dahab/transport",
    Icon: Bus,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=82",
    focus: "50% 45%",
  },
  {
    label: "Local Guide",
    href: "/destinations/dahab/local-guide",
    Icon: Map,
    image:
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1400&q=82",
    focus: "50% 50%",
  },
  {
    label: "Study",
    href: "/destinations/europe/study",
    Icon: GraduationCap,
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=82",
    focus: "50% 48%",
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
      className="blue-button"
    >
      {label} <ArrowUpRight size={16} aria-hidden="true" />
    </Link>
  );
}

export default function HomePage() {
  const publishedPlaces = recommendations.filter(
    (recommendation) => recommendation.businessProfile,
  );
  const stories = getLatestPosts(6);
  const [leadStory, ...supportStories] = stories;
  const latestJournal = stories.slice(3, 6);
  const [primaryPlace, ...secondaryPlaces] = publishedPlaces;
  const featuredDestinations = destinationCards.slice(0, 5);

  return (
    <main>
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 text-center sm:px-8">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.64]"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-[0.64]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroImage}
          aria-hidden="true"
        >
          <source src="/videos/hero/hero.webm" type="video/webm" />
          <source src="/videos/hero/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,17,31,0.12),rgba(6,17,31,0.84)_74%),linear-gradient(0deg,rgba(6,17,31,0.92),rgba(6,17,31,0.18)_42%,rgba(6,17,31,0.72))]" />

        <div className="relative mx-auto max-w-5xl">
          <h1 className="font-serif text-7xl leading-none text-foam sm:text-9xl lg:text-[12rem]">
            Blue
          </h1>
          <p className="mt-8 text-xs uppercase tracking-[0.42em] text-foam/85 sm:text-sm">
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

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-28 sm:px-8 lg:py-40">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
          <p className="text-xs uppercase tracking-[0.22em] text-sand">
            Blue
          </p>
          <div>
            <h2 className="max-w-5xl font-serif text-5xl leading-none text-foam sm:text-7xl lg:text-8xl">
              A global travel platform for finding trusted places before you
              arrive.
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-8 text-mist">
              Start with the world, move through destinations, and discover the
              local people and businesses worth knowing.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-28 sm:px-8 lg:py-44">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-sand">
                Explore the World
              </p>
              <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-none text-foam sm:text-7xl">
                The world, opening slowly.
              </h2>
            </div>
            <VisualLink href="/destinations" label="All destinations" />
          </div>

          <div className="grid gap-6 lg:grid-cols-12 lg:auto-rows-[17rem]">
            {featuredDestinations.map((destination, index) => (
              <Link
                key={destination.name}
                href={destination.href}
                className={`blue-card blue-card-hover group relative bg-tide ${
                  index === 1
                    ? "aspect-[16/10] lg:col-span-8 lg:row-span-2"
                    : index === 0
                      ? "aspect-[4/3] lg:col-span-4"
                      : index === 4
                        ? "aspect-[16/10] lg:col-span-8"
                        : index === 3
                          ? "aspect-square lg:col-span-4"
                          : "aspect-[4/3] lg:col-span-4"
                }`}
              >
                <img
                  src={destination.image}
                  alt=""
                  className={`absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 ${
                    destination.status === "Published"
                      ? "opacity-[0.82] group-hover:opacity-100"
                      : "opacity-[0.44] group-hover:opacity-[0.68]"
                  }`}
                  style={{ objectPosition: destination.focus }}
                  loading={index < 2 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/26 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <p className="text-xs uppercase tracking-[0.16em] text-sand">
                    {destination.status}
                  </p>
                  <h3
                    className={`mt-4 font-serif leading-none text-foam ${
                      index === 1 ? "text-6xl sm:text-8xl" : "text-4xl sm:text-5xl"
                    }`}
                  >
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
          <div className="mb-20 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-sand">
                Featured Places
              </p>
              <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-none text-foam sm:text-7xl">
                Curated, not crowded.
              </h2>
            </div>
            <VisualLink href="/recommended" label="View all" />
          </div>

          {primaryPlace ? (
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
              <Link
                href={`/places/${primaryPlace.slug}`}
                className="blue-card blue-card-hover group relative aspect-[16/10] min-h-[22rem] bg-tide lg:min-h-0 lg:flex-[2.35]"
              >
                <img
                  src={primaryPlace.coverImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.82] transition duration-700 group-hover:scale-[1.025] group-hover:opacity-100"
                  style={{ objectPosition: "50% 50%" }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/18 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
                  <p className="text-xs uppercase tracking-[0.16em] text-sand">
                    {primaryPlace.category} · {primaryPlace.city}
                  </p>
                  <h3 className="mt-5 max-w-3xl font-serif text-5xl leading-none text-foam sm:text-7xl">
                    {primaryPlace.businessProfile?.name || primaryPlace.name}
                  </h3>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-foam/78">
                    {primaryPlace.summary}
                  </p>
                </div>
              </Link>

              <div className="blue-card border border-white/10 bg-ink/74 p-7 sm:p-9 lg:flex-1 lg:self-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-sand">
                    Blue Recommended
                  </p>
                  <h3 className="mt-8 font-serif text-5xl leading-none text-foam sm:text-[3.5rem]">
                    One place can carry the whole chapter.
                  </h3>
                  <p className="mt-9 max-w-md text-base leading-8 text-mist">
                    Published places are carefully reviewed before becoming part
                    of Blue.
                  </p>
                </div>
                <div className="mt-16 border-t border-white/10 pt-8">
                  <div className="inline-flex items-center gap-3 border border-white/14 bg-white/[0.035] px-4 py-3 text-xs uppercase tracking-[0.16em] text-foam">
                    <span className="h-2 w-2 rounded-full bg-sand" />
                    {primaryPlace.trustStatus}
                  </div>
                  {secondaryPlaces.length > 0 ? (
                    <p className="mt-7 text-sm leading-7 text-mist">
                      More published places are ready to surface here as the
                      collection grows.
                    </p>
                  ) : null}
                  <Link
                    href={`/places/${primaryPlace.slug}`}
                    className="mt-10 inline-flex items-center gap-2 border border-white/18 px-4 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-mist transition hover:border-sand/70 hover:text-foam"
                  >
                    Open place <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="px-5 py-32 sm:px-8 lg:py-44">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-sand">
                Travel by Interest
              </p>
              <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-none text-foam sm:text-7xl">
                Travel starts with a need.
              </h2>
            </div>
          </div>

          <div className="-mx-5 flex items-end gap-5 overflow-x-auto px-5 pb-6 sm:-mx-8 sm:px-8 lg:mx-0 lg:gap-6 lg:px-0">
            {categoryCards.map(({ label, href, Icon, image, focus }, index) => (
              <Link
                key={label}
                href={href}
                className={`blue-card blue-card-hover group relative flex shrink-0 bg-tide ${
                  index === 0
                    ? "aspect-[16/10] w-[84vw] sm:w-[38rem]"
                    : "aspect-[4/3] w-[58vw] sm:w-[22rem]"
                }`}
              >
                <img
                  src={image}
                  alt=""
                  className={`absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 ${
                    index === 0
                      ? "opacity-[0.64] group-hover:opacity-[0.88]"
                      : "opacity-[0.44] group-hover:opacity-[0.72]"
                  }`}
                  style={{ objectPosition: focus }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/94 via-ink/34 to-transparent" />
                <div className="relative mt-auto w-full p-6 sm:p-8">
                  <Icon
                    className={`text-sand transition group-hover:text-foam ${
                      index === 0 ? "mb-10" : "mb-7"
                    }`}
                    size={index === 0 ? 32 : 25}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3
                    className={`font-serif leading-none text-foam ${
                      index === 0 ? "text-5xl sm:text-7xl" : "text-4xl sm:text-5xl"
                    }`}
                  >
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

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-32 sm:px-8 lg:py-44">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 flex flex-col gap-6 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-sand">
                Featured Stories
              </p>
              <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-none text-foam sm:text-7xl">
                Stories give the place a pulse.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-mist lg:ml-auto">
              Blue uses field notes to support exploration, not replace the
              destination and place layer.
            </p>
          </div>

          {leadStory ? (
            <div className="grid gap-6 lg:grid-cols-[1.32fr_0.68fr]">
              <Link
                href={`/journal/${leadStory.slug}`}
                className="blue-card blue-card-hover group relative aspect-[16/10] bg-tide"
              >
                <img
                  src={leadStory.coverImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.78] transition duration-700 group-hover:scale-[1.025] group-hover:opacity-100"
                  style={{ objectPosition: "50% 52%" }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/18 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
                  <p className="text-xs uppercase tracking-[0.16em] text-sand">
                    {leadStory.category}
                  </p>
                  <h3 className="mt-5 max-w-4xl font-serif text-5xl leading-none text-foam sm:text-7xl">
                    {leadStory.title}
                  </h3>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-foam/78">
                    {leadStory.excerpt}
                  </p>
                </div>
              </Link>

              <div className="grid gap-6">
                {supportStories.slice(0, 2).map((story) => (
                  <Link
                    key={story.slug}
                    href={`/journal/${story.slug}`}
                    className="blue-card blue-card-hover group relative aspect-[4/3] bg-tide"
                  >
                    <img
                      src={story.coverImage}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-[0.68] transition duration-700 group-hover:scale-105 group-hover:opacity-95"
                      style={{ objectPosition: "50% 52%" }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/26 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="text-xs uppercase tracking-[0.16em] text-sand">
                        {story.category}
                      </p>
                      <h3 className="mt-4 font-serif text-4xl leading-tight text-foam">
                        {story.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="px-5 py-32 sm:px-8 lg:py-44">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-sand">
                Journal
              </p>
              <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-none text-foam sm:text-7xl">
                Recent field notes.
              </h2>
            </div>
            <VisualLink href="/journal" label="Open journal" />
          </div>

          <div className="space-y-6">
            {latestJournal.map((story, index) => (
              <Link
                key={story.slug}
                href={`/journal/${story.slug}`}
                className="blue-card blue-card-hover group flex flex-col overflow-hidden border border-white/10 bg-white/[0.018] sm:flex-row"
              >
                <div
                  className={`relative aspect-[4/3] overflow-hidden sm:w-[42%] ${
                    index === 1 ? "sm:w-[52%]" : ""
                  }`}
                >
                  <img
                    src={story.coverImage}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-[0.76] transition duration-700 group-hover:scale-105 group-hover:opacity-95"
                    style={{ objectPosition: "50% 52%" }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/56 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col justify-center p-7 sm:p-10">
                  <p className="text-xs uppercase tracking-[0.16em] text-sand">
                    {story.category}
                  </p>
                  <h3 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-foam sm:text-5xl">
                    {story.title}
                  </h3>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-mist">
                    {story.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-[92svh] items-center px-5 py-32 sm:px-8">
        <div className="relative mx-auto flex min-h-[72vh] w-full max-w-7xl items-end overflow-hidden bg-tide p-7 shadow-coast sm:p-12">
          <img
            src="/images/ai/dahab-diving/DJI_20260626_194122_Edit_Composited_Photo.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-[0.56]"
            style={{ objectPosition: "50% 54%" }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,17,31,0.92),rgba(6,17,31,0.46)),linear-gradient(0deg,rgba(6,17,31,0.96),rgba(6,17,31,0.08)_52%)]" />
          <div className="relative max-w-3xl">
            <p className="text-xs uppercase tracking-[0.22em] text-sand">
              Work With Blue
            </p>
            <h2 className="mt-6 font-serif text-6xl leading-none text-foam sm:text-8xl">
              Trusted places deserve a quieter stage.
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-8 text-mist">
              Blue works with local businesses that value long-term trust,
              honest context and independent travelers.
            </p>
            <div className="mt-10">
              <VisualLink href="/about#work-with-blue" label="Work With Blue" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
