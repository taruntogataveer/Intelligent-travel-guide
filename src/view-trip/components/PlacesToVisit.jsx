import React from 'react'
import PlaceCardItem from './PlaceCardItem'
import { normalizeTripData } from '@/lib/tripData'

function PlacesToVisit({ trip }) {
  const itinerary = normalizeTripData(trip?.tripData).itinerary

  if (!itinerary.length) {
    return (
      <div>
        <h2 className='font-bold text-xl'>Places to Visit</h2>
        <p className='mt-3 text-muted-foreground'>No itinerary available for this travel plan.</p>
      </div>
    )
  }

  return (
    <div>
        <h2 className='font-bold text-xl'>Places to Visit</h2>
        <div>
            {itinerary.map((item, dayIndex) => (
                <div key={dayIndex} className='mt-5'>
                    <h2 className='font-bold text-lg'>{item.day}</h2>
                    <div className='grid md:grid-cols-2 gap-5'>
                    {(item.plan ?? []).map((place, placeIndex) => (
                        <div key={placeIndex} className='my-2'>
                            <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
                            <PlaceCardItem
                              place={place}
                              locationContext={trip?.userSelection?.location?.label}
                            />
                        </div>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit