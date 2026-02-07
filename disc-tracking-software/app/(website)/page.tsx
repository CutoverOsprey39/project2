import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen pt-32 md:pt-48 lg:pt-60">
      {/* Subtle radial gradient overlay using palette colors */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(84,196,195,0.08),transparent_50%)] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pb-16 md:pb-28 px-5 sm:px-8 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 text-white">
            Track Every Throw.<br />
            Master Your <span className="text-[#54c4c3]">Bag</span>.
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10">
            The modern disc golf companion: find your discs, log throws with ease, analyze flight stats, and track performance over time.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link
              href="/signup"
              className="inline-block bg-[#54c4c3] text-black font-medium text-lg py-3.5 px-8 rounded-lg transition hover:bg-[#3daaa9] shadow-lg hover:shadow-xl"
            >
              Sign up for free
            </Link>

            <Link
              href="/demo"
              className="inline-block border border-[#456fb6] text-white font-medium text-lg py-3.5 px-8 rounded-lg transition hover:border-[#54c4c3] hover:text-[#54c4c3]"
            >
              Sign in
            </Link>
          </div>

          <p className="mt-10 text-sm text-white/60">
            Join hundreds of players already tracking their game
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 px-5 sm:px-8 md:px-12 lg:px-20 bg-[#223066]/30 backdrop-blur-sm">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-10 md:mb-12 text-[#54c4c3]">
          Core Features
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          <FeatureCard
            title="Disc Management"
            description="Add, remove, and organize your tracked discs."
            imageSrc="/bag.svg"
          />
          <FeatureCard
            title="Flight Stats"
            description="Analyse your throws with detailed flight data over time."
            imageSrc="/book.svg"
          />
          <FeatureCard
            title="Record Throws"
            description="Quickly log shots during rounds keeping a record of distance, velocity, and more."
            imageSrc="/record.svg"
          />
          <FeatureCard
            title="Disc Tracking"
            description="Find your discs with ease — track your lost discs."
            imageSrc="/Spyglass.svg"
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-24 px-5 sm:px-8 text-center bg-linear-to-t from-[#764d9f]/10 via-transparent to-transparent">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-[#54c4c3]">
          Ready to level up your disc golf game?
        </h2>
        <Link
          href="/signup"
          className="inline-block bg-[#54c4c3] text-black font-medium text-xl py-4 px-10 rounded-lg transition hover:bg-[#3daaa9] shadow-lg hover:shadow-xl"
        >
          Start Tracking Today
        </Link>
      </section>
    </div>
  );
}

// FeatureCard that displays images (SVGs or raster images)
function FeatureCard({
  title,
  description,
  imageSrc,
}: {
  title: string;
  description: string;
  imageSrc: string;   // path to your SVG or image file
}) {
  return (
    <div className="bg-[#223066]/60 backdrop-blur-md border border-[#764d9f]/40 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#54c4c3]/70 hover:shadow-xl group flex flex-col h-full">
      {/* Image container – smaller size */}
      <div className="relative h-32 md:h-40 flex items-center justify-center overflow-hidden bg-linear-to-br from-[#223066]/80 to-[#190f2A]/80">
        <Image
          src={imageSrc}
          alt={`${title} feature illustration`}
          fill
          className="object-contain p-6 md:p-8 transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={false}
        />
      </div>

      {/* Text content */}
      <div className="p-6 md:p-8 flex flex-col grow">
        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white">{title}</h3>
        <p className="text-white/75 leading-relaxed text-base mt-auto">{description}</p>
      </div>
    </div>
  );
}