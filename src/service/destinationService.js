import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from './firebaseConfig'
import { COLLECTIONS } from '@/constants/travelGuide'
import { destinations as seedDestinations } from '@/data/destinations'

function normalizeId(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function getAllDestinations() {
  const snap = await getDocs(collection(db, COLLECTIONS.DESTINATIONS))
  const remote = snap.docs.map((d) => ({ id: d.id, source: 'firebase', ...d.data() }))
  const seedIds = new Set(seedDestinations.map((d) => d.id))
  const merged = [
    ...seedDestinations.map((d) => ({ ...d, source: 'seed' })),
    ...remote.filter((d) => !seedIds.has(d.id)),
  ]
  return merged
}

export async function getDestinationById(id) {
  const seed = seedDestinations.find((d) => d.id === id)
  if (seed) return { ...seed, source: 'seed' }

  const ref = doc(db, COLLECTIONS.DESTINATIONS, id)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return { id: snap.id, source: 'firebase', ...snap.data() }
}

export function searchDestinations(destinations, searchTerm) {
  const q = searchTerm?.trim().toLowerCase()
  if (!q) return destinations
  return destinations.filter((d) =>
    d.name?.toLowerCase().includes(q) ||
    d.country?.toLowerCase().includes(q) ||
    d.description?.toLowerCase().includes(q) ||
    d.popularAttractions?.some((a) => a.toLowerCase().includes(q))
  )
}

export async function saveDestination(destination) {
  const id = destination.id || normalizeId(`${destination.name}-${destination.country}`)
  const ref = doc(db, COLLECTIONS.DESTINATIONS, id)
  const payload = {
    ...destination,
    id,
    updatedAt: new Date().toISOString(),
  }
  await setDoc(ref, payload, { merge: true })
  return payload
}

export async function deleteDestination(id) {
  const seed = seedDestinations.find((d) => d.id === id)
  if (seed) throw new Error('Cannot delete seeded destinations')
  await deleteDoc(doc(db, COLLECTIONS.DESTINATIONS, id))
}

export async function getDestinationsByCountry(country) {
  const all = await getAllDestinations()
  return all.filter((d) => d.country?.toLowerCase() === country?.toLowerCase())
}
