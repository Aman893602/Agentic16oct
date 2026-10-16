import { useEffect, useState } from 'react';
import Icon from '../components/Icon.jsx';
import TodoForm from '../components/TodoForm.jsx';
import TodoList from '../components/TodoList.jsx';
import TodoFilters from '../components/TodoFilters.jsx';
import TodoStats from '../components/TodoStats.jsx';

const TODOS_KEY = 'todo-app:todos';

function loadTodos() {
  try {
    const saved = JSON.parse(localStorage.getItem(TODOS_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function filterTodos(todos, filter) {
  if (filter === 'active') return todos.filter((todo) => !todo.completed);
  if (filter === 'completed') return todos.filter((todo) => todo.completed);
  return todos;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function getDisplayName(email) {
  const name = email.split('@')[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function TodoPage({ userEmail, onLogout }) {
  const [todos, setTodos] = useState(loadTodos);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(text) {
    const newTodo = { id: Date.now(), text, completed: false, createdAt: Date.now() };
    setTodos((current) => [newTodo, ...current]);
  }

  function toggleTodo(id) {
    setTodos((current) =>
      current.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  }

  function deleteTodo(id) {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }

  function clearCompleted() {
    setTodos((current) => current.filter((todo) => !todo.completed));
  }

  const visibleTodos = filterTodos(todos, filter);
  const remainingCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - remainingCount;
  const displayName = getDisplayName(userEmail);
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar__inner">
          <div className="brand">
            <span className="brand__logo">
              <Icon name="listChecks" />
            </span>
            TaskFlow
          </div>

          <div className="user-menu">
            <span className="avatar" aria-hidden="true">
              {displayName.charAt(0)}
            </span>
            <span className="user-menu__email">{userEmail}</span>
            <button type="button" className="btn btn--ghost btn--sm" onClick={onLogout} aria-label="Logout">
              <Icon name="logOut" size={16} />
              <span className="btn__label">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="page-heading">
          <p className="eyebrow">{today}</p>
          <h1>
            {getGreeting()}, {displayName}
          </h1>
          <p>Here&apos;s what&apos;s on your plate today.</p>
        </section>

        <TodoStats total={todos.length} active={remainingCount} completed={completedCount} />

        <section className="panel">
          <div className="panel__header">
            <TodoForm onAdd={addTodo} />
            <TodoFilters
              currentFilter={filter}
              onChange={setFilter}
              counts={{ all: todos.length, active: remainingCount, completed: completedCount }}
            />
          </div>

          <TodoList todos={visibleTodos} filter={filter} onToggle={toggleTodo} onDelete={deleteTodo} />

          <footer className="panel__footer">
            <span>
              <strong>{remainingCount}</strong> {remainingCount === 1 ? 'item' : 'items'} left
            </span>
            {completedCount > 0 && (
              <button type="button" className="btn btn--link" onClick={clearCompleted}>
                Clear completed
              </button>
            )}
          </footer>
        </section>
      </main>
    </div>
  );
}

export default TodoPage;
