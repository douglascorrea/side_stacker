export function FlashMessage({gameId}) {
    return (
        <div className="justify-center mb-10 text-xl text-center">
            <p>Share this Game Id to invite a player:</p>
            <p>{gameId}</p>
            <p>Or share this link directly</p>
            <p>{`http://localhost:3000/game/${gameId}/O`}</p>
        </div>
    )
}