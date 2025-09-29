import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  // Supabaseから特定の物件データを取得
  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !property) {
    return <div>物件が見つかりませんでした</div>
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
        {/* パンくずリスト */}
        <div className="mb-6 text-sm text-gray-600">
          <a href="/" className="hover:text-indigo-600">ホーム</a>
          <span className="mx-2">/</span>
          <a href="/properties" className="hover:text-indigo-600">物件一覧</a>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{property.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左側: 物件情報 */}
          <div className="lg:col-span-2">
            {/* メイン画像 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
              <img 
                src={property.image} 
                alt={property.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* 物件詳細 */}
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

            {/* インテリア実例セクション */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                🛋️ この間取りのインテリア実例
              </h3>
              <p className="text-gray-600 mb-6">
                同じ{property.layout}の間取りで実際に住んでいる方のインテリア実例です
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300 flex items-center justify-center h-48">
                  <p className="text-gray-500">インテリア実例 1</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300 flex items-center justify-center h-48">
                  <p className="text-gray-500">インテリア実例 2</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                ※ インテリア機能は次のステップで実装します
              </p>
            </div>
          </div>

          {/* 右側: 問い合わせボックス */}
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
                    <span>インテリア実例あり</span>
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