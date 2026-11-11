import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import AttractionCard from './AttractionCard'
import { ATTRACTION_CATEGORIES } from '@/data/destinations'
import FeedbackForm from '@/components/feedback/FeedbackForm'
import PlaceImage from '@/components/custom/PlaceImage'
import { useDestinationImage } from '@/hooks/useDestinationImage'

function DestinationDetails({ destination }) {
  if (!destination) return null

  const imageData = useDestinationImage(destination.name, destination.country)
  
  // Prefer the static image from destination data if available
  const photoUrl = destination.image || imageData.photoUrl

  console.log('[DestinationDetails] Rendering destination details:', {
    name: destination.name,
    country: destination.country,
    hasStaticImage: !!destination.image,
    useImageData: !destination.image,
    imageLoading: imageData.loading,
    hasImage: !!photoUrl,
  })

  return (
    <div className='flex flex-col gap-10'>
      <div className='relative rounded-xl overflow-hidden'>
        <PlaceImage
          placeName={destination.name}
          locationContext={destination.country}
          category='destination'
          photoData={{
            ...imageData,
            photoUrl: photoUrl, // Use static image if available
          }}
          alt={`${destination.name}, ${destination.country}`}
          className='w-full h-[280px] md:h-[360px] object-cover'
          skeletonClassName='h-[280px] md:h-[360px] w-full'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none' />
        <div className='absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white'>
          <p className='text-sm font-medium uppercase tracking-wide text-white/80'>{destination.country}</p>
          <h1 className='font-bold text-3xl md:text-4xl mt-1'>{destination.name}</h1>
        </div>
      </div>

      <div className='grid md:grid-cols-3 gap-5'>
        <div className='p-4 border rounded-lg bg-muted'>
          <h2 className='text-sm font-semibold text-muted-foreground uppercase'>Best Season</h2>
          <p className='font-medium mt-1'>{destination.bestSeason}</p>
        </div>
        <div className='p-4 border rounded-lg bg-muted md:col-span-2'>
          <h2 className='text-sm font-semibold text-muted-foreground uppercase'>Estimated Budget</h2>
          <div className='flex flex-wrap gap-3 mt-2'>
            <span className='p-2 px-3 bg-card border rounded-full text-sm'>💵 Budget: {destination.estimatedBudget.cheap}</span>
            <span className='p-2 px-3 bg-card border rounded-full text-sm'>💰 Moderate: {destination.estimatedBudget.moderate}</span>
            <span className='p-2 px-3 bg-card border rounded-full text-sm'>💸 Luxury: {destination.estimatedBudget.luxury}</span>
          </div>
        </div>
      </div>

      <section>
        <h2 className='font-bold text-xl'>About {destination.name}</h2>
        <p className='text-muted-foreground mt-3 leading-relaxed'>{destination.description}</p>
      </section>

      <section>
        <h2 className='font-bold text-xl'>Local Culture</h2>
        <p className='text-muted-foreground mt-3 leading-relaxed'>{destination.culture}</p>
      </section>

      <section>
        <h2 className='font-bold text-xl'>Popular Attractions</h2>
        <div className='flex flex-wrap gap-2 mt-4'>
          {destination.popularAttractions.map((attraction) => (
            <span
              key={attraction}
              className='p-2 px-4 bg-muted rounded-full text-sm font-medium text-foreground'
            >
              {attraction}
            </span>
          ))}
        </div>
      </section>

      {ATTRACTION_CATEGORIES.map(({ key, label, icon }) => {
        const items = destination.attractions?.[key] ?? []
        if (!items.length) return null

        return (
          <section key={key}>
            <h2 className='font-bold text-xl flex items-center gap-2'>
              <span>{icon}</span> {label}
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
              {items.map((attraction) => (
                <AttractionCard
                  key={attraction.name}
                  attraction={{
                    ...attraction,
                    category: key,
                    destinationName: destination.name,
                    country: destination.country,
                  }}
                  categoryIcon={icon}
                  locationContext={`${destination.name}, ${destination.country}`}
                />
              ))}
            </div>
          </section>
        )
      })}

      <FeedbackForm
        targetType='destination'
        targetId={destination.id}
        targetName={destination.name}
      />

      <div className='flex flex-wrap gap-4 pt-4 border-t'>
        <Link to='/create-trip'>
          <Button>Generate Travel Guide for {destination.name}</Button>
        </Link>
        <Link to='/destinations'>
          <Button variant='outline'>Back to Destinations</Button>
        </Link>
      </div>
    </div>
  )
}

export default DestinationDetails
