import {
  BadgeCheck,
  CalendarDays,
  Eye,
  Languages,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import type { Recommendation } from "@/lib/recommendations";

type BlueTrustSystemProps = {
  recommendation: Recommendation;
};

export function BlueTrustSystem({ recommendation }: BlueTrustSystemProps) {
  const trustItems = [
    {
      label: "Blue Verified",
      value: recommendation.trust.blueVerified ? "Yes" : "In review",
      Icon: BadgeCheck,
    },
    {
      label: "Personally Visited",
      value: recommendation.trust.personallyVisited ? "Yes" : "Not yet",
      Icon: Eye,
    },
    {
      label: "Last Updated",
      value: recommendation.trust.lastUpdated,
      Icon: CalendarDays,
    },
    {
      label: "Price Level",
      value: recommendation.trust.priceLevel,
      Icon: Wallet,
    },
    {
      label: "Best For",
      value: recommendation.bestFor.join(", "),
      Icon: Users,
    },
    {
      label: "Languages",
      value: recommendation.languages.join(", "),
      Icon: Languages,
    },
  ];

  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-sand">
            Blue Trust System
          </p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-foam sm:text-5xl">
            Trust signals, reviewed over time.
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10">
          <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {trustItems.map(({ label, value, Icon }) => (
              <div key={label} className="bg-deep p-6">
                <Icon
                  className="text-sand"
                  size={22}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <p className="mt-5 text-xs uppercase tracking-[0.16em] text-sand">
                  {label}
                </p>
                <p className="mt-3 text-base leading-7 text-foam/88">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-deep p-7 sm:p-8">
            <Sparkles
              className="text-sand"
              size={24}
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <p className="mt-5 text-xs uppercase tracking-[0.16em] text-sand">
              Why Blue Chose This
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-foam/88">
              {recommendation.trust.whyBlueChoseThis}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
