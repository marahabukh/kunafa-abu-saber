import { createClient } from "@/lib/supabase/server";

type GalleryItem = {
  id: string;
  label: string;
  image_url: string;
};

const placeholders = [
  { label: "الفرن الأصلي", color: "#C97A3D" },
  { label: "جبنة طازجة يوميًا", color: "#F2E8D8" },
  { label: "رشة فستق حلبي", color: "#8FA86B" },
  { label: "قطر بلدي مغلي", color: "#D4A24C" },
];

export default async function Gallery() {
  const supabase = createClient();

  const { data: items } = await supabase
    .from("gallery_items")
    .select("id, label, image_url")
    .order("sort_order", { ascending: true })
    .returns<GalleryItem[]>();

  const hasRealPhotos = !!items?.length;

  return (
    <section id="gallery" className="px-6 py-16 bg-surface/40">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-4xl text-copper text-center mb-4">
          لمحات من المطبخ
        </h2>
        {!hasRealPhotos && (
          <p className="text-center text-cream/60 mb-12">
            (صور تجريبية بس للتوضيح — ضيفي صور حقيقية من لوحة التحكم)
          </p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {hasRealPhotos
            ? items!.map((item) => (
                <div
                  key={item.id}
                  className="aspect-square rounded-2xl overflow-hidden border border-white/10 relative group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image_url}
                    alt={item.label}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-black/50 text-cream text-sm p-2">
                    {item.label}
                  </span>
                </div>
              ))
            : placeholders.map((s) => (
                <div
                  key={s.label}
                  className="aspect-square rounded-2xl flex items-end p-4 border border-white/10"
                  style={{
                    background: `linear-gradient(160deg, ${s.color}33, ${s.color}11)`,
                  }}
                >
                  <span className="text-cream/80 text-sm">{s.label}</span>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}