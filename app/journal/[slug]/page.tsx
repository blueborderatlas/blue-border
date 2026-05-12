import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ImageGallery } from "@/components/image-gallery";
import { mdxComponents } from "@/components/mdx-components";
import { formatPostDate, getAllPosts, getPostBySlug } from "@/lib/posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function getSardiniaGalleryImages() {
  const galleryDirectory = path.join(process.cwd(), "public/images/sardinia");

  if (!fs.existsSync(galleryDirectory)) {
    return [];
  }

  return fs
    .readdirSync(galleryDirectory)
    .filter((fileName) => imageExtensions.has(path.extname(fileName).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
    .map((fileName) => `/images/sardinia/${encodeURIComponent(fileName)}`);
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [
        {
          url: post.coverImage,
          width: 1600,
          height: 900,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const galleryImages =
    post.slug === "spring-in-sardinia-feels-quieter-than-expected"
      ? getSardiniaGalleryImages()
      : [];

  return (
    <main>
      <article>
        <header className="relative flex min-h-[74svh] items-end overflow-hidden px-5 pb-14 pt-32 sm:px-8">
          <img
            src={post.coverImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-74"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,17,31,0.94),rgba(6,17,31,0.38)),linear-gradient(0deg,rgba(6,17,31,0.96),transparent_46%)]" />
          <div className="relative mx-auto w-full max-w-5xl">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.16em] text-sand">
              <span>{post.category}</span>
              <span className="h-1 w-1 rounded-full bg-sand/70" />
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span className="h-1 w-1 rounded-full bg-sand/70" />
              <span>{post.readingTime}</span>
            </div>
            <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-tight text-foam sm:text-7xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-foam/86">
              {post.excerpt}
            </p>
          </div>
        </header>

        <ImageGallery images={galleryImages} label={`${post.title} photo gallery`} />

        <div className="px-5 py-16 sm:px-8">
          <div className="prose-coast mx-auto max-w-3xl">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </div>
      </article>
    </main>
  );
}
