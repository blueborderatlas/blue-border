import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Handshake,
  MessageCircle,
  ShieldCheck,
  Store,
  Users,
} from "lucide-react";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { destinations } from "@/lib/archive";
import { formatPostDate, getFeaturedPosts, getLatestPosts } from "@/lib/posts";

const heroImage =
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2200&q=85";

export default function HomePage() {
  const featuredPosts = getFeaturedPosts();
  const latestPosts = getLatestPosts(4);

  return (
    <main>
      <section className="relative flex min-h-[86svh] items-end overflow-hidden px-5 pb-12 pt-28 sm:px-8 lg:pb-16">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-72"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,17,31,0.94),rgba(6,17,31,0.55),rgba(6,17,31,0.24)),linear-gradient(0deg,rgba(6,17,31,0.95),transparent_42%)]" />
        <div className="relative mx-auto w-full max-w-7xl">
          <p className="text-xs uppercase tracking-[0.26em] text-sand">
            Trusted travel connections
          </p>
          <h1 className="mt-5 max-w-5xl font-serif text-6xl leading-[0.95] text-foam sm:text-8xl lg:text-9xl">
            Blue
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-foam/88 sm:text-xl">
            Blue helps Chinese travelers find trusted local recommendations
            around the world, from stays and restaurants to guides, transport
            and small independent services.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-mist">
            Blue is not a booking platform and does not process payments. It is
            an editorial trust layer for independent travelers and reliable
            local businesses.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/journal"
              className="inline-flex min-h-12 items-center gap-2 bg-foam px-5 text-sm uppercase tracking-[0.16em] text-ink transition hover:bg-sand"
            >
              Read travel notes <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/destinations"
              className="inline-flex min-h-12 items-center border border-white/24 px-5 text-sm uppercase tracking-[0.16em] text-foam transition hover:border-sand hover:text-sand"
            >
              Explore destinations
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Explore destinations"
            title="Start with places, then find the people who make them easier to trust."
            copy="Blue is growing from real travel notes into a global archive for Chinese travelers. The current map begins with Europe, islands and coastal cities, but the structure is built to expand anywhere."
          />
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {destinations.map((destination) => (
              <Link
                key={destination.slug}
                href={`/destinations/${destination.slug}`}
                className="group bg-deep p-5 transition hover:bg-tide/80"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-2xl text-foam">
                    {destination.name}
                  </h3>
                  <ArrowUpRight
                    className="mt-1 text-mist transition group-hover:text-sand"
                    size={17}
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-4 text-sm leading-7 text-mist">
                  {destination.places.slice(0, 4).join(" · ")}
                </p>
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
            copy="Blue keeps an editorial voice because trust starts with real observation: where to stay, how to move, what feels honest, and what a place is like beyond a polished listing."
          />
          <div className="mt-10 grid gap-6">
            {featuredPosts.map((post, index) => (
              <PostCard key={post.slug} post={post} priority={index === 0} />
            ))}
          </div>
          <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10">
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
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Trusted local recommendations"
            title="A future network for reliable local businesses."
            copy="Blue will recommend selected stays, restaurants, guides, transport, photographers and local experiences. It does not list everyone, take bookings or process payments."
          />
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
            {[
              {
                icon: Store,
                title: "Local services",
                copy: "Small stays, food spots, guides, transfers, rentals and experiences that make a destination easier to enter.",
              },
              {
                icon: Users,
                title: "For Chinese travelers",
                copy: "Recommendations are explained for travelers who need context, language clarity and fewer unknowns.",
              },
              {
                icon: Handshake,
                title: "Connection, not checkout",
                copy: "Blue helps travelers understand and contact trusted businesses, while payment stays between traveler and provider.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-deep p-6 sm:p-7">
                  <Icon className="text-sand" size={24} strokeWidth={1.6} />
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

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why trust Blue"
            title="Blue is a curated trust layer, not a public review site."
            copy="The goal is not to collect the most opinions. The goal is to reduce uncertainty through careful selection, real traveler feedback and long-term quality checks."
          />
          <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Blue Trust System",
                copy: "Only real travelers who came through Blue can provide feedback on recommended businesses.",
              },
              {
                icon: BadgeCheck,
                title: "Ongoing evaluation",
                copy: "Blue may upgrade, downgrade, pause or remove recommendations when long-term quality changes.",
              },
              {
                icon: MessageCircle,
                title: "Editorial judgment",
                copy: "Recommendations stay selective, contextual and honest about who each service is suitable for.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-deep p-6 sm:p-7">
                  <Icon className="text-sand" size={24} strokeWidth={1.6} />
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
        <div className="mx-auto grid max-w-7xl items-center gap-10 border-t border-white/10 pt-16 lg:grid-cols-[1fr_0.9fr]">
          <div>
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
              className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-foam transition hover:text-sand"
            >
              Learn about Blue <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80"
            alt=""
            className="h-[360px] w-full object-cover shadow-coast"
            loading="lazy"
          />
        </div>
      </section>
    </main>
  );
}
