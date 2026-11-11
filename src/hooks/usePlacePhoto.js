import { useEffect, useState } from 'react'
import { getPlaceDetails } from '@/service/placeImageService'
import { getCategoryFallback } from '@/constants/placeFallbacks'

const EMPTY = {
  loading: true,
  photoUrl: null,
  placeId: null,
  rating: null,
  address: null,
  coordinates: null,
  fromGoogle: false,
}

export function usePlacePhoto(placeName, locationContext = '', category = 'default') {
  const [data, setData] = useState(EMPTY)

  useEffect(() => {
    if (!placeName?.trim()) {
      console.warn('[usePlacePhoto] Empty placeName received, using fallback for category:', category)
      setData({
        ...EMPTY,
        loading: false,
        photoUrl: getCategoryFallback(category),
      })
      return
    }

    let cancelled = false
    setData((prev) => ({ ...prev, loading: true }))

    console.log('[usePlacePhoto] Initiating fetch for:', placeName, 'with context:', locationContext, 'category:', category)

    getPlaceDetails(placeName, locationContext, category).then((result) => {
      if (cancelled) return
      console.log('[usePlacePhoto] Result received for:', placeName, 'photoUrl:', result.photoUrl?.substring(0, 50) + '...')
      setData({
        loading: false,
        photoUrl: result.photoUrl,
        placeId: result.placeId,
        rating: result.rating,
        address: result.address,
        coordinates: result.coordinates,
        fromGoogle: result.fromGoogle,
      })
    })

    return () => {
      cancelled = true
    }
  }, [placeName, locationContext, category])

  return data
}
