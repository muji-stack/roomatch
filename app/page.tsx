import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🏠</span>
            <h1 className="text-2xl font-bold text-indigo-600">RoomMatch</h1>
          </Link>
          <nav className="flex gap-6">
            <Link href="/properties" className="text-gray-600 hover:text-indigo-600">物件を探す</Link>
            <Link href="/interiors" className="text-gray-600 hover:text-indigo-600">インテリア</Link>
            <Link href="#" className="text-gray-600 hover:text-indigo-600">ログイン</Link>
          </nav>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* ヒーローセクション */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            物件 × インテリアの新しい出会い
          </h2>
          <p className="text-xl text-gray-600">
            あなたの理想の住まい探しを、インテリアと一緒に実現します
          </p>
        </div>

        {/* 検索フォーム */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">物件を探す</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* エリア */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                エリア
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <option>東京都</option>
                <option>神奈川県</option>
                <option>大阪府</option>
                <option>愛知県</option>
              </select>
            </div>

            {/* 家賃 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                家賃上限
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <option>指定なし</option>
                <option>〜5万円</option>
                <option>〜8万円</option>
                <option>〜10万円</option>
                <option>〜15万円</option>
              </select>
            </div>

            {/* 間取り */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                間取り
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <option>指定なし</option>
                <option>1K / 1R</option>
                <option>1DK / 1LDK</option>
                <option>2K / 2DK</option>
                <option>2LDK以上</option>
              </select>
            </div>

            {/* 検索ボタン */}
            <div className="flex items-end">
              <Link href="/properties" className="w-full">
                <button className="w-full bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold">
                  🔍 検索
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* 特徴セクション */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-4xl mb-4">🏠</div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              豊富な物件情報
            </h4>
            <p className="text-gray-600">
              全国の賃貸物件から、あなたにぴったりの部屋を見つけられます
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-4xl mb-4">🛋️</div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              インテリア実例
            </h4>
            <p className="text-gray-600">
              同じ間取りの実例を見て、引越し後の生活をイメージできます
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-4xl mb-4">🛒</div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              家具も一緒に探せる
            </h4>
            <p className="text-gray-600">
              気に入ったインテリアをそのまま購入できるリンク付き
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}