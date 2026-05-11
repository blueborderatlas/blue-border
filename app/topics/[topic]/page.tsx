import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTopicBySlug, getTopicSlug, topics } from "@/lib/archive";
import { getPostsByTopic } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";

type PageProps = {
  params: Promise<{ topic: string }>;
};

export function generateStaticParams() {
  return topics.map((topic) => ({
    topic: getTopicSlug(topic),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { topic } = await params;
  const topicName = getTopicBySlug(topic);

  if (!topicName) {
    return {};
  }

  return {
    title: topicName,
    description: `Blue Border notes about ${topicName.toLowerCase()} across coastal towns, islands and slow routes.`,
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { topic } = await params;
  const topicName = getTopicBySlug(topic);

  if (!topicName) {
    notFound();
  }

  const posts = getPostsByTopic(topicName);

  return (
    <main className="px-5 pb-24 pt-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Topic"
          title={topicName}
          copy="Related notes from different coasts, kept loose and personal rather than arranged like a guidebook."
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
