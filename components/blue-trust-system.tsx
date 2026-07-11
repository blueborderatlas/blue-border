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
import { Eyebrow, TrustBadge } from "@/components/editorial";

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
    <section className="blue-section">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <Eyebrow>Blue Trust System</Eyebrow>
          <h2 className="blue-h2 mt-5">
            Trust signals, reviewed over time.
          </h2>
          <div className="mt-7">
            <TrustBadge status={recommendation.trustStatus} />
          </div>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {trustItems.map(({ label, value, Icon }) => (
              <div key={label} className="blue-card-flat p-6">
                <Icon
                  className="text-sand"
                  size={22}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <p className="blue-eyebrow mt-5">
                  {label}
                </p>
                <p className="mt-3 text-base leading-7 text-foam/85">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="blue-card-flat p-7 sm:p-8">
            <Sparkles
              className="text-sand"
              size={24}
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <p className="blue-eyebrow mt-5">
              Why Blue Chose This
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-foam/85">
              {recommendation.trust.whyBlueChoseThis}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
