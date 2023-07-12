import useWebSocket from 'react-use-websocket'
import { Board } from '../components/Board.jsx'
import { useParams } from 'react-router-dom'

function GamePage() {
  //get game id from router
  const { gameId } = useParams()
  const WS_URL = `ws://127.0.0.1:8000/ws/game/${gameId}/`
  const { lastJsonMessage, sendJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    retryOnError: true,
    shouldReconnect: (_closeEvent) => {
      console.log('caling while trying to reconnect', _closeEvent)
      return true
    },
    reconnectAttempts: 10,
    reconnectInterval: 1000,
    onOpen: () => {
      console.log('FROM APP WebSocket connection established.')
    },
    onClose: () => {
      console.log('CLOSING......')
    },
  })

  const handleClick = (e, direction, row) => {
    console.log(direction, row)
    sendJsonMessage({ type: 'movement', movement: { direction, row } })
    e.preventDefault()
  }

  const default_board = [
    [0, 0, 0, 0, 0, 0, 'X'], // "O"
    [0, 0, 0, 0, 0, 0, 0], // "O"
    [0, 0, 0, 0, 0, 0, 0], // "O"
    [0, 0, 0, 0, 0, 0, 0], // "O"
    [0, 0, 0, 0, 0, 0, 0], // "O"
    [0, 0, 0, 0, 0, 0, 0], // "O"
    [0, 0, 0, 0, 0, 0, 0], // "O"
  ]
  const board = (lastJsonMessage && lastJsonMessage.game.board) || default_board
  return <Board board={board} onRowClick={handleClick} />
}

export default GamePage
