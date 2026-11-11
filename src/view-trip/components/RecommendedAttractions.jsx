import React from 'react'
import RecommendationCard from '@/components/recommendation/RecommendationCard'

function RecommendedAttractions({ trip }) {
  const recommendations =
    trip?.recommendations ||
    trip?.tripData?.recommendedAttractions ||
    []

  if (!recommendations.length) return null

  return (
    <div className='mt-10'>
      <h2 className='font-bold text-xl'>Intelligent Recommendations</h2>
      <p className='text-sm text-muted-foreground mt-1'>
        Attractions matched to your budget, duration, interests, and travel companions.
      </p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
        {recommendations.map((rec, index) => (
          <RecommendationCard key={rec.name + index} recommendation={rec} />
        ))}
      </div>
    </div>
  )
}

export default RecommendedAttractions
