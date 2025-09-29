import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import PropertyCard from '@/components/PropertyCard'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface SearchParams {
  area?: string
  minRent?: string
  maxRent?: string
  layout?: string
  sortBy?: string
}

interface PageProps {
  searchParams: SearchParams
}

export default async function PropertiesPage({ searchParams }: PageProps) {
  const area = searchParams.area || ''
  const maxRent = searchParams.maxRent ? parseInt(searchParams.maxRent) : null
  const minRent = searchParams.minRent ? parseInt(searchParams.minRent) : null
  const layout = searchParams.layout || ''
  const sortBy = searchParams.sortBy || 'created_desc'

  let query = supabase.from('properties').select('*')

  if (area) {
    query = query.ilike('address', `%${area}%`)
  }

  if (minRent) {
    query = query.gte('rent', minRent)
  }
  if (maxRent) {
    query = query.lte('rent', maxRent)
  }

  if (layout) {
    query = query.ilike('layout', `%${layout}%`)
  }

  switch (sortBy) {
    case 'rent_asc':
      query = query.order('rent', { ascending: true })
      break
    case 'rent_desc':
      query = query.order('rent', { ascending: false })
      break
    case 'created_desc':
    default:
      query = query.order('created_at', { ascending: false })
      break
  }

  const { data: properties, error } = await query

  if (error) {
    console.error('Error fetching properties:', error)
    return <div>データの取得に失敗しました</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">物件を探す</h2>
          <p className="text-gray-600">
            {properties?.length || 0}件の物件が見つかりました
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <form method="get" action="/properties">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  エリア
                </label>
                <select 
                  name="area"
                  defaultValue={area}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                >
                  <option value="">すべて</option>
                  <option value="東京都">東京都</option>
                  <option value="神奈川県">神奈川県</option>
                  <option value="大阪府">大阪府</option>
                  <option value="愛知県">愛知県</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  家賃下限
                </label>
                <select 
                  name="minRent"
                  defaultValue={minRent?.toString() || ''}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                >
                  <option value="">指定なし</option>
                  <option value="50000">5万円〜</option>
                  <option value="80000">8万円〜</option>
                  <option value="100000">10万円〜</option>
                  <option value="150000">15万円〜</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  家賃上限
                </label>
                <select 
                  name="maxRent"
                  defaultValue={maxRent?.toString() || ''}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                >
                  <option value="">指定なし</option>
                  <option value="50000">〜5万円</option>
                  <option value="80000">〜8万円</option>
                  <option value="100000">〜10万円</option>
                  <option value="150000">〜15万円</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  間取り
                </label>
                <select 
                  name="layout"
                  defaultValue={layout}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                >
                  <option value="">すべて</option>
                  <option value="1K">1K / 1R</option>
                  <option value="1DK">1DK</option>
                  <option value="1LDK">1LDK</option>
                  <option value="2K">2K</option>
                  <option value="2DK">2DK</option>
                  <option value="2LDK">2LDK</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  並び替え
                </label>
                <select 
                  name="sortBy"
                  defaultValue={sortBy}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                >
                  <option value="created_desc">新着順</option>
                  <option value="rent_asc">家賃が安い順</option>
                  <option value="rent_desc">家賃が高い順</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
              >
                🔍 検索
              </button>
              <Link
                href="/properties"
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition font-semibold inline-block"
              >
                リセット
              </Link>
            </div>
          </form>
        </div>

        {properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              該当する物件が見つかりませんでした
            </h3>
            <p className="text-gray-600 mb-6">
              条件を変更して再度検索してください
            </p>
            <Link
              href="/properties"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
            >
              すべての物件を見る
            </Link>
          </div>
        )}

        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">💡 検索のヒント</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold mb-2">🏠 間取りで探す</p>
              <p className="text-gray-600">一人暮らしなら1K、カップルなら1LDK以上がおすすめ</p>
            </div>
            <div>
              <p className="font-semibold mb-2">💰 予算を決める</p>
              <p className="text-gray-600">家賃は手取りの3分の1以下が目安です</p>
            </div>
            <div>
              <p className="font-semibold mb-2">📍 エリアを絞る</p>
              <p className="text-gray-600">通勤・通学の利便性を考えて選びましょう</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}