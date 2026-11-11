import React, { useMemo, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '@/components/ui/input'
import { POPULAR_DESTINATIONS } from '@/constants/options'
import { useTheme } from 'next-themes'

function hslVar(name) {
  if (typeof window === 'undefined') return ''
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value ? `hsl(${value})` : ''
}

function buildSelectStyles() {
  const border = hslVar('--border')
  const foreground = hslVar('--foreground')
  const background = hslVar('--background')
  const mutedForeground = hslVar('--muted-foreground')
  const accent = hslVar('--accent')

  return {
    control: (base, state) => ({
      ...base,
      minHeight: '48px',
      fontSize: '16px',
      borderRadius: '0.5rem',
      backgroundColor: background,
      color: foreground,
      borderColor: state.isFocused ? foreground : border,
      boxShadow: state.isFocused ? `0 0 0 2px ${foreground}1a` : 'none',
      '&:hover': { borderColor: foreground },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 50,
      borderRadius: '0.5rem',
      backgroundColor: background,
      color: foreground,
      border: `1px solid ${border}`,
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: '280px',
    }),
    option: (base, state) => ({
      ...base,
      fontSize: '15px',
      padding: '10px 12px',
      backgroundColor: state.isFocused || state.isSelected ? accent : background,
      color: foreground,
    }),
    singleValue: (base) => ({
      ...base,
      color: foreground,
    }),
    input: (base) => ({
      ...base,
      color: foreground,
    }),
    placeholder: (base) => ({
      ...base,
      color: mutedForeground,
    }),
  }
}

function DestinationPicker({ value, onChange }) {
  const [customText, setCustomText] = useState('')
  const selectedLabel = value?.label ?? ''
  const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY
  const { resolvedTheme } = useTheme()
  const selectStyles = useMemo(() => buildSelectStyles(), [resolvedTheme])

  const selectDestination = (label) => {
    setCustomText('')
    onChange({ label })
  }

  const handlePlacesChange = (place) => {
    setCustomText('')
    if (place?.label) {
      onChange({ label: place.label })
    } else {
      onChange(null)
    }
  }

  const handleCustomInput = (text) => {
    setCustomText(text)
    const trimmed = text.trim()
    onChange(trimmed ? { label: trimmed } : null)
  }

  return (
    <div className='flex flex-col gap-6'>
      <div>
        <p className='text-sm text-muted-foreground mb-3'>Popular destinations — tap to select</p>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3'>
          {POPULAR_DESTINATIONS.map((dest) => (
            <button
              key={dest.label}
              type='button'
              onClick={() => selectDestination(dest.label)}
              className={`p-3 border rounded-lg text-left transition-all hover:shadow-md ${
                selectedLabel === dest.label ? 'shadow-lg border-primary bg-muted' : ''
              }`}
            >
              <span className='text-2xl'>{dest.icon}</span>
              <span className='block text-sm font-medium mt-1 leading-tight'>{dest.label}</span>
            </button>
          ))}
        </div>
      </div>

      {apiKey ? (
        <div>
          <p className='text-sm text-muted-foreground mb-2'>Or search for any city or country</p>
          <GooglePlacesAutocomplete
            apiKey={apiKey}
            autocompletionRequest={{ types: ['(cities)'] }}
            selectProps={{
              value: selectedLabel ? { label: selectedLabel, value: selectedLabel } : null,
              onChange: handlePlacesChange,
              placeholder: 'Search destinations worldwide...',
              isClearable: true,
              styles: selectStyles,
              menuPortalTarget: typeof document !== 'undefined' ? document.body : null,
              menuPosition: 'fixed',
            }}
          />
        </div>
      ) : null}

      <div>
        <p className='text-sm text-muted-foreground mb-2'>
          {apiKey ? "Can't find it? Type your destination" : 'Type your destination'}
        </p>
        <Input
          placeholder='e.g. Manali, India or Lisbon, Portugal'
          value={customText}
          onChange={(e) => handleCustomInput(e.target.value)}
          className='h-12 text-base'
        />
      </div>

      {selectedLabel ? (
        <p className='text-sm font-medium text-green-600 dark:text-green-400'>
          Selected: {selectedLabel}
        </p>
      ) : null}
    </div>
  )
}

export default DestinationPicker
