import { ReactNode, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useAuthStore } from '../store/auth';
import { useThemeStore } from '../store/theme';
import Sidebar from './Sidebar';

interface LayoutProps {
  children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-all duration-300 ease-out z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-64 ${
          isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="lg:hidden bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-30 transition-colors duration-300">
          <div className="px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500 transition-all duration-200"
                aria-controls="mobile-menu"
                aria-expanded={isSidebarOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isSidebarOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>

              {/* Theme toggle button */}
              <button
                onClick={toggleTheme}
                className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500 transition-all duration-200"
              >
                {isDarkMode ? (
                  <Sun className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Moon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Desktop header with theme toggle */}
        <header className="hidden lg:block bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-30 transition-colors duration-300">
          <div className="px-4 sm:px-6 py-3">
            <div className="flex justify-end">
              <button
                onClick={toggleTheme}
                className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500 transition-all duration-200"
              >
                {isDarkMode ? (
                  <Sun className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Moon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children || <Outlet />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}