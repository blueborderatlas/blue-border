export function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs uppercase tracking-[0.2em] text-sand">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-4xl leading-tight text-foam sm:text-5xl">
        {title}
      </h2>
      {copy ? <p className="mt-4 text-base leading-7 text-mist">{copy}</p> : null}
    </div>
  );
}
