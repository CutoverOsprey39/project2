import Link from 'next/dist/client/link'
import React from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#190f2A] px-4 pb-4 pt-24 md:p-4 relative overflow-hidden">
      <Link href="/" className="absolute top-6 left-6 text-white/70 hover:text-[#54c4c3] transition-colors flex items-center gap-2 z-20 font-medium group">
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
      </Link>

      <Link href="/" className="relative flex-none mb-8">
        <img src="/flight-iq-logo.svg" alt="Flight IQ logo" className="h-15 md:h-10 w-auto transition-transform hover:scale-105 py-0.2"/>
      </Link>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(84,196,195,0.08),transparent_50%)] pointer-events-none" />
      <div className="max-w-md w-full bg-[#223066]/60 backdrop-blur-md border border-[#764d9f]/40 rounded-xl shadow-2xl p-8 relative z-10 transition-all duration-300 hover:border-[#54c4c3]/70 hover:shadow-xl">
        {children}
      </div>
    </div>
  )
}
