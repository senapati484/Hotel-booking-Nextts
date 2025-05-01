import { getAllHotels } from "@/lib/firebase/hotels";
import { HotelList } from "@/components/hotel-list";
import { HotelFilters } from "@/components/hotel-filters";
import { SearchHeader } from "@/components/search-header";

export default async function HotelsPage() {
  const hotels = await getAllHotels();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SearchHeader />
      <section className="container px-4 md:px-6 py-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <aside className="bg-card/50 p-6 rounded-xl border border-border/50 shadow-sm">
            <HotelFilters />
          </aside>
          <main>
            <HotelList hotels={hotels} />
          </main>
        </div>
      </section>
    </div>
  );
}
