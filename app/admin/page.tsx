import { createClient } from "@/lib/supabase/server";
import SubmitButton from "@/components/SubmitButton";
import ResettableForm from "@/components/resetform";
import {
  addCategory,
  deleteCategory,
  addItem,
  updateItem,
  deleteItem,
  addGalleryItem,
  deleteGalleryItem,
  updateSettings,
  signOut,
} from "./actions";

export const dynamic = "force-dynamic";
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

export default async function AdminPage() {
  const supabase = createClient();

  const { data: categories } = await supabase
    .from("categories")
.select("id, name, menu_items(id, name, description, price, image_url, is_featured)")    .order("sort_order", { ascending: true })
    .returns<Category[]>();

  const { data: galleryItems } = await supabase
    .from("gallery_items")
    .select("id, label, image_url")
    .order("sort_order", { ascending: true });

  const { data: settings } = await supabase
    .from("site_settings")
    .select("phone, whatsapp, address, hours, map_embed_url")
    .eq("id", 1)
    .single();

  return (
    <main className="min-h-screen bg-base px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-display text-4xl text-copper">لوحة التحكم</h1>
          <form action={signOut}>
            <button className="text-sm text-cream/60 hover:text-gold border border-white/10 rounded-full px-4 py-2">
              تسجيل خروج
            </button>
          </form>
        </div>

        {/* إضافة كاتيغوري جديدة */}
        <section className="bg-surface rounded-2xl p-6 border border-white/10 mb-10">
          <h2 className="font-display text-2xl text-cream mb-4">
            إضافة قسم جديد
          </h2>
          <ResettableForm action={addCategory} className="flex gap-3">
            <input
              name="name"
              required
              placeholder="مثال: حلويات شرقية"
              className="flex-1 rounded-lg bg-base border border-white/10 px-4 py-2 text-cream focus:border-gold outline-none"
            />
            <SubmitButton
              pendingText="جاري الإضافة..."
              className="rounded-full bg-copper hover:bg-gold transition-colors font-bold px-6 py-2 text-base whitespace-nowrap"
            >
              إضافة
            </SubmitButton>
          </ResettableForm>
        </section>

        {/* كل قسم مطوي (accordion) مع أصنافه */}
        <div className="space-y-4">
          {categories?.map((cat) => (
            <details
              key={cat.id}
              className="bg-surface rounded-2xl border border-white/10 group"
            >
              <summary className="cursor-pointer select-none list-none px-6 py-4 flex items-center justify-between">
                <span className="font-display text-2xl text-copper">
                  {cat.name}
                  <span className="text-cream/40 text-sm mr-3">
                    ({cat.menu_items?.length ?? 0} صنف)
                  </span>
                </span>
                <span className="text-cream/50 text-sm group-open:rotate-180 transition-transform">
                  ▾
                </span>
              </summary>

              <div className="px-6 pb-6">
                <div className="flex justify-end mb-4">
                  <form action={deleteCategory.bind(null, cat.id)}>
                    <button className="text-red-400/80 hover:text-red-400 text-sm">
                      حذف القسم بالكامل
                    </button>
                  </form>
                </div>

                <div className="space-y-3 mb-5">
                  {cat.menu_items?.map((item) => (
                   <form
                    key={item.id}
                    action={updateItem}
                    className="grid sm:grid-cols-2 gap-2 items-center bg-base/60 rounded-xl p-3"
                  >
                    <input type="hidden" name="id" value={item.id} />
                    <input
                      name="name"
                      defaultValue={item.name}
                      placeholder="اسم الصنف"
                      className="rounded-lg bg-base border border-white/10 px-3 py-2 text-sm text-cream"
                    />
                    <input
                      name="description"
                      defaultValue={item.description ?? ""}
                      placeholder="وصف مختصر"
                      className="rounded-lg bg-base border border-white/10 px-3 py-2 text-sm text-cream"
                    />
                    <input
                      name="price"
                      type="number"
                      step="0.01"
                      defaultValue={item.price}
                      placeholder="السعر"
                      className="rounded-lg bg-base border border-white/10 px-3 py-2 text-sm text-cream"
                    />
                    <input
                      name="image_url"
                      type="url"
                      defaultValue={item.image_url ?? ""}
                      placeholder="رابط صورة الصنف (اختياري)"
                      dir="ltr"
                      className="rounded-lg bg-base border border-white/10 px-3 py-2 text-sm text-cream"
                    />
                    <label className="flex items-center gap-2 text-sm text-cream/70 sm:col-span-2">
                      <input
                        type="checkbox"
                        name="is_featured"
                        defaultChecked={item.is_featured}
                        className="accent-copper"
                      />
                      صنف مميز (يظهر بصورة كبيرة بالواجهة)
                    </label>
                    <div className="flex gap-3 sm:col-span-2">
                      <button className="text-gold hover:text-copper text-sm whitespace-nowrap">
                        حفظ
                      </button>
                      <button
                        formAction={deleteItem.bind(null, item.id)}
                        className="text-red-400/80 hover:text-red-400 text-sm whitespace-nowrap"
                      >
                        حذف
                      </button>
                    </div>
                  </form>
                  ))}
                  {!cat.menu_items?.length && (
                    <p className="text-cream/40 text-sm">
                      ما في أصناف بهاد القسم بعد.
                    </p>
                  )}
                </div>

                {/* إضافة صنف جديد لهاد القسم */}
                <ResettableForm
                  action={addItem}
                  className="grid sm:grid-cols-[1fr_1fr_100px_auto] gap-2"
                >
                  <input type="hidden" name="category_id" value={cat.id} />
                  <input
                    name="name"
                    required
                    placeholder="اسم الصنف"
                    className="rounded-lg bg-base border border-white/10 px-3 py-2 text-sm text-cream"
                  />
                  <input
                    name="description"
                    placeholder="وصف مختصر"
                    className="rounded-lg bg-base border border-white/10 px-3 py-2 text-sm text-cream"
                  />
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="السعر"
                    required
                    className="rounded-lg bg-base border border-white/10 px-3 py-2 text-sm text-cream"
                  />
                  <SubmitButton
                    pendingText="جاري الإضافة..."
                    className="rounded-lg bg-pistachio font-bold text-base text-sm px-4 py-2 whitespace-nowrap"
                  >
                    + إضافة صنف
                  </SubmitButton>
                </ResettableForm>
              </div>
            </details>
          ))}
        </div>

        {/* قسم إدارة لمحات المطبخ (الغاليري) */}
        <section className="bg-surface rounded-2xl p-6 border border-white/10 mt-8">
          <h2 className="font-display text-2xl text-copper mb-5">
            لمحات من المطبخ
          </h2>

          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {galleryItems?.map((g) => (
              <div
                key={g.id}
                className="flex items-center gap-3 bg-base/60 rounded-xl p-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={g.image_url}
                  alt={g.label}
                  className="w-14 h-14 rounded-lg object-cover border border-white/10 shrink-0"
                />
                <span className="flex-1 text-sm text-cream/80 truncate">
                  {g.label}
                </span>
                <form action={deleteGalleryItem.bind(null, g.id)}>
                  <button className="text-red-400/80 hover:text-red-400 text-sm whitespace-nowrap">
                    حذف
                  </button>
                </form>
              </div>
            ))}
            {!galleryItems?.length && (
              <p className="text-cream/40 text-sm sm:col-span-2">
                ما في صور مضافة بعد.
              </p>
            )}
          </div>

          <ResettableForm
            action={addGalleryItem}
            className="grid sm:grid-cols-[1fr_1.5fr_auto] gap-2"
          >
            <input
              name="label"
              required
              placeholder="وصف الصورة (مثال: الفرن الأصلي)"
              className="rounded-lg bg-base border border-white/10 px-3 py-2 text-sm text-cream"
            />
            <input
              name="image_url"
              required
              type="url"
              placeholder="رابط الصورة (ارفعيها على imgur.com مثلًا وانسخي الرابط)"
              className="rounded-lg bg-base border border-white/10 px-3 py-2 text-sm text-cream"
              dir="ltr"
            />
            <SubmitButton
              pendingText="جاري الإضافة..."
              className="rounded-lg bg-pistachio font-bold text-base text-sm px-4 py-2 whitespace-nowrap"
            >
              + إضافة صورة
            </SubmitButton>
          </ResettableForm>
        </section>

        {/* إعدادات الموقع والتواصل */}
        <section className="bg-surface rounded-2xl p-6 border border-white/10 mt-8">
          <h2 className="font-display text-2xl text-copper mb-5">
            بيانات التواصل والموقع
          </h2>
          <form action={updateSettings} className="space-y-3">
            <input
              name="address"
              defaultValue={settings?.address ?? ""}
              placeholder="العنوان (مثال: شارع البلدة القديمة، نابلس)"
              className="w-full rounded-lg bg-base border border-white/10 px-3 py-2 text-sm text-cream"
            />
            <input
              name="hours"
              defaultValue={settings?.hours ?? ""}
              placeholder="أوقات الدوام (مثال: يوميًا ٣ عصرًا - ١١ مساءً)"
              className="w-full rounded-lg bg-base border border-white/10 px-3 py-2 text-sm text-cream"
            />
            <input
              name="phone"
              defaultValue={settings?.phone ?? ""}
              placeholder="رقم الهاتف (مثال: 059-000-0000)"
              dir="ltr"
              className="w-full rounded-lg bg-base border border-white/10 px-3 py-2 text-sm text-cream"
            />
            <input
              name="whatsapp"
              defaultValue={settings?.whatsapp ?? ""}
              placeholder="رقم واتساب مع كود الدولة بدون + (مثال: 970599000000)"
              dir="ltr"
              className="w-full rounded-lg bg-base border border-white/10 px-3 py-2 text-sm text-cream"
            />
            <textarea
              name="map_embed_url"
              defaultValue={settings?.map_embed_url ?? ""}
              placeholder="رابط الخريطة (Google Maps → Share → Embed a map، انسخي بس رابط src)"
              dir="ltr"
              rows={2}
              className="w-full rounded-lg bg-base border border-white/10 px-3 py-2 text-sm text-cream"
            />
            <SubmitButton
              pendingText="جاري الحفظ..."
              className="rounded-full bg-copper hover:bg-gold transition-colors font-bold px-6 py-2 text-base"
            >
              حفظ بيانات التواصل
            </SubmitButton>
          </form>
        </section>
      </div>
    </main>
  );
}