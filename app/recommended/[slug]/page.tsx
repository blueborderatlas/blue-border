import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import {
  getRecommendationBySlug,
  recommendations,
} from "@/lib/recommendations";
import { BlueTrustSystem } from "@/components/blue-trust-system";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return recommendations.map((recommendation) => ({
    slug: recommendation.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recommendation = getRecommendationBySlug(slug);

  if (!recommendation) {
    return {};
  }

  return {
    title: recommendation.name,
    description: recommendation.summary,
  };
}

export default async function RecommendationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const recommendation = getRecommendationBySlug(slug);

  if (!recommendation) {
    notFound();
  }

  const thingsToKnow = [
    ["Opening hours", recommendation.thingsToKnow.openingHours],
    ["Language", recommendation.languages.join(", ")],
    ["Payment", recommendation.thingsToKnow.payment],
    ["Reservation", recommendation.thingsToKnow.reservation],
    ["Accessibility", recommendation.thingsToKnow.accessibility],
  ];

  return (
    <main>
      <section className="relative flex min-h-[78svh] items-end overflow-hidden px-5 pb-14 pt-32 sm:px-8">
        <img
          src={recommendation.coverImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-72"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,17,31,0.95),rgba(6,17,31,0.62),rgba(6,17,31,0.25)),linear-gradient(0deg,rgba(6,17,31,0.96),transparent_44%)]" />
        <div className="relative mx-auto w-full max-w-7xl">
          <p className="text-xs uppercase tracking-[0.24em] text-sand">
            {recommendation.category}
          </p>
          <h1 className="mt-4 max-w-5xl font-serif text-6xl leading-[0.98] text-foam sm:text-8xl">
            {recommendation.name}
          </h1>
          <p className="mt-6 text-lg leading-8 text-foam/88">
            {recommendation.city}, {recommendation.country}
          </p>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <p className="text-xs uppercase tracking-[0.22em] text-sand">
            Blue Summary
          </p>
          <p className="max-w-4xl font-serif text-3xl leading-tight text-foam sm:text-5xl">
            {recommendation.summary}
          </p>
        </div>
      </section>

      <BlueTrustSystem recommendation={recommendation} />

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <p className="text-xs uppercase tracking-[0.22em] text-sand">
            Why Blue Recommends
          </p>
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {recommendation.whyBlueRecommends.map((reason) => (
              <div key={reason} className="flex gap-3 bg-deep p-6">
                <CheckCircle2
                  className="mt-1 shrink-0 text-sand"
                  size={17}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <p className="text-base leading-7 text-foam/88">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <p className="text-xs uppercase tracking-[0.22em] text-sand">
            Things to Know
          </p>
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10">
            {thingsToKnow.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-3 bg-deep p-5 sm:grid-cols-[0.32fr_0.68fr]"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-sand">
                  {label}
                </p>
                <p className="text-base leading-7 text-foam/88">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.22em] text-sand">
            Gallery
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {recommendation.gallery.map((image) => (
              <div key={image} className="h-80 overflow-hidden bg-tide">
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover opacity-90"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <p className="text-xs uppercase tracking-[0.22em] text-sand">
            Contact & Booking
          </p>
          <div className="border border-white/10 bg-white/[0.035] p-7 sm:p-9">
            <h2 className="font-serif text-4xl leading-tight text-foam sm:text-5xl">
              Contact placeholder
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-mist">
              {recommendation.contact.instructions} Blue does not process
              bookings, payments or refunds; travelers communicate directly
              with the business.
            </p>
            <Link
              href={recommendation.bookingLink}
              className="mt-8 inline-flex min-h-12 items-center gap-2 bg-foam px-5 text-sm uppercase tracking-[0.16em] text-ink transition hover:bg-sand"
            >
              {recommendation.contact.label}{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.22em] text-sand">
            Nearby Recommendations
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {recommendation.nearbyRecommendations.map((item) => (
              <article
                key={item.name}
                className="border border-white/10 bg-deep p-6"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-sand">
                  {item.category}
                </p>
                <h3 className="mt-4 font-serif text-3xl leading-tight text-foam">
                  {item.name}
                </h3>
                <p className="mt-4 text-sm leading-7 text-mist">
                  {item.location}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {recommendation.relatedGuides.length > 0 ? (
        <section className="px-5 pb-24 sm:px-8">
          <div className="mx-auto max-w-7xl border-t border-white/10 pt-14">
            <p className="text-xs uppercase tracking-[0.22em] text-sand">
              Related Guides
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {recommendation.relatedGuides.map((guide) => (
                <Link
                  key={`${guide.title}-${guide.href}`}
                  href={guide.href}
                  className="border border-white/10 bg-deep p-6 transition hover:border-sand/45"
                >
                  <h3 className="font-serif text-3xl leading-tight text-foam">
                    {guide.title}
                  </h3>
                  <p className="mt-5 text-xs uppercase tracking-[0.14em] text-mist">
                    Open guide
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
