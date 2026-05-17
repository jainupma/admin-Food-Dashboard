const CommonEntriesSelector = ({
  value,
  onChange,
  options = [10, 20, 50, 100],
}) => {
  return (
    <div className="flex items-center gap-3">

      <p className="text-sm text-gray-500">
        Show
      </p>

      <select
        value={value}
        onChange={(e) =>
          onChange(Number(e.target.value))
        }
        className="px-4 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-orange-100"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <p className="text-sm text-gray-500">
        entries
      </p>

    </div>
  );
};

export default CommonEntriesSelector;