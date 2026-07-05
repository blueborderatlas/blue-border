import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Blue Border, a personal coastal travel journal for hidden European islands, slow travel, low-cost routes and quiet seaside towns.",
};

const principles = [
  "Human judgment before scale.",
  "Context over ranking.",
  "Long-term trust over quick exposure.",
  "Clear separation between recommendation and payment.",
];

const notBlue = [
  "Not Google Maps: Blue is curated, not exhaustive.",
  "Not Reddit: Blue is edited, not an open thread.",
  "Not Xiaohongshu: Blue avoids trend-first recommendations.",
  "Not a traditional travel blog: Blue connects stories, guides and trusted local businesses.",
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
            Travel recommendations built on trust.
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-mist">
            Blue exists to help independent travelers find local places, people
            and experiences that feel worth trusting before they arrive.
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
              Online travel advice is abundant. Trust is not.
            </h2>
            <p className="mt-6 text-lg leading-9 text-mist">
              Search results, social posts and public reviews often blur
              personal taste, paid visibility and real quality. Blue is built
              for travelers who need fewer signals, but better ones.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <p className="text-xs uppercase tracking-[0.22em] text-sand">
            How Blue works
          </p>
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {[
              "We look for local businesses and people with real usefulness for travelers.",
              "We explain who each recommendation is suitable for.",
              "We listen to feedback from travelers who actually connected through Blue.",
              "We can maintain, upgrade, pause or remove recommendations over time.",
            ].map((item) => (
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
            What Blue is NOT
          </p>
          <div className="grid gap-4">
            {notBlue.map((item) => (
              <div key={item} className="border border-white/10 bg-deep p-6">
                <p className="text-lg leading-8 text-foam">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <p className="text-xs uppercase tracking-[0.22em] text-sand">
            Our principles
          </p>
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {principles.map((item) => (
              <div key={item} className="bg-deep p-6">
                <p className="font-serif text-2xl leading-tight text-foam">
                  {item}
                </p>
              </div>
            ))}
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
