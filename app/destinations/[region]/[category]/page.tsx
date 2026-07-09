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

type PageProps = {
  params: Promise<{ region: string; category: string }>;
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

  return (
    <main className="px-5 pb-24 pt-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
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

        <section className="mt-8 max-w-5xl">
          <p className="text-xs uppercase tracking-[0.24em] text-sand">
            {destination.name}
          </p>
          <h1 className="mt-5 font-serif text-6xl leading-[0.98] text-foam sm:text-8xl">
            {category.label}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-mist">
            Browse trusted {category.label.toLowerCase()} starting points in{" "}
            {destination.name}. Details, trust status and observations live on
            each place page.
          </p>
        </section>

        <section className="mt-14">
          {places.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {places.map((place) => (
                <Link
                  key={place.id}
                  href={`/places/${place.slug}`}
                  className="group overflow-hidden border border-white/10 bg-white/[0.03] transition duration-500 hover:-translate-y-1 hover:border-sand/45 hover:bg-white/[0.05]"
                >
                  <div className="relative h-72 overflow-hidden bg-tide">
                    <img
                      src={place.coverImage}
                      alt=""
                      className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/86 via-ink/12 to-transparent" />
                  </div>

                  <div className="p-6 sm:p-7">
                    <p className="text-xs uppercase tracking-[0.16em] text-sand">
                      {place.category} · {place.city}
                    </p>
                    <h2 className="mt-5 font-serif text-4xl leading-tight text-foam group-hover:text-sand">
                      {place.name}
                    </h2>
                    <p className="mt-4 line-clamp-3 text-sm leading-7 text-mist">
                      {place.summary}
                    </p>
                    <div className="mt-7 flex items-center justify-between gap-4">
                      <span className="text-xs uppercase tracking-[0.14em] text-mist">
                        {place.trustStatus}
                      </span>
                      <ArrowUpRight
                        className="text-mist transition group-hover:text-sand"
                        size={18}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border border-white/10 bg-white/[0.03] p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.18em] text-sand">
                Under curation
              </p>
              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-foam sm:text-5xl">
                No published places here yet.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-mist">
                Blue will add {category.label.toLowerCase()} places once enough
                trust signals and local context are available.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
