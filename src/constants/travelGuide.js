export const COLLECTIONS = {
  USER_PROFILES: 'UserProfiles',
  DESTINATIONS: 'Destinations',
  ATTRACTIONS: 'Attractions',
  FEEDBACK: 'Feedback',
  AI_TRIPS: 'AITrips',
}

export const TRAVEL_INTERESTS = [
  { id: 'culture', label: 'Culture', icon: '🏛️' },
  { id: 'food', label: 'Food', icon: '🍽️' },
  { id: 'nature', label: 'Nature', icon: '🌳' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'adventure', label: 'Adventure', icon: '🧗' },
  { id: 'nightlife', label: 'Nightlife', icon: '🌙' },
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧' },
]

export const TRAVEL_PACE_OPTIONS = [
  { id: 'relaxed', label: 'Relaxed', desc: 'Fewer activities, more downtime' },
  { id: 'balanced', label: 'Balanced', desc: 'Mix of sights and rest' },
  { id: 'packed', label: 'Packed', desc: 'Maximize sights each day' },
]

export const BUDGET_LEVELS = ['Cheap', 'Moderate', 'Luxury']

export const CATEGORY_INTEREST_MAP = {
  museums: ['culture', 'family'],
  landmarks: ['culture', 'adventure', 'family'],
  parks: ['nature', 'family'],
  restaurants: ['food'],
  shopping: ['shopping'],
  nightlife: ['nightlife'],
}

export const SCORING_WEIGHTS = {
  interests: 0.4,
  budget: 0.25,
  companions: 0.2,
  duration: 0.15,
}
