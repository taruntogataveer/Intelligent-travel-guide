import { useEffect, useState } from 'react'
import { getDestinationImage } from '@/service/destinationImageService'
import { getCategoryFallback } from '@/constants/placeFallbacks'

/**
 * Hook to fetch and manage destination image
 * Handles loading state, caching, and error fallbacks
 */
export function useDestinationImage(destinationName, country = '') {
  const [data, setData] = useState({
    loading: true,
    photoUrl: getCategoryFallback('destination'),
    displayName: null,
    rating: null,
    address: null,
    placeId: null,
    fromGoogle: false,
  })

  useEffect(() => {
    if (!destinationName?.trim()) {
      setData({
        loading: false,
        photoUrl: getCategoryFallback('destination'),
        displayName: null,
        rating: null,
        address: null,
        placeId: null,
        fromGoogle: false,
      })
      return
    }

    let cancelled = false
    setData((prev) => ({ ...prev, loading: true }))

    console.log('[useDestinationImage] Fetching:', destinationName, country)

    getDestinationImage(destinationName, country).then((result) => {
      if (cancelled) return

      console.log('[useDestinationImage] Received result for:', destinationName)

      setData({
        loading: false,
        photoUrl: result.photoUrl,
        displayName: result.displayName,
        rating: result.rating,
        address: result.address,
        placeId: result.placeId,
        fromGoogle: result.fromGoogle,
      })
    })

    return () => {
      cancelled = true
    }
  }, [destinationName, country])

  return data
}
