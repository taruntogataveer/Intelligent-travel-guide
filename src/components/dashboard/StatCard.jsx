import React from 'react'

function StatCard({ label, value, icon }) {
  return (
    <div className='border rounded-xl p-5 bg-card shadow-sm'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-muted-foreground'>{label}</p>
        {icon ? <span className='text-2xl'>{icon}</span> : null}
      </div>
      <p className='font-bold text-3xl mt-2'>{value}</p>
    </div>
  )
}

export default StatCard
