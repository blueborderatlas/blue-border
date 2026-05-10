import Link from "next/link";

const navItems = [
  { href: "/journal", label: "Journal" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-serif text-xl tracking-[0.12em] text-foam"
          aria-label="Blue Border home"
        >
          Blue Border
        </Link>
        <nav className="flex items-center gap-1 text-sm text-mist">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 transition hover:text-foam"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
