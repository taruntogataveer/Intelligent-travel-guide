import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import React, { useEffect, useState } from 'react'
import DestinationPicker from '@/components/custom/DestinationPicker'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { parseTripDataFromAI } from '@/lib/tripData';
import { getUserProfile } from '@/service/profileService';
import {
  getRecommendations,
  mergeRecommendationsIntoItinerary,
  buildPreferencesFromTripForm,
} from '@/service/recommendationService';
import { TRAVEL_INTERESTS } from '@/constants/travelGuide';
import { saveTrip } from '@/service/tripService';

function CreateTrip() {
  const [formData, setFormData] = useState({});

  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {

    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    if (!user?.email) return
    getUserProfile(user.email).then((profile) => {
      if (!profile) return
      setFormData((prev) => ({
        ...prev,
        budget: profile.budgetLevel || prev.budget,
        interests: profile.interests || prev.interests,
        travelPace: profile.travelPace || prev.travelPace,
      }))
    })
  }, [])

  const onGenerateTrip = async () => {

    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true)
      return;
    }

    if (!formData?.location?.label || !formData?.noOfDays || !formData?.budget || !formData?.traveler) {
      toast('Please fill all the details')
      return;
    }

    setLoading(true)

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)

    // console.log(FINAL_PROMPT)

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLoading(false)
    SaveAiTrip(result?.response?.text())
  }

  const SaveAiTrip = async (TripData) => {
    setLoading(true)
    const user = JSON.parse(localStorage.getItem('user'))
    const docId = Date.now().toString();

    let tripData;
    try {
      tripData = parseTripDataFromAI(TripData);
    } catch (error) {
      console.error('Failed to parse AI trip data:', error);
      toast.error('Could not read the travel guide. Please try generating again.');
      setLoading(false);
      return;
    }

    const recommendations = await getRecommendations(
      buildPreferencesFromTripForm(formData),
      { limit: 6 }
    )

    tripData = mergeRecommendationsIntoItinerary(tripData, recommendations)

    await saveTrip({
      userSelection: formData,
      tripData,
      recommendations,
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false)
    navigate('/view-trip/' + docId)
  }

  const login = useGoogleLogin({
    onSuccess: (res) => GetUserProfile(res),
    onError: (error) => console.log(error)
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'application/json',
      },
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenerateTrip();
    }).catch((error) => {
      console.error("Error fetching user profile: ", error);
    });
  }


  return (
    <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Build your travel guide 🏕️🌴</h2>
      <p className='mt-3 text-muted-foreground text-xl'>Share a few details about where you want to go, and our intelligent travel guide will create personalized recommendations, attraction insights, and a day-by-day itinerary for you.</p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination?</h2>
          <DestinationPicker
            value={formData?.location}
            onChange={(location) => handleInputChange('location', location)}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days will you be traveling?</h2>
          <Input placeholder={'Ex.4'} type='number' onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
        </div>


        <div>
          <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget == item.title && 'shadow-lg border-primary'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-muted-foreground'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What are your travel interests?</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-5'>
            {TRAVEL_INTERESTS.map((item) => {
              const selected = formData?.interests?.includes(item.id)
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    const current = formData?.interests || []
                    handleInputChange(
                      'interests',
                      selected ? current.filter((i) => i !== item.id) : [...current, item.id]
                    )
                  }}
                  className={`p-3 border cursor-pointer rounded-lg hover:shadow-lg text-center ${
                    selected ? 'shadow-lg border-primary bg-muted' : ''
                  }`}
                >
                  <span className='text-2xl'>{item.icon}</span>
                  <p className='font-medium text-sm mt-1'>{item.label}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.traveler == item.people && 'shadow-lg border-primary'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-muted-foreground'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Travel Guide'}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="logo" width="100px" className='items-center' />
              <h2 className='font-bold text-lg'>Sign in to access your travel guide</h2>
              <p>Sign in securely with Google to generate and save your travel plans</p>
              <Button
                onClick={login}
                className="w-full mt-6 flex gap-4 items-center">
                <FcGoogle className="h-7 w-7" />Sign in With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>
  )
}

export default CreateTrip