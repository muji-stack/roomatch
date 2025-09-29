import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import PropertyCard from '@/components/PropertyCard'

export const dynamic = 'force-dynamic'

export default async function Home() {
  // 最新の物件を3件取得
  const { data: featuredProperties } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3)

  // 統計情報を取得
  const { count: propertyCount } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })

  const { count: interiorCount } = await supabase
    .from('interiors')
    .select('*', { count: 'exact', head: true })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* ヘッダー */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <span className="text-3xl">🏠</span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              RoomMatch
            </h1>
          </Link>
          <nav className="flex gap-6">
            <Link href="/properties" className="text-gray-600 hover:text-indigo-600 font-semibold transition">
              物件を探す
            </Link>
            <Link href="/interiors" className="text-gray-600 hover:text-indigo-600 font-semibold transition">
              インテリア
            </Link>
            <Link href="#" className="text-gray-600 hover:text-indigo-600 font-semibold transition">
              ログイン
            </Link>
          </nav>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              物件 × インテリアの
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                新しい出会い
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              あなたの理想の住まい探しを、インテリアと一緒に実現します
            </p>
            
            {/* 統計情報 */}
            <div className="flex justify-center gap-8 mb-12">
              <div className="text-center">
                <p className="text-4xl font-bold text-indigo-600">{propertyCount || 0}</p>
                <p className="text-sm text-gray-600">物件掲載数</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-purple-600">{interiorCount || 0}</p>
                <p className="text-sm text-gray-600">インテリア実例</p>
              </div>
            </div>
          </div>

          {/* 検索フォーム */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-12 max-w-5xl mx-auto border border-white/20">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              🔍 物件を探す
            </h3>
            <form action="/properties" method="get">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* エリア */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    エリア
                  </label>
                  <select 
                    name="area"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white"
                  >
                    <option value="">すべて</option>
                    <option value="東京都">東京都</option>
                    <option value="神奈川県">神奈川県</option>
                    <option value="大阪府">大阪府</option>
                    <option value="愛知県">愛知県</option>
                  </select>
                </div>

                {/* 家賃 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    家賃上限
                  </label>
                  <select 
                    name="maxRent"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white"
                  >
                    <option value="">指定なし</option>
                    <option value="50000">〜5万円</option>
                    <option value="80000">〜8万円</option>
                    <option value="100000">〜10万円</option>
                    <option value="150000">〜15万円</option>
                  </select>
                </div>

                {/* 間取り */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    間取り
                  </label>
                  <select 
                    name="layout"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white"
                  >
                    <option value="">すべて</option>
                    <option value="1K">1K / 1R</option>
                    <option value="1DK">1DK / 1LDK</option>
                    <option value="2K">2K / 2DK</option>
                    <option value="2LDK">2LDK以上</option>
                  </select>
                </div>

                {/* 検索ボタン */}
                <div className="flex items-end">
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    🔍 検索
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* 背景装飾 */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* おすすめ物件セクション */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">✨ おすすめ物件</h3>
            <p className="text-gray-600">新着の人気物件をチェック</p>
          </div>
          <Link 
            href="/properties"
            className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-2 group"
          >
            すべて見る
            <span className="group-hover:translate-x-1 transition">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties?.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="bg-white/50 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            RoomMatchの特徴
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition transform hover:-translate-y-1">
              <div className="text-5xl mb-4">🏠</div>
              <h4 className="text-2xl font-bold text-gray-800 mb-3">
                豊富な物件情報
              </h4>
              <p className="text-gray-600 leading-relaxed">
                全国の賃貸物件から、あなたにぴったりの部屋を見つけられます。詳細な情報と豊富な写真で、物件探しをサポート。
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition transform hover:-translate-y-1">
              <div className="text-5xl mb-4">🛋️</div>
              <h4 className="text-2xl font-bold text-gray-800 mb-3">
                インテリア実例
              </h4>
              <p className="text-gray-600 leading-relaxed">
                同じ間取りの実例を見て、引越し後の生活をイメージできます。家具配置の参考にも最適。
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition transform hover:-translate-y-1">
              <div className="text-5xl mb-4">🛒</div>
              <h4 className="text-2xl font-bold text-gray-800 mb-3">
                家具も一緒に探せる
              </h4>
              <p className="text-gray-600 leading-relaxed">
                気に入ったインテリアをそのまま購入できるリンク付き。引越しと同時に家具も揃えられます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-12 text-center text-white">
          <h3 className="text-4xl font-bold mb-4">理想の住まいを見つけよう</h3>
          <p className="text-xl mb-8 opacity-90">
            物件探しとインテリアコーディネートを一度に
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/properties"
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition font-bold text-lg shadow-lg"
            >
              物件を探す
            </Link>
            <Link 
              href="/interiors"
              className="bg-indigo-700 text-white px-8 py-4 rounded-xl hover:bg-indigo-800 transition font-bold text-lg"
            >
              インテリアを見る
            </Link>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-3xl">🏠</span>
            <h2 className="text-2xl font-bold">RoomMatch</h2>
          </div>
          <p className="text-gray-400 mb-6">
            物件 × インテリアの新しい出会い
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <Link href="/properties" className="hover:text-white transition">物件を探す</Link>
            <Link href="/interiors" className="hover:text-white transition">インテリア</Link>
            <Link href="#" className="hover:text-white transition">利用規約</Link>
            <Link href="#" className="hover:text-white transition">プライバシーポリシー</Link>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            © 2025 RoomMatch. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}