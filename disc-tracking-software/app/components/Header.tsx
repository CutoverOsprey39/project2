import Link from 'next/link'

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 md:px-15">
      <nav className="hidden md:flex gap-8">
        <Link href="/features" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Features</Link>
        <Link href="/pricing" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Pricing</Link>
        <Link href="/about" className="text-sm font-medium text-white/80 hover:text-white transition-colors">About</Link>
      </nav>
        <div className="text-2xl font-bold text-white hover:text-[#54c4c3] transition-colors justify-center">
        <Link href="/">DiscTracker</Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/sign-in" className="text-sm font-medium text-white hover:text-[#54c4c3] transition-colors">Log in</Link>
        <Link 
          href="/sign-up" className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-[#54c4c3] transition-colors">
            Get Started
        </Link>
      </div>
    </header>
  )
}