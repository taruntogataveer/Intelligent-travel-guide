import { GetPlaceDetails, buildPhotoUrl } from './GlobalApi'
import { getCategoryFallback } from '@/constants/placeFallbacks'

const placeCache = new Map()
const inflightRequests = new Map()

function normalizeCacheKey(placeName, locationContext = '') {
  return `${placeName || ''}|${locationContext || ''}`.toLowerCase().trim()
}

function selectBestPhoto(photos = []) {
  if (!photos.length) return null
  return photos.reduce((best, photo) => {
    const area = (photo.widthPx || 0) * (photo.heightPx || 0)
    const bestArea = (best.widthPx || 0) * (best.heightPx || 0)
    return area >= bestArea ? photo : best
  }, photos[0])
}

function mapPlaceResult(place, category) {
  const bestPhoto = selectBestPhoto(place.photos)
  const photoUrl = buildPhotoUrl(bestPhoto?.name)
  const coordinates = place.location
    ? { lat: place.location.latitude, lng: place.location.longitude }
    : null

  return {
    placeId: place.id || null,
    displayName: place.displayName?.text || null,
    photoUrl: photoUrl || getCategoryFallback(category),
    rating: place.rating ?? null,
    userRatingCount: place.userRatingCount ?? null,
    address: place.formattedAddress || null,
    coordinates,
    fromGoogle: Boolean(photoUrl),
  }
}

function emptyResult(category) {
  return {
    placeId: null,
    displayName: null,
    photoUrl: getCategoryFallback(category),
    rating: null,
    userRatingCount: null,
    address: null,
    coordinates: null,
    fromGoogle: false,
  }
}

async function fetchPlaceFromApi(placeName, locationContext, category) {
  if (!placeName?.trim()) {
    console.warn('[PlaceImage] Empty placeName, using fallback')
    return emptyResult(category)
  }

  const textQuery = locationContext?.trim()
    ? `${placeName.trim()}, ${locationContext.trim()}`
    : placeName.trim()

  console.log('[PlaceImage] Searching image for:', {
    placeName: placeName?.trim(),
    locationContext: locationContext?.trim(),
    category,
    fullQuery: textQuery,
  })

  try {
    const response = await GetPlaceDetails({ textQuery })
    const place = response.data?.places?.[0]
    if (!place) {
      console.warn('[PlaceImage] No results from API for:', textQuery)
      return emptyResult(category)
    }
    console.log('[PlaceImage] Found place:', place.displayName?.text, 'Photos:', place.photos?.length)
    return mapPlaceResult(place, category)
  } catch (error) {
    console.warn('[PlaceImage] Place image lookup failed:', textQuery, error?.message)
    return emptyResult(category)
  }
}

/**
 * Search Google Places and return place metadata + best photo URL.
 * Results are cached in memory for the session.
 */
export async function getPlaceDetails(placeName, locationContext = '', category = 'default') {
  const cacheKey = normalizeCacheKey(placeName, locationContext)

  if (placeCache.has(cacheKey)) {
    return placeCache.get(cacheKey)
  }

  if (inflightRequests.has(cacheKey)) {
    return inflightRequests.get(cacheKey)
  }

  const request = fetchPlaceFromApi(placeName, locationContext, category)
    .then((result) => {
      placeCache.set(cacheKey, result)
      inflightRequests.delete(cacheKey)
      return result
    })
    .catch((error) => {
      inflightRequests.delete(cacheKey)
      const fallback = emptyResult(category)
      placeCache.set(cacheKey, fallback)
      return fallback
    })

  inflightRequests.set(cacheKey, request)
  return request
}

/**
 * Returns the photo URL for a place (Google photo or category fallback).
 */
export async function getPlacePhoto(placeName, locationContext = '', category = 'default') {
  const details = await getPlaceDetails(placeName, locationContext, category)
  return details.photoUrl
}

export function clearPlaceImageCache() {
  placeCache.clear()
  inflightRequests.clear()
}

export function getPlaceImageCacheSize() {
  return placeCache.size
}
