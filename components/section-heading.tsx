import { Eyebrow } from "@/components/editorial";

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
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="blue-h2 mt-4">
        {title}
      </h2>
      {copy ? <p className="blue-body mt-4">{copy}</p> : null}
    </div>
  );
}
