import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import hero from "@/assets/bike-hero.jpg";
import bike1 from "@/assets/bike-1.jpg";
import bike2 from "@/assets/bike-2.jpg";
import bike3 from "@/assets/bike-3.jpg";
import bike4 from "@/assets/bike-4.jpg";
import bike5 from "@/assets/bike-5.jpg";
import bike6 from "@/assets/bike-6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bike Images Gallery | Moto & Cycle Photo Collection" },
      {
        name: "description",
        content:
          "Browse a curated gallery of high-resolution bike images: superbikes, cafe racers, mountain bikes, road bicycles and city e-bikes.",
      },
      { property: "og:title", content: "Bike Images Gallery" },
      {
        property: "og:description",
        content:
          "A curated collection of high-resolution motorcycle and bicycle photography, filterable by category.",
      },
    ],
  }),
  component: BikeGalleryPage,
});

type Category = "Motorcycle" | "Bicycle" | "Detail";

type Bike = {
  src: string;
  title: string;
  caption: string;
  category: Category;
  span?: boolean;
};

const bikes: Bike[] = [
  {
    src: bike1,
    title: "Midnight Apex",
    caption: "Matte black superbike on wet asphalt",
    category: "Motorcycle",
    span: true,
  },
  {
    src: bike2,
    title: "Coast Runner",
    caption: "Cafe racer at golden hour",
    category: "Motorcycle",
  },
  {
    src: bike3,
    title: "Dust Line",
    caption: "Trail jump through backlit pines",
    category: "Bicycle",
  },
  {
    src: bike4,
    title: "Carbon Study",
    caption: "Road racer in studio rim light",
    category: "Bicycle",
    span: true,
  },
  {
    src: bike5,
    title: "City Volt",
    caption: "Electric city bike against painted walls",
    category: "Bicycle",
  },
  {
    src: bike6,
    title: "Heat & Metal",
    caption: "Engine and exhaust close-up",
    category: "Detail",
  },
];

const filters = ["All", "Motorcycle", "Bicycle", "Detail"] as const;

function BikeGalleryPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [active, setActive] = useState<Bike | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? bikes : bikes.filter((b) => b.category === filter)),
    [filter],
  );

  return (
    <main className="min-h-screen bg-background">
      <section className="relative isolate overflow-hidden">
        <img
          src={hero}
          alt="Motorcyclist riding a desert highway at dusk"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="relative mx-auto flex min-h-[68vh] max-w-6xl flex-col justify-end px-6 pb-16 pt-28">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
            Gallery
          </p>
          <h1 className="mt-4 max-w-3xl text-6xl leading-[0.92] text-foreground sm:text-8xl">
            Bike <span className="text-gradient-ember">Images</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Machines, roads and details — a curated set of high-resolution bike
            photography. Tap any frame to view it full size.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="sticky top-0 z-10 -mx-6 mb-10 flex flex-wrap gap-2 bg-background/85 px-6 py-4 backdrop-blur">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest transition-colors ${
                filter === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((bike) => (
            <figure
              key={bike.title}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-lift transition-transform duration-500 hover:-translate-y-1 hover:shadow-glow ${
                bike.span ? "sm:col-span-2" : ""
              }`}
              onClick={() => setActive(bike)}
            >
              <img
                src={bike.src}
                alt={bike.caption}
                width={1280}
                height={960}
                loading="lazy"
                className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-card via-card/80 to-transparent p-5 pt-14">
                <figcaption>
                  <h3 className="text-2xl text-foreground">{bike.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {bike.caption}
                  </p>
                </figcaption>
              </div>
              <span className="absolute right-4 top-4 rounded-full bg-background/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary backdrop-blur">
                {bike.category}
              </span>
            </figure>
          ))}
        </div>
      </section>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/92 p-6 backdrop-blur"
        >
          <figure className="max-h-full w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-lift">
            <img
              src={active.src}
              alt={active.caption}
              className="max-h-[75vh] w-full object-contain"
            />
            <figcaption className="flex items-center justify-between gap-4 px-6 py-4">
              <div>
                <h2 className="text-2xl text-foreground">{active.title}</h2>
                <p className="text-sm text-muted-foreground">{active.caption}</p>
              </div>
              <button
                onClick={() => setActive(null)}
                className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                Close
              </button>
            </figcaption>
          </figure>
        </div>
      )}
    </main>
  );
}
