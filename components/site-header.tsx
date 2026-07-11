import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/journal", label: "Journal" },
  { href: "/guides", label: "Guides" },
  { href: "/about#work-with-blue", label: "Work With Blue" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-col items-center justify-between gap-3 px-5 py-4 sm:flex-row sm:px-8 sm:py-0">
        <Link
          href="/"
          className="font-serif text-xl tracking-[0.12em] text-foam transition duration-300 ease-blue hover:text-sand"
          aria-label="Blue Border home"
        >
          Blue Border
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-xs uppercase tracking-[0.12em] text-mist sm:text-sm sm:normal-case sm:tracking-normal">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="min-h-10 px-3 py-2 transition duration-300 ease-blue hover:text-foam"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
