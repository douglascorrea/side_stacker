import {Link, useNavigate} from 'react-router-dom'

export function WelcomePage() {

  const navigate = useNavigate()

  const createNewGame = async () => {
    const response = await fetch(`http://localhost:8000/game/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return await response.json()
  }
  const onClickNewGame = async () => {
    const game = await createNewGame()
    navigate(`/game/${game.id}`)

  }
  return (
    <ul className="text-center">
      <li>
        <a href="#" onClick={onClickNewGame}>Create New Game</a>
      </li>
      <li>
        <Link to={'/game'}>Join a Game</Link>
      </li>
    </ul>
  )
}
