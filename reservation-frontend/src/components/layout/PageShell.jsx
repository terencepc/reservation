import { testIds } from '../../constants/testIds';

function PageShell({ children }) {
  return (
    <div className="page-shell" data-testid={testIds.app.shell} id={testIds.app.shell}>
      {children}
    </div>
  );
}

export default PageShell;
