import Header from '@/components/reusables/Header'; // a server component
import InteractiveSection from '@/components/reusables/InteractiveSection'; // a client component

export default function HomePage() {
  return (
    <main className="container mx-auto flex flex-col min-h-screen">
      <Header />
      <InteractiveSection />
    </main>
  );
}
