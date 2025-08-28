import Header from "@/components/header";
import Footer from "@/components/footer";
import HomeContent from "@/components/homecontent";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <HomeContent />
      </main>
      <Footer />
    </div>
  );
}
