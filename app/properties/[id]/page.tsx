import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !property) {
    return <div>物件が見つかりませんでした</div>
  }

  const { data: interiors } = await supabase
    .from('interiors')
    .select('*')
    .eq('layout', property.layout)
    .limit(4)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🏠</span>
            <h1 className="text-2xl font-bold text-indigo-600">RoomMatch</h1>
          </Link>
          <nav className="flex gap-6">
            <Link href="/properties" className="text-indigo-600 font-semibold">物件を探す</Link>
            <Link href="/interiors" className="text-gray-600 hover:text-indigo-600">インテリア</Link>
            <Link href="#" className="text-gray-600 hover:text-indigo-600">ログイン</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-indigo-600">ホーム</Link>
          <span className="mx-2">/</span>
          <Link href="/properties" className="hover:text-indigo-600">物件一覧</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{property.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
              <div className="relative h-96">
                <Image 
                  src={property.image} 
                  alt={property.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{property.name}</h2>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {property.layout}
                </span>
                <span className="text-gray-600">📍 {property.address}</span>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {property.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">間取り</p>
                  <p className="text-lg font-semibold text-gray-800">{property.layout}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">専有面積</p>
                  <p className="text-lg font-semibold text-gray-800">{property.size}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">階数</p>
                  <p className="text-lg font-semibold text-gray-800">{property.floor}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">築年数</p>
                  <p className="text-lg font-semibold text-gray-800">{property.age}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  🛋️ この間取りのインテリア実例
                </h3>
                <Link href="/interiors" className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm">
                  もっと見る →
                </Link>
              </div>
              <p className="text-gray-600 mb-6">
                同じ{property.layout}の間取りで実際に住んでいる方のインテリア実例です
              </p>
              
              {interiors && interiors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {interiors.map((interior) => (
                    <div key={interior.id} className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-indigo-300 transition">
                      <div className="relative h-48">
                        <Image 
                          src={interior.image} 
                          alt={interior.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-gray-800 mb-2">{interior.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{interior.description}</p>
                        {interior.rakuten_url && (
                          <a 
                            href={interior.rakuten_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-semibold text-center"
                          >
                            🛒 楽天で家具を見る
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
                  <p className="text-gray-500 mb-4">
                    この間取り({property.layout})のインテリア実例はまだ登録されていません
                  </p>
                  <Link href="/interiors" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold">
                    他の間取りのインテリアを見る
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">賃料</p>
                <p className="text-4xl font-bold text-indigo-600">
                  ¥{property.rent.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">/ 月</p>
              </div>

              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold mb-3">
                📧 この物件に問い合わせる
              </button>

              <button className="w-full bg-white border-2 border-indigo-600 text-indigo-600 py-3 rounded-lg hover:bg-indigo-50 transition font-semibold">
                ❤️ お気に入りに追加
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">物件のポイント</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>駅から徒歩10分以内</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>日当たり良好</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>インテリア実例あり ({interiors?.length || 0}件)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}