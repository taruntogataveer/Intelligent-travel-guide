import axios from 'axios'

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText'
const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY

const PLACE_FIELD_MASK = [
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.rating',
  'places.userRatingCount',
  'places.photos',
  'places.location',
].join(',')

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': API_KEY,
    'X-Goog-FieldMask': PLACE_FIELD_MASK,
  }
}

export const PHOTO_REF_URL =
  'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1900&key=' + API_KEY

/** Low-level Google Places text search */
export const GetPlaceDetails = (data) =>
  axios.post(BASE_URL, data, { headers: getHeaders() })

export function buildPhotoUrl(photoReferenceName) {
  if (!photoReferenceName || !API_KEY) return null
  return PHOTO_REF_URL.replace('{NAME}', photoReferenceName)
}
