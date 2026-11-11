import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { TRAVEL_INTERESTS, TRAVEL_PACE_OPTIONS, BUDGET_LEVELS } from '@/constants/travelGuide'
import { getUserProfile, saveUserProfile } from '@/service/profileService'
import { getCurrentUserEmail } from '@/hooks/useCurrentUser'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

function ProfilePage() {
  const [profile, setProfile] = useState({
    name: '',
    country: '',
    budgetLevel: 'Moderate',
    interests: [],
    travelPace: 'balanced',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const email = getCurrentUserEmail()
    if (!email) {
      setLoading(false)
      return
    }
    getUserProfile(email)
      .then((data) => {
        if (data) setProfile(data)
      })
      .finally(() => setLoading(false))
  }, [])

  const toggleInterest = (id) => {
    setProfile((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }))
  }

  const handleSave = async () => {
    const email = getCurrentUserEmail()
    if (!email) {
      toast.error('Sign in to save your profile')
      return
    }
    setSaving(true)
    try {
      await saveUserProfile(email, profile)
      toast.success('Profile saved successfully')
    } catch (error) {
      console.error(error)
      toast.error('Could not save profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className='flex justify-center py-20'>
        <AiOutlineLoading3Quarters className='h-8 w-8 animate-spin' />
      </div>
    )
  }

  const email = getCurrentUserEmail()

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10 pb-16'>
      <h1 className='font-bold text-3xl'>User Profile</h1>
      <p className='text-muted-foreground mt-2'>
        Personalize recommendations and itinerary generation with your travel preferences.
      </p>

      {!email ? (
        <p className='mt-8 text-orange-600'>Please sign in to manage your profile.</p>
      ) : (
        <div className='mt-10 flex flex-col gap-8 max-w-2xl'>
          <div>
            <label className='text-sm font-medium'>Name</label>
            <Input
              className='mt-1'
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder='Your name'
            />
          </div>
          <div>
            <label className='text-sm font-medium'>Country</label>
            <Input
              className='mt-1'
              value={profile.country}
              onChange={(e) => setProfile({ ...profile, country: e.target.value })}
              placeholder='e.g. India'
            />
          </div>
          <div>
            <h2 className='text-sm font-medium mb-3'>Budget Level</h2>
            <div className='grid grid-cols-3 gap-3'>
              {BUDGET_LEVELS.map((level) => (
                <button
                  key={level}
                  type='button'
                  onClick={() => setProfile({ ...profile, budgetLevel: level })}
                  className={`p-3 border rounded-lg text-sm font-medium ${
                    profile.budgetLevel === level ? 'border-primary shadow-md' : ''
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h2 className='text-sm font-medium mb-3'>Travel Interests</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
              {TRAVEL_INTERESTS.map((item) => (
                <button
                  key={item.id}
                  type='button'
                  onClick={() => toggleInterest(item.id)}
                  className={`p-3 border rounded-lg text-left text-sm ${
                    profile.interests.includes(item.id) ? 'border-primary shadow-md bg-muted' : ''
                  }`}
                >
                  <span className='text-xl'>{item.icon}</span>
                  <span className='block font-medium mt-1'>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <h2 className='text-sm font-medium mb-3'>Preferred Travel Pace</h2>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
              {TRAVEL_PACE_OPTIONS.map((pace) => (
                <button
                  key={pace.id}
                  type='button'
                  onClick={() => setProfile({ ...profile, travelPace: pace.id })}
                  className={`p-4 border rounded-lg text-left ${
                    profile.travelPace === pace.id ? 'border-primary shadow-md' : ''
                  }`}
                >
                  <p className='font-bold'>{pace.label}</p>
                  <p className='text-xs text-muted-foreground mt-1'>{pace.desc}</p>
                </button>
              ))}
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving} className='w-fit'>
            {saving ? 'Saving...' : 'Save Profile'}
          </Button>
        </div>
      )}
    </div>
  )
}

export default ProfilePage
