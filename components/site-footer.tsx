import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 text-sm text-mist sm:px-8 md:grid-cols-[1.3fr_0.7fr]">
        <div>
          <Link href="/" className="font-serif text-2xl text-foam">
            Blue Border
          </Link>
          <p className="mt-4 max-w-xl leading-7">
            Hidden islands, quiet coasts and low-cost sea escapes across
            Europe. Field notes for people who like the edge of the map.
          </p>
        </div>
        <div className="flex flex-wrap items-start gap-5 md:justify-end">
          <Link className="transition hover:text-foam" href="/journal">
            Journal
          </Link>
          <Link className="transition hover:text-foam" href="/categories">
            Categories
          </Link>
          <Link className="transition hover:text-foam" href="/about">
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
