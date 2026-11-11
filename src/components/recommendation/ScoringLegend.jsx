import React from 'react'
import { getScoringWeights } from '@/service/recommendationService'

const weights = getScoringWeights()

const FACTORS = [
  { key: 'interests', label: 'Interests', weight: weights.interests, desc: 'Culture, Food, Nature, Shopping, Adventure, Nightlife, Family' },
  { key: 'budget', label: 'Budget', weight: weights.budget, desc: 'Cheap, Moderate, or Luxury alignment' },
  { key: 'companions', label: 'Travel companions', weight: weights.companions, desc: 'Solo, couple, family, or friends' },
  { key: 'duration', label: 'Trip duration', weight: weights.duration, desc: 'Short vs long trip activity fit' },
]

function ScoringLegend() {
  return (
    <div className='border rounded-xl p-5 bg-muted mt-6 max-w-3xl'>
      <h2 className='font-bold text-sm uppercase tracking-wide text-muted-foreground'>Scoring System</h2>
      <div className='grid sm:grid-cols-2 gap-3 mt-3'>
        {FACTORS.map((f) => (
          <div key={f.key} className='text-sm'>
            <p className='font-medium'>
              {f.label}{' '}
              <span className='text-[#f56551]'>({Math.round(f.weight * 100)}%)</span>
            </p>
            <p className='text-xs text-muted-foreground mt-0.5'>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScoringLegend
