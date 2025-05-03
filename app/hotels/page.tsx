// app/hotels/page.tsx
import { getAllHotels } from "@/lib/firebase/hotels";
import { HotelList } from "@/components/hotel-list";
import { HotelFilters } from "@/components/hotel-filters";
import { SearchHeader } from "@/components/search-header";

interface SearchParams {
  location?: string;
  startDate?: string;
  endDate?: string;
  guests?: string;
  priceMin?: string;
  priceMax?: string;
  rating?: string;
  propertyType?: string;
  amenities?: string;
}

// Next.js 15 expects async props for both params and searchParams
interface Props {
  searchParams?: Promise<SearchParams>;
}

export default async function HotelsPage(props: Props) {
  // Await the incoming searchParams promise (or default to an empty object)
  const searchParams = (
    props.searchParams ? await props.searchParams : {}
  ) as SearchParams;

  const hotels = await getAllHotels();

  // Calculate maxGuests for each hotel based on room capacities
  const hotelsWithMaxGuests = hotels.map((hotel) => ({
    ...hotel,
    maxGuests: Math.max(...hotel.rooms.map((room) => room.capacity), 0),
  }));

  // Parse filter values
  const priceMin = searchParams.priceMin ? parseInt(searchParams.priceMin) : 0;
  const priceMax = searchParams.priceMax
    ? parseInt(searchParams.priceMax)
    : Infinity;
  const ratings = searchParams.rating?.split(",").map(Number) || [];
  const propertyTypes = searchParams.propertyType?.split(",") || [];
  const amenities = searchParams.amenities?.split(",") || [];

  // Filter hotels based on all search parameters
  const filteredHotels = hotelsWithMaxGuests.filter((hotel) => {
    const matchesLocation = !searchParams.location
      ? true
      : hotel.location
          .toLowerCase()
          .includes(searchParams.location.toLowerCase());

    const matchesGuests = !searchParams.guests
      ? true
      : hotel.maxGuests >= parseInt(searchParams.guests);

    const matchesPrice = hotel.price >= priceMin && hotel.price <= priceMax;

    const matchesRating =
      ratings.length === 0 || ratings.some((r) => hotel.rating >= r);

    const matchesPropertyType =
      propertyTypes.length === 0 || propertyTypes.includes(hotel.type);

    const matchesAmenities =
      amenities.length === 0 ||
      amenities.every((amenity) => hotel.amenities.includes(amenity));

    return (
      matchesLocation &&
      matchesGuests &&
      matchesPrice &&
      matchesRating &&
      matchesPropertyType &&
      matchesAmenities
    );
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SearchHeader initialValues={searchParams} />
      <section className="container px-4 md:px-6 py-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <aside className="bg-card/50 p-6 rounded-xl border border-border/50 shadow-sm">
            <HotelFilters />
          </aside>
          <main>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">
                {filteredHotels.length}{" "}
                {filteredHotels.length === 1 ? "Hotel" : "Hotels"} Found
                {searchParams.location && ` in ${searchParams.location}`}
              </h2>
              <div className="text-muted-foreground space-y-1">
                {searchParams.startDate && searchParams.endDate && (
                  <p>
                    For {new Date(searchParams.startDate).toLocaleDateString()}{" "}
                    - {new Date(searchParams.endDate).toLocaleDateString()}
                  </p>
                )}
                {(propertyTypes.length > 0 || amenities.length > 0) && (
                  <p className="text-sm">
                    {propertyTypes.length > 0 && (
                      <span className="mr-2">
                        Property Types: {propertyTypes.join(", ")}
                      </span>
                    )}
                    {amenities.length > 0 && (
                      <span>Amenities: {amenities.join(", ")}</span>
                    )}
                  </p>
                )}
              </div>
            </div>
            <HotelList hotels={filteredHotels} />
          </main>
        </div>
      </section>
    </div>
  );
}
