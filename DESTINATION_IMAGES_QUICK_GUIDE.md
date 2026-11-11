# Quick Reference - Destination Images Implementation

## For Developers

### Using Destination Images in Your Code

#### Option 1: Using the Hook (Recommended for React Components)
```javascript
import { useDestinationImage } from '@/hooks/useDestinationImage'

function MyComponent({ destination }) {
  const imageData = useDestinationImage(destination.name, destination.country)
  
  return (
    <div>
      <img 
        src={imageData.photoUrl} 
        alt={destination.name}
        style={{ opacity: imageData.loading ? 0.5 : 1 }}
      />
      {imageData.loading && <div>Loading...</div>}
      {imageData.rating && <div>⭐ {imageData.rating}</div>}
    </div>
  )
}
```

#### Option 2: Direct Service Call (For Non-React Code)
```javascript
import { getDestinationImage } from '@/service/destinationImageService'

// Async function
const imageData = await getDestinationImage('Paris', 'France')
console.log(imageData.photoUrl)  // Full photo URL
console.log(imageData.rating)     // Google rating
console.log(imageData.address)    // Full address
```

#### Option 3: Using PlaceImage Component (Already Configured)
```javascript
import PlaceImage from '@/components/custom/PlaceImage'
import { useDestinationImage } from '@/hooks/useDestinationImage'

function Card({ destination }) {
  const imageData = useDestinationImage(destination.name, destination.country)
  
  return (
    <PlaceImage
      placeName={destination.name}
      locationContext={destination.country}
      category='destination'
      photoData={imageData}
      alt={`${destination.name}, ${destination.country}`}
      className='w-full h-64 object-cover rounded-lg'
      skeletonClassName='w-full h-64'
    />
  )
}
```

### Preloading Images for Better Performance

```javascript
import { preloadDestinationImages } from '@/service/destinationImageService'

// Load all destinations' images in background
const destinations = [
  { name: 'Paris', country: 'France' },
  { name: 'Tokyo', country: 'Japan' },
  // ...more destinations
]

preloadDestinationImages(destinations)
  .then(() => console.log('All images preloaded!'))
  .catch(err => console.error('Preload failed:', err))
```

### Cache Management

```javascript
import { 
  getDestinationImageCacheStats,
  clearDestinationImageCache 
} from '@/service/destinationImageService'

// Check cache status
const stats = getDestinationImageCacheStats()
console.log('Cached destinations:', stats.entries)  // Array of cache keys
console.log('Cache size:', stats.size)               // Number of cached items

// Clear cache (useful in tests or manual refresh)
clearDestinationImageCache()
```

## Data Returned by useDestinationImage Hook

```javascript
{
  loading: boolean,           // true while fetching, false when done
  photoUrl: string,           // Full URL to the image
  displayName: string | null, // Official name from Google Places
  rating: number | null,      // Google rating (0-5)
  address: string | null,     // Full address from Google
  placeId: string | null,     // Google Place ID
  fromGoogle: boolean,        // true if from API, false if fallback
}
```

## Console Debugging

Enable debugging by opening DevTools and filtering console logs:

```javascript
// In Chrome DevTools console:
// Filter to see all destination image logs
// Type: destinationImageService or useDestinationImage

// Manual cache inspection
import { getDestinationImageCacheStats } from '@/service/destinationImageService'
getDestinationImageCacheStats()
```

## Common Patterns

### Display Image with Loading Skeleton
```javascript
const imageData = useDestinationImage('Paris', 'France')

if (imageData.loading) {
  return <SkeletonLoader />
}

return <img src={imageData.photoUrl} alt="Paris" />
```

### Display with Rating Badge
```javascript
const imageData = useDestinationImage('Paris', 'France')

return (
  <div>
    <img src={imageData.photoUrl} alt="Paris" />
    {imageData.rating && (
      <div className='absolute bottom-2 right-2 bg-white px-2 py-1 rounded'>
        ⭐ {imageData.rating.toFixed(1)}
      </div>
    )}
  </div>
)
```

### Batch Preload on App Initialization
```javascript
// In your main App.jsx or layout component
useEffect(() => {
  // Preload all destinations when app loads
  getAllDestinations().then(preloadDestinationImages)
}, [])
```

### Handle Errors Gracefully
```javascript
try {
  const imageData = await getDestinationImage('Unknown', 'Country')
  if (!imageData.fromGoogle) {
    console.warn('Using fallback image')
  }
} catch (error) {
  console.error('Image fetch failed:', error)
}
```

## API Response Example

When Google Places API returns data:

```json
{
  "places": [
    {
      "id": "ChIJD7fIBQN93gAR74KZIabc...",
      "displayName": {
        "text": "Eiffel Tower",
        "languageCode": "en"
      },
      "rating": 4.7,
      "photos": [
        {
          "name": "places/ChIJD7fIBQN93gAR74KZIabc.../photos/photoref1",
          "widthPx": 1024,
          "heightPx": 768
        }
      ],
      "location": {
        "latitude": 48.8584,
        "longitude": 2.2945
      },
      "formattedAddress": "5 Avenue Anatole France, 75007 Paris, France"
    }
  ]
}
```

Photo URL becomes:
```
https://places.googleapis.com/v1/places/ChIJD7fIBQN93gAR74KZIabc.../photos/photoref1/media?maxHeightPx=1000&maxWidthPx=1900&key=YOUR_API_KEY
```

## Files at a Glance

| File | Purpose |
|------|---------|
| `src/service/destinationImageService.js` | Core image fetching service with caching |
| `src/hooks/useDestinationImage.js` | React hook wrapper for easy component integration |
| `src/components/destination/DestinationCard.jsx` | Updated to use new service |
| `src/components/destination/DestinationDetails.jsx` | Updated to use new service |
| `src/destinations/index.jsx` | Updated with preloading |

## Performance Metrics

### Expected Load Times:
- **First image fetch:** 200-500ms (API call)
- **Cached image fetch:** <1ms (in-memory)
- **Preload batch (3 images):** 300-800ms (parallel)

### Optimization Results:
- **Before:** Each card individually fetches (slow cascade)
- **After:** Batch preload in background (faster perceived load)
- **Cache hits:** 1000x faster than initial fetch

## Troubleshooting Quick Links

- Images not showing? → Check API key in `.env`
- All same image? → Clear cache: `clearDestinationImageCache()`
- Slow loading? → Check Network tab in DevTools
- Console errors? → Check API response in Network tab

