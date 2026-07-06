export default function SyrupDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full h-16 md:h-20 overflow-hidden ${flip ? "rotate-180" : ""}`}
    >
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <path
          d="M0,20 C150,60 250,0 400,25 C550,50 650,0 800,30 C950,55 1050,10 1200,25 L1200,0 L0,0 Z"
          fill="#2A1F17"
        />
        <path
          d="M0,45 C180,15 320,70 480,40 C620,15 760,55 920,35 C1040,20 1120,45 1200,35"
          fill="none"
          stroke="#D4A24C"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* قطرات شراب متساقطة */}
        {[120, 340, 560, 780, 1000].map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={i % 2 === 0 ? 52 : 38}
            r={i % 2 === 0 ? 4 : 3}
            fill="#D4A24C"
            opacity="0.85"
          />
        ))}
      </svg>
    </div>
  );
}
