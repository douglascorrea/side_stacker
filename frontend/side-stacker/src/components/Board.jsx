import { Row } from './Row.jsx'

export function Board({ board, onRowClick }) {
  // return centralized in the middle of screen
  return board.map((cell, i) => (
    <Row key={i} cells={cell} id={i} onRowClick={onRowClick} />
  ))
}
