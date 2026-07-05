import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Blue Border, a personal coastal travel journal for hidden European islands, slow travel, low-cost routes and quiet seaside towns.",
};

const blueDoes = [
  "Editorial travel stories that give places human context.",
  "Practical guides for planning, moving, staying and adapting.",
  "Trusted local recommendations for people, businesses and experiences.",
  "Long-term quality review after a recommendation goes live.",
];

const notBlue = [
  "Not a booking platform.",
  "Not Google Maps.",
  "Not TripAdvisor.",
  "Not Xiaohongshu.",
  "Not a public review website.",
];

const trustStatuses = [
  "Recommended",
  "Verified",
  "Under Review",
  "Paused",
];

export default function AboutPage() {
  return (
    <main>
      <section className="px-5 pb-24 pt-36 sm:px-8 lg:pb-32 lg:pt-44">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.24em] text-sand">
            About Blue
          </p>
          <h1 className="mt-5 max-w-5xl font-serif text-6xl leading-[0.98] text-foam sm:text-8xl">
            A trusted way to discover the world.
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-mist">
            Blue connects travelers with reliable local people, businesses and
            experiences through editorial curation, practical knowledge and
            long-term trust.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <p className="text-xs uppercase tracking-[0.22em] text-sand">
            The problem
          </p>
          <div className="max-w-4xl">
            <h2 className="font-serif text-4xl leading-tight text-foam sm:text-5xl">
              Travel information is everywhere. Trust is harder to find.
            </h2>
            <p className="mt-6 text-lg leading-9 text-mist">
              Modern travelers move through fake reviews, SEO articles,
              sponsored influencers and unreliable recommendations. Blue exists
              to reduce uncertainty before a trip begins.
            </p>
            <p className="mt-6 text-lg leading-9 text-mist">
              The goal is simple: help people discover places and people they
              can genuinely trust.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <p className="text-xs uppercase tracking-[0.22em] text-sand">
            What Blue does
          </p>
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {blueDoes.map((item) => (
              <div key={item} className="flex gap-3 bg-deep p-6">
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

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <p className="text-xs uppercase tracking-[0.22em] text-sand">
            What makes Blue different
          </p>
          <div>
            <h2 className="max-w-4xl font-serif text-4xl leading-tight text-foam sm:text-5xl">
              Blue is a curated recommendation network, not another noisy
              listing site.
            </h2>
            <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
              {notBlue.map((item) => (
                <div key={item} className="bg-deep p-6">
                  <p className="text-lg leading-8 text-foam">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <p className="text-xs uppercase tracking-[0.22em] text-sand">
            The Blue Trust System
          </p>
          <div>
            <h2 className="max-w-4xl font-serif text-4xl leading-tight text-foam sm:text-5xl">
              Trust is earned over time, not purchased.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-mist">
              Recommendations are continuously reviewed. A local business can
              move between trust stages as real feedback and long-term
              observation accumulate.
            </p>
            <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {trustStatuses.map((item) => (
                <div key={item} className="bg-deep p-6">
                  <p className="font-serif text-2xl leading-tight text-foam">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-7xl border-t border-white/10 pt-14">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 font-serif text-4xl leading-tight text-foam transition hover:text-sand sm:text-5xl"
          >
            Start exploring. <ArrowUpRight size={28} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
