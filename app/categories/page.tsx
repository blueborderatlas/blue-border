import Link from "next/link";
import type { Metadata } from "next";
import { CategoryLink } from "@/components/category-link";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { categories, getPostsByCategory } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Browse Blue Border by islands, fishing, beaches, cheap flights, slow travel, coastal towns and routes from Germany.",
};

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const activeCategory = params.category ?? "All";
  const posts = getPostsByCategory(activeCategory);

  return (
    <main className="px-5 pb-24 pt-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Categories"
          title="Filter by the kind of coastline you are looking for."
          copy="Use categories as a practical map: islands, fishing, beaches, cheap flights, slow travel, coastal towns and routes from Germany."
        />

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/categories"
            className={`inline-flex min-h-12 items-center border px-4 text-sm transition ${
              activeCategory === "All"
                ? "border-sand bg-sand text-ink"
                : "border-white/12 bg-white/[0.03] text-mist hover:border-sand/80 hover:text-foam"
            }`}
          >
            All
          </Link>
          {categories.map((category) => (
            <CategoryLink
              key={category}
              category={category}
              active={activeCategory === category}
            />
          ))}
        </div>

        <div className="mt-10 grid gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
