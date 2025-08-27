import { useState, useEffect, useRef } from 'react'
import type { KeyboardEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import ChatMessage from './components/ChatMessage'
import { delay } from './utils/delay'
import { getBotResponse } from './utils/botResponses';
import './App.css'

type ChatMessageData = {
  from: string;
  message: string;
}

function App() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [chat, sendMessage] = useState<ChatMessageData[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true)
    delay(2000, signal)
      .then(() => {
        sendMessage(prevChat => [...prevChat, {
          from: 'bot',
          message: 'Hello! What\'s your name? I\'d like to greet you properly.'
        }])
      })
      .finally(() => {
        setLoading(false)
        inputRef.current?.focus()})
    return () => {
      abortController.abort()
    };
  }, [])

  const handleSendMessage = () => {    
    sendMessage(prevChat => [...prevChat, {
      from: 'me',
      message
    }])
    setLoading(true)
    const name = message
    setMessage('')
    delay(500)
      .then(() => {
        sendMessage(prevChat => [...prevChat, {
          from: 'bot',
          message: getBotResponse(prevChat, name)
        }])
      })
      .finally(() => {
        setLoading(false)
        inputRef.current?.focus()
        inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
      })
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && message.trim() && !loading) {
      handleSendMessage()
    }
  }

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="w-full sm:max-w-lg">
            {chat.map((msg, idx) => (
              <ChatMessage key={idx} from={msg.from} message={msg.message} />
            ))}
            {loading && (
              <div className="chat chat-end">
                <span className="loading loading-dots loading-xl"></span>
              </div>
            )}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full sm:w-lg border p-4">
              <div className="join">
                <input 
                  ref={inputRef} 
                  type="text" 
                  className="input join-item input-md flex-1 sm:input-xl" 
                  placeholder="Message" 
                  onChange={e => setMessage(e.target.value)} 
                  onKeyDown={handleKeyDown}
                  value={message} 
                />
                <button
                  className="btn join-item btn-primary btn-md sm:btn-xl"
                  disabled={!message.trim() || loading}
                  onClick={handleSendMessage} >
                  Send
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
