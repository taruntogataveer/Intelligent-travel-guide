import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { submitFeedback, getAverageRating, getFeedbackForTarget } from '@/service/feedbackService'
import { getCurrentUserEmail } from '@/hooks/useCurrentUser'

function FeedbackForm({ targetType, targetId, targetName }) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState({ average: 0, count: 0 })
  const [recent, setRecent] = useState([])

  const loadFeedback = async () => {
    const [avg, items] = await Promise.all([
      getAverageRating(targetType, targetId),
      getFeedbackForTarget(targetType, targetId),
    ])
    setSummary(avg)
    setRecent(items.slice(0, 3))
  }

  useEffect(() => {
    loadFeedback()
  }, [targetType, targetId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = getCurrentUserEmail()
    if (!email) {
      toast.error('Sign in to leave feedback')
      return
    }
    setLoading(true)
    try {
      await submitFeedback({
        userEmail: email,
        targetType,
        targetId,
        targetName,
        rating,
        comment,
      })
      toast.success('Thank you for your feedback!')
      setComment('')
      setRating(5)
      await loadFeedback()
    } catch (error) {
      console.error(error)
      toast.error('Could not submit feedback')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='border rounded-xl p-6 bg-muted mt-10'>
      <h2 className='font-bold text-xl'>Feedback & Ratings</h2>
      <p className='text-sm text-muted-foreground mt-1'>
        {summary.count > 0
          ? `Average rating: ${summary.average} / 5 (${summary.count} reviews)`
          : 'No reviews yet — be the first!'}
      </p>

      <form onSubmit={handleSubmit} className='mt-4 space-y-3 max-w-lg'>
        <div>
          <label className='text-sm font-medium'>Your rating</label>
          <Input
            type='number'
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className='mt-1 w-24'
          />
        </div>
        <div>
          <label className='text-sm font-medium'>Comment</label>
          <Input
            placeholder='Share your experience...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='mt-1'
          />
        </div>
        <Button type='submit' disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </form>

      {recent.length > 0 ? (
        <div className='mt-6 space-y-3'>
          <h3 className='font-medium text-sm text-foreground'>Recent reviews</h3>
          {recent.map((item) => (
            <div key={item.id} className='bg-card border rounded-lg p-3 text-sm'>
              <p className='font-medium'>⭐ {item.rating}/5</p>
              <p className='text-muted-foreground mt-1'>{item.comment || 'No comment'}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default FeedbackForm
