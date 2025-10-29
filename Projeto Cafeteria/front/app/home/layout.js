import Navbar from '../components/navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
        {/* Top header */}
        <header className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 py-3 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-lg font-semibold">Cafeteria</h1>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Bem-vindo</div>
          </div>
        </header>

        {/* Main area: sidebar (left) + content (right) */}
        <div className="flex min-h-[calc(100vh-56px)]"> 
          {/* Sidebar */}
          <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-4">
            <Navbar />
          </aside>

          {/* Content area */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}