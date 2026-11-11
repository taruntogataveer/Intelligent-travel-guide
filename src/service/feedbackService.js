import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { db } from './firebaseConfig'
import { COLLECTIONS } from '@/constants/travelGuide'

export async function submitFeedback({ userEmail, targetType, targetId, targetName, rating, comment }) {
  const docRef = await addDoc(collection(db, COLLECTIONS.FEEDBACK), {
    userEmail,
    targetType,
    targetId,
    targetName,
    rating: Number(rating),
    comment: comment?.trim() || '',
    createdAt: new Date().toISOString(),
  })
  return docRef.id
}

export async function getFeedbackForTarget(targetType, targetId) {
  const q = query(
    collection(db, COLLECTIONS.FEEDBACK),
    where('targetType', '==', targetType),
    where('targetId', '==', targetId),
  )
  const snap = await getDocs(q)
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
}

export async function getAverageRating(targetType, targetId) {
  const items = await getFeedbackForTarget(targetType, targetId)
  if (!items.length) return { average: 0, count: 0 }
  const sum = items.reduce((acc, f) => acc + (f.rating || 0), 0)
  return { average: Math.round((sum / items.length) * 10) / 10, count: items.length }
}

export async function getAllFeedback() {
  const snap = await getDocs(collection(db, COLLECTIONS.FEEDBACK))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}
