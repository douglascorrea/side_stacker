import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ShareMessage({ gameId }) {
  return (
    <div className="justify-center mb-10 text-xl text-center">
      <p>Share this Game Id to invite a player:</p>
      <p>{gameId}</p>
      <p>Or share this link directly</p>
      <p>{`http://localhost:3000/game/${gameId}/O`}</p>
    </div>
  )
}

function ShowDecision({ decision }) {
  return (
    <div className="justify-center mb-10 text-xl text-center">
      <p className="text-4xl">{decision}</p>
      <div className="m-4">
        <Link to="/" className="text-2xl">
          Create or join a game
        </Link>
      </div>
    </div>
  )
}

export function FlashMessage({ gameId, winner, playerId, players }) {
  const [showShareMessage, setShowShareMessage] = useState(false)
  const [isWinner, setIsWinner] = useState(false)
  const [isLoser, setIsLoser] = useState(false)
  useEffect(() => {
    if (playerId === 'X' && winner !== playerId && players > 1) {
      setShowShareMessage(true)
    }
    if (winner === playerId) {
      setShowShareMessage(false)
      setIsWinner(true)
    }
    if (winner !== null && winner !== playerId) {
      setShowShareMessage(false)
      setIsLoser(true)
    }
  }, [winner, playerId, players])

  return (
    <>
      {showShareMessage && <ShareMessage gameId={gameId} />}
      {isWinner && <ShowDecision decision={'You Won!'} />}
      {isLoser && <ShowDecision decision={'You Lost!'} />}
    </>
  )
}
