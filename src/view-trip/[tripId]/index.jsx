import { db } from '@/service/firebaseConfig';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';
import RecommendedAttractions from '../components/RecommendedAttractions';
import { normalizeTripData } from '@/lib/tripData';

function Viewtrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState([])

    useEffect(() => {
        tripId && GetTripData()
    }, [tripId])

    // used to get trip info from firebase
    const GetTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("Document: ", data)
            setTrip({
                ...data,
                tripData: normalizeTripData(data.tripData),
            });
        }

        else {
            console.log("No such document")
            toast("No travel plan found")
        }

    }

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {/* Information Section */}
            <InfoSection trip={trip} />

            {/* Recommended Hotels */}
            <Hotels trip={trip} />

            {/* Intelligent Recommendations */}
            <RecommendedAttractions trip={trip} />

            {/* Daily Plan */}
            <PlacesToVisit trip={trip} />

            {/* Footer */}
            <Footer trip={trip} />

        </div>
    )
}

export default Viewtrip