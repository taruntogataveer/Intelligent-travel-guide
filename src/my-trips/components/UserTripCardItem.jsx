import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PlaceImage from '@/components/custom/PlaceImage'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Trash2 } from 'lucide-react'
import { deleteTrip } from '@/service/tripService'

function UserTripCardItem({ trip, onTripDeleted }) {
  const locationLabel = trip?.userSelection?.location?.label
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteClick = (e) => {
    e.preventDefault()
    setShowDeleteDialog(true)
  }

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true)
      await deleteTrip(trip?.id)
      setShowDeleteDialog(false)
      if (onTripDeleted) {
        onTripDeleted(trip?.id)
      }
    } catch (error) {
      console.error('Error deleting trip:', error)
      alert('Failed to delete trip. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Link to={`/view-trip/${trip?.id}`}>
        <div className='hover:scale-105 transition-all relative group'>
          <PlaceImage
            placeName={locationLabel}
            category='destination'
            alt={locationLabel}
            className='object-cover rounded-xl h-[220px] w-full'
            skeletonClassName='h-[220px] w-full'
          />
          <Button
            onClick={handleDeleteClick}
            variant='destructive'
            size='icon'
            className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'
            title='Delete trip'
          >
            <Trash2 className='h-4 w-4' />
          </Button>
          <div>
            <h2 className='font-bold text-lg'>{locationLabel}</h2>
            <h2 className='text-sm text-muted-foreground'>
              {trip?.userSelection?.noOfDays}-day travel guide · {trip?.userSelection?.budget} budget
            </h2>
          </div>
        </div>
      </Link>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Travel Plan</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your travel plan for {locationLabel}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setShowDeleteDialog(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant='destructive'
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default UserTripCardItem
