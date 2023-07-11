import './App.css'
import { Board } from './components/Board.jsx'

function App() {
  // const WS_URL = 'ws://127.0.0.1:8000/ws/game/test/'
  // const { lastJsonMessage, sendJsonMessage } = useWebSocket(WS_URL, {
  //   share: true,
  //   onOpen: () => {
  //     console.log('WebSocket connection established.')
  //   },
  //   onMessage: (e) => {
  //     console.log('WebSocket message received:', e)
  //   },
  // })
  // const handleClick = (e) => {
  //   sendJsonMessage({ message: 'test' })
  //   e.preventDefault()
  // }
  // return (
  //   <>
  //     <div>Hello WebSockets!</div>
  //     <button onClick={handleClick}>Click Me</button>
  //     <pre>{JSON.stringify(lastJsonMessage, null, 2)}</pre>
  //   </>
  // )
  //
  const board = [
    ['O', 'O', 'O', 'O', 'O', 'O', 'O'], // "O"
    ['O', 'O', 'O', 'X', '', 'O', 'O'], // "O"
    ['O', 'X', 'O', 'O', 'O', 'O', 'O'], // "O"
    ['O', 'O', 'X', 'O', 'O', 'O', 'O'], // "O"
    ['O', 'O', 'O', 'O', 'O', 'O', 'O'], // "O"
    ['O', 'O', 'O', 'O', 'O', 'O', 'O'], // "O"
    ['O', 'O', 'O', 'O', 'O', 'O', 'O'], // "O"
  ]
  return <Board board={board} />
}

export default App;
