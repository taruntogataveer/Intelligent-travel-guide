import React from 'react'
import { Link } from 'react-router-dom'
import PlaceImage from '@/components/custom/PlaceImage'
import { useDestinationImage } from '@/hooks/useDestinationImage'

function DestinationCard({ destination }) {
  const searchName = destination.name
  const imageData = useDestinationImage(searchName, destination.country)

  // Prefer the static image from destination data if available
  const photoUrl = destination.image || imageData.photoUrl

  console.log('[DestinationCard] Rendering destination:', {
    name: searchName,
    country: destination.country,
    hasStaticImage: !!destination.image,
    useImageData: !destination.image,
    imageLoading: imageData.loading,
    hasImage: !!photoUrl,
  })

  return (
    <Link to={`/destinations/${destination.id}`}>
      <div className='hover:scale-105 transition-all h-full'>
        <PlaceImage
          placeName={searchName}
          locationContext={destination.country}
          category='destination'
          photoData={{
            ...imageData,
            photoUrl: photoUrl, // Use static image if available
          }}
          alt={`${searchName}, ${destination.country}`}
          className='object-cover rounded-xl h-[220px] w-full'
          skeletonClassName='h-[220px] w-full'
        />
        <div className='mt-3'>
          <h2 className='font-bold text-lg'>{destination.name}</h2>
          <p className='text-sm text-muted-foreground'>{destination.country}</p>
          <p className='text-xs text-muted-foreground mt-1'>Best season: {destination.bestSeason}</p>
          <p className='text-sm text-muted-foreground mt-2 line-clamp-2'>{destination.description}</p>
        </div>
      </div>
    </Link>
  )
}

export default DestinationCard
