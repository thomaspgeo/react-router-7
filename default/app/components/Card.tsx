export default function Card({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick?: () => void;
}) {
  return (
    <article className="border rounded-lg p-4 shadow-sm bg-white flex flex-col justify-between h-full">
      <header>
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
            Demo
          </span>
          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
            Example
          </span>
        </div>
      </header>

      <div className="mt-4 flex items-center justify-end gap-2 w-full">
        <a
          href="#"
          className="text-sm text-blue-600 hover:underline"
          aria-label={`Learn more about ${title}`}
        >
          Learn more
        </a>
        <button
          onClick={onClick}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          aria-label={`Perform action for ${title}`}
        >
          Action
        </button>
      </div>
    </article>
  );
}
