import {Link, useRouteError} from 'react-router-dom'

export function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div className="flex flex-col justify-center items-center h-screen text-slate-400 bg-slate-900">
      <div id="error-page" className="text-center">
        <h1>Oops!</h1>
        <p>It seems there is no game there!</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <Link to="/" className="text-4xl">Go back to the home page</Link>
      </div>
    </div>
  )
}
