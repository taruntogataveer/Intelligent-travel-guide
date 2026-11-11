export const SelectTravelList = [
    {
        id:1,
        title: 'Just Me',
        desc: 'A sole traveles in exploration',
        icon: '✈️',
        people:'1 person'
    },
    {
        id:2,
        title: 'A Couple',
        desc: 'Two traveles in tandem',
        icon: '🥂',
        people:'2 people'
    },
    {
        id:3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: '🏡',
        people:'3 to 5 People'
    },
    {
        id:4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekes',
        icon: '⛵',
        people:'5 to 10 people'
    }
]

export const POPULAR_DESTINATIONS = [
    { label: 'Paris, France', icon: '🇫🇷' },
    { label: 'London, United Kingdom', icon: '🇬🇧' },
    { label: 'New York, USA', icon: '🇺🇸' },
    { label: 'Tokyo, Japan', icon: '🇯🇵' },
    { label: 'Dubai, UAE', icon: '🇦🇪' },
    { label: 'Bali, Indonesia', icon: '🇮🇩' },
    { label: 'Rome, Italy', icon: '🇮🇹' },
    { label: 'Barcelona, Spain', icon: '🇪🇸' },
    { label: 'Singapore', icon: '🇸🇬' },
    { label: 'Sydney, Australia', icon: '🇦🇺' },
    { label: 'Bangkok, Thailand', icon: '🇹🇭' },
    { label: 'Goa, India', icon: '🇮🇳' },
    { label: 'Los Angeles, USA', icon: '🌴' },
    { label: 'Istanbul, Turkey', icon: '🇹🇷' },
    { label: 'Maldives', icon: '🏝️' },
    { label: 'Kyoto, Japan', icon: '⛩️' },
    { label: 'Amsterdam, Netherlands', icon: '🇳🇱' },
    { label: 'Switzerland', icon: '🇨🇭' },
]

export const SelectBudgetOptions = [
    {
        id:1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵',
    },
    {
        id:2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰',
    },
    {
        id:3,
        title: 'Luxury',
        desc: 'Dont worry about cost',
        icon: '💸',
    }
]

export const AI_PROMPT = 'Generate a detailed Travel Guide for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget. Provide destination guidance with a Hotels options list (Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions) and a suggested itinerary with place Name, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, and best time to visit each location for {totalDays} days with each day plan in JSON format'