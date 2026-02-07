'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 px-5 py-5 md:px-10 lg:px-16">
        {/* Desktop layout */}
        <div className="hidden md:flex items-center justify-between w-full">
          <Link href="/" className="flex-none">
            <img
              src="/flight IQ logo.svg"
              alt="Flight IQ logo"
              className="h-12 md:h-14 w-auto transition-transform hover:scale-105"
            />
          </Link>

          <nav className="flex items-center gap-10">
            <Link href="/features" className="text-sm font-medium text-white/80 hover:text-[#54c4c3] transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-white/80 hover:text-[#54c4c3] transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-medium text-white/80 hover:text-[#54c4c3] transition-colors">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-6">
            <Link href="/sign-in" className="text-sm font-medium text-white/90 hover:text-[#54c4c3] transition-colors">
              Log in
            </Link>
            <Link
              href="/sign-up"
              className="bg-[#54c4c3] text-black px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#3daaa9] transition-colors shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile layout: logo centered, hamburger firmly on the right */}
        <div className="relative flex items-center justify-end md:hidden w-full">
          {/* Centered logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 z-10">
            <img
              src="/flight IQ logo.svg"
              alt="Flight IQ logo"
              className="h-11 w-auto max-w-45 transition-transform hover:scale-105"
            />
          </Link>

          {/* Hamburger – explicitly right-aligned */}
          <button
            className="relative z-20 text-white focus:outline-none pr-1"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-300 md:hidden z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      />

      {/* Mobile menu panel – slides from right */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-[#190f2A]/96 backdrop-blur-lg shadow-2xl transform transition-transform duration-300 ease-out md:hidden z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6 pt-8">
          <button
            className="self-end text-white mb-12 focus:outline-none"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <nav className="flex flex-col gap-7 text-lg font-medium">
            <Link href="/features" className="text-white/90 hover:text-[#54c4c3] transition-colors py-2" onClick={closeMenu}>
              Features
            </Link>
            <Link href="/pricing" className="text-white/90 hover:text-[#54c4c3] transition-colors py-2" onClick={closeMenu}>
              Pricing
            </Link>
            <Link href="/about" className="text-white/90 hover:text-[#54c4c3] transition-colors py-2" onClick={closeMenu}>
              About
            </Link>
            <div className="border-t border-white/15 my-6" />
            <Link href="/sign-in" className="text-white/90 hover:text-[#54c4c3] transition-colors py-2" onClick={closeMenu}>
              Log in
            </Link>
            <Link
              href="/sign-up"
              className="mt-5 bg-[#54c4c3] text-black px-6 py-4 rounded-full text-center font-semibold hover:bg-[#3daaa9] transition-colors shadow-md"
              onClick={closeMenu}
            >
              Get Started
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}