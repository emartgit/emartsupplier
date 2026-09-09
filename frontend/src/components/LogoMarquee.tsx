interface Brand {
  src: string;
  alt: string;
  /** Optional per-logo height tweak; defaults to h-12 md:h-14 */
  heightClass?: string;
}

const BRANDS: Brand[] = [
  { src: '/logos/SUPERMARKET.png', alt: 'Emart Supermarket', heightClass: 'h-10 md:h-12' },
  { src: '/logos/xpress-02.png',   alt: 'Emart Xpress',      heightClass: 'h-10 md:h-12' },
  { src: '/logos/GROUP.png',       alt: 'Emart Group',       heightClass: 'h-10 md:h-12' },
  { src: '/logos/GOCELI.png',      alt: 'Goceli' },
  { src: '/logos/DEQLO.png',       alt: 'Deqlo' },
  { src: '/logos/DIY.png',         alt: 'Emart DIY' },
];

export default function LogoMarquee() {
  const items = [...BRANDS, ...BRANDS]; // duplicate for seamless loop
  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className="marquee flex gap-16 items-center whitespace-nowrap">
        {items.map((brand, i) => (
          <img
            key={i}
            src={brand.src}
            alt={brand.alt}
            className={`${brand.heightClass ?? 'h-12 md:h-14'} w-auto object-contain shrink-0 opacity-80 hover:opacity-100 transition-opacity`}
            draggable={false}
          />
        ))}
      </div>
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white dark:from-gray-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white dark:from-gray-950 to-transparent" />
    </div>
  );
}
