import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Blue Border, a personal coastal travel journal for hidden European islands, slow travel, low-cost routes and quiet seaside towns.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="relative flex min-h-[72svh] items-end overflow-hidden px-5 pb-14 pt-32 sm:px-8">
        <img
          src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2200&q=85"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,17,31,0.92),rgba(6,17,31,0.42)),linear-gradient(0deg,rgba(6,17,31,0.95),transparent_45%)]" />
        <div className="relative mx-auto w-full max-w-7xl">
          <p className="text-xs uppercase tracking-[0.24em] text-sand">About</p>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl leading-tight text-foam sm:text-7xl">
            A personal journal for the quieter edges of Europe.
          </h1>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <p className="text-xs uppercase tracking-[0.2em] text-sand">
            Coastal notes
          </p>
          <div className="max-w-4xl text-lg leading-9 text-mist">
            <p>
              Blue Border is a personal coastal travel journal about hidden
              islands, slow travel, low-cost routes, fishing spots and quiet
              seaside towns across Europe.
            </p>
            <p className="mt-7">
              It is written for people living in Europe who want trips that feel
              close to the water without needing a luxury budget: students,
              remote workers, weekend wanderers, anglers, ferry people and
              anyone who would rather spend a late afternoon near a harbor than
              stand in a packed viewpoint queue.
            </p>
            <p className="mt-7">
              The focus is practical and sensory at the same time: real water
              temperature, wind, transport, where to sleep, what the town feels
              like after sunset, whether the shore looks fishable, and whether a
              cheap route is actually worth the early alarm.
            </p>
            <Link
              href="/journal"
              className="mt-10 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-foam transition hover:text-sand"
            >
              Open the journal <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
