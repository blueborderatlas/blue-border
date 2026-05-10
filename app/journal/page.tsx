import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "All Blue Border coastal travel notes, island routes, fishing observations, beaches and low-cost trips across Europe.",
};

export default function JournalPage() {
  const posts = getAllPosts();

  return (
    <main className="px-5 pb-24 pt-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Journal"
          title="Coastal notes, island routes and quiet town observations."
          copy="A growing archive of practical, atmospheric field notes for slow travel around the European coast."
        />
        <div className="mt-10 grid gap-6">
          {posts.map((post, index) => (
            <PostCard key={post.slug} post={post} priority={index === 0} />
          ))}
        </div>
      </div>
    </main>
  );
}
