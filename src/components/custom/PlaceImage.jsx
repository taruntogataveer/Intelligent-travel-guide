import React, { useState } from 'react'
import { usePlacePhoto } from '@/hooks/usePlacePhoto'
import { getCategoryFallback } from '@/constants/placeFallbacks'

function ImageSkeleton({ className }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-br from-muted via-background to-muted rounded-xl ${className || ''}`}
      aria-hidden='true'
    />
  )
}

/**
 * Dynamically loads a Google Places photo for any location name.
 * Supports skeleton loader, lazy loading, and fade-in animation.
 */
function PlaceImage({
  placeName,
  locationContext = '',
  category = 'default',
  alt = '',
  className = '',
  skeletonClassName = '',
  photoData = null,
}) {
  const fetched = usePlacePhoto(photoData ? null : placeName, locationContext, category)
  const { loading, photoUrl } = photoData || fetched
  const [imageLoaded, setImageLoaded] = useState(false)

  const src = photoUrl || getCategoryFallback(category)

  if (loading && !photoData?.photoUrl) {
    return <ImageSkeleton className={skeletonClassName || className} />
  }

  return (
    <div className={`relative overflow-hidden ${skeletonClassName ? '' : 'w-full'}`}>
      {!imageLoaded ? (
        <ImageSkeleton className={`absolute inset-0 ${skeletonClassName || className}`} />
      ) : null}
      <img
        src={src}
        alt={alt || placeName || 'Place'}
        loading='lazy'
        decoding='async'
        onLoad={() => setImageLoaded(true)}
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = getCategoryFallback(category)
          setImageLoaded(true)
        }}
        className={`${className} transition-opacity duration-500 ease-in-out ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}

export default PlaceImage
