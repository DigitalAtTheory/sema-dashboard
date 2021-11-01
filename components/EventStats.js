import {
  LocationMarkerIcon,
  DesktopComputerIcon,
} from "@heroicons/react/outline";

export default function EventStats({ tables, color }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {tables.map((table, i) => (
        <div
          className="flex items-center gap-4 shadow-md rounded-lg bg-white py-5 px-4"
          key={table.key}
        >
          <div className={`${color} p-3 rounded-md`}>
            {i === 0 && <LocationMarkerIcon className="w-6 h-6 text-white" />}
            {i === 1 && <DesktopComputerIcon className="w-6 h-6 text-white" />}
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">{table.name}</h2>
            <h3 className="text-2xl font-semibold text-gray-900">
              {JSON.parse(table.records).length}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
