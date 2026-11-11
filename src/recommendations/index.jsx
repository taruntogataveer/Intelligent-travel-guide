import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SelectBudgetOptions, SelectTravelList } from '@/constants/options'
import { TRAVEL_INTERESTS } from '@/constants/travelGuide'
import RecommendationCard from '@/components/recommendation/RecommendationCard'
import { getRecommendations } from '@/service/recommendationService'
import ScoringLegend from '@/components/recommendation/ScoringLegend'
import { toast } from 'sonner'
import { getUserProfile } from '@/service/profileService'
import { getCurrentUserEmail } from '@/hooks/useCurrentUser'
import { getAllDestinations } from '@/service/destinationService'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

function RecommendationsPage() {
  const [prefs, setPrefs] = useState({
    destination: '',
    budget: 'Moderate',
    duration: 5,
    traveler: '2 people',
    interests: [],
  })
  const [recommendations, setRecommendations] = useState([])
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAllDestinations().then(setDestinations)
    const email = getCurrentUserEmail()
    if (email) {
      getUserProfile(email).then((profile) => {
        if (profile) {
          setPrefs((prev) => ({
            ...prev,
            budget: profile.budgetLevel || prev.budget,
            interests: profile.interests || prev.interests,
          }))
        }
      })
    }
  }, [])

  const toggleInterest = (id) => {
    setPrefs((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }))
  }

  const runRecommendations = async () => {
    if (!prefs.interests.length) {
      toast('Select at least one interest for better recommendations')
    }
    setLoading(true)
    try {
      const results = await getRecommendations(prefs, {
        destinationId: prefs.destinationId || undefined,
        limit: 12,
      })
      setRecommendations(results)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10 pb-16'>
      <h1 className='font-bold text-3xl'>Intelligent Recommendations</h1>
      <p className='text-muted-foreground mt-2 max-w-3xl'>
        Ranked attractions based on your budget, trip duration, interests, and travel companions.
      </p>

      <div className='mt-10 grid gap-6 max-w-3xl'>
        <div>
          <label className='text-sm font-medium'>Destination filter</label>
          <select
            className='mt-1 w-full h-10 border rounded-md px-3 bg-background'
            value={prefs.destinationId || ''}
            onChange={(e) => {
              const dest = destinations.find((d) => d.id === e.target.value)
              setPrefs({
                ...prefs,
                destinationId: e.target.value,
                destination: dest ? `${dest.name}, ${dest.country}` : '',
              })
            }}
          >
            <option value=''>All destinations</option>
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>{d.name}, {d.country}</option>
            ))}
          </select>
        </div>
        <div>
          <label className='text-sm font-medium'>Trip duration (days)</label>
          <Input
            type='number'
            min={1}
            className='mt-1 max-w-xs'
            value={prefs.duration}
            onChange={(e) => setPrefs({ ...prefs, duration: Number(e.target.value) })}
          />
        </div>
        <div>
          <h2 className='text-sm font-medium mb-2'>Budget</h2>
          <div className='flex flex-wrap gap-2'>
            {SelectBudgetOptions.map((b) => (
              <button
                key={b.title}
                type='button'
                onClick={() => setPrefs({ ...prefs, budget: b.title })}
                className={`px-4 py-2 border rounded-full text-sm ${
                  prefs.budget === b.title ? 'border-primary shadow-md' : ''
                }`}
              >
                {b.icon} {b.title}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h2 className='text-sm font-medium mb-2'>Travel companions</h2>
          <div className='flex flex-wrap gap-2'>
            {SelectTravelList.map((t) => (
              <button
                key={t.people}
                type='button'
                onClick={() => setPrefs({ ...prefs, traveler: t.people })}
                className={`px-4 py-2 border rounded-full text-sm ${
                  prefs.traveler === t.people ? 'border-primary shadow-md' : ''
                }`}
              >
                {t.icon} {t.title}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h2 className='text-sm font-medium mb-2'>Interests</h2>
          <div className='flex flex-wrap gap-2'>
            {TRAVEL_INTERESTS.map((i) => (
              <button
                key={i.id}
                type='button'
                onClick={() => toggleInterest(i.id)}
                className={`px-4 py-2 border rounded-full text-sm ${
                  prefs.interests.includes(i.id) ? 'border-primary shadow-md bg-muted' : ''
                }`}
              >
                {i.icon} {i.label}
              </button>
            ))}
          </div>
        </div>
        <Button onClick={runRecommendations} disabled={loading} className='w-fit'>
          {loading ? (
            <AiOutlineLoading3Quarters className='h-5 w-5 animate-spin' />
          ) : (
            'Get Recommendations'
          )}
        </Button>
      </div>

      <ScoringLegend />

      {recommendations.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'>
          {recommendations.map((rec) => (
            <RecommendationCard key={rec.id} recommendation={rec} />
          ))}
        </div>
      ) : (
        <p className='text-muted-foreground mt-12 text-center'>
          Configure your preferences and click Get Recommendations.
        </p>
      )}
    </div>
  )
}

export default RecommendationsPage
