import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatPostDate, type Post } from "@/lib/posts";

export function PostCard({
  post,
  priority = false,
}: {
  post: Post;
  priority?: boolean;
}) {
  return (
    <article className="blue-card blue-card-hover group grid sm:grid-cols-[1.08fr_0.92fr]">
      <Link
        href={`/journal/${post.slug}`}
        className="blue-media min-h-[24rem] sm:min-h-[28rem]"
        aria-label={post.title}
      >
        <img
          src={post.coverImage}
          alt=""
          loading={priority ? "eager" : "lazy"}
          className="blue-media-img absolute inset-0"
        />
        <div className="blue-overlay-bottom" />
      </Link>
      <div className="flex min-h-[28rem] flex-col justify-between p-7 sm:p-9">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.16em] text-sand">
            <span>{post.category}</span>
            <span className="h-1 w-1 rounded-full bg-sand/70" />
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span className="h-1 w-1 rounded-full bg-sand/70" />
            <span>{post.readingTime}</span>
          </div>
          <h2 className="mt-6 font-serif text-3xl leading-tight text-foam sm:text-5xl">
            <Link
              href={`/journal/${post.slug}`}
              className="transition duration-300 ease-blue hover:text-sand"
            >
              {post.title}
            </Link>
          </h2>
          <p className="blue-body mt-5 line-clamp-4">
            {post.excerpt}
          </p>
        </div>
        <Link
          href={`/journal/${post.slug}`}
          className="blue-text-link mt-8 w-fit"
        >
          Read note <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
