import { EditorialCard, PageHero, SectionIntro } from "@/components/editorial";

const guideCategories = [
  {
    title: "Travel Planning",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=82",
  },
  {
    title: "Accommodation",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=82",
  },
  {
    title: "Transportation",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=82",
  },
  {
    title: "Local Tips",
    image:
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1600&q=82",
  },
];

export default function GuidesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Guides"
        title="Practical knowledge, quietly edited."
        copy="Planning notes for travelers who want fewer surprises and better local decisions."
        image={guideCategories[0].image}
      />

      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Coming soon"
            title="Guides will grow with each destination."
            copy="For now, these are the editorial shelves Blue will fill first."
          />

          <div className="grid gap-5 md:grid-cols-2">
            {guideCategories.map((category) => (
              <EditorialCard
                key={category.title}
                href="/guides"
                image={category.image}
                eyebrow="Guide shelf"
                title={category.title}
                meta="Coming soon"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
