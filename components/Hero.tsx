export default function Hero() {
  return (
    <section id="top" className="relative px-6 pt-16 pb-10 md:pt-24 md:pb-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block text-gold text-sm tracking-widest mb-4 border border-gold/40 rounded-full px-4 py-1">
            نابلس، فلسطين
          </span>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.15] text-cream mb-6">
            كنافة تُصنع كل صباح،
            <br />
            <span className="text-copper">مش كل فترة</span>
          </h1>
          <p className="text-cream/70 text-lg leading-relaxed mb-8 max-w-md">
            وصفة جدّنا نفسها، جبنة طازجة وقطر بلدي وسمن حلال. من فرننا لطاولتك
            بربع ساعة.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#menu"
              className="rounded-full bg-copper hover:bg-gold transition-colors text-base font-bold px-7 py-3"
            >
              شوف القائمة
            </a>
            <a
              href="https://wa.me/970000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-cream/30 hover:border-gold hover:text-gold transition-colors px-7 py-3"
            >
              اطلب الآن
            </a>
          </div>
        </div>

        {/* رسمة الكنافة الكبيرة */}
        <div className="relative flex justify-center">
          <svg viewBox="0 0 320 320" className="w-64 h-64 md:w-80 md:h-80">
            <ellipse cx="160" cy="270" rx="130" ry="18" fill="#332619" />
            <path d="M40,240 L60,140 C90,110 230,110 260,140 L280,240 Z" fill="#C97A3D" />
            <path
              d="M65,150 C100,125 220,125 255,150 L262,175 C220,150 100,150 58,175 Z"
              fill="#F2E8D8"
            />
            {Array.from({ length: 14 }).map((_, i) => (
              <circle
                key={i}
                cx={75 + i * 14}
                cy={135 - (i % 3) * 5}
                r="3.4"
                fill="#8FA86B"
              />
            ))}
            {/* خط قطر يقطر */}
            <path
              d="M160,95 C150,115 170,125 160,140"
              stroke="#D4A24C"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
