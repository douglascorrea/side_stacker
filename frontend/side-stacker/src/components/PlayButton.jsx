import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid/index.js'

export function PlayButton({ direction }) {
  return (
    <button
      type="button"
      className="rounded-full bg-indigo-600 p-3 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {direction === 'right' ? (
        <ArrowLongRightIcon className="h-7 w-7" aria-hidden="true" />
      ) : (
        <ArrowLongLeftIcon className="h-7 w-7" aria-hidden="true" />
      )}
    </button>
  )
}
