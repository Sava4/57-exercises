export function getBotResponse(messageHistory: { from: string; message: string }[], userName: string): string {
  if (messageHistory.length <= 2) {
    return `Nice to meet you, ${userName}! How can I assist you today?`;
  }
  
  // Add more complex response logic here if needed
  return 'Oops sorry I can\'t assist with that right now. Maybe in the future?';
}