"use client";

import { useState } from "react";

export function ImageGallery({
  images,
  label,
  fit = "cover",
}: {
  images: string[];
  label: string;
  fit?: "cover" | "contain";
}) {
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const visibleImages = images.filter((image) => !failedImages.includes(image));

  if (visibleImages.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-white/10 bg-ink px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-end justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.2em] text-sand">
            Photo notes
          </p>
          <p className="text-xs text-mist">{visibleImages.length} images</p>
        </div>
        <div
          className="flex snap-x gap-4 overflow-x-auto pb-3 [-webkit-overflow-scrolling:touch]"
          aria-label={label}
        >
          {visibleImages.map((image, index) => (
            <figure
              key={image}
              className="h-[260px] w-[78vw] max-w-[460px] shrink-0 snap-start overflow-hidden rounded-[6px] border border-white/10 bg-deep sm:h-[360px] sm:w-[560px] sm:max-w-none lg:w-[640px]"
            >
              <img
                src={image}
                alt=""
                loading={index === 0 ? "eager" : "lazy"}
                className={`h-full w-full object-center ${
                  fit === "contain" ? "object-contain" : "object-cover"
                }`}
                onError={() =>
                  setFailedImages((current) =>
                    current.includes(image) ? current : [...current, image],
                  )
                }
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
