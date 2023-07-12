import { Layout } from './Layout.jsx'
import { WelcomePage, GamePage, ErrorPage } from '@/pages'

export const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: '/game/:gameId/:playerId',
        element: <GamePage />,
      },
    ],
  },
]
