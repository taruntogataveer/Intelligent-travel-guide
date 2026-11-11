import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from './firebaseConfig'
import { COLLECTIONS } from '@/constants/travelGuide'
import { getAllDestinations } from './destinationService'
import { getAllAttractions } from './attractionService'
import { getAllFeedback } from './feedbackService'
import { isProfileComplete, getUserProfile } from './profileService'

export async function getDashboardAnalytics(userEmail) {
  const [tripsSnap, destinations, attractions, feedback, profile] = await Promise.all([
    userEmail
      ? getDocs(query(collection(db, COLLECTIONS.AI_TRIPS), where('userEmail', '==', userEmail)))
      : Promise.resolve({ docs: [] }),
    getAllDestinations(),
    getAllAttractions(),
    getAllFeedback(),
    userEmail ? getUserProfile(userEmail) : Promise.resolve(null),
  ])

  const trips = tripsSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
  const userFeedback = feedback.filter((f) => f.userEmail === userEmail)
  const destinationsVisited = new Set(
    trips.map((t) => t.userSelection?.location?.label).filter(Boolean)
  )

  const budgetBreakdown = trips.reduce((acc, trip) => {
    const b = trip.userSelection?.budget || 'Unknown'
    acc[b] = (acc[b] || 0) + 1
    return acc
  }, {})

  const avgTripDays = trips.length
    ? Math.round(
        trips.reduce((sum, t) => sum + Number(t.userSelection?.noOfDays || 0), 0) / trips.length
      )
    : 0

  return {
    totalTrips: trips.length,
    totalDestinations: destinations.length,
    totalAttractions: attractions.length,
    totalFeedback: feedback.length,
    userFeedbackCount: userFeedback.length,
    uniqueDestinationsVisited: destinationsVisited.size,
    profileComplete: isProfileComplete(profile),
    profile,
    recentTrips: trips
      .sort((a, b) => Number(b.id) - Number(a.id))
      .slice(0, 5),
    budgetBreakdown,
    avgTripDays,
    trips,
  }
}
