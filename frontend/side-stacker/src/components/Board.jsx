import { useContext } from 'react'
import { GameContext } from '@/contexts'
import { Row } from '.'

export function Board() {
  const { board } = useContext(GameContext)
  return board.map((cell, i) => <Row key={i} cells={cell} id={i} />)
}
