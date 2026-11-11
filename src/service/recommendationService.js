import { SCORING_WEIGHTS, TRAVEL_INTERESTS, CATEGORY_INTEREST_MAP } from '@/constants/travelGuide'
import { getAllAttractions } from './attractionService'

const BUDGET_RANK = { Cheap: 1, Moderate: 2, Luxury: 3 }
const TIER_RANK = { cheap: 1, moderate: 2, luxury: 3 }

const INTEREST_LABELS = Object.fromEntries(
  TRAVEL_INTERESTS.map((i) => [i.id, i.label])
)

export function getScoringWeights() {
  return { ...SCORING_WEIGHTS }
}

function scoreInterests(userInterests, attractionInterests) {
  if (!userInterests?.length) return 0.5
  const overlap = userInterests.filter((i) => attractionInterests?.includes(i)).length
  return overlap / userInterests.length
}

function scoreBudget(userBudget, attractionTier) {
  const userRank = BUDGET_RANK[userBudget] || 2
  const attrRank = TIER_RANK[attractionTier] || 2
  const diff = Math.abs(userRank - attrRank)
  if (diff === 0) return 1
  if (diff === 1) return 0.7
  return 0.35
}

function scoreCompanions(traveler, familyFriendly, category) {
  const t = traveler?.toLowerCase() || ''
  const isFamily = t.includes('3 to 5') || t.includes('family')
  const isFriends = t.includes('5 to 10') || t.includes('friends')
  const isSolo = t.includes('1 person')

  if (isFamily && familyFriendly) return 1
  if (isFamily && category === 'nightlife') return 0.25
  if (isFamily && !familyFriendly) return 0.4
  if (isFriends && ['nightlife', 'restaurants', 'shopping'].includes(category)) return 1
  if (isSolo && ['museums', 'landmarks', 'restaurants'].includes(category)) return 0.9
  if (!isFamily && !familyFriendly) return 0.85
  return 0.75
}

function scoreDuration(days, category) {
  const d = Number(days) || 3
  if (d <= 3 && ['landmarks', 'museums'].includes(category)) return 1
  if (d >= 7 && ['parks', 'restaurants', 'shopping'].includes(category)) return 1
  if (d >= 5) return 0.85
  return 0.7
}

function buildReason(scores, attraction, preferences) {
  const reasons = []
  if (scores.interests >= 0.6) {
    const matched = preferences.interests?.filter((i) => attraction.interests?.includes(i)) || []
    if (matched.length) {
      const labels = matched.map((id) => INTEREST_LABELS[id] || id).join(', ')
      reasons.push(`Matches your interest in ${labels}`)
    }
  }
  if (scores.budget >= 0.7) reasons.push(`Fits your ${preferences.budget} budget`)
  if (scores.companions >= 0.8) reasons.push(`Suits traveling as ${preferences.traveler}`)
  if (scores.duration >= 0.85) reasons.push(`Ideal for a ${preferences.duration}-day trip`)
  if (!reasons.length) {
    reasons.push(`Popular ${attraction.category} in ${attraction.destinationName}`)
  }
  return reasons.join('. ') + '.'
}

export function scoreAttraction(attraction, preferences) {
  const scores = {
    interests: scoreInterests(preferences.interests, attraction.interests),
    budget: scoreBudget(preferences.budget, attraction.budgetTier),
    companions: scoreCompanions(preferences.traveler, attraction.familyFriendly, attraction.category),
    duration: scoreDuration(preferences.duration, attraction.category),
  }

  const raw =
    scores.interests * SCORING_WEIGHTS.interests +
    scores.budget * SCORING_WEIGHTS.budget +
    scores.companions * SCORING_WEIGHTS.companions +
    scores.duration * SCORING_WEIGHTS.duration

  const matchPercentage = Math.min(100, Math.round(raw * 100))

  return {
    ...attraction,
    matchPercentage,
    estimatedCost: attraction.estimatedCost || attraction.priceRange || 'Varies',
    reason: buildReason(scores, attraction, preferences),
    scores,
  }
}

/**
 * @param {Object} preferences
 * @param {string} [preferences.destination]
 * @param {string} [preferences.budget] - Cheap | Moderate | Luxury
 * @param {number|string} [preferences.duration] - trip days
 * @param {string} [preferences.traveler] - companion label
 * @param {string[]} [preferences.interests] - culture, food, nature, shopping, adventure, nightlife, family
 */
export async function getRecommendations(preferences, options = {}) {
  const { destinationId, limit = 12 } = options
  let attractions = await getAllAttractions()

  if (destinationId) {
    attractions = attractions.filter((a) => a.destinationId === destinationId)
  } else if (preferences.destination) {
    const dest = preferences.destination.toLowerCase()
    attractions = attractions.filter(
      (a) =>
        a.destinationName?.toLowerCase().includes(dest) ||
        a.country?.toLowerCase().includes(dest) ||
        dest.includes(a.destinationName?.toLowerCase())
    )
  }

  return attractions
    .map((a) => scoreAttraction(a, preferences))
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, limit)
}

export function mergeRecommendationsIntoItinerary(tripData, recommendations) {
  if (!recommendations?.length) return tripData
  return {
    ...tripData,
    recommendedAttractions: recommendations.map((r) => ({
      name: r.name,
      destinationName: r.destinationName,
      category: r.category,
      matchPercentage: r.matchPercentage,
      estimatedCost: r.estimatedCost,
      reason: r.reason,
      image: r.image,
      scores: r.scores,
    })),
  }
}

export function buildPreferencesFromTripForm(formData) {
  return {
    destination: formData?.location?.label,
    budget: formData?.budget || 'Moderate',
    duration: formData?.noOfDays || 3,
    traveler: formData?.traveler || '2 people',
    interests: formData?.interests?.length ? formData.interests : ['culture'],
  }
}

export { CATEGORY_INTEREST_MAP, TRAVEL_INTERESTS }
