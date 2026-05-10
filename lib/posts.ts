import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const categories = [
  "Islands",
  "Fishing",
  "Beaches",
  "Cheap Flights",
  "Slow Travel",
  "Coastal Towns",
  "From Germany",
] as const;

export type Category = (typeof categories)[number];

export type Post = {
  title: string;
  slug: string;
  date: string;
  category: Category;
  coverImage: string;
  excerpt: string;
  featured?: boolean;
  readingTime: string;
  content: string;
};

const postsDirectory = path.join(process.cwd(), "content/posts");

function isCategory(value: string): value is Category {
  return categories.includes(value as Category);
}

function estimateReadingTime(content: string) {
  const words = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[^\w\s'-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

function getPostFiles() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
}

function normalizePost(fileName: string): Post {
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const fallbackSlug = fileName.replace(/\.mdx?$/, "");
  const category = String(data.category ?? "Slow Travel");

  if (!isCategory(category)) {
    throw new Error(`Invalid category "${category}" in ${fileName}`);
  }

  return {
    title: String(data.title ?? fallbackSlug),
    slug: String(data.slug ?? fallbackSlug),
    date: String(data.date ?? new Date().toISOString()),
    category,
    coverImage: String(data.coverImage ?? ""),
    excerpt: String(data.excerpt ?? ""),
    featured: Boolean(data.featured),
    readingTime: estimateReadingTime(content),
    content,
  };
}

export function getAllPosts() {
  return getPostFiles()
    .map(normalizePost)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export function getFeaturedPosts() {
  const featured = getAllPosts().filter((post) => post.featured);
  return featured.length > 0 ? featured : getAllPosts().slice(0, 3);
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostsByCategory(category?: string) {
  if (!category || category === "All") {
    return getAllPosts();
  }

  return getAllPosts().filter((post) => post.category === category);
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
