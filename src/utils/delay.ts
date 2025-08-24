export function delay(ms: number, signal?: AbortSignal) {
  return new Promise(resolve => {
    const timeoutId = setTimeout(resolve, ms)
    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timeoutId)
      })
    }
  })
}