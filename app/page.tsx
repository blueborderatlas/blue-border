import Link from "next/link";
import { ArrowUpRight, CircleDollarSign, Fish, ShipWheel, Waves } from "lucide-react";
import { CategoryLink } from "@/components/category-link";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { categories, getFeaturedPosts } from "@/lib/posts";

const heroImage =
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2200&q=85";

export default function HomePage() {
  const featuredPosts = getFeaturedPosts();

  return (
    <main>
      <section className="relative flex min-h-[86svh] items-end overflow-hidden px-5 pb-12 pt-28 sm:px-8 lg:pb-16">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-72"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,17,31,0.92),rgba(6,17,31,0.48),rgba(6,17,31,0.20)),linear-gradient(0deg,rgba(6,17,31,0.95),transparent_42%)]" />
        <div className="relative mx-auto w-full max-w-7xl">
          <p className="text-xs uppercase tracking-[0.26em] text-sand">
            Coastal travel journal
          </p>
          <h1 className="mt-5 max-w-5xl font-serif text-6xl leading-[0.95] text-foam sm:text-8xl lg:text-9xl">
            Blue Border
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-foam/88 sm:text-xl">
            Hidden islands, quiet coasts and low-cost sea escapes across Europe.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/journal"
              className="inline-flex min-h-12 items-center gap-2 bg-foam px-5 text-sm uppercase tracking-[0.16em] text-ink transition hover:bg-sand"
            >
              Read journal <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/categories"
              className="inline-flex min-h-12 items-center border border-white/24 px-5 text-sm uppercase tracking-[0.16em] text-foam transition hover:border-sand hover:text-sand"
            >
              Explore routes
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Featured journal"
            title="Field notes from the edge of the season."
            copy="Low-cost routes, quiet ports, shoreline conditions and places that feel better before the summer crowd arrives."
          />
          <div className="mt-10 grid gap-6">
            {featuredPosts.map((post, index) => (
              <PostCard key={post.slug} post={post} priority={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Explore"
            title="Choose a coastline by mood, route or weather."
            copy="The categories are practical on purpose: not only where to go, but how it feels to get there, stay there and spend a few slow days near the water."
          />
          <div className="grid content-start gap-3 sm:grid-cols-2">
            {categories.map((category) => (
              <CategoryLink key={category} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why Blue Border"
            title="A journal for the practical romance of the coast."
          />
          <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4">
            {[
              {
                icon: CircleDollarSign,
                title: "Low-cost routes",
                copy: "Flight notes, shoulder-season prices and routes that start from Germany or nearby airports.",
              },
              {
                icon: Waves,
                title: "Real conditions",
                copy: "Wind, water temperature, beach texture and the small details that change a trip.",
              },
              {
                icon: Fish,
                title: "Shoreline fishing",
                copy: "Honest notes on access, local rules, harbors, rocks and tourist-friendly possibilities.",
              },
              {
                icon: ShipWheel,
                title: "Slow places",
                copy: "Ports, ferry edges, sleepy streets and coastal towns that reward unhurried days.",
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
              About preview
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-foam sm:text-5xl">
              Travel writing for quiet water, cheap tickets and towns with salt
              on the pavement.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-mist">
              Blue Border is a personal coastal travel journal about hidden
              islands, slow travel, low-cost routes, fishing spots and quiet
              seaside towns across Europe.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-foam transition hover:text-sand"
            >
              Read about Blue Border <ArrowUpRight size={16} aria-hidden="true" />
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
