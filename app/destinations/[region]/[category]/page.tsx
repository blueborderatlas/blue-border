import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { destinations, getDestinationBySlug } from "@/lib/archive";
import {
  destinationCategoryGroups,
  getDestinationCategoryBySlug,
  getRecommendationsForDestinationCategory,
} from "@/lib/recommendations";
import {
  EditorialCard,
  EditorialLink,
  Eyebrow,
  PageHero,
} from "@/components/editorial";

type PageProps = {
  params: Promise<{ region: string; category: string }>;
};

const categoryImages: Record<string, string> = {
  diving:
    "/images/ai/dahab-diving/DJI_20260626_193515_Edit_Composited_Photo.jpg",
  stay:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=82",
  food:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1800&q=82",
  cafe:
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1800&q=82",
  transport:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=82",
  pharmacy:
    "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=1800&q=82",
  "local-guide":
    "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1800&q=82",
};

export function generateStaticParams() {
  return destinations.flatMap((destination) =>
    destinationCategoryGroups.map((category) => ({
      region: destination.slug,
      category: category.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { region, category: categorySlug } = await params;
  const destination = getDestinationBySlug(region);
  const category = getDestinationCategoryBySlug(categorySlug);

  if (!destination || !category) {
    return {};
  }

  return {
    title: `${category.label} in ${destination.name}`,
    description: `Trusted ${category.label.toLowerCase()} places in ${destination.name}, curated by Blue.`,
  };
}

export default async function DestinationCategoryPage({ params }: PageProps) {
  const { region, category: categorySlug } = await params;
  const destination = getDestinationBySlug(region);
  const category = getDestinationCategoryBySlug(categorySlug);

  if (!destination || !category) {
    notFound();
  }

  const places = getRecommendationsForDestinationCategory(
    destination,
    category,
  );
  const image = categoryImages[category.slug] || categoryImages["local-guide"];

  return (
    <main>
      <PageHero
        eyebrow={`${destination.name} / ${category.label}`}
        title={`${category.label} in ${destination.name}`}
        copy={`A focused browsing path for ${category.label.toLowerCase()} recommendations, practical notes and trusted local context.`}
        image={places[0]?.coverImage || image}
      >
        <nav className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em] text-mist">
          <Link href="/destinations" className="transition hover:text-sand">
            Destinations
          </Link>
          <span>/</span>
          <Link
            href={`/destinations/${destination.slug}`}
            className="transition hover:text-sand"
          >
            {destination.name}
          </Link>
          <span>/</span>
          <span className="text-sand">{category.label}</span>
        </nav>
      </PageHero>

      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          {places.length > 0 ? (
            <div className="grid gap-5 lg:grid-cols-3">
              {places.map((place, index) => (
                <EditorialCard
                  key={place.id}
                  href={`/places/${place.slug}`}
                  image={place.coverImage}
                  eyebrow={`${place.category} · ${place.city}`}
                  title={place.businessProfile?.name || place.name}
                  copy={place.summary}
                  meta={place.trustStatus}
                  large={index === 0}
                />
              ))}
            </div>
          ) : (
            <div className="relative min-h-[62vh] overflow-hidden bg-tide p-7 sm:p-10">
              <img
                src={image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-[0.32]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/54 to-transparent" />
              <div className="relative mt-48 max-w-3xl">
                <Eyebrow>Under curation</Eyebrow>
                <h2 className="mt-5 font-serif text-5xl leading-tight text-foam sm:text-7xl">
                  No published places here yet.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-mist">
                  Blue will add {category.label.toLowerCase()} places once
                  enough trust signals and local context are available.
                </p>
                <div className="mt-9">
                  <EditorialLink href={`/destinations/${destination.slug}`}>
                    Back to {destination.name}
                  </EditorialLink>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-white/10 pt-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Eyebrow>Next</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-foam sm:text-5xl">
              Browse the full destination.
            </h2>
          </div>
          <Link
            href={`/destinations/${destination.slug}`}
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-foam transition hover:text-sand"
          >
            Open {destination.name} <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
