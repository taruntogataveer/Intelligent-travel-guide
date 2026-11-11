import React from 'react'
import { Link } from 'react-router-dom'
import PlaceImage from '@/components/custom/PlaceImage'
import { usePlacePhoto } from '@/hooks/usePlacePhoto'

function PlaceCardItem({ place, locationContext }) {
  const searchName = place?.place || place?.placeName || place?.name
  
  // Log warning if place name is missing
  if (!searchName?.trim()) {
    console.error('[PlaceCardItem] CRITICAL: Place name is missing!', {
      place,
      locationContext,
    })
  }
  
  console.log('[PlaceCardItem] Rendering place:', {
    placeName: searchName,
    locationContext: locationContext,
    hasName: !!searchName,
  })
  
  const placePhoto = usePlacePhoto(searchName || '', locationContext)

  const mapsQuery = encodeURIComponent(
    placePhoto.address || `${place?.place || ''}, ${locationContext || ''}`
  )

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
      target='_blank'
      rel='noreferrer'
    >
      <div className='shadow-sm border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 hover:shadow-md cursor-pointer transition-all'>
        <PlaceImage
          placeName={searchName}
          locationContext={locationContext}
          category='landmark'
          photoData={placePhoto}
          alt={place?.place}
          className='w-[130px] h-[130px] rounded-xl object-cover shrink-0'
          skeletonClassName='w-[130px] h-[130px] shrink-0'
        />
        <div>
          <h2 className='font-bold text-lg'>{place.place}</h2>
          <p className='text-sm text-muted-foreground'>{place.details}</p>
          {placePhoto.rating ? (
            <h2 className='text-xs font-medium mt-1'>⭐ {placePhoto.rating} on Google</h2>
          ) : null}
          <h2 className='text-xs font-medium mt-2 mb-2'>🏷️Ticket: {place.ticket_pricing}</h2>
        </div>
      </div>
    </Link>
  )
}

export default PlaceCardItem
