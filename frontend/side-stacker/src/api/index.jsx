import { BASE_API_URL } from '@/utils'

export const createNewGame = async () => {
  const response = await fetch(`${BASE_API_URL}/game/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await response.json()
}
