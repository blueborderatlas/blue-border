export function ImageGallery({
  images,
  label,
}: {
  images: string[];
  label: string;
}) {
  if (images.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-white/10 bg-ink px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-end justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.2em] text-sand">
            Photo notes
          </p>
          <p className="text-xs text-mist">{images.length} images</p>
        </div>
        <div
          className="flex snap-x gap-4 overflow-x-auto pb-3 [-webkit-overflow-scrolling:touch]"
          aria-label={label}
        >
          {images.map((image, index) => (
            <figure
              key={image}
              className="min-w-[82vw] snap-start border border-white/10 bg-deep sm:min-w-[520px] lg:min-w-[620px]"
            >
              <div className="aspect-[4/3] w-full">
                <img
                  src={image}
                  alt=""
                  loading={index === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-contain"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
