import { useContext } from 'react'
import { GameContext } from '../contexts/GameContext.jsx'
import { PlayButton } from './PlayButton.jsx'
import { Cell } from './Cell.jsx'

export function Row({ cells, id }) {
  const { onRowClick } = useContext(GameContext)
  return (
    <div className="flex">
      <div className="items-center inline-flex mr-3">
        <PlayButton direction="right" onClick={(e) => onRowClick(e, 'L', id)} />
      </div>
      {cells.map((value, i) => (
        <Cell key={i} value={value} id={i} />
      ))}
      <div className="items-center inline-flex ml-3">
        <PlayButton direction="left" onClick={(e) => onRowClick(e, 'R', id)} />
      </div>
    </div>
  )
}
