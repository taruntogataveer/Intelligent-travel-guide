import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StatCard from '@/components/dashboard/StatCard'
import { Button } from '@/components/ui/button'
import { getDashboardAnalytics } from '@/service/analyticsService'
import { getCurrentUserEmail } from '@/hooks/useCurrentUser'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

function DashboardPage() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const email = getCurrentUserEmail()

  useEffect(() => {
    getDashboardAnalytics(email)
      .then(setAnalytics)
      .finally(() => setLoading(false))
  }, [email])

  if (loading) {
    return (
      <div className='flex justify-center py-20'>
        <AiOutlineLoading3Quarters className='h-8 w-8 animate-spin' />
      </div>
    )
  }

  if (!email) {
    return (
      <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10 pb-16 text-center'>
        <h1 className='font-bold text-3xl'>Dashboard</h1>
        <p className='text-muted-foreground mt-4'>Sign in to view your travel analytics.</p>
      </div>
    )
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10 pb-16'>
      <h1 className='font-bold text-3xl'>Dashboard Analytics</h1>
      <p className='text-muted-foreground mt-2'>Overview of your Intelligent Travel Guide activity.</p>

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10'>
        <StatCard label='Travel Plans' value={analytics.totalTrips} icon='🗺️' />
        <StatCard label='Destinations Visited' value={analytics.uniqueDestinationsVisited} icon='🌍' />
        <StatCard label='Your Feedback' value={analytics.userFeedbackCount} icon='⭐' />
        <StatCard label='Avg. Trip Length' value={`${analytics.avgTripDays} days`} icon='📅' />
      </div>

      <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
        <StatCard label='Destinations in Guide' value={analytics.totalDestinations} icon='📍' />
        <StatCard label='Attractions Catalogued' value={analytics.totalAttractions} icon='🏛️' />
        <StatCard
          label='Profile Status'
          value={analytics.profileComplete ? 'Complete' : 'Incomplete'}
          icon='👤'
        />
      </div>

      <div className='mt-10 grid md:grid-cols-2 gap-8'>
        <div className='border rounded-xl p-6'>
          <h2 className='font-bold text-lg'>Budget Breakdown</h2>
          {Object.keys(analytics.budgetBreakdown).length ? (
            <ul className='mt-4 space-y-2'>
              {Object.entries(analytics.budgetBreakdown).map(([budget, count]) => (
                <li key={budget} className='flex justify-between text-sm'>
                  <span>{budget}</span>
                  <span className='font-medium'>{count} trip(s)</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-muted-foreground text-sm mt-4'>No trips yet.</p>
          )}
        </div>

        <div className='border rounded-xl p-6'>
          <h2 className='font-bold text-lg'>Quick Actions</h2>
          <div className='flex flex-wrap gap-3 mt-4'>
            <Link to='/create-trip'><Button size='sm'>Generate Guide</Button></Link>
            <Link to='/recommendations'><Button size='sm' variant='outline'>Recommendations</Button></Link>
            <Link to='/profile'><Button size='sm' variant='outline'>Edit Profile</Button></Link>
            <Link to='/assistant'><Button size='sm' variant='outline'>AI Assistant</Button></Link>
          </div>
        </div>
      </div>

      <div className='mt-10'>
        <h2 className='font-bold text-lg'>Recent Trip History</h2>
        {analytics.recentTrips.length ? (
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
            {analytics.recentTrips.map((trip) => (
              <Link
                key={trip.id}
                to={`/view-trip/${trip.id}`}
                className='border rounded-xl p-4 hover:shadow-md transition-shadow'
              >
                <p className='font-bold'>{trip.userSelection?.location?.label || 'Trip'}</p>
                <p className='text-sm text-muted-foreground mt-1'>
                  {trip.userSelection?.noOfDays} days · {trip.userSelection?.budget}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className='text-muted-foreground text-sm mt-4'>No travel plans yet.</p>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
