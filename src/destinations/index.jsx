import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import DestinationCard from '@/components/destination/DestinationCard'
import { getAllDestinations, searchDestinations } from '@/service/destinationService'
import { preloadDestinationImages } from '@/service/destinationImageService'

function DestinationsPage() {
  const [destinations, setDestinations] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllDestinations()
      .then((dests) => {
        setDestinations(dests)
        // Preload images after a delay to allow cards to render first
        // This prevents overwhelming the API with simultaneous requests
        setTimeout(() => {
          console.log('[DestinationsPage] Starting image preload for', dests.length, 'destinations')
          preloadDestinationImages(dests).catch((err) =>
            console.warn('[DestinationsPage] Image preload failed:', err)
          )
        }, 2000) // 2 second delay to let cards make their own requests first
      })
      .finally(() => setLoading(false))
  }, [])

  const filtered = searchDestinations(destinations, search)

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10 pb-16'>
      <h1 className='font-bold text-3xl'>Destination Guide</h1>
      <p className='mt-3 text-muted-foreground text-lg max-w-3xl'>
        Explore curated destination guides with local culture, seasonal tips, attraction highlights,
        and estimated budgets to help you plan your next journey.
      </p>

      <div className='mt-8 max-w-md'>
        <Input
          placeholder='Search destinations by name, country, or attraction...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='h-12'
        />
        <p className='text-xs text-muted-foreground mt-2'>
          {filtered.length} destination{filtered.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {loading ? (
        <p className='text-muted-foreground mt-12'>Loading destinations...</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8'>
          {filtered.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      )}

      {!loading && !filtered.length ? (
        <p className='text-muted-foreground mt-12 text-center'>No destinations match your search.</p>
      ) : null}
    </div>
  )
}

export default DestinationsPage
