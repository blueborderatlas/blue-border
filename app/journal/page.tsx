import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EditorialCard, Eyebrow, PageHero } from "@/components/editorial";
import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "All Blue Border coastal travel notes, island routes, fishing observations, beaches and low-cost trips across Europe.",
};

export default function JournalPage() {
  const posts = getAllPosts();
  const [featuredPost, ...restPosts] = posts;

  return (
    <main>
      <PageHero
        eyebrow="Journal"
        title="Stories that keep the place alive."
        copy="Field notes, routes and small observations from destinations Blue is learning over time."
        image={featuredPost?.coverImage}
      />

      {featuredPost ? (
        <section className="px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <EditorialCard
              href={`/journal/${featuredPost.slug}`}
              image={featuredPost.coverImage}
              eyebrow={featuredPost.category}
              title={featuredPost.title}
              copy={featuredPost.excerpt}
              meta={featuredPost.readingTime}
              large
            />
          </div>
        </section>
      ) : null}

      <section className="px-5 pb-24 sm:px-8 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Archive</Eyebrow>
              <h2 className="mt-5 font-serif text-5xl leading-none text-foam sm:text-7xl">
                Recent notes.
              </h2>
            </div>
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-foam transition hover:text-sand"
            >
              Browse destinations <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-6">
            {restPosts.map((post, index) => (
              <PostCard key={post.slug} post={post} priority={index === 0} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
