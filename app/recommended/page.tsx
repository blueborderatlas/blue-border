import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  Eye,
  MessageCircle,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Recommended",
  description:
    "Blue Recommended is a curated layer for trusted local businesses, reviewed through real traveler feedback and direct connections.",
};

const recommendationSteps = [
  {
    icon: Eye,
    title: "Human review",
    copy: "Every recommendation starts with manual editorial judgment.",
  },
  {
    icon: ShieldCheck,
    title: "Real experience",
    copy: "Blue looks for places and people that feel reliable in practice.",
  },
  {
    icon: MessageCircle,
    title: "Long-term feedback",
    copy: "Traveler feedback helps Blue understand quality over time.",
  },
  {
    icon: RefreshCw,
    title: "Continuous reevaluation",
    copy: "Recommendations can change when the experience changes.",
  },
];

const trustStatuses = [
  {
    indicator: "🟢",
    title: "Verified Partner",
    copy: "A long-term trusted partner with consistent positive feedback.",
    accent: "border-emerald-300/35 bg-emerald-300/10",
  },
  {
    indicator: "🔵",
    title: "Recommended",
    copy: "Reviewed by Blue and suitable for the right traveler.",
    accent: "border-sky-300/35 bg-sky-300/10",
  },
  {
    indicator: "🟡",
    title: "Under Review",
    copy: "Currently being evaluated before a stronger recommendation.",
    accent: "border-amber-300/35 bg-amber-300/10",
  },
  {
    indicator: "🔴",
    title: "Paused",
    copy: "Temporarily paused because quality or clarity needs attention.",
    accent: "border-rose-300/35 bg-rose-300/10",
  },
];

const notBlue = [
  "Not a booking platform.",
  "Not paid rankings.",
  "Not public reviews.",
  "Not advertisements.",
];

export default function RecommendedPage() {
  return (
    <main>
      <section className="px-5 pb-20 pt-36 sm:px-8 lg:pb-28 lg:pt-44">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.24em] text-sand">
            Blue Recommended
          </p>
          <h1 className="mt-5 max-w-5xl font-serif text-6xl leading-[0.98] text-foam sm:text-8xl">
            Recommended by Blue
          </h1>
          <p className="mt-7 max-w-3xl text-xl leading-9 text-mist">
            Places and people we would confidently recommend to our own friends.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.22em] text-sand">
              How recommendations work
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-foam sm:text-5xl">
              Selected with care, then kept under review.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {recommendationSteps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="border border-white/10 bg-deep p-6 transition duration-300 hover:-translate-y-1 hover:border-sand/40 hover:bg-white/[0.045] sm:p-7"
                >
                  <Icon className="text-sand" size={25} strokeWidth={1.6} />
                  <h3 className="mt-7 font-serif text-2xl text-foam">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-mist">
                    {item.copy}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.22em] text-sand">
              Trust Status
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-foam sm:text-5xl">
              A simple signal for where each recommendation stands.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {trustStatuses.map((status) => (
              <div
                key={status.title}
                className={`border bg-deep p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.045] ${status.accent}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-2xl" aria-hidden="true">
                    {status.indicator}
                  </span>
                  <BadgeCheck
                    className="text-mist"
                    size={20}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-8 font-serif text-3xl leading-tight text-foam">
                  {status.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-mist">
                  {status.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-sand">
              What Blue is NOT
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-foam sm:text-5xl">
              No marketplace noise.
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {notBlue.map((item) => (
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
            Looking for trusted local recommendations?
          </h2>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/destinations"
              className="inline-flex min-h-12 items-center gap-2 bg-foam px-5 text-sm uppercase tracking-[0.16em] text-ink transition hover:bg-sand"
            >
              Explore destinations <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="#"
              className="inline-flex min-h-12 items-center border border-white/24 px-5 text-sm uppercase tracking-[0.16em] text-foam transition hover:border-sand hover:text-sand"
            >
              Work with Blue
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
