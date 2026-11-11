import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore'
import { db } from './firebaseConfig'
import { COLLECTIONS, CATEGORY_INTEREST_MAP } from '@/constants/travelGuide'
import { ATTRACTION_CATEGORIES } from '@/data/destinations'
import { getAllDestinations } from './destinationService'

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function parseBudgetTier(priceRange = '') {
  const text = priceRange.toLowerCase()
  if (text.includes('free') || text.includes('bargain') || text.includes('₹') && !text.includes('000')) return 'cheap'
  if (text.includes('€€€€') || text.includes('$$$$') || text.includes('luxury') || text.includes('1500')) return 'luxury'
  if (text.includes('€€€') || text.includes('$$$') || text.includes('moderate')) return 'moderate'
  if (text.includes('€€') || text.includes('$$')) return 'moderate'
  return 'moderate'
}

function enrichAttraction(attraction, destination, category) {
  const interests = CATEGORY_INTEREST_MAP[category] || ['culture']
  return {
    ...attraction,
    id: attraction.id || `${destination.id}-${category}-${slugify(attraction.name)}`,
    destinationId: destination.id,
    destinationName: destination.name,
    country: destination.country,
    category,
    interests,
    familyFriendly: ['parks', 'museums', 'landmarks'].includes(category),
    budgetTier: parseBudgetTier(attraction.priceRange),
    estimatedCost: attraction.priceRange || 'Varies',
  }
}

export function flattenDestinationAttractions(destination) {
  if (!destination?.attractions) return []
  return Object.entries(destination.attractions).flatMap(([category, items]) =>
    (items || []).map((item) => enrichAttraction(item, destination, category))
  )
}

export async function getAllAttractions() {
  const destinations = await getAllDestinations()
  const fromDestinations = destinations.flatMap(flattenDestinationAttractions)

  const snap = await getDocs(collection(db, COLLECTIONS.ATTRACTIONS))
  const remote = snap.docs.map((d) => ({
    id: d.id,
    source: 'firebase',
    ...d.data(),
    interests: d.data().interests || CATEGORY_INTEREST_MAP[d.data().category] || ['culture'],
    budgetTier: d.data().budgetTier || parseBudgetTier(d.data().priceRange),
    estimatedCost: d.data().estimatedCost || d.data().priceRange || 'Varies',
  }))

  const ids = new Set(fromDestinations.map((a) => a.id))
  return [...fromDestinations, ...remote.filter((a) => !ids.has(a.id))]
}

export async function getAttractionsByDestination(destinationId) {
  const all = await getAllAttractions()
  return all.filter((a) => a.destinationId === destinationId)
}

export async function saveAttraction(attraction) {
  const id = attraction.id || `${attraction.destinationId}-${slugify(attraction.name)}`
  const ref = doc(db, COLLECTIONS.ATTRACTIONS, id)
  const payload = {
    ...attraction,
    id,
    interests: attraction.interests || CATEGORY_INTEREST_MAP[attraction.category] || ['culture'],
    budgetTier: attraction.budgetTier || parseBudgetTier(attraction.priceRange),
    estimatedCost: attraction.estimatedCost || attraction.priceRange || 'Varies',
    updatedAt: new Date().toISOString(),
  }
  await setDoc(ref, payload, { merge: true })
  return payload
}

export async function deleteAttraction(id) {
  await deleteDoc(doc(db, COLLECTIONS.ATTRACTIONS, id))
}

export function getCategoryOptions() {
  return ATTRACTION_CATEGORIES
}
