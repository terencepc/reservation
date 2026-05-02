import PageShell from '../../components/layout/PageShell';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';
import StatusMessage from '../../components/ui/StatusMessage';
import { loginPage } from '../../pageObjects/loginPage';
import { useLoginForm } from './useLoginForm';

function LoginPage({ onLogin }) {
  const { form, error, isSubmitting, submit, updateField } = useLoginForm(onLogin);

  return (
    <PageShell>
      <main className="panel auth-panel" data-testid={loginPage.root} id={loginPage.root}>
        <div className="panel-copy">
          <p className="eyebrow">Reservation Admin</p>
          <h1>Login</h1>
          <p className="panel-text">Sign in to view all available tables.</p>
        </div>

        <form
          className="form"
          data-testid={loginPage.form}
          id={loginPage.form}
          onSubmit={submit}
        >
          <InputField
            autoComplete="username"
            data-testid={loginPage.usernameInput}
            id={loginPage.usernameInput}
            label="Username"
            name="username"
            onChange={updateField}
            placeholder="Enter username"
            required
            value={form.username}
          />

          <InputField
            autoComplete="current-password"
            data-testid={loginPage.passwordInput}
            id={loginPage.passwordInput}
            label="Password"
            name="password"
            onChange={updateField}
            placeholder="Enter password"
            required
            type="password"
            value={form.password}
          />

          {error ? (
            <StatusMessage
              data-testid={loginPage.errorMessage}
              id={loginPage.errorMessage}
              tone="error"
            >
              {error}
            </StatusMessage>
          ) : null}

          <Button
            data-testid={loginPage.submitButton}
            id={loginPage.submitButton}
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Signing in...' : 'Login'}
          </Button>
        </form>
      </main>
    </PageShell>
  );
}

export default LoginPage;
