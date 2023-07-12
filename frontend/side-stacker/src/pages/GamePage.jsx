import { useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { BASE_WS_URL } from '@/utils'
import { Notification, Board, FlashMessage } from '@/components'
import { useNavigate, useParams } from 'react-router-dom'
import { GameContext } from '@/contexts'

export function GamePage() {
  const [showNotification, setShowNotification] = useState(false)
  const [board, setBoard] = useState([])
  const [error, setError] = useState(false)
  const [isMovementAllowed, setIsMovementAllowed] = useState(true)
  const { gameId, playerId } = useParams()
  const navigate = useNavigate()
  const WS_URL = `${BASE_WS_URL}/game/${gameId}/`
  const { lastJsonMessage, sendJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    retryOnError: true,
    shouldReconnect: (_closeEvent) => true,
    reconnectAttempts: 10,
    reconnectInterval: 1000,
  })
  useEffect(() => {
    if (playerId !== 'X' && playerId !== 'O') {
      navigate('/error')
    }
    if (lastJsonMessage && lastJsonMessage.game) {
      setBoard(lastJsonMessage.game.board)
      setError(lastJsonMessage.error)
      setIsMovementAllowed(lastJsonMessage.game.current_player === playerId)
      setShowNotification(
        lastJsonMessage.error &&
          lastJsonMessage.game.current_player === playerId,
      )
    }
  }, [lastJsonMessage, playerId, navigate])

  const handleMovement = (e, direction, row) => {
    sendJsonMessage({
      type: 'movement',
      movement: { direction, row },
      player: playerId,
    })
    e.preventDefault()
  }

  const handleDismissNotification = () => {
    setShowNotification(false)
  }

  return (
    <GameContext.Provider
      value={{ board, onRowClick: handleMovement, isMovementAllowed }}
    >
      {playerId === 'X' && <FlashMessage gameId={gameId} />}
      {showNotification && (
        <Notification
          error={error}
          isError={true}
          show={showNotification}
          handleDismiss={handleDismissNotification}
        />
      )}

      <Board />
    </GameContext.Provider>
  )
}
