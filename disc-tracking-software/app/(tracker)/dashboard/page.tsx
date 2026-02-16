import DashboardHeader from '@/components/DashboardHeader';
import DiscActionsDropdown from '@/components/DiscActionsDropdown';
import Link from 'next/link';

export default function DashboardHome() {
  return (
    <>
      <DashboardHeader />

      <div className="pt-20 md:pt-24 min-h-screen bg-[#190f2A] text-white">
        {/* Welcome / Hero area */}
        <section className="py-12 md:py-16 px-5 sm:px-8 md:px-12 lg:px-20">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Welcome back, <span className="text-[#54c4c3]">Nathan</span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10">
              Select and sync your disc(s) to start tracking.
            </p>

            {/* Disc Actions Dropdown – prominent and standalone */}
            <div className="flex justify-center mb-10">
              <DiscActionsDropdown
                currentDiscs={[
                  { id: '1', name: 'Star Destroyer', type: 'Distance Driver' },
                  { id: '2', name: 'Buzz', type: 'Midrange' },
                  { id: '3', name: 'Aviar', type: 'Putter' },
                  { id: '4', name: 'Thunderbird', type: 'Fairway Driver' },
                ]}
              />
            </div>

            {/* Quick links – separate row below */}
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/bag"
                className="border border-[#456fb6] text-white font-medium px-8 py-3.5 rounded-lg hover:border-[#54c4c3] hover:text-[#54c4c3] transition"
              >
                View My Bag
              </Link>

              <Link
                href="/stats"
                className="border border-[#764d9f]/60 text-white/90 font-medium px-8 py-3.5 rounded-lg hover:border-[#54c4c3]/70 transition"
              >
                Stats Overview
              </Link>
            </div>
          </div>
        </section>

        {/* Quick stats or recent activity cards */}
        <section className="py-12 px-5 sm:px-8 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#223066]/50 backdrop-blur-sm border border-[#764d9f]/30 rounded-xl p-6 hover:border-[#54c4c3]/50 transition">
              <h3 className="text-xl font-semibold mb-2 text-[#54c4c3]">Latest Throw</h3>
              <p className="text-white/80">285 ft • Turnover Fade • Star Destroyer</p>
            </div>

            <div className="bg-[#223066]/50 backdrop-blur-sm border border-[#764d9f]/30 rounded-xl p-6 hover:border-[#54c4c3]/50 transition">
              <h3 className="text-xl font-semibold mb-2 text-[#54c4c3]">Bag Size</h3>
              <p className="text-white/80">14 discs • 3 drivers, 5 mids, 6 putters</p>
            </div>

            <div className="bg-[#223066]/50 backdrop-blur-sm border border-[#764d9f]/30 rounded-xl p-6 hover:border-[#54c4c3]/50 transition">
              <h3 className="text-xl font-semibold mb-2 text-[#54c4c3]">Accuracy</h3>
              <p className="text-white/80">78% fairway hits • +4% this month</p>
            </div>
          </div>
        </section>

        {/* More sections can go here */}
      </div>
    </>
  );
}