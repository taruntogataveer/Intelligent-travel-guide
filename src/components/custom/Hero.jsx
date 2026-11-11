import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const guideFeatures = [
  {
    icon: '🌍',
    title: 'Destination Recommendations',
    description: 'Discover where to go based on your interests, budget, and travel style.',
  },
  {
    icon: '🏛️',
    title: 'Attraction Information',
    description: 'Get details on landmarks, museums, neighborhoods, and must-see spots.',
  },
  {
    icon: '🗺️',
    title: 'Personalized Itineraries',
    description: 'Receive day-by-day guides with timings, places to visit, and hotel suggestions.',
  },
  {
    icon: '🧭',
    title: 'Travel Assistance',
    description: 'Practical guidance on budgeting, pacing, and making the most of every destination.',
  },
]

function Hero() {
  return (
    <div className='flex flex-col items-center px-5 sm:px-10 md:px-20 lg:px-32 xl:px-56 gap-10 pb-16'>
      <div className='text-center mt-10 max-w-4xl'>
        <p className='text-sm font-semibold uppercase tracking-wide text-[#f56551] mb-3'>
          AI-Powered Travel Guide
        </p>
        <h1 className='font-extrabold text-4xl sm:text-5xl lg:text-[50px] leading-tight'>
          <span className='text-[#f56551]'>Intelligent Travel Guide</span>
          {' '}— Your Smart Companion for Every Journey
        </h1>
        <p className='text-lg sm:text-xl text-muted-foreground mt-6'>
          An AI-powered travel guide that helps you explore the world with confidence.
          Get destination recommendations, attraction insights, personalized itineraries,
          and practical travel assistance — all tailored to how you like to travel.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-6xl'>
        {guideFeatures.map((feature) => (
          <div
            key={feature.title}
            className='border rounded-xl p-5 bg-card shadow-sm hover:shadow-md transition-shadow'
          >
            <span className='text-3xl'>{feature.icon}</span>
            <h2 className='font-bold text-lg mt-3'>{feature.title}</h2>
            <p className='text-sm text-muted-foreground mt-2'>{feature.description}</p>
          </div>
        ))}
      </div>

      <div className='flex flex-wrap gap-4 justify-center'>
        <Link to={'/destinations'}>
          <Button variant='outline' className='text-base px-8 py-6'>Explore Destinations</Button>
        </Link>
        <Link to={'/create-trip'}>
          <Button className='text-base px-8 py-6'>Get Started — It&apos;s Free</Button>
        </Link>
      </div>

      <img
        src="/landing.png"
        alt="Intelligent Travel Guide app preview"
        className='w-full max-w-[750px] rounded-xl'
      />
    </div>
  )
}

export default Hero
