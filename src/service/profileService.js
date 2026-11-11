import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from './firebaseConfig'
import { COLLECTIONS } from '@/constants/travelGuide'

const defaultProfile = {
  name: '',
  country: '',
  budgetLevel: 'Moderate',
  interests: [],
  travelPace: 'balanced',
}

export async function getUserProfile(email) {
  if (!email) return null
  const ref = doc(db, COLLECTIONS.USER_PROFILES, email)
  const snap = await getDoc(ref)
  if (!snap.exists()) return { ...defaultProfile, email }
  return { email, ...defaultProfile, ...snap.data() }
}

export async function saveUserProfile(email, profile) {
  if (!email) throw new Error('Email required to save profile')
  const ref = doc(db, COLLECTIONS.USER_PROFILES, email)
  await setDoc(ref, {
    ...profile,
    email,
    updatedAt: new Date().toISOString(),
  }, { merge: true })
  return getUserProfile(email)
}

export function isProfileComplete(profile) {
  return Boolean(
    profile?.name?.trim() &&
    profile?.country?.trim() &&
    profile?.budgetLevel &&
    profile?.interests?.length > 0 &&
    profile?.travelPace
  )
}
