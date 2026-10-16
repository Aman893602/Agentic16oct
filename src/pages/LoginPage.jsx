import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import { checkCredentials } from '../auth.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DEMO_EMAIL = 'student@example.com';
const DEMO_PASSWORD = 'password123';

const PREVIEW_TASKS = [
  { text: 'Plan the week ahead', done: true },
  { text: 'Finish the React assignment', done: false },
  { text: 'Review pull requests', done: false },
];

function validate(email, password) {
  const errors = {};

  if (!email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return errors;
}

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  function handleEmailChange(event) {
    setEmail(event.target.value);
    setErrors((current) => ({ ...current, email: undefined, form: undefined }));
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    setErrors((current) => ({ ...current, password: undefined, form: undefined }));
  }

  function fillDemoAccount() {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setErrors({});
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validate(email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!checkCredentials(email, password)) {
      setErrors({ form: 'Invalid email or password.' });
      return;
    }

    setErrors({});
    onLogin(email.trim().toLowerCase());
  }

  return (
    <div className="auth">
      <aside className="auth-brand">
        <div className="brand brand--light">
          <span className="brand__logo">
            <Icon name="listChecks" />
          </span>
          TaskFlow
        </div>

        <div className="auth-brand__content">
          <h2>
            Organize your day.
            <br />
            Get more done.
          </h2>
          <p>A focused space to capture tasks, track progress and stay on top of what matters.</p>

          <div className="preview-card" aria-hidden="true">
            {PREVIEW_TASKS.map((task) => (
              <div key={task.text} className={`preview-task ${task.done ? 'preview-task--done' : ''}`}>
                <span className="preview-task__check">{task.done && <Icon name="check" size={12} />}</span>
                {task.text}
              </div>
            ))}
          </div>
        </div>

        <p className="auth-brand__footer">© 2026 TaskFlow · Demo project</p>
      </aside>

      <main className="auth-main">
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="brand auth-form__logo">
            <span className="brand__logo">
              <Icon name="listChecks" />
            </span>
            TaskFlow
          </div>

          <div>
            <h1>Welcome back</h1>
            <p className="auth-form__subtitle">Sign in to continue to your tasks.</p>
          </div>

          <div className="demo-hint">
            <div>
              <strong>Demo account</strong>
              <span>
                {DEMO_EMAIL} · {DEMO_PASSWORD}
              </span>
            </div>
            <button type="button" className="btn btn--soft btn--sm" onClick={fillDemoAccount}>
              Use demo
            </button>
          </div>

          {errors.form && (
            <div className="alert" role="alert">
              <Icon name="alert" />
              {errors.form}
            </div>
          )}

          <div className="field">
            <label htmlFor="email">Email address</label>
            <div className="input-group">
              <Icon name="mail" />
              <input
                id="email"
                className="input"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
              />
            </div>
            {errors.email && <p className="field__error">{errors.email}</p>}
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <Icon name="lock" />
              <input
                id="password"
                className="input input--with-action"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
              />
              <button
                type="button"
                className="icon-btn input-group__action"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <Icon name={showPassword ? 'eyeOff' : 'eye'} />
              </button>
            </div>
            {errors.password && <p className="field__error">{errors.password}</p>}
          </div>

          <button type="submit" className="btn btn--primary btn--lg btn--block">
            Sign in
          </button>
        </form>
      </main>
    </div>
  );
}

export default LoginPage;
