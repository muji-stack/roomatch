import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function InteriorsPage() {
  const { data: interiors, error } = await supabase
    .from('interiors')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching interiors:', error)
    return <div>データの取得に失敗しました</div>
  }

  const layouts = ['1K', '1DK', '1LDK', '2K', '2DK', '2LDK']

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🏠</span>
            <h1 className="text-2xl font-bold text-indigo-600">RoomMatch</h1>
          </Link>
          <nav className="flex gap-6">
            <Link href="/properties" className="text-gray-600 hover:text-indigo-600">物件を探す</Link>
            <Link href="/interiors" className="text-indigo-600 font-semibold">インテリア</Link>
            <Link href="#" className="text-gray-600 hover:text-indigo-600">ログイン</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">🛋️ インテリア実例</h2>
          <p className="text-gray-600">間取り別のインテリア実例を参考にしてください</p>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold whitespace-nowrap">
            すべて
          </button>
          {layouts.map((layout) => (
            <button key={layout} className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 whitespace-nowrap">
              {layout}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interiors?.map((interior) => (
            <div key={interior.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer">
              <div className="relative h-64 bg-gray-200">
                <Image 
                  src={interior.image} 
                  alt={interior.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {interior.layout}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {interior.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {interior.description}
                </p>
                
                <div className="flex gap-2">
                  {interior.rakuten_url && (
                    <a 
                      href={interior.rakuten_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-semibold text-center"
                    >
                      🛒 楽天で見る
                    </a>
                  )}
                  {interior.instagram_url && (
                    <a 
                      href={interior.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition text-sm font-semibold text-center"
                    >
                      📷 Instagram
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {(!interiors || interiors.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">まだインテリア実例が登録されていません</p>
          </div>
        )}
      </main>
    </div>
  );
}