import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import DestinationDetails from '@/components/destination/DestinationDetails'
import { getDestinationById } from '@/service/destinationService'
import { Button } from '@/components/ui/button'

function DestinationPage() {
  const { destinationId } = useParams()
  const [destination, setDestination] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDestinationById(destinationId)
      .then(setDestination)
      .finally(() => setLoading(false))
  }, [destinationId])

  if (loading) {
    return <p className='text-center py-20 text-muted-foreground'>Loading destination...</p>
  }

  if (!destination) {
    return (
      <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10 pb-16 text-center'>
        <h1 className='font-bold text-2xl'>Destination not found</h1>
        <Link to='/destinations' className='inline-block mt-6'>
          <Button variant='outline'>Browse All Destinations</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10 pb-16'>
      <DestinationDetails destination={destination} />
    </div>
  )
}

export default DestinationPage
