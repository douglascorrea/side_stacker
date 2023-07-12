import { WelcomePage } from './pages/WelcomePage.jsx'
import GamePage from './pages/GamePage.jsx'
import { Layout } from './Layout.jsx'
import ErrorPage from "./pages/ErrorPage.jsx";

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
