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
  const [winner, setWinner] = useState(null)
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
      console.log(lastJsonMessage)
      setBoard(lastJsonMessage.game.board)
      setError(lastJsonMessage.error)
      setIsMovementAllowed(lastJsonMessage.game.current_player === playerId)
      setShowNotification(
        lastJsonMessage.error &&
          lastJsonMessage.game.current_player !== playerId,
      )
      setWinner(lastJsonMessage.game.winner_player)
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
      value={{
        board,
        onRowClick: handleMovement,
        isMovementAllowed: winner === null ? isMovementAllowed : false,
      }}
    >
      <FlashMessage gameId={gameId} winner={winner} playerId={playerId} />
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
