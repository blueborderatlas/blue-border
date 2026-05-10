import Link from "next/link";
import { Anchor, Compass, Fish, Map, Plane, Sailboat, Waves } from "lucide-react";
import type { Category } from "@/lib/posts";

const iconMap = {
  Islands: Sailboat,
  Fishing: Fish,
  Beaches: Waves,
  "Cheap Flights": Plane,
  "Slow Travel": Compass,
  "Coastal Towns": Anchor,
  "From Germany": Map,
} satisfies Record<Category, typeof Sailboat>;

export function CategoryLink({
  category,
  active = false,
}: {
  category: Category;
  active?: boolean;
}) {
  const Icon = iconMap[category];

  return (
    <Link
      href={`/categories?category=${encodeURIComponent(category)}`}
      className={`group inline-flex min-h-12 items-center gap-3 border px-4 text-sm transition ${
        active
          ? "border-sand bg-sand text-ink"
          : "border-white/12 bg-white/[0.03] text-mist hover:border-sand/80 hover:text-foam"
      }`}
    >
      <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
      <span>{category}</span>
    </Link>
  );
}
