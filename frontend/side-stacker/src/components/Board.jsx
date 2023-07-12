import { useContext } from 'react'
import { GameContext } from '../contexts/GameContext.jsx'
import { Row } from './Row.jsx'

export function Board() {
  const { board } = useContext(GameContext)
  return board.map((cell, i) => <Row key={i} cells={cell} id={i} />)
}
