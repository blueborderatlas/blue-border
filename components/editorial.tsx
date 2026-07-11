import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import type { TrustStatus } from "@/lib/recommendations";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="blue-eyebrow">{children}</p>;
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
      <Link href={href} className="blue-text-link">
        {children} <ArrowUpRight size={15} aria-hidden="true" />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={variant === "solid" ? "blue-button-solid" : "blue-button"}
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
    <section className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8 sm:pt-36 lg:pb-28 lg:pt-44">
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
        <h1 className="blue-h1 mt-5 max-w-5xl">{title}</h1>
        {copy ? <p className="blue-body-lg mt-7 max-w-3xl">{copy}</p> : null}
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
      className={`blue-card blue-card-hover group relative flex bg-tide ${
        large ? "min-h-[72vh]" : "min-h-[28rem]"
      }`}
    >
      <img
        src={image}
        alt=""
        className="blue-media-img absolute inset-0"
        loading="lazy"
      />
      <div className="blue-overlay-bottom" />
      <div className="relative mt-auto w-full p-6 sm:p-8">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2
          className={`mt-4 font-serif leading-tight text-foam transition duration-300 ease-blue group-hover:text-sand ${
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
        {meta ? <p className="blue-caption mt-7">{meta}</p> : null}
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
    <div className="mb-12 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.02] text-foam sm:text-6xl lg:text-7xl">
          {title}
        </h2>
        {copy ? <p className="blue-body mt-5 max-w-2xl">{copy}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

const trustBadgeStyles: Record<TrustStatus, string> = {
  Recommended: "border-sky-200/25 bg-sky-200/10",
  Verified: "border-emerald-200/25 bg-emerald-200/10",
  "Under Review": "border-amber-200/30 bg-amber-200/10",
  Paused: "border-rose-200/25 bg-rose-200/10",
};

export function TrustBadge({ status }: { status: TrustStatus }) {
  return (
    <span className={`blue-chip ${trustBadgeStyles[status]}`}>
      <BadgeCheck size={15} strokeWidth={1.6} aria-hidden="true" />
      {status}
    </span>
  );
}
