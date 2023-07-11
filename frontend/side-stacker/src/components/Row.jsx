import {PlayButton} from './PlayButton.jsx'
import {Cell} from './Cell.jsx'

export function Row({cells}) {
    return (
        <div className="flex">
            <div className="items-center inline-flex mr-3">
                <PlayButton direction="right"/>
            </div>
            {cells.map((value, i) => (
                <Cell key={i} value={value} id={i}/>
            ))}
            <div className="items-center inline-flex ml-3">
                <PlayButton direction="left"/>
            </div>
        </div>
    )
}