import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 text-sm text-mist sm:px-8 md:grid-cols-[1.3fr_0.7fr]">
        <div>
          <Link
            href="/"
            className="font-serif text-2xl text-foam transition duration-300 ease-blue hover:text-sand"
          >
            Blue Border
          </Link>
          <p className="mt-4 max-w-xl leading-7">
            A trusted recommendation network for independent travelers
            worldwide.
          </p>
        </div>
        <div className="flex flex-wrap items-start gap-x-5 gap-y-3 md:justify-end">
          <Link className="transition duration-300 ease-blue hover:text-foam" href="/">
            Home
          </Link>
          <Link className="transition duration-300 ease-blue hover:text-foam" href="/destinations">
            Destinations
          </Link>
          <Link className="transition duration-300 ease-blue hover:text-foam" href="/journal">
            Journal
          </Link>
          <Link className="transition duration-300 ease-blue hover:text-foam" href="/guides">
            Guides
          </Link>
          <Link className="transition duration-300 ease-blue hover:text-foam" href="/about#work-with-blue">
            Work With Blue
          </Link>
          <Link className="transition duration-300 ease-blue hover:text-foam" href="/about">
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
