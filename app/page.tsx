import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Bed,
  Camera,
  Car,
  CheckCircle2,
  Coffee,
  Handshake,
  MapPinned,
  MessageCircle,
  Mountain,
  ShieldCheck,
  Utensils,
  Waves,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { destinations } from "@/lib/archive";
import { formatPostDate, getFeaturedPosts, getLatestPosts } from "@/lib/posts";

const heroImage =
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2200&q=85";

const destinationImages: Record<string, string> = {
  "canary-islands":
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  greece:
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
  italy:
    "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80",
  croatia:
    "https://images.unsplash.com/photo-1555990538-c48dbe9c236b?auto=format&fit=crop&w=1200&q=80",
  turkey:
    "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
  egypt:
    "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1200&q=80",
};

const recommendationTypes = [
  { title: "Stay", icon: Bed },
  { title: "Food", icon: Utensils },
  { title: "Cafe", icon: Coffee },
  { title: "Diving", icon: Waves },
  { title: "Car Rental", icon: Car },
  { title: "Photography", icon: Camera },
  { title: "Outdoor", icon: Mountain },
  { title: "Local Guide", icon: MapPinned },
];

export default function HomePage() {
  const featuredPosts = getFeaturedPosts();
  const latestPosts = getLatestPosts(4);

  return (
    <main>
      <section className="relative flex min-h-[88svh] items-center overflow-hidden px-5 py-28 sm:px-8 lg:py-32">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-72"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,17,31,0.96),rgba(6,17,31,0.72),rgba(6,17,31,0.34)),linear-gradient(0deg,rgba(6,17,31,0.96),transparent_46%)]" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-sand">
              Blue for Chinese independent travelers
            </p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[1.02] text-foam sm:text-7xl lg:text-8xl">
              Trusted local connections for independent travel.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-foam/88 sm:text-xl">
              Blue connects Chinese travelers with carefully selected local
              businesses around the world through editorial recommendations,
              real travel context and direct contact.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/destinations"
                className="inline-flex min-h-12 items-center gap-2 bg-foam px-5 text-sm uppercase tracking-[0.16em] text-ink transition hover:bg-sand"
              >
                Explore destinations{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/about"
                className="inline-flex min-h-12 items-center border border-white/24 px-5 text-sm uppercase tracking-[0.16em] text-foam transition hover:border-sand hover:text-sand"
              >
                Work with Blue
              </Link>
            </div>
            <div className="mt-8 grid max-w-2xl gap-3 text-sm leading-6 text-foam/86 sm:grid-cols-3">
              {[
                "Human curated recommendations",
                "Authentic travel experience",
                "No booking or payment",
              ].map((point) => (
                <div key={point} className="flex gap-2">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-sand"
                    size={16}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:pl-8">
            <div className="absolute -inset-4 border border-white/10 bg-white/[0.03] blur-2xl" />
            <div className="relative overflow-hidden border border-white/14 bg-ink/72 p-6 shadow-coast backdrop-blur sm:p-7">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-sand">
                    Blue Trust Card
                  </p>
                  <h2 className="mt-2 font-serif text-3xl text-foam">
                    Aegean family stay
                  </h2>
                </div>
                <BadgeCheck className="text-sand" size={30} strokeWidth={1.5} />
              </div>
              <div className="mt-6 grid gap-4">
                {[
                  ["Verified by Blue", "Traveler feedback checked"],
                  ["Category", "Stay"],
                  ["Location", "Crete, Greece"],
                  ["Trust Status", "Recommended"],
                  ["Direct Contact", "Message the owner"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-5 border-b border-white/8 pb-3"
                  >
                    <span className="text-xs uppercase tracking-[0.16em] text-mist">
                      {label}
                    </span>
                    <span className="text-right text-sm text-foam">{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-7 border border-sand/25 bg-sand/10 p-4">
                <p className="text-sm leading-6 text-foam/88">
                  No checkout here. Blue helps travelers understand who to trust
                  before speaking directly with the local business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Explore destinations"
            title="Start with places, then find the people who make them easier to trust."
            copy="A growing global archive for Chinese travelers, beginning with Europe, islands and coastal cities."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <Link
                key={destination.slug}
                href={`/destinations/${destination.slug}`}
                className="group overflow-hidden border border-white/10 bg-white/[0.03] transition duration-500 hover:-translate-y-1 hover:border-sand/45 hover:bg-white/[0.05]"
              >
                <div className="relative h-56 overflow-hidden bg-tide">
                  <img
                    src={destinationImages[destination.slug]}
                    alt=""
                    className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/78 via-ink/16 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-3xl text-foam">
                      {destination.name}
                    </h3>
                    <ArrowUpRight
                      className="mt-1 text-mist transition group-hover:text-sand"
                      size={18}
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-mist">
                    {destination.places.slice(0, 4).join(" · ")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Editorial guides & travel notes"
            title="Authentic notes first, recommendations second."
            copy="Real observation, useful context and quiet travel notes before anything becomes a recommendation."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featuredPosts.map((post, index) => (
              <article
                key={post.slug}
                className={index === 0 ? "group lg:col-span-2" : "group"}
              >
                <Link
                  href={`/journal/${post.slug}`}
                  className="block overflow-hidden border border-white/10 bg-white/[0.03] transition duration-500 hover:-translate-y-1 hover:border-sand/45"
                >
                  <div
                    className={
                      index === 0
                        ? "relative h-[420px] overflow-hidden bg-tide"
                        : "relative h-64 overflow-hidden bg-tide"
                    }
                  >
                    <img
                      src={post.coverImage}
                      alt=""
                      loading={index === 0 ? "eager" : "lazy"}
                      className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/82 via-ink/12 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.16em] text-sand">
                      <span>{post.category}</span>
                      <span className="h-1 w-1 rounded-full bg-sand/70" />
                      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                    </div>
                    <h3 className="mt-4 font-serif text-3xl leading-tight text-foam group-hover:text-sand">
                      {post.title}
                    </h3>
                    <p className="mt-4 line-clamp-3 text-sm leading-7 text-mist">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-px overflow-hidden border border-white/10 bg-white/10">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/journal/${post.slug}`}
                className="group grid gap-4 bg-deep p-5 transition hover:bg-tide/80 sm:grid-cols-[1fr_auto]"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-sand">
                    {post.destination ?? post.region ?? post.category}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl leading-tight text-foam group-hover:text-sand">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-mist">
                    {post.excerpt}
                  </p>
                </div>
                <time
                  dateTime={post.date}
                  className="text-sm text-mist sm:pt-1 sm:text-right"
                >
                  {formatPostDate(post.date)}
                </time>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Trusted local recommendations"
            title="A future network for reliable local businesses."
            copy="Selected local services that make independent travel easier to enter, understand and trust."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {recommendationTypes.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group border border-white/10 bg-deep p-6 transition duration-300 hover:-translate-y-1 hover:border-sand/45 hover:bg-white/[0.045]"
                >
                  <Icon
                    className="text-sand transition group-hover:scale-110"
                    size={25}
                    strokeWidth={1.5}
                  />
                  <h3 className="mt-6 font-serif text-2xl text-foam">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-mist">
                    Curated, contextual and contact-first.
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why trust Blue"
            title="Blue is a curated trust layer, not a public review site."
            copy="Less noise, more accountability."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: "Human curation",
                copy: "Blue selects recommendations with editorial judgment, not public ranking noise.",
              },
              {
                icon: BadgeCheck,
                title: "Verified feedback",
                copy: "Only real travelers who came through Blue can shape trust signals.",
              },
              {
                icon: MessageCircle,
                title: "Long-term quality",
                copy: "Recommendations can be upgraded, paused or removed as quality changes.",
              },
              {
                icon: Handshake,
                title: "Direct connection",
                copy: "Travelers contact local businesses directly; Blue does not handle checkout.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:border-sand/40 hover:bg-white/[0.05] sm:p-7"
                >
                  <Icon className="text-sand" size={25} strokeWidth={1.6} />
                  <h3 className="mt-6 font-serif text-2xl text-foam">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-mist">{item.copy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden border border-white/10 bg-white/[0.035]">
          <div className="grid items-stretch lg:grid-cols-[1fr_0.8fr]">
            <div className="p-7 sm:p-10 lg:p-14">
            <p className="text-xs uppercase tracking-[0.2em] text-sand">
              Work with Blue
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-foam sm:text-5xl">
              For local businesses that want to be understood, not just listed.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-mist">
              If you run a reliable stay, restaurant, guide service, transport
              option, outdoor experience or small local business, Blue can help
              Chinese independent travelers understand what you offer and why it
              may be worth trusting.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-mist">
              Cooperation with Blue is not a paid ranking shortcut. Quality,
              transparency and traveler feedback matter more than exposure.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex min-h-12 items-center gap-2 bg-foam px-5 text-sm uppercase tracking-[0.16em] text-ink transition hover:bg-sand"
            >
              Learn about Blue <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
            <div className="relative min-h-[360px] bg-tide">
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80"
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-80"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/78 via-ink/20 to-transparent lg:bg-gradient-to-l" />
              <div className="absolute bottom-6 left-6 right-6 border border-white/12 bg-ink/58 p-5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.18em] text-sand">
                  Partner principle
                </p>
                <p className="mt-3 font-serif text-2xl leading-tight text-foam">
                  Quality first. No paid ranking shortcut.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
