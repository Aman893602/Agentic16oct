const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

function TodoFilters({ currentFilter, onChange, counts }) {
  return (
    <div className="segmented" role="group" aria-label="Filter todos">
      {FILTERS.map((filter) => {
        const isActive = currentFilter === filter.value;
        return (
          <button
            key={filter.value}
            type="button"
            className={`segmented__item ${isActive ? 'is-active' : ''}`}
            aria-pressed={isActive}
            onClick={() => onChange(filter.value)}
          >
            {filter.label}
            <span className="segmented__count">{counts[filter.value]}</span>
          </button>
        );
      })}
    </div>
  );
}

export default TodoFilters;
