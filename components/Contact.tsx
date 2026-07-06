import { createClient } from "@/lib/supabase/server";

export default async function Contact() {
  const supabase = createClient();

  const { data: settings } = await supabase
    .from("site_settings")
    .select("phone, whatsapp, address, hours, map_embed_url")
    .eq("id", 1)
    .single();

  const whatsappLink = settings?.whatsapp
    ? `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`
    : "https://wa.me/970000000000";

  const mapSrc =
    settings?.map_embed_url ||
    "https://maps.google.com/maps?q=Nablus&t=&z=13&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="contact" className="px-6 py-16">
      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-10">
        <div>
          <h2 className="font-display text-4xl text-copper mb-6">تواصل معنا</h2>
          <ul className="space-y-3 text-cream/75">
            <li>📍 {settings?.address || "شارع البلدة القديمة، نابلس"}</li>
            <li>🕐 {settings?.hours || "يوميًا من ٣ عصرًا حتى ١١ مساءً"}</li>
            <li dir="ltr" className="text-right">
              📞 {settings?.phone || "059-000-0000"}
            </li>
          </ul>
          
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 rounded-full bg-pistachio text-base font-bold px-7 py-3 hover:brightness-110 transition"
          >
            راسلنا عالواتساب
          </a>
        </div>
        <div className="rounded-2xl overflow-hidden border border-white/10 min-h-[220px]">
          <iframe
            title="الموقع على الخريطة"
            className="w-full h-full min-h-[220px]"
            loading="lazy"
            src={mapSrc}
          />
        </div>
      </div>
    </section>
  );
}