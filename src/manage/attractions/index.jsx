import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/service/firebaseConfig'
import { COLLECTIONS } from '@/constants/travelGuide'
import {
  saveAttraction,
  deleteAttraction,
  getCategoryOptions,
} from '@/service/attractionService'
import { getAllDestinations } from '@/service/destinationService'
import { getCurrentUserEmail } from '@/hooks/useCurrentUser'

const emptyForm = {
  name: '',
  destinationId: '',
  category: 'landmarks',
  description: '',
  priceRange: '',
  rating: '',
  image: '',
}

function ManageAttractionsPage() {
  const [attractions, setAttractions] = useState([])
  const [destinations, setDestinations] = useState([])
  const [form, setForm] = useState(emptyForm)
  const categories = getCategoryOptions()

  const load = async () => {
    const [snap, d] = await Promise.all([
      getDocs(collection(db, COLLECTIONS.ATTRACTIONS)),
      getAllDestinations(),
    ])
    setAttractions(snap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })))
    setDestinations(d)
  }

  useEffect(() => {
    load()
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    if (!getCurrentUserEmail()) {
      toast.error('Sign in to manage attractions')
      return
    }
    const dest = destinations.find((d) => d.id === form.destinationId)
    try {
      await saveAttraction({
        ...form,
        destinationName: dest?.name,
        country: dest?.country,
        source: 'firebase',
      })
      toast.success('Attraction saved')
      setForm(emptyForm)
      load()
    } catch (error) {
      toast.error('Save failed')
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteAttraction(id)
      toast.success('Deleted')
      load()
    } catch {
      toast.error('Delete failed')
    }
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10 pb-16'>
      <h1 className='font-bold text-3xl'>Attraction Management</h1>
      <p className='text-muted-foreground mt-2'>Add custom attractions to Firebase linked to destinations.</p>

      <form onSubmit={handleSave} className='mt-8 grid gap-4 max-w-xl border rounded-xl p-6'>
        <h2 className='font-bold'>Add Attraction</h2>
        <select
          className='h-10 border rounded-md px-3'
          value={form.destinationId}
          onChange={(e) => setForm({ ...form, destinationId: e.target.value })}
          required
        >
          <option value=''>Select destination</option>
          {destinations.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
        <select
          className='h-10 border rounded-md px-3'
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {categories.map((c) => (
            <option key={c.key} value={c.key}>{c.label}</option>
          ))}
        </select>
        <Input placeholder='Name' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <Input placeholder='Description' value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <Input placeholder='Price range' value={form.priceRange} onChange={(e) => setForm({ ...form, priceRange: e.target.value })} />
        <Input placeholder='Rating' value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} />
        <Input placeholder='Image URL' value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <Button type='submit'>Save Attraction</Button>
      </form>

      <div className='mt-10'>
        <h2 className='font-bold text-lg mb-4'>Firebase Attractions ({attractions.length})</h2>
        <div className='space-y-3'>
          {attractions.map((a) => (
            <div key={a.id} className='flex justify-between items-center border rounded-lg p-4'>
              <div>
                <p className='font-bold'>{a.name}</p>
                <p className='text-sm text-muted-foreground'>{a.destinationName} · {a.category}</p>
              </div>
              <Button size='sm' variant='outline' onClick={() => handleDelete(a.id)}>Delete</Button>
            </div>
          ))}
          {!attractions.length ? (
            <p className='text-muted-foreground text-sm'>No custom attractions yet.</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default ManageAttractionsPage
