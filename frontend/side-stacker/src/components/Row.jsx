import { PlayButton } from './PlayButton.jsx'
import { Cell } from './Cell.jsx'
import useWebSocket from 'react-use-websocket'

export function Row({ cells, id, onRowClick }) {
  // const WS_URL =
  //   'ws://127.0.0.1:8000/ws/game/ea96e480-be1a-450d-80e1-193ba9ffcb91/'
  // const { sendJsonMessage } = useWebSocket(WS_URL, {
  //   share: true,
  //   onOpen: () => {
  //     console.log('Opening from Row')
  //   },
  // })
  return (
    <div className="flex">
      <div
        className="items-center inline-flex mr-3"
        onClick={(e) => onRowClick(e, 'L', id)}
      >
        <PlayButton direction="right" />
      </div>
      {cells.map((value, i) => (
        <Cell key={i} value={value} id={i} />
      ))}
      <div
        className="items-center inline-flex ml-3"
        onClick={(e) => onRowClick(e, 'R', id)}
      >
        <PlayButton direction="left" />
      </div>
    </div>
  )
}
