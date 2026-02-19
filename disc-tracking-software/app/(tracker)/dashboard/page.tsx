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
            <div className="flex justify-center my-10">
              <div className="flex justify-center my-10">
                <Link
                  href="/stats"
                  className="w-full max-w-md mx-auto inline-flex items-center justify-center px-10 py-4 text-lg font-medium text-white bg-linear-to-r from-[#456fb6] to-[#764d9f] rounded-xl hover:from-[#54c4c3] hover:to-[#456fb6] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#54c4c3]/50 min-w-55 text-center"
                >
                  User Throw Statistics
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick stats or recent activity cards */}

        {/* More sections can go here */}
      </div>
    </>
  );
}