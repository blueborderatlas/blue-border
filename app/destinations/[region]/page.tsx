import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { destinations, getDestinationBySlug } from "@/lib/archive";
import { getPostsByRegion } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";

type PageProps = {
  params: Promise<{ region: string }>;
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

  return (
    <main className="px-5 pb-24 pt-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Destination"
          title={destination.name}
          copy={`Notes from ${destination.places.join(", ")} and the coastal routes around them.`}
        />

        <div className="mt-8 flex flex-wrap gap-2 text-sm text-mist">
          {destination.places.map((place) => (
            <span
              key={place}
              className="border border-white/12 bg-white/[0.03] px-3 py-2"
            >
              {place}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-6">
          {posts.map((post, index) => (
            <PostCard key={post.slug} post={post} priority={index === 0} />
          ))}
        </div>
      </div>
    </main>
  );
}
