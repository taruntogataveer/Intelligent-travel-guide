# Intelligent Travel Guide — Implementation Plan

## Architecture Overview

```
src/
├── constants/travelGuide.js     # Shared enums, Firestore collection names
├── service/                     # Modular service layer (Firebase + business logic)
│   ├── profileService.js
│   ├── destinationService.js
│   ├── attractionService.js
│   ├── feedbackService.js
│   ├── recommendationService.js
│   ├── analyticsService.js
│   └── tripService.js
├── hooks/useCurrentUser.js
├── components/
│   ├── recommendation/RecommendationCard.jsx
│   ├── feedback/FeedbackForm.jsx
│   └── dashboard/StatCard.jsx
├── profile/                     # Module 1: User Profile
├── destinations/                # Module 2 & 8: Destination Guide + Search
├── manage/                      # Module 2 & 3: Destination & Attraction CRUD
├── recommendations/             # Module 6: Intelligent Recommendations
├── dashboard/                   # Module 10: Dashboard Analytics
├── create-trip/                 # Module 5: AI Itinerary Generator (enhanced)
├── assistant/                   # Module 7: Travel Assistant Chatbot
└── my-trips/                    # Module 9: Trip History
```

## Firestore Collections

| Collection      | Purpose                                      |
|-----------------|----------------------------------------------|
| `UserProfiles`  | Name, country, budget, interests, pace       |
| `Destinations`  | User-managed destinations (seed + CRUD)        |
| `Attractions`   | Standalone attractions linked to destinations  |
| `Feedback`      | Ratings & comments on destinations/attractions |
| `AITrips`       | Generated itineraries + recommendation snapshot |

## Module Phases

### Phase 1 — Foundation ✅
- Constants, service layer, `useCurrentUser` hook

### Phase 2 — User Profile ✅
- `/profile` — save/load profile from Firestore
- Prefill itinerary generator from profile

### Phase 3 — Destination & Attraction Management ✅
- `/manage/destinations` — CRUD destinations
- `/manage/attractions` — CRUD attractions
- Merge mock seed data with Firestore records

### Phase 4 — Intelligent Recommendations ✅
- Scoring: budget, duration, interests, companions
- `/recommendations` — ranked attraction cards
- Inject recommendations into generated itineraries

### Phase 5 — Feedback & Search ✅
- Feedback form on destination detail pages
- Destination search/filter on `/destinations`

### Phase 6 — Dashboard & Integration ✅
- `/dashboard` — analytics summary
- Header navigation for all modules
- Trip history via existing `/my-trips`

## Recommendation Scoring Weights

| Factor            | Weight | Logic                                              |
|-------------------|--------|----------------------------------------------------|
| Interest match    | 40%    | Overlap between user interests & attraction tags   |
| Budget alignment  | 25%    | User budget tier vs attraction cost tier           |
| Travel companions | 20%    | Family groups favor family-friendly attractions    |
| Trip duration     | 15%    | Short trips favor landmarks; long trips favor variety |

## Interest → Attraction Category Map

- **Culture** → museums, landmarks
- **Food** → restaurants
- **Nature** → parks
- **Shopping** → shopping
- **Adventure** → landmarks, parks
- **Nightlife** → nightlife
- **Family** → parks, museums, landmarks
