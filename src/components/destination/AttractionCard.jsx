import React from 'react'
import PlaceImage from '@/components/custom/PlaceImage'
import { usePlacePhoto } from '@/hooks/usePlacePhoto'

function AttractionCard({ attraction, categoryIcon, locationContext }) {
  const context = locationContext || attraction.destinationName
    ? `${attraction.destinationName}${attraction.country ? `, ${attraction.country}` : ''}`
    : ''

  const attractionName = attraction?.name || attraction?.placeName
  
  // Log warning if attraction name is missing
  if (!attractionName?.trim()) {
    console.error('[AttractionCard] CRITICAL: Attraction name is missing!', {
      attraction,
      locationContext: context,
    })
  }

  console.log('[AttractionCard] Rendering attraction:', {
    attractionName: attractionName,
    locationContext: context,
    category: attraction.category,
    hasName: !!attractionName,
  })

  const placePhoto = usePlacePhoto(attractionName || '', context, attraction.category)
  const displayRating = placePhoto.rating ?? attraction.rating

  return (
    <div className='shadow-sm border rounded-xl overflow-hidden hover:scale-105 hover:shadow-md transition-all bg-card'>
      <PlaceImage
        placeName={attraction.name}
        locationContext={context}
        category={attraction.category || 'attraction'}
        photoData={placePhoto}
        alt={attraction.name}
        className='w-full h-[140px] object-cover'
        skeletonClassName='h-[140px] w-full'
      />
      <div className='p-4'>
        <div className='flex items-start justify-between gap-2'>
          <h3 className='font-bold text-base leading-tight'>
            {categoryIcon ? <span className='mr-1'>{categoryIcon}</span> : null}
            {attraction.name}
          </h3>
          {displayRating ? (
            <span className='text-xs font-medium text-muted-foreground shrink-0'>⭐ {displayRating}</span>
          ) : null}
        </div>
        <p className='text-sm text-muted-foreground mt-2 line-clamp-2'>{attraction.description}</p>
        {attraction.priceRange ? (
          <p className='text-xs font-medium mt-3 text-orange-600'>💰 {attraction.priceRange}</p>
        ) : null}
      </div>
    </div>
  )
}

export default AttractionCard
