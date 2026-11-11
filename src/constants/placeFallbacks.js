/** Category-based fallback images when Google Places has no photo */
export const CATEGORY_FALLBACKS = {
  hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  restaurant: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  museum: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80',
  park: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
  landmark: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
  shopping: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
  nightlife: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80',
  destination: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
  attraction: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
  default: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
}

const CATEGORY_ALIAS = {
  museums: 'museum',
  parks: 'park',
  restaurants: 'restaurant',
  landmarks: 'landmark',
  shopping: 'shopping',
  nightlife: 'nightlife',
  hotels: 'hotel',
  hotel: 'hotel',
}

export function getCategoryFallback(category = 'default') {
  const key = CATEGORY_ALIAS[category] || category || 'default'
  return CATEGORY_FALLBACKS[key] || CATEGORY_FALLBACKS.default
}
