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
    <article className="group grid overflow-hidden bg-white/[0.03] shadow-coast sm:grid-cols-[1.08fr_0.92fr]">
      <Link
        href={`/journal/${post.slug}`}
        className="relative min-h-[28rem] overflow-hidden bg-tide"
        aria-label={post.title}
      >
        <img
          src={post.coverImage}
          alt=""
          loading={priority ? "eager" : "lazy"}
          className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
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
          <h2 className="mt-6 font-serif text-4xl leading-tight text-foam sm:text-5xl">
            <Link href={`/journal/${post.slug}`} className="hover:text-sand">
              {post.title}
            </Link>
          </h2>
          <p className="mt-5 line-clamp-4 text-base leading-8 text-mist">
            {post.excerpt}
          </p>
        </div>
        <Link
          href={`/journal/${post.slug}`}
          className="mt-8 inline-flex w-fit items-center gap-2 text-sm uppercase tracking-[0.18em] text-foam transition hover:text-sand"
        >
          Read note <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
