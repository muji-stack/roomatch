'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <span className="text-3xl">🏠</span>
            <h1 className="text-2xl font-bold text-indigo-600">RoomMatch</h1>
          </Link>
          
          <nav className="hidden md:flex gap-8">
            <Link 
              href="/properties" 
              className={`font-semibold transition ${
                isActive('/properties') 
                  ? 'text-indigo-600' 
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              物件を探す
            </Link>
            <Link 
              href="/interiors" 
              className={`font-semibold transition ${
                isActive('/interiors') 
                  ? 'text-indigo-600' 
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              インテリア
            </Link>
            <Link 
              href="#" 
              className="text-gray-600 hover:text-indigo-600 font-semibold transition"
            >
              ログイン
            </Link>
          </nav>

          {/* モバイルメニュー */}
          <div className="md:hidden flex gap-4">
            <Link href="/properties" className="text-gray-600 hover:text-indigo-600">
              🏠
            </Link>
            <Link href="/interiors" className="text-gray-600 hover:text-indigo-600">
              🛋️
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}