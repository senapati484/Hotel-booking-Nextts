import { getAllHotels } from "@/lib/firebase/hotels";
import { HotelList } from "@/components/hotel-list";
import { HotelFilters } from "@/components/hotel-filters";
import { SearchHeader } from "@/components/search-header";

export default async function HotelsPage() {
  const hotels = await getAllHotels();

  return (
    <div className="flex flex-col min-h-screen">
      <SearchHeader />
      <section className="container px-4 md:px-6 py-6 mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        <HotelFilters />
        <HotelList hotels={hotels} />
      </section>
    </div>
  );
}
