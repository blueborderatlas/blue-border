import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { destinations, getDestinationBySlug } from "@/lib/archive";
import { getPostsByRegion } from "@/lib/posts";
import {
  destinationCategoryGroups,
  getRecommendationsForDestination,
  getRecommendationsForDestinationCategory,
} from "@/lib/recommendations";
import {
  EditorialCard,
  EditorialLink,
  Eyebrow,
  PageHero,
  SectionIntro,
} from "@/components/editorial";
import { PostCard } from "@/components/post-card";

type PageProps = {
  params: Promise<{ region: string }>;
};

const destinationImages: Record<string, string> = {
  dahab:
    "/images/ai/dahab-diving/DJI_20260626_193515_Edit_Composited_Photo.jpg",
  europe:
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1800&q=82",
  china:
    "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1800&q=82",
  japan:
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=82",
  "southeast-asia":
    "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1800&q=82",
  "middle-east":
    "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=1800&q=82",
  islands:
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=82",
  "remote-places":
    "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1800&q=82",
};

export function generateStaticParams() {
  return destinations.map((destination) => ({
    region: destination.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { region } = await params;
  const destination = getDestinationBySlug(region);

  if (!destination) {
    return {};
  }

  return {
    title: destination.name,
    description: `Blue Border notes from ${destination.name}: ${destination.places.join(", ")}.`,
  };
}

export default async function DestinationRegionPage({ params }: PageProps) {
  const { region } = await params;
  const destination = getDestinationBySlug(region);

  if (!destination) {
    notFound();
  }

  const posts = getPostsByRegion(destination.name);
  const recommendations = getRecommendationsForDestination(destination);
  const categoryLinks = destinationCategoryGroups
    .map((category) => ({
      ...category,
      count: getRecommendationsForDestinationCategory(destination, category)
        .length,
    }))
    .filter((category) => destination.slug === "dahab" || category.count > 0);
  const image = destinationImages[destination.slug] || destinationImages.europe;

  return (
    <main>
      <PageHero
        eyebrow="Destination"
        title={destination.name}
        copy={`${destination.places.join(", ")}. Local places, practical context and stories collected into one quiet guide.`}
        image={image}
      >
        <div className="flex flex-wrap gap-2 text-sm text-mist">
          {destination.places.map((place) => (
            <span key={place} className="bg-white/[0.07] px-3 py-2">
              {place}
            </span>
          ))}
        </div>
      </PageHero>

      {categoryLinks.length > 0 ? (
        <section className="px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow="Browse"
              title={`What do you need in ${destination.name}?`}
              copy="Choose a category first, then open a place when you need the full local profile."
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categoryLinks.map((category, index) => (
                <Link
                  key={category.slug}
                  href={`/destinations/${destination.slug}/${category.slug}`}
                  className={`group flex min-h-64 flex-col justify-between bg-deep p-6 transition hover:bg-white/[0.05] ${
                    index === 0 ? "lg:col-span-2" : ""
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-sand">
                    {category.count} places
                  </p>
                  <div>
                    <h2 className="font-serif text-4xl leading-tight text-foam transition group-hover:text-sand sm:text-5xl">
                      {category.label}
                    </h2>
                    <p className="mt-5 text-xs uppercase tracking-[0.16em] text-mist">
                      Explore category
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {recommendations.length > 0 ? (
        <section className="border-y border-white/10 bg-white/[0.025] px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow="Featured places"
              title="Trusted local starting points."
              action={
                categoryLinks[0] ? (
                  <EditorialLink
                    href={`/destinations/${destination.slug}/${categoryLinks[0].slug}`}
                  >
                    Browse by category
                  </EditorialLink>
                ) : null
              }
            />

            <div className="grid gap-5 lg:grid-cols-3">
              {recommendations.map((recommendation, index) => (
                <EditorialCard
                  key={recommendation.id}
                  href={`/places/${recommendation.slug}`}
                  image={recommendation.coverImage}
                  eyebrow={`${recommendation.category} · ${recommendation.city}`}
                  title={recommendation.businessProfile?.name || recommendation.name}
                  copy={recommendation.summary}
                  meta={recommendation.trustStatus}
                  large={index === 0}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Journal"
            title="Stories from the field."
            action={
              <EditorialLink href="/journal" variant="text">
                Open journal
              </EditorialLink>
            }
          />

          {posts.length > 0 ? (
            <div className="grid gap-5">
              {posts.map((post, index) => (
                <PostCard key={post.slug} post={post} priority={index === 0} />
              ))}
            </div>
          ) : (
            <div className="relative min-h-[24rem] overflow-hidden bg-tide p-7 sm:p-10">
              <img
                src={image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-[0.28]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/40 to-transparent" />
              <div className="relative mt-36 max-w-2xl">
                <Eyebrow>Coming soon</Eyebrow>
                <h2 className="mt-4 font-serif text-4xl leading-tight text-foam sm:text-5xl">
                  Field notes will arrive as Blue spends more time here.
                </h2>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-white/10 pt-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Eyebrow>Continue exploring</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-foam sm:text-5xl">
              Open another destination.
            </h2>
          </div>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-foam transition hover:text-sand"
          >
            All destinations <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
