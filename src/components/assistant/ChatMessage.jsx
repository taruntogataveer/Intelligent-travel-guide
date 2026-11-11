import React from 'react'

function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-md'
            : 'bg-muted text-foreground border rounded-bl-md'
        }`}
      >
        {!isUser ? (
          <p className='text-xs font-semibold text-[#f56551] mb-1'>AI Travel Assistant</p>
        ) : null}
        <p className='text-sm whitespace-pre-wrap leading-relaxed'>{message.content}</p>
      </div>
    </div>
  )
}

export default ChatMessage
