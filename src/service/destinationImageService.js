import { getPlaceDetails } from './placeImageService'
import { getCategoryFallback } from '@/constants/placeFallbacks'

const destinationImageCache = new Map()
const inflightRequests = new Map()

/**
 * Get destination image data with caching and optimizations
 * Searches for destination by name and retrieves the best photo
 * Results are cached to prevent duplicate API calls
 */
export async function getDestinationImage(destinationName, country = '') {
  if (!destinationName?.trim()) {
    return {
      photoUrl: getCategoryFallback('destination'),
      displayName: null,
      rating: null,
      address: null,
      placeId: null,
      fromGoogle: false,
    }
  }

  const cacheKey = `${destinationName || ''}|${country || ''}`.toLowerCase().trim()

  // Return cached result if available (only if it has a real Google image)
  if (destinationImageCache.has(cacheKey)) {
    const cached = destinationImageCache.get(cacheKey)
    if (cached.fromGoogle) {
      console.log('[destinationImageService] Cache hit for:', destinationName)
      return cached
    }
  }

  // Return pending request if one is already inflight
  if (inflightRequests.has(cacheKey)) {
    console.log('[destinationImageService] Reusing inflight request for:', destinationName)
    return inflightRequests.get(cacheKey)
  }

  // Create the fetch request
  const fetchPromise = (async () => {
    try {
      console.log('[destinationImageService] Fetching destination image for:', {
        destinationName,
        country,
      })

      // Search with country context for better results
      const locationContext = country?.trim() ? country.trim() : ''
      const result = await getPlaceDetails(destinationName, locationContext, 'destination')

      console.log('[destinationImageService] Successfully fetched:', {
        destinationName,
        photoUrl: result.photoUrl?.substring(0, 50) + '...',
        rating: result.rating,
        fromGoogle: result.fromGoogle,
      })

      // Only cache successful results from Google
      if (result.fromGoogle) {
        destinationImageCache.set(cacheKey, result)
      }

      inflightRequests.delete(cacheKey)
      return result
    } catch (error) {
      console.error('[destinationImageService] Error fetching destination image:', {
        destinationName,
        country,
        error: error?.message,
      })

      inflightRequests.delete(cacheKey)

      const fallbackResult = {
        photoUrl: getCategoryFallback('destination'),
        displayName: destinationName,
        rating: null,
        address: null,
        placeId: null,
        fromGoogle: false,
      }

      // Don't cache failures - allow retries
      return fallbackResult
    }
  })()

  // Store inflight request
  inflightRequests.set(cacheKey, fetchPromise)
  return fetchPromise
}

/**
 * Clear the destination image cache (useful for testing or manual refresh)
 */
export function clearDestinationImageCache() {
  console.log('[destinationImageService] Clearing cache, items cleared:', destinationImageCache.size)
  destinationImageCache.clear()
  inflightRequests.clear()
}

/**
 * Get cache statistics (useful for debugging)
 */
export function getDestinationImageCacheStats() {
  return {
    size: destinationImageCache.size,
    entries: Array.from(destinationImageCache.keys()),
    inflightRequests: inflightRequests.size,
  }
}

/**
 * Preload images for multiple destinations to improve performance
 * Uses rate limiting to avoid overwhelming the API
 */
export async function preloadDestinationImages(destinations) {
  if (!Array.isArray(destinations)) return

  console.log('[destinationImageService] Preloading images for', destinations.length, 'destinations')

  // Filter out destinations that are already cached successfully
  const toPreload = destinations.filter((dest) => {
    const cacheKey = `${dest.name || ''}|${dest.country || ''}`.toLowerCase().trim()
    const cached = destinationImageCache.get(cacheKey)
    return !cached || !cached.fromGoogle // Only preload if not in cache or if cache miss
  })

  console.log('[destinationImageService] Need to preload', toPreload.length, 'destinations')

  // Load in parallel batches with significant delay to avoid rate limiting
  const batchSize = 2 // Reduce batch size for rate limiting
  for (let i = 0; i < toPreload.length; i += batchSize) {
    const batch = toPreload.slice(i, i + batchSize)
    await Promise.all(
      batch.map((dest) =>
        getDestinationImage(dest.name, dest.country).catch((err) =>
          console.warn('[destinationImageService] Preload failed for', dest.name, err)
        )
      )
    )
    // Increased delay between batches to respect rate limits
    if (i + batchSize < toPreload.length) {
      await new Promise((resolve) => setTimeout(resolve, 500)) // 500ms delay
    }
  }

  console.log('[destinationImageService] Preload complete')
}
