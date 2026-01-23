import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import WorkflowSection from '@/components/WorkflowSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import ShopperSection from '@/components/ShopperSection';
import AzureSection from '@/components/AzureSection';
import ImpactSection from '@/components/ImpactSection';
import CommandCenterStrip from '@/components/CommandCenterStrip';
import RetailFormatsSection from '@/components/RetailFormatsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <HeroSection />
      {/* 2. Outcome/Impact First */}
      <ImpactSection />

      {/* 3. How It Works (Simple 4 steps) */}
      <HowItWorksSection />

      {/* 4. Control & Safety (Workflow/Dashboard) */}
      <WorkflowSection />
      <CommandCenterStrip />

      {/* 5. Shopper Experience */}
      <ShopperSection />

      {/* 6. Segmentation (Retail Formats) */}
      <RetailFormatsSection />

      {/* 7. Footer */}
      <Footer />
    </main>
  );
}
