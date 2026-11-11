function stripJsonFences(text) {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  return fenced ? fenced[1].trim() : trimmed;
}

function normalizeHotel(hotel = {}) {
  return {
    name: hotel.name ?? hotel.hotelName ?? hotel.hotel_name ?? "Unknown hotel",
    address: hotel.address ?? hotel.hotel_address ?? hotel.hotelAddress ?? "",
    price: hotel.price ?? hotel.hotel_price ?? hotel.hotelPrice ?? "",
    image_url: hotel.image_url ?? hotel.imageUrl ?? hotel.hotel_image_url ?? "",
    geo_coordinates: hotel.geo_coordinates ?? hotel.geoCoordinates ?? hotel.coordinates ?? "",
    rating: hotel.rating ?? hotel.hotel_rating ?? hotel.hotelRating ?? "",
    description: hotel.description ?? hotel.hotel_description ?? hotel.hotelDescription ?? "",
  };
}

function normalizePlace(place = {}) {
  return {
    time: place.time ?? place.timing ?? place.best_time_to_visit ?? "",
    place: place.place ?? place.placeName ?? place.name ?? "Unknown place",
    details: place.details ?? place.placeDetails ?? place.description ?? "",
    image_url: place.image_url ?? place.placeImageUrl ?? place.imageUrl ?? "",
    geo_coordinates: place.geo_coordinates ?? place.geoCoordinates ?? "",
    ticket_pricing: place.ticket_pricing ?? place.ticketPricing ?? "",
    rating: place.rating ?? "",
  };
}

function normalizeDay(day = {}) {
  const plan = day.plan ?? day.activities ?? day.places ?? [];
  return {
    day: day.day ?? day.title ?? "Day",
    plan: Array.isArray(plan) ? plan.map(normalizePlace) : [],
  };
}

export function normalizeTripData(data) {
  if (!data || typeof data !== "object") {
    return { hotel_options: [], itinerary: [] };
  }

  const hotel_options =
    data.hotel_options ?? data.hotels ?? data.hotelOptions ?? [];

  const rawItinerary =
    data.itinerary ?? data.daily_itinerary ?? data.daily_plan ?? data.days ?? [];

  const itinerary = Array.isArray(rawItinerary)
    ? rawItinerary.map(normalizeDay)
    : [];

  return {
    ...data,
    hotel_options: Array.isArray(hotel_options) ? hotel_options.map(normalizeHotel) : [],
    itinerary,
  };
}

export function parseTripDataFromAI(text) {
  const parsed = JSON.parse(stripJsonFences(text));
  return normalizeTripData(parsed);
}
