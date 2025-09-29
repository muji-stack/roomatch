import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 管理画面ヘッダー */}
      <header className="bg-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/admin/dashboard" className="flex items-center gap-2 hover:opacity-80 transition">
              <span className="text-2xl">⚙️</span>
              <h1 className="text-xl font-bold">RoomMatch 管理画面</h1>
            </Link>
            <Link href="/" className="text-sm bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
              サイトを見る →
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* サイドバー */}
        <aside className="w-64 bg-white shadow-lg min-h-screen">
          <nav className="p-4">
            <Link 
              href="/admin/dashboard"
              className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition mb-2 font-semibold"
            >
              📊 ダッシュボード
            </Link>
            <Link 
              href="/admin/properties"
              className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition mb-2 font-semibold"
            >
              🏠 物件管理
            </Link>
            <Link 
              href="/admin/interiors"
              className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition mb-2 font-semibold"
            >
              🛋️ インテリア管理
            </Link>
          </nav>
        </aside>

        {/* メインコンテンツ */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}