import { createClient } from "@/lib/supabase/server";
import MenuTabs from "@/components/Menuetab";

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

export default async function Menu() {
  const supabase = createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, menu_items(id, name, description, price, image_url, is_featured)")
    .order("sort_order", { ascending: true })
    .returns<Category[]>();

  return (
    <section id="menu" className="px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-4xl text-copper text-center mb-12">
          القائمة
        </h2>

        {!categories?.length ? (
          <p className="text-center text-cream/50">
            القائمة رح تظهر هون أول ما تنضاف أصناف من لوحة التحكم.
          </p>
        ) : (
          <MenuTabs categories={categories} />
        )}
      </div>
    </section>
  );
}