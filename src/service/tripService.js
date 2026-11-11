import { doc, getDoc, setDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore'
import { db } from './firebaseConfig'
import { COLLECTIONS } from '@/constants/travelGuide'

export async function saveTrip(trip) {
  const id = trip.id || Date.now().toString()
  await setDoc(doc(db, COLLECTIONS.AI_TRIPS, id), { ...trip, id })
  return id
}

export async function getTripById(tripId) {
  const snap = await getDoc(doc(db, COLLECTIONS.AI_TRIPS, tripId))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() }
}

export async function getUserTrips(userEmail) {
  if (!userEmail) return []
  const q = query(collection(db, COLLECTIONS.AI_TRIPS), where('userEmail', '==', userEmail))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function deleteTrip(tripId) {
  await deleteDoc(doc(db, COLLECTIONS.AI_TRIPS, tripId))
}
