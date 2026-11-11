import React from 'react'
import PlaceImage from '@/components/custom/PlaceImage'

function InfoSection({ trip }) {
  const locationLabel = trip?.userSelection?.location?.label

  return (
    <div>
      <PlaceImage
        placeName={locationLabel}
        category='destination'
        alt={locationLabel}
        className='h-[340px] w-full object-cover rounded-xl'
        skeletonClassName='h-[340px] w-full'
      />
      <div>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{locationLabel}</h2>
          <div className='flex gap-5 flex-wrap'>
            <h2 className='p-1 px-3 bg-muted rounded-full text-muted-foreground text-xs md:text-md'>
              📅{trip.userSelection?.noOfDays} Day
            </h2>
            <h2 className='p-1 px-3 bg-muted rounded-full text-muted-foreground text-xs md:text-md'>
              💰{trip.userSelection?.budget} Budget
            </h2>
            <h2 className='p-1 px-3 bg-muted rounded-full text-muted-foreground text-xs md:text-md'>
              👥No. of traveler/s: {trip.userSelection?.traveler}
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoSection
