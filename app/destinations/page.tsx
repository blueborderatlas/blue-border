import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import {
  EditorialCard,
  EditorialLink,
  Eyebrow,
  PageHero,
  SectionIntro,
} from "@/components/editorial";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "A quiet Blue Border archive of coastal regions, islands and seaside towns across Europe and nearby seas.",
};

const destinationGroups = [
  {
    name: "Dahab",
    slug: "dahab",
    copy: "Red Sea diving, slow local routines and practical trust notes around a compact desert-coast town.",
    image: "/images/ai/dahab-diving/DJI_20260626_193515_Edit_Composited_Photo.jpg",
    status: "Live",
  },
  {
    name: "Europe",
    slug: "europe",
    copy: "Historic cities, regional stays and independent routes across familiar and overlooked corners.",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1800&q=82",
    status: "Growing",
  },
  {
    name: "China",
    slug: "china",
    copy: "Local context for domestic travel, city life, food, stays and slower regional journeys.",
    image:
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1800&q=82",
    status: "Coming soon",
  },
  {
    name: "Japan",
    slug: "japan",
    copy: "Calm neighborhoods, practical routes, small businesses and travel notes beyond first impressions.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=82",
    status: "Coming soon",
  },
  {
    name: "Southeast Asia",
    slug: "southeast-asia",
    copy: "Warm-weather bases, local operators, transport notes and independent travel planning.",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1800&q=82",
    status: "Coming soon",
  },
  {
    name: "Middle East",
    slug: "middle-east",
    copy: "Cities, desert routes, coastal stops and trusted local connections for curious travelers.",
    image:
      "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=1800&q=82",
    status: "Growing",
  },
  {
    name: "Islands",
    slug: "islands",
    copy: "Island bases, local stays, practical routes and slower travel between sea and city.",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=82",
    status: "Growing",
  },
  {
    name: "Remote Places",
    slug: "remote-places",
    copy: "Farther routes for long-term travelers, open landscapes and rare local knowledge.",
    image:
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1800&q=82",
    status: "Coming soon",
  },
];

const destinationStructure = [
  "Overview",
  "Places",
  "Guides",
  "Journal",
  "Local businesses",
  "Travel planning",
  "Accommodation",
  "Transportation",
];

export default function DestinationsPage() {
  const [featuredDestination, ...secondaryDestinations] = destinationGroups;

  return (
    <main>
      <PageHero
        eyebrow="Destinations"
        title="The world, edited for trust."
        copy="Start with a place. Move through local recommendations, practical guides and field notes without losing the human context."
        image={featuredDestination.image}
      />

      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Now live"
            title="Begin with Dahab."
            copy="Blue grows destination by destination. Dahab is the first complete local layer."
            action={
              <EditorialLink href="/destinations/dahab">
                Open Dahab
              </EditorialLink>
            }
          />

          <EditorialCard
            href={`/destinations/${featuredDestination.slug}`}
            image={featuredDestination.image}
            eyebrow={featuredDestination.status}
            title={featuredDestination.name}
            copy={featuredDestination.copy}
            meta="Destination guide"
            large
          />
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Explore next"
            title="A platform built to expand."
            copy="Each card can grow from a quiet destination note into a full local trust network."
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {secondaryDestinations.map((destination, index) => (
              <EditorialCard
                key={destination.name}
                href={`/destinations/${destination.slug}`}
                image={destination.image}
                eyebrow={destination.status}
                title={destination.name}
                copy={destination.copy}
                meta={index % 2 === 0 ? "Open guide" : "Browse places"}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <Eyebrow>How browsing works</Eyebrow>
            <h2 className="mt-5 font-serif text-5xl leading-none text-foam sm:text-7xl">
              Place first. Details when needed.
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {destinationStructure.map((item) => (
              <Link
                key={item}
                href="/destinations/dahab"
                className="group flex min-h-32 items-end justify-between gap-6 bg-deep p-6 transition hover:bg-white/[0.045]"
              >
                <div>
                  <MapPin
                    className="mb-5 text-sand"
                    size={18}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <p className="font-serif text-3xl leading-tight text-foam group-hover:text-sand">
                    {item}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
