import type { FC } from 'react'
import bot from '../assets/bot.png'

type ChatMessageProps = {
  from: string;
  message: string;
}

const ChatMessage: FC<ChatMessageProps> = ({ from, message }) => {
  const isBot = from === 'bot';
  
  return (
    <div className={`chat ${isBot ? 'chat-start' : 'chat-end'}`}>
      {isBot && (
        <>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Bot chat Avatar"
                src={bot}
              />
            </div>
          </div>
          <div className="chat-header">
            Greeter Bot
          </div>
        </>
      )}
      <div className={`chat-bubble ${isBot ? 'chat-bubble-neutral' : 'chat-bubble-success'}`}>
        {message}
      </div>
    </div>
  )
}

export default ChatMessage