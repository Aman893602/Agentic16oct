import Icon from './Icon.jsx';

function StatCard({ label, value, icon, tone }) {
  return (
    <div className="stat">
      <span className={`stat__icon stat__icon--${tone}`}>
        <Icon name={icon} size={20} />
      </span>
      <div>
        <div className="stat__value">{value}</div>
        <div className="stat__label">{label}</div>
      </div>
    </div>
  );
}

function TodoStats({ total, active, completed }) {
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <section className="stats" aria-label="Task summary">
      <StatCard label="Total tasks" value={total} icon="listChecks" tone="primary" />
      <StatCard label="Active" value={active} icon="clock" tone="warning" />
      <StatCard label="Completed" value={completed} icon="checkCircle" tone="success" />

      <div className="stat stat--progress">
        <div className="stat__row">
          <span className="stat__label">Progress</span>
          <span className="stat__value stat__value--sm">{progress}%</span>
        </div>
        <div
          className="progress"
          role="progressbar"
          aria-label="Completed tasks"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="progress__bar" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </section>
  );
}

export default TodoStats;
