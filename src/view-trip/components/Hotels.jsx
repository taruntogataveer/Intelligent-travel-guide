import React from 'react'
import HotelCardItem from './HotelCardItem'
import { normalizeTripData } from '@/lib/tripData'

function Hotels({ trip }) {
    const hotel_options = normalizeTripData(trip?.tripData).hotel_options

    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 xl-grid-cols-4 gap-5'>
                {hotel_options.map((hotel, index) => (
                    <HotelCardItem
                      key={index}
                      hotel={hotel}
                      locationContext={trip?.userSelection?.location?.label}
                    />
                ))}
            </div>
        </div>
    )
}

export default Hotels