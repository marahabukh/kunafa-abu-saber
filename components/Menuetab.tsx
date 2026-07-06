"use client";

import { useState } from "react";

type MenuItem = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_featured: boolean;
};

type Category = {
  id: string;
  name: string;
  menu_items: MenuItem[];
};

export default function MenuTabs({ categories }: { categories: Category[] }) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");

  const activeCategory = categories.find((c) => c.id === activeId);
  const items = activeCategory?.menu_items ?? [];
  const featured = items.filter((i) => i.is_featured && i.image_url);
  const regular = items.filter((i) => !(i.is_featured && i.image_url));

  return (
    <div>
      {/* أزرار التبويبات */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveId(cat.id)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
              activeId === cat.id
                ? "bg-copper text-base"
                : "bg-surface text-cream/60 hover:text-cream border border-white/10"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* الأصناف المميزة — بطاقات كبيرة بصور */}
      {featured.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          {featured.map((item) => (
            <div
              key={item.id}
              className="relative rounded-2xl overflow-hidden border border-gold/30 aspect-[4/3] group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image_url!}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <span className="absolute top-3 right-3 bg-gold text-base text-xs font-bold px-3 py-1 rounded-full">
                مميز
              </span>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-display text-2xl text-cream mb-1">
                      {item.name}
                    </h4>
                    {item.description && (
                      <p className="text-cream/70 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <span className="text-gold font-bold text-lg whitespace-nowrap">
                    {item.price} ₪
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* باقي الأصناف — بطاقات عادية بدون صور */}
      {regular.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-6">
          {regular.map((item) => (
            <div
              key={item.id}
              className="bg-surface rounded-2xl p-6 border border-white/5 hover:border-gold/40 transition-colors flex items-start justify-between gap-4"
            >
              <div>
                <h4 className="font-display text-2xl text-cream mb-1">
                  {item.name}
                </h4>
                {item.description && (
                  <p className="text-cream/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
              <span className="text-gold font-bold text-lg whitespace-nowrap">
                {item.price} ₪
              </span>
            </div>
          ))}
        </div>
      )}

      {items.length === 0 && (
        <p className="text-cream/40 text-sm text-center">
          ما في أصناف بهاد القسم بعد.
        </p>
      )}
    </div>
  );
}