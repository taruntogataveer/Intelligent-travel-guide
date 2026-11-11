import { GoogleGenerativeAI } from '@google/generative-ai'

const ASSISTANT_SYSTEM_PROMPT = `You are the AI Travel Assistant for Intelligent Travel Guide — a friendly, knowledgeable travel companion.

Help users with practical travel guidance including:
- Top attractions and must-see places
- Local foods and culinary recommendations
- Family-friendly activities and venues
- Budget-friendly things to do
- Rainy-day alternatives and indoor options
- Cultural tips, safety, and timing advice

Keep answers concise, well-structured, and easy to scan. Use bullet points when listing multiple items.
If a destination is provided in the user's message, tailor your answer to that location.
If no destination is given, provide helpful general advice and ask which destination they are visiting when it would improve your answer.
Do not invent specific prices; give rough budget guidance when relevant.`

const SUGGESTED_PROMPTS = [
  'What are the top attractions?',
  'What local foods should I try?',
  'Suggest family-friendly places.',
  'Suggest budget-friendly activities.',
  'What should I do on rainy days?',
]

class AIService {
  constructor() {
    this.session = null
  }

  getSuggestedPrompts() {
    return [...SUGGESTED_PROMPTS]
  }

  #createModel() {
    const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY
    if (!apiKey) {
      throw new Error('Gemini API key is not configured.')
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    return genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: ASSISTANT_SYSTEM_PROMPT,
    })
  }

  #ensureSession() {
    if (!this.session) {
      const model = this.#createModel()
      this.session = model.startChat({
        generationConfig: {
          temperature: 0.8,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      })
    }
    return this.session
  }

  buildMessage(userMessage, context = {}) {
    const parts = []

    if (context.destination?.trim()) {
      parts.push(`Destination: ${context.destination.trim()}`)
    }
    if (context.budget?.trim()) {
      parts.push(`Budget: ${context.budget.trim()}`)
    }
    if (context.travelers?.trim()) {
      parts.push(`Travel companions: ${context.travelers.trim()}`)
    }

    if (parts.length) {
      return `${parts.join('\n')}\n\nQuestion: ${userMessage}`
    }

    return userMessage
  }

  async sendMessage(userMessage, context = {}) {
    const session = this.#ensureSession()
    const payload = this.buildMessage(userMessage, context)
    const result = await session.sendMessage(payload)
    return result.response.text()
  }

  resetSession() {
    this.session = null
  }
}

export const aiService = new AIService()
export default aiService
