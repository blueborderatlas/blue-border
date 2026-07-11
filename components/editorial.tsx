import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.24em] text-sand">{children}</p>
  );
}

export function EditorialLink({
  href,
  children,
  variant = "outline",
}: {
  href: string;
  children: ReactNode;
  variant?: "outline" | "solid" | "text";
}) {
  if (variant === "text") {
    return (
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-foam transition hover:text-sand"
      >
        {children} <ArrowUpRight size={15} aria-hidden="true" />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={
        variant === "solid"
          ? "inline-flex min-h-12 items-center gap-2 bg-foam px-5 text-sm uppercase tracking-[0.16em] text-ink transition hover:bg-sand"
          : "inline-flex min-h-12 items-center gap-2 border border-foam/60 px-5 text-sm uppercase tracking-[0.16em] text-foam transition hover:border-sand hover:text-sand"
      }
    >
      {children} <ArrowUpRight size={16} aria-hidden="true" />
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  copy,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-36 sm:px-8 lg:pb-28 lg:pt-44">
      {image ? (
        <>
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-[0.28]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,17,31,0.96),rgba(6,17,31,0.78),rgba(6,17,31,0.55)),linear-gradient(0deg,#06111f,rgba(6,17,31,0.08)_46%,#06111f)]" />
        </>
      ) : null}
      <div className="relative mx-auto max-w-7xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-5xl font-serif text-6xl leading-[0.96] text-foam sm:text-8xl">
          {title}
        </h1>
        {copy ? (
          <p className="mt-7 max-w-3xl text-lg leading-8 text-mist sm:text-xl sm:leading-9">
            {copy}
          </p>
        ) : null}
        {children ? <div className="mt-9">{children}</div> : null}
      </div>
    </section>
  );
}

export function EditorialCard({
  href,
  image,
  eyebrow,
  title,
  copy,
  meta,
  large = false,
}: {
  href: string;
  image: string;
  eyebrow: string;
  title: string;
  copy?: string;
  meta?: string;
  large?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative flex overflow-hidden bg-tide shadow-coast ${
        large ? "min-h-[72vh]" : "min-h-[28rem]"
      }`}
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-[0.76] transition duration-700 group-hover:scale-[1.035] group-hover:opacity-95"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/24 to-transparent" />
      <div className="relative mt-auto w-full p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-sand">
          {eyebrow}
        </p>
        <h2
          className={`mt-4 font-serif leading-tight text-foam transition group-hover:text-sand ${
            large ? "text-5xl sm:text-7xl" : "text-4xl sm:text-5xl"
          }`}
        >
          {title}
        </h2>
        {copy ? (
          <p className="mt-5 max-w-2xl text-sm leading-7 text-foam/78">
            {copy}
          </p>
        ) : null}
        {meta ? (
          <p className="mt-7 text-xs uppercase tracking-[0.16em] text-mist">
            {meta}
          </p>
        ) : null}
      </div>
    </Link>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  copy,
  action,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-5 max-w-4xl font-serif text-5xl leading-none text-foam sm:text-7xl">
          {title}
        </h2>
        {copy ? (
          <p className="mt-5 max-w-2xl text-base leading-8 text-mist">
            {copy}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
