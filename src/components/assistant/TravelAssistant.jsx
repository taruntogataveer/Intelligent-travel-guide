import React, { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { toast } from 'sonner'
import ChatMessage from './ChatMessage'
import aiService from '@/service/AIService'

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi! I'm your AI Travel Assistant. Ask me about attractions, local food, family-friendly spots, budget activities, or rainy-day plans. Pick a suggestion below or type your own question.",
}

function TravelAssistant() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [destination, setDestination] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const suggestedPrompts = aiService.getSuggestedPrompts()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text) => {
    const trimmed = text?.trim()
    if (!trimmed || loading) return

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const reply = await aiService.sendMessage(trimmed, { destination })
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: reply,
        },
      ])
    } catch (error) {
      console.error('Assistant error:', error)
      toast.error('Could not get a response. Check your API key and try again.')
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content:
            'Sorry, I could not process that request right now. Please verify your Gemini API key in .env and try again.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage(input)
  }

  const handleClearChat = () => {
    aiService.resetSession()
    setMessages([WELCOME_MESSAGE])
    setInput('')
  }

  return (
    <div className='flex flex-col h-[calc(100vh-80px)] max-h-[800px]'>
      <div className='mb-6'>
        <h1 className='font-bold text-3xl'>AI Travel Assistant</h1>
        <p className='mt-2 text-muted-foreground'>
          Get instant travel guidance powered by Gemini AI. Conversation history is kept for this session.
        </p>
        <div className='mt-4'>
          <label className='text-sm font-medium text-foreground' htmlFor='assistant-destination'>
            Destination (optional)
          </label>
          <Input
            id='assistant-destination'
            placeholder='e.g. Paris, France'
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className='mt-1 max-w-md'
          />
        </div>
      </div>

      <div className='flex flex-wrap gap-2 mb-4'>
        {suggestedPrompts.map((prompt) => (
          <button
            key={prompt}
            type='button'
            onClick={() => sendMessage(prompt)}
            disabled={loading}
            className='text-sm px-3 py-2 border rounded-full hover:shadow-md hover:border-primary transition-all disabled:opacity-50'
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className='flex-1 overflow-y-auto border rounded-xl p-4 sm:p-6 bg-card space-y-4 min-h-[320px]'>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {loading ? (
          <div className='flex justify-start'>
            <div className='bg-muted border rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2'>
              <AiOutlineLoading3Quarters className='h-5 w-5 animate-spin text-[#f56551]' />
              <span className='text-sm text-muted-foreground'>Thinking...</span>
            </div>
          </div>
        ) : null}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className='mt-4 flex gap-3'>
        <Input
          placeholder='Ask anything about your trip...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          className='flex-1 h-12'
        />
        <Button type='submit' disabled={loading || !input.trim()} className='h-12 px-6'>
          Send
        </Button>
        <Button
          type='button'
          variant='outline'
          onClick={handleClearChat}
          disabled={loading}
          className='h-12'
        >
          Clear
        </Button>
      </form>
    </div>
  )
}

export default TravelAssistant
