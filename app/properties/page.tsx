import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default async function PropertiesPage() {
  // Supabaseから物件データを取得
  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching properties:', error)
    return <div>データの取得に失敗しました</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-3xl">🏠</span>
            <h1 className="text-2xl font-bold text-indigo-600">RoomMatch</h1>
          </a>
          <nav className="flex gap-6">
            <a href="/properties" className="text-indigo-600 font-semibold">物件を探す</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">インテリア</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">ログイン</a>
          </nav>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">物件一覧</h2>
          <p className="text-gray-600">{properties?.length || 0}件の物件が見つかりました</p>
        </div>

        {/* 物件グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties?.map((property) => (
            <a href={`/properties/${property.id}`} key={property.id}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer">
                {/* 物件画像 */}
                <div className="relative h-48 bg-gray-200">
                  <img 
                    src={property.image} 
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {property.layout}
                  </div>
                </div>

                {/* 物件情報 */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {property.name}
                  </h3>
                  <p className="text-gray-600 mb-3 flex items-center gap-1">
                    📍 {property.address}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-indigo-600">
                        ¥{property.rent.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">/ 月</p>
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-semibold">
                      詳細を見る
                    </button>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}