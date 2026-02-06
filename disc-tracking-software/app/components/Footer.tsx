import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#1a234d] border-t border-white/10 pt-16 pb-8 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="text-2xl font-bold text-white mb-4 block">DiscTracker</Link>
          <p className="text-white/60 text-sm leading-relaxed">
            Helping disc golfers track their collection and analyze their game.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-white mb-4">Product</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link href="/features" className="hover:text-[#54c4c3]">Features</Link></li>
            <li><Link href="/pricing" className="hover:text-[#54c4c3]">Pricing</Link></li>
            <li><Link href="/changelog" className="hover:text-[#54c4c3]">Changelog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link href="/about" className="hover:text-[#54c4c3]">About</Link></li>
            <li><Link href="/blog" className="hover:text-[#54c4c3]">Blog</Link></li>
            <li><Link href="/careers" className="hover:text-[#54c4c3]">Careers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link href="/privacy" className="hover:text-[#54c4c3]">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-[#54c4c3]">Terms</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-white/10 pt-8 text-center text-sm text-white/40">
        © {new Date().getFullYear()} DiscTracker. All rights reserved.
      </div>
    </footer>
  )
}
