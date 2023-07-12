import { useNavigate } from 'react-router-dom'
import { PlusCircleIcon, KeyIcon } from '@heroicons/react/20/solid'
import { createNewGame } from '@/api'

export function WelcomePage() {
  const navigate = useNavigate()

  const onClickNewGame = async () => {
    const game = await createNewGame()
    navigate(`/game/${game.id}/X`)
  }

  const onSubmitJoinGame = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const gameId = formData.get('gameId')
    navigate(`/game/${gameId}/O`)
  }

  return (
    <ul className="text-center">
      <li className="mb-10">
        <button
          onClick={onClickNewGame}
          type="button"
          className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          CREATE NEW GAME
        </button>
      </li>

      <li>
        <form onSubmit={onSubmitJoinGame}>
          <label htmlFor="gameId" className="sr-only">
            Game ID
          </label>
          <input
            type="text"
            name="gameId"
            id="gameId"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-5"
            placeholder="Game ID"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <KeyIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            JOIN A GAME
          </button>
        </form>
      </li>
    </ul>
  )
}
