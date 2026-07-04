import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  Handshake,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Recommended",
  description:
    "Blue Recommended is a curated layer for trusted local businesses, reviewed through real traveler feedback and direct connections.",
};

const trustStatuses = [
  {
    indicator: "🟢",
    title: "Verified Partner",
    copy: "Long-term trusted partner.",
    accent: "border-emerald-300/35 bg-emerald-300/10",
  },
  {
    indicator: "🔵",
    title: "Recommended",
    copy: "Recommended by Blue after review.",
    accent: "border-sky-300/35 bg-sky-300/10",
  },
  {
    indicator: "🟡",
    title: "Under Review",
    copy: "Currently being evaluated.",
    accent: "border-amber-300/35 bg-amber-300/10",
  },
  {
    indicator: "🔴",
    title: "Paused",
    copy: "Recommendation paused due to quality concerns.",
    accent: "border-rose-300/35 bg-rose-300/10",
  },
];

const selectionNotes = [
  {
    icon: ShieldCheck,
    title: "Manual selection",
    copy: "Blue looks for local businesses that feel reliable, clear and useful for Chinese independent travelers.",
  },
  {
    icon: MessageCircle,
    title: "Real feedback",
    copy: "Only travelers who connected with a business through Blue can send feedback into the trust system.",
  },
  {
    icon: BadgeCheck,
    title: "Ongoing review",
    copy: "A recommendation can be upgraded, maintained, paused or removed when long-term quality changes.",
  },
  {
    icon: Handshake,
    title: "Direct connection",
    copy: "Travelers contact the business directly. Blue is not a booking platform and does not handle checkout.",
  },
];

export default function RecommendedPage() {
  return (
    <main>
      <section className="relative flex min-h-[68svh] items-end overflow-hidden px-5 pb-14 pt-32 sm:px-8">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=85"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,17,31,0.94),rgba(6,17,31,0.58),rgba(6,17,31,0.25)),linear-gradient(0deg,rgba(6,17,31,0.96),transparent_44%)]" />
        <div className="relative mx-auto w-full max-w-7xl">
          <p className="text-xs uppercase tracking-[0.24em] text-sand">
            Blue Recommended
          </p>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl leading-tight text-foam sm:text-7xl">
            Curated local recommendations, not another booking page.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-foam/88">
            Blue Recommended is a trust layer for Chinese independent travelers:
            selected local businesses, clear context and direct contact without
            payments or checkout handled by Blue.
          </p>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-sand">
              What it means
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-foam sm:text-5xl">
              Recommended by Blue means selected, reviewed and accountable.
            </h2>
            <p className="mt-6 text-base leading-8 text-mist">
              Businesses are not permanently recommended. Blue uses long-term
              traveler feedback and editorial judgment to decide whether a
              recommendation should be upgraded, maintained, paused or removed.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {selectionNotes.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:border-sand/40 hover:bg-white/[0.05]"
                >
                  <Icon className="text-sand" size={25} strokeWidth={1.6} />
                  <h3 className="mt-6 font-serif text-2xl text-foam">
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

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.22em] text-sand">
              Blue Trust Status
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-foam sm:text-5xl">
              Every recommendation has a visible trust stage.
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
                  <span className="text-xs uppercase tracking-[0.16em] text-mist">
                    Trust status
                  </span>
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

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-sand">
              Demo recommendation
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-foam sm:text-5xl">
              A simple example of how Blue could present a trusted local
              business.
            </h2>
          </div>

          <article className="overflow-hidden border border-white/10 bg-white/[0.035]">
            <div className="border-b border-white/10 p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-sand">
                    Recommended after review
                  </p>
                  <h3 className="mt-3 font-serif text-4xl leading-tight text-foam">
                    Aegean Family Stay
                  </h3>
                </div>
                <span className="border border-sky-300/35 bg-sky-300/10 px-3 py-2 text-xs uppercase tracking-[0.14em] text-foam">
                  🔵 Recommended
                </span>
              </div>
            </div>

            <div className="grid gap-px bg-white/10 md:grid-cols-2">
              {[
                ["Category", "Stay"],
                ["Location", "Crete, Greece"],
                ["Best for", "Quiet independent travelers"],
                ["Blue Trust Status", "Recommended"],
              ].map(([label, value]) => (
                <div key={label} className="bg-deep p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-sand">
                    {label}
                  </p>
                  <p className="mt-3 text-base text-foam">{value}</p>
                </div>
              ))}
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.16em] text-sand">
                Why Blue recommends it
              </p>
              <p className="mt-4 max-w-3xl text-base leading-8 text-mist">
                A small stay with clear communication, calm surroundings and
                helpful local context for travelers who prefer a slower base
                over a crowded resort area.
              </p>
              <Link
                href="#"
                className="mt-8 inline-flex min-h-12 items-center gap-2 bg-foam px-5 text-sm uppercase tracking-[0.16em] text-ink transition hover:bg-sand"
              >
                Direct Contact <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-7xl border border-sand/20 bg-sand/10 p-6 sm:p-8">
          <div className="flex gap-3">
            <CheckCircle2
              className="mt-1 shrink-0 text-sand"
              size={18}
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <p className="max-w-4xl text-sm leading-7 text-foam/88">
              Blue does not process bookings, payments or refunds. Travelers
              communicate directly with the business, and any service agreement
              is made between the traveler and the business.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
