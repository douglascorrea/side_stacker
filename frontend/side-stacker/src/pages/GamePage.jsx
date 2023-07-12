import useWebSocket from 'react-use-websocket'
import { Board } from '../components/Board.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { GameContext } from '../contexts/GameContext.jsx'
import { useEffect } from 'react'

function GamePage() {
  const { gameId, playerId } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    console.log('playerId', playerId)
    if (playerId !== 'X' && playerId !== 'O') {
      console.log('not valid player id')
      navigate('/error')
    }
  }, [playerId])
  const WS_URL = `ws://127.0.0.1:8000/ws/game/${gameId}/`
  const { lastJsonMessage, sendJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    retryOnError: true,
    shouldReconnect: (_closeEvent) => true,
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
    sendJsonMessage({
      type: 'movement',
      movement: { direction, row },
      player: playerId,
    })
    e.preventDefault()
  }
  const board = (lastJsonMessage && lastJsonMessage.game.board) || []

  const currentPlayer =
    (lastJsonMessage && lastJsonMessage.game.current_player) || 'X'

  const isMovementAllowed = currentPlayer === playerId

  return (
    <GameContext.Provider
      value={{ board, onRowClick: handleClick, isMovementAllowed }}
    >
      {playerId === 'X' && (
        <div className="justify-center mb-10 text-xl text-center">
          <p>Share this Game Id to invite a player:</p>
          <p>{gameId}</p>
          <p>Or share this link directly</p>
          <p>{`http://localhost:3000/game/${gameId}/O`}</p>
        </div>
      )}

      <Board />
    </GameContext.Provider>
  )
}

export default GamePage
