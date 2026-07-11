import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import {
  destinationCategoryGroups,
  getRecommendationBySlug,
  recommendations,
} from "@/lib/recommendations";
import { BlueTrustSystem } from "@/components/blue-trust-system";
import { EditorialLink, Eyebrow } from "@/components/editorial";

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
  const businessProfile = recommendation.businessProfile;
  const businessProfileRows = businessProfile
    ? [
        ["ID", businessProfile.id],
        ["Name", businessProfile.name],
        ["Verified", businessProfile.verified],
        ["Category", businessProfile.category],
        ["Destination", businessProfile.destination],
        ["Location", `${businessProfile.city}, ${businessProfile.country}`],
        ["Address", businessProfile.address],
        ["Website", businessProfile.website],
        ["Google Maps", businessProfile.googleMaps],
        ["Instagram", businessProfile.instagram],
        ["Email", businessProfile.email],
        ["Phone", businessProfile.phone],
        ["Opening hours", businessProfile.openingHours],
        ["Price range", businessProfile.priceRange],
        ["Languages", businessProfile.languages.join(", ")],
      ]
    : [];
  const blueExperience = recommendation.blueExperience;
  const blueExperienceRows = blueExperience
    ? [
        ["Visited by Blue", blueExperience.visitedByBlue ? "Yes" : "Not yet"],
        ["Visit date", blueExperience.visitDate],
        ["Reviewer", blueExperience.reviewer],
        ["Blue rating", blueExperience.blueRating],
        ["Recommended for", blueExperience.recommendedFor.join(", ")],
      ]
    : [];
  const destinationSlug = (
    businessProfile?.destination || recommendation.city
  )
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const categorySlug =
    destinationCategoryGroups.find((category) =>
      (category.categories as readonly string[]).includes(
        recommendation.category,
      ),
    )?.slug || recommendation.category.toLowerCase().replace(/\s+/g, "-");
  const observationGroups: Array<[string, string[]]> = recommendation.aiObservations
    ? [
        ["Underwater", recommendation.aiObservations.underwater],
        ["Shore", recommendation.aiObservations.shore],
        ["Equipment", recommendation.aiObservations.equipment],
        ["Facilities", recommendation.aiObservations.facilities],
        ["People", recommendation.aiObservations.people],
        ["Visible Signs", recommendation.aiObservations.visibleSigns],
      ]
    : [];

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
          <nav className="mb-7 flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em] text-mist">
            <Link href="/destinations" className="transition hover:text-sand">
              Destinations
            </Link>
            <span>/</span>
            <Link
              href={`/destinations/${destinationSlug}`}
              className="transition hover:text-sand"
            >
              {businessProfile?.destination || recommendation.city}
            </Link>
            <span>/</span>
            <Link
              href={`/destinations/${destinationSlug}/${categorySlug}`}
              className="transition hover:text-sand"
            >
              {recommendation.category}
            </Link>
          </nav>
          <p className="text-xs uppercase tracking-[0.24em] text-sand">
            {recommendation.category}
          </p>
          <h1 className="mt-4 max-w-5xl font-serif text-6xl leading-[0.98] text-foam sm:text-8xl">
            {recommendation.name}
          </h1>
          <p className="mt-6 text-lg leading-8 text-foam/88">
            {recommendation.city}, {recommendation.country}
          </p>
          <div className="mt-10 grid max-w-4xl gap-px overflow-hidden bg-white/15 sm:grid-cols-3">
            {[
              ["Trust", recommendation.trustStatus],
              ["Best for", recommendation.bestFor.slice(0, 2).join(", ")],
              ["Languages", recommendation.languages.join(", ")],
            ].map(([label, value]) => (
              <div key={label} className="bg-ink/64 p-5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.16em] text-sand">
                  {label}
                </p>
                <p className="mt-3 text-base leading-7 text-foam/88">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {businessProfile ? (
        <section className="px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <Eyebrow>Business Profile</Eyebrow>
              <h2 className="mt-5 font-serif text-5xl leading-tight text-foam sm:text-7xl">
                {businessProfile.name}
              </h2>
              <p className="mt-7 text-base leading-8 text-mist">
                {businessProfile.shortDescription}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <span className="inline-flex min-h-11 items-center gap-2 bg-white/[0.06] px-4 text-xs uppercase tracking-[0.16em] text-foam">
                  <BadgeCheck size={15} strokeWidth={1.6} />
                  {businessProfile.verified}
                </span>
                <span className="inline-flex min-h-11 items-center gap-2 bg-white/[0.06] px-4 text-xs uppercase tracking-[0.16em] text-foam">
                  <MapPin size={15} strokeWidth={1.6} />
                  {businessProfile.city}, {businessProfile.country}
                </span>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {businessProfileRows.map(([label, value]) => (
                <div
                  key={label}
                  className="bg-deep p-5 transition hover:bg-white/[0.045]"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-sand">
                    {label}
                  </p>
                  <p className="mt-3 text-base leading-7 text-foam/88">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {blueExperience ? (
        <section className="border-y border-white/10 bg-white/[0.025] px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <Eyebrow>Blue Experience</Eyebrow>
              <h2 className="mt-5 font-serif text-5xl leading-tight text-foam sm:text-6xl">
                Human context before the details.
              </h2>
              <p className="mt-6 text-base leading-8 text-mist">
                {blueExperience.editorNotes}
              </p>
            </div>
            <div>
              <div className="grid gap-3 sm:grid-cols-2">
                {blueExperienceRows.map(([label, value]) => (
                  <div key={label} className="bg-deep p-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-sand">
                      {label}
                    </p>
                    <p className="mt-3 text-base leading-7 text-foam/88">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-3 grid gap-3 lg:grid-cols-3">
                <div className="bg-deep p-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-sand">
                    Highlights
                  </p>
                  <ul className="mt-5 space-y-3 text-sm leading-7 text-foam/88">
                    {blueExperience.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-deep p-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-sand">
                    Cautions
                  </p>
                  <ul className="mt-5 space-y-3 text-sm leading-7 text-foam/88">
                    {blueExperience.cautions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-deep p-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-sand">
                    Editor Notes
                  </p>
                  <p className="mt-5 text-sm leading-7 text-foam/88">
                    {blueExperience.editorNotes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-sand">
              Blue Recommendation
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-foam sm:text-5xl">
              AI-assisted recommendation, reviewed before publishing.
            </h2>
          </div>
          <div>
            <p className="max-w-4xl font-serif text-3xl leading-tight text-foam sm:text-5xl">
              {recommendation.summary}
            </p>
            <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
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
        </div>
      </section>

      {recommendation.aiObservations ? (
        <section className="border-y border-white/10 bg-white/[0.025] px-5 py-20 sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-sand">
                AI Observations
              </p>
              <h2 className="mt-5 font-serif text-4xl leading-tight text-foam sm:text-5xl">
                {recommendation.aiObservations.label}
              </h2>
              <p className="mt-5 text-sm leading-7 text-mist">
                Visible signs are recorded as photo observations only. They are
                not verified business identities.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
              {observationGroups.map(([label, items]) => (
                <div key={label} className="bg-deep p-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-sand">
                    {label}
                  </p>
                  <ul className="mt-5 space-y-3 text-sm leading-7 text-foam/88">
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Gallery</Eyebrow>
          <h2 className="mt-5 max-w-4xl font-serif text-5xl leading-none text-foam sm:text-7xl">
            Look before you decide.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {recommendation.gallery.map((image, index) => (
              <div
                key={image}
                className={`overflow-hidden bg-tide ${
                  index === 0 ? "h-[72vh] md:col-span-2" : "h-80"
                }`}
              >
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover opacity-90 transition duration-700 hover:opacity-100"
                  loading="lazy"
                />
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

      <BlueTrustSystem recommendation={recommendation} />

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

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-white/10 pt-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Eyebrow>Keep browsing</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-foam sm:text-5xl">
              Return to {businessProfile?.destination || recommendation.city}.
            </h2>
          </div>
          <EditorialLink href={`/destinations/${destinationSlug}`}>
            Open destination
          </EditorialLink>
        </div>
      </section>
    </main>
  );
}
