import React from 'react'
import { Link } from 'react-router-dom'
import PlaceImage from '@/components/custom/PlaceImage'
import { usePlacePhoto } from '@/hooks/usePlacePhoto'

function HotelCardItem({ hotel, locationContext }) {
  const searchName = hotel?.name || hotel?.hotelName
  
  // Log warning if hotel name is missing
  if (!searchName?.trim()) {
    console.error('[HotelCardItem] CRITICAL: Hotel name is missing!', {
      hotel,
      locationContext,
    })
  }
  
  const context = locationContext || hotel?.address
  
  console.log('[HotelCardItem] Rendering hotel:', {
    hotelName: searchName,
    locationContext: context,
    hasName: !!searchName,
  })
  
  const placePhoto = usePlacePhoto(searchName || '', context)

  const displayRating = placePhoto.rating ?? hotel?.rating
  const displayAddress = placePhoto.address || hotel?.address
  const mapsQuery = encodeURIComponent(`${hotel?.name || ''}, ${displayAddress || locationContext || ''}`)

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
      target='_blank'
      rel='noreferrer'
    >
      <div className='hover:scale-110 transition-all cursor-pointer mt-5 mb-8'>
        <PlaceImage
          placeName={searchName}
          locationContext={context}
          category='hotel'
          photoData={placePhoto}
          alt={hotel?.name}
          className='rounded-xl h-[180px] w-full object-cover'
          skeletonClassName='h-[180px] w-full'
        />
        <div className='my-2'>
          <h2 className='font-medium'>{hotel?.name}</h2>
          {displayAddress ? (
            <h2 className='text-xs text-muted-foreground'>📍{displayAddress}</h2>
          ) : null}
          <h2 className='text-sm'>💰{hotel?.price}</h2>
          {displayRating ? (
            <h2 className='text-sm'>⭐{displayRating}</h2>
          ) : null}
        </div>
      </div>
    </Link>
  )
}

export default HotelCardItem
