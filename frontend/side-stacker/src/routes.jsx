import { WelcomePage } from './pages/WelcomePage.jsx'
import GamePage from './pages/GamePage.jsx'
import { Layout } from './Layout.jsx'

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: '/game/:gameId',
        element: <GamePage />,
      },
    ],
  },
]
