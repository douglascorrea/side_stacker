import classnames from 'classnames';

export function Cell({value}) {
    return (
        <div className="w-24 h-24 hover:bg-gray-700 flex items-center justify-center text-4xl border">
      <span
          className={classnames(
              'inline-flex items-center rounded-md px-2 py-1 text-4xl font-medium ',
              {
                  'ring-yellow-400/20 bg-yellow-400/10 text-yellow-500 ring-1 ring-inset':
                      value === 'O',
                  'ring-red-400/20 bg-red-400/10 text-red-500 ring-1 ring-inset':
                      value === 'X',
              },
          )}
      >
        {value !== 0 ? value : ''}
      </span>
        </div>
    );
}