const guideCategories = [
  "Travel Planning",
  "Accommodation",
  "Transportation",
  "Local Tips",
];

export default function GuidesPage() {
  return (
    <main className="px-5 pb-24 pt-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.24em] text-sand">
            Guides
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-tight text-foam sm:text-7xl">
            Editorial guides for independent travelers.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-mist">
            Practical notes for planning, moving, staying and reading local
            situations with more confidence.
          </p>
        </section>

        <section className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {guideCategories.map((category) => (
            <div key={category} className="bg-deep p-6 sm:p-7">
              <h2 className="font-serif text-2xl text-foam">{category}</h2>
              <p className="mt-4 text-sm leading-7 text-mist">
                Coming soon.
              </p>
            </div>
          ))}
        </section>

        <p className="mt-10 text-sm leading-7 text-mist">
          More editorial guides are coming soon.
        </p>
      </div>
    </main>
  );
}
