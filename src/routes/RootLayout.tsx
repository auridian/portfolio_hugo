import { Link, Outlet, useLocation } from 'react-router-dom';

export function RootLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className={isHome ? 'app-shell app-shell--immersive' : 'app-shell'}>
      {!isHome && (
        <header className="site-back-nav">
          <Link to="/" className="site-back-nav__link">
            <span aria-hidden="true">⟵</span>
            <span>Back to hub</span>
          </Link>
        </header>
      )}

      <main className={isHome ? 'app-main app-main--immersive' : 'app-main'}>
        <Outlet />
      </main>
    </div>
  );
}
