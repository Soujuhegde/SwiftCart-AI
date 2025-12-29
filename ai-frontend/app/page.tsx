import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import WorkflowSection from '@/components/WorkflowSection';
import ShopperSection from '@/components/ShopperSection';
import AzureSection from '@/components/AzureSection';
import ImpactSection from '@/components/ImpactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <HeroSection />
      <WorkflowSection />
      <ShopperSection />
      <AzureSection />
      <ImpactSection />
      <Footer />
    </main>
  );
}
