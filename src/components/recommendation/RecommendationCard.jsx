import React from 'react'
import PlaceImage from '@/components/custom/PlaceImage'
import { usePlacePhoto } from '@/hooks/usePlacePhoto'

function ScoreBar({ label, value }) {
  const pct = Math.round((value || 0) * 100)
  return (
    <div className='flex items-center gap-2 text-xs'>
      <span className='w-16 text-muted-foreground shrink-0'>{label}</span>
      <div className='flex-1 h-1.5 bg-muted rounded-full overflow-hidden'>
        <div className='h-full bg-[#f56551] rounded-full' style={{ width: `${pct}%` }} />
      </div>
      <span className='w-8 text-right text-muted-foreground'>{pct}%</span>
    </div>
  )
}

function RecommendationCard({ recommendation, showBreakdown = true }) {
  const context = recommendation.destinationName || ''
  const recommendationName = recommendation?.name || recommendation?.placeName
  
  // Log warning if recommendation name is missing
  if (!recommendationName?.trim()) {
    console.error('[RecommendationCard] CRITICAL: Recommendation name is missing!', {
      recommendation,
      context,
    })
  }
  
  console.log('[RecommendationCard] Rendering recommendation:', {
    recommendationName: recommendationName,
    locationContext: context,
    category: recommendation.category,
    hasName: !!recommendationName,
  })
  
  const placePhoto = usePlacePhoto(recommendationName || '', context, recommendation.category)

  return (
    <div className='border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-card'>
      <PlaceImage
        placeName={recommendation.name}
        locationContext={context}
        category={recommendation.category || 'attraction'}
        photoData={placePhoto}
        alt={recommendation.name}
        className='w-full h-[140px] object-cover'
        skeletonClassName='h-[140px] w-full'
      />
      <div className='p-4'>
        <div className='flex items-start justify-between gap-2'>
          <div>
            <h3 className='font-bold text-base'>{recommendation.name}</h3>
            <p className='text-xs text-muted-foreground mt-1'>
              {recommendation.destinationName} · {recommendation.category}
            </p>
          </div>
          <span className='shrink-0 text-sm font-bold text-[#f56551] bg-orange-50 px-2 py-1 rounded-full'>
            {recommendation.matchPercentage}% match
          </span>
        </div>

        <p className='text-sm text-muted-foreground mt-3'>
          <span className='font-medium text-foreground'>Why recommended: </span>
          {recommendation.reason}
        </p>
        <p className='text-xs font-medium mt-3 text-foreground'>
          💰 Estimated cost: {recommendation.estimatedCost}
        </p>

        {showBreakdown && recommendation.scores ? (
          <div className='mt-4 pt-3 border-t space-y-1.5'>
            <ScoreBar label='Interests' value={recommendation.scores.interests} />
            <ScoreBar label='Budget' value={recommendation.scores.budget} />
            <ScoreBar label='Group' value={recommendation.scores.companions} />
            <ScoreBar label='Duration' value={recommendation.scores.duration} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default RecommendationCard
