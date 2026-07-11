import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { EditorialLink, Eyebrow, PageHero } from "@/components/editorial";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Blue Border, a personal coastal travel journal for hidden European islands, slow travel, low-cost routes and quiet seaside towns.",
};

const principles = [
  "Curated before listed.",
  "Trust is reviewed over time.",
  "Local businesses stay independent.",
  "Photography and field notes matter.",
];

const notBlue = [
  "Not a booking platform.",
  "Not paid rankings.",
  "Not public reviews.",
  "Not another SEO travel list.",
];

const trustStatuses = [
  ["Recommended", "A place Blue is comfortable surfacing after review."],
  ["Verified", "A long-term partner with stronger trust signals."],
  ["Under Review", "Useful, but still being checked."],
  ["Paused", "Temporarily removed from active recommendation."],
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About Blue"
        title="Travel recommendations built on trust."
        copy="Blue is a recommendation network for independent travelers who want local context before they commit time, money or attention."
        image="/images/ai/dahab-diving/DJI_20260626_194018_Edit_Composited_Photo.jpg"
      />

      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Eyebrow>Why Blue exists</Eyebrow>
            <h2 className="mt-5 font-serif text-5xl leading-none text-foam sm:text-7xl">
              Information is easy. Confidence is rare.
            </h2>
          </div>
          <div className="relative min-h-[34rem] overflow-hidden bg-tide p-7 sm:p-10">
            <img
              src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1800&q=82"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-[0.52]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/94 via-ink/40 to-transparent" />
            <div className="relative mt-48 max-w-3xl">
              <p className="font-serif text-4xl leading-tight text-foam sm:text-5xl">
                Fake reviews, sponsored posts and crowded platforms make simple
                decisions feel strangely uncertain.
              </p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-mist">
                Blue exists to reduce that uncertainty with editorial curation,
                human review and local recommendations that can change over
                time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <Eyebrow>What Blue does</Eyebrow>
            <h2 className="mt-5 font-serif text-5xl leading-none text-foam sm:text-7xl">
              Stories, guides and local trust.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map((item) => (
              <div key={item} className="min-h-44 bg-deep p-6">
                <CheckCircle2
                  className="text-sand"
                  size={18}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                <p className="mt-8 font-serif text-3xl leading-tight text-foam">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-4xl">
            <Eyebrow>What Blue is not</Eyebrow>
            <h2 className="mt-5 font-serif text-5xl leading-none text-foam sm:text-7xl">
              Smaller, calmer, more accountable.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {notBlue.map((item) => (
              <div key={item} className="flex min-h-56 items-end bg-deep p-6">
                <p className="font-serif text-3xl leading-tight text-foam">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="work-with-blue"
        className="border-y border-white/10 bg-white/[0.025] px-5 py-24 sm:px-8 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <Eyebrow>The Blue Trust System</Eyebrow>
            <h2 className="mt-5 font-serif text-5xl leading-none text-foam sm:text-7xl">
              Trust is earned over time.
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-8 text-mist">
              Recommendations can be upgraded, maintained, reviewed or paused.
              A listing is never permanent just because it went live once.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {trustStatuses.map(([status, copy]) => (
              <div key={status} className="min-h-48 bg-deep p-6">
                <p className="font-serif text-3xl leading-tight text-foam">
                  {status}
                </p>
                <p className="mt-5 text-sm leading-7 text-mist">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/destinations"
            className="font-serif text-5xl leading-none text-foam transition hover:text-sand sm:text-7xl"
          >
            Start exploring.
          </Link>
          <EditorialLink href="/destinations">
            Open destinations
          </EditorialLink>
        </div>
      </section>
    </main>
  );
}
