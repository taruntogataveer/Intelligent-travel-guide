import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripId]/index.jsx'
import MyTrips from './my-trips/index.jsx'
import DestinationsPage from './destinations/index.jsx'
import DestinationPage from './destinations/[destinationId]/index.jsx'
import AssistantPage from './assistant/index.jsx'
import ProfilePage from './profile/index.jsx'
import RecommendationsPage from './recommendations/index.jsx'
import DashboardPage from './dashboard/index.jsx'
import ManageDestinationsPage from './manage/destinations/index.jsx'
import ManageAttractionsPage from './manage/attractions/index.jsx'
import { ThemeProvider } from './components/theme-provider.jsx'

const router = createBrowserRouter([{
  path: '/',
  element: <App />
},
{
  path:'/create-trip',
  element: <CreateTrip />
},
{
  path: '/view-trip/:tripId',
  element: <Viewtrip />
},
{
  path: '/my-trips',
  element: <MyTrips />
},
{
  path: '/destinations',
  element: <DestinationsPage />
},
{
  path: '/destinations/:destinationId',
  element: <DestinationPage />
},
{
  path: '/assistant',
  element: <AssistantPage />
},
{
  path: '/profile',
  element: <ProfilePage />
},
{
  path: '/recommendations',
  element: <RecommendationsPage />
},
{
  path: '/dashboard',
  element: <DashboardPage />
},
{
  path: '/manage/destinations',
  element: <ManageDestinationsPage />
},
{
  path: '/manage/attractions',
  element: <ManageAttractionsPage />
}

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
        <Header />
        <Toaster />
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
