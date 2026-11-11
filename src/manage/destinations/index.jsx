import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { getAllDestinations, saveDestination, deleteDestination } from '@/service/destinationService'
import { getCurrentUserEmail } from '@/hooks/useCurrentUser'

const emptyForm = {
  name: '',
  country: '',
  description: '',
  bestSeason: '',
  image: '',
}

function ManageDestinationsPage() {
  const [destinations, setDestinations] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  const load = () => getAllDestinations().then(setDestinations)

  useEffect(() => {
    load()
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    if (!getCurrentUserEmail()) {
      toast.error('Sign in to manage destinations')
      return
    }
    try {
      await saveDestination(editingId ? { ...form, id: editingId } : form)
      toast.success(editingId ? 'Destination updated' : 'Destination added')
      setForm(emptyForm)
      setEditingId(null)
      load()
    } catch (error) {
      toast.error(error.message || 'Save failed')
    }
  }

  const handleEdit = (dest) => {
    if (dest.source === 'seed') {
      toast.error('Seed destinations are read-only. Add a new custom destination instead.')
      return
    }
    setEditingId(dest.id)
    setForm({
      name: dest.name,
      country: dest.country,
      description: dest.description,
      bestSeason: dest.bestSeason,
      image: dest.image,
    })
  }

  const handleDelete = async (dest) => {
    if (dest.source === 'seed') return
    try {
      await deleteDestination(dest.id)
      toast.success('Deleted')
      load()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10 pb-16'>
      <h1 className='font-bold text-3xl'>Destination Management</h1>
      <p className='text-muted-foreground mt-2'>Add and manage destinations in Firebase (seed data is read-only).</p>

      <form onSubmit={handleSave} className='mt-8 grid gap-4 max-w-xl border rounded-xl p-6'>
        <h2 className='font-bold'>{editingId ? 'Edit Destination' : 'Add Destination'}</h2>
        <Input placeholder='Name' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <Input placeholder='Country' value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} required />
        <Input placeholder='Best season' value={form.bestSeason} onChange={(e) => setForm({ ...form, bestSeason: e.target.value })} />
        <Input placeholder='Image URL' value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <Input placeholder='Description' value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <div className='flex gap-2'>
          <Button type='submit'>{editingId ? 'Update' : 'Add'}</Button>
          {editingId ? (
            <Button type='button' variant='outline' onClick={() => { setEditingId(null); setForm(emptyForm) }}>
              Cancel
            </Button>
          ) : null}
        </div>
      </form>

      <div className='mt-10 space-y-3'>
        {destinations.map((d) => (
          <div key={d.id} className='flex items-center justify-between border rounded-lg p-4'>
            <div>
              <p className='font-bold'>{d.name}, {d.country}</p>
              <p className='text-xs text-muted-foreground'>{d.source === 'seed' ? 'Seed data' : 'Firebase'}</p>
            </div>
            <div className='flex gap-2'>
              <Button size='sm' variant='outline' onClick={() => handleEdit(d)}>Edit</Button>
              {d.source !== 'seed' ? (
                <Button size='sm' variant='outline' onClick={() => handleDelete(d)}>Delete</Button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageDestinationsPage
