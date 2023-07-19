import { BASE_API_URL } from '@/utils'

export const createNewGame = async (players) => {
  const response = await fetch(`${BASE_API_URL}/game/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      players,
    })
  })
  return await response.json()
}
