import {Row} from './Row.jsx'

export function Board({board}) {
    // return centralized in the middle of screen
    return (
        <div className="flex flex-col justify-center items-center h-screen text-slate-400 bg-slate-900">
            {board.map((cell, i) => (
                <Row key={i} cells={cell} id={i}/>
            ))}
        </div>
    )
}