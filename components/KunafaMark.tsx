export default function KunafaMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {/* طبق */}
      <ellipse cx="50" cy="78" rx="42" ry="8" fill="#332619" />
      {/* قطعة كنافة */}
      <path
        d="M12,72 L20,40 C30,30 70,30 80,40 L88,72 Z"
        fill="#C97A3D"
      />
      {/* طبقة الجبنة */}
      <path d="M22,42 C35,34 65,34 78,42 L80,50 C65,42 35,42 20,50 Z" fill="#F2E8D8" />
      {/* رشة فستق */}
      {[30, 40, 50, 60, 70].map((x, i) => (
        <circle key={i} cx={x} cy={38 - (i % 2) * 3} r="2.2" fill="#8FA86B" />
      ))}
    </svg>
  );
}
