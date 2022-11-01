export default function EventCard({ letter, title, numberOfEntries }) {
  return (
    <div className="flex items-center gap-4 shadow-md rounded-lg bg-zinc-600 py-5 px-4 md:mb-12">
      <p className="px-3 py-2 rounded-md bg-red-500 text-gray-50 font-black text-2xl">
        {letter}
      </p>
      <div>
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">
          {numberOfEntries}{" "}
          <span className="text-xs uppercase text-gray-900 font-medium ml-1">
            entries
          </span>
        </p>
      </div>
    </div>
  );
}
