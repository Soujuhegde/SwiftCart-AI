import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import WorkflowSection from '@/components/WorkflowSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import ShopperSection from '@/components/ShopperSection';
import AzureSection from '@/components/AzureSection';
import ImpactSection from '@/components/ImpactSection';
import CommandCenterStrip from '@/components/CommandCenterStrip';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <CommandCenterStrip />
      <WorkflowSection />
      <ShopperSection />
      <ImpactSection />
      <Footer />
    </main>
  );
}
