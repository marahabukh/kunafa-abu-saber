import KunafaMark from "./KunafaMark";

const links = [
  { href: "#about", label: "من نحن" },
  { href: "#menu", label: "القائمة" },
  { href: "#gallery", label: "لمحات" },
  { href: "#contact", label: "تواصل" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-base/90 backdrop-blur border-b border-white/5">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3 group">
          <KunafaMark className="w-9 h-9" />
          <span className="font-display text-2xl text-copper group-hover:text-gold transition-colors">
            أبو صابر
          </span>
        </a>
        <ul className="hidden md:flex items-center gap-8 text-sm text-cream/80">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-gold transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="https://wa.me/970000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-copper hover:bg-gold transition-colors text-base font-bold px-5 py-2 text-sm"
        >
          اطلب عالواتساب
        </a>
      </nav>
    </header>
  );
}
