import useWebSocket from 'react-use-websocket'

import './App.css'

const WS_URL = 'ws://127.0.0.1:8000/ws/game/test/'

function App() {
  const { lastJsonMessage, sendJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    onOpen: () => {
      console.log('WebSocket connection established.')
    },
    onMessage: (e) => {
      console.log('WebSocket message received:', e)
    }
  })
  const handleClick = (e) => {
    sendJsonMessage({ message: 'test' })
    e.preventDefault();
  }
  return (
    <>
      <div>Hello WebSockets!</div>
      <button onClick={handleClick}>Click Me</button>
      <pre>
        {JSON.stringify(lastJsonMessage, null, 2)}
      </pre>
    </>

  )
}

export default App
