import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  // 統計データを取得
  const { count: propertyCount } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })

  const { count: interiorCount } = await supabase
    .from('interiors')
    .select('*', { count: 'exact', head: true })

  const { data: recentProperties } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  const { data: recentInteriors } = await supabase
    .from('interiors')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">ダッシュボード</h1>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-semibold">物件数</h3>
            <span className="text-3xl">🏠</span>
          </div>
          <p className="text-4xl font-bold text-indigo-600">{propertyCount || 0}</p>
          <Link href="/admin/properties" className="text-sm text-indigo-600 hover:text-indigo-700 mt-2 inline-block">
            管理する →
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-semibold">インテリア実例</h3>
            <span className="text-3xl">🛋️</span>
          </div>
          <p className="text-4xl font-bold text-purple-600">{interiorCount || 0}</p>
          <Link href="/admin/interiors" className="text-sm text-purple-600 hover:text-purple-700 mt-2 inline-block">
            管理する →
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-semibold">間取りタイプ</h3>
            <span className="text-3xl">📐</span>
          </div>
          <p className="text-4xl font-bold text-green-600">6</p>
          <p className="text-sm text-gray-500 mt-2">1K, 1DK, 1LDK...</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-semibold">ステータス</h3>
            <span className="text-3xl">✅</span>
          </div>
          <p className="text-xl font-bold text-green-600">正常稼働中</p>
          <p className="text-sm text-gray-500 mt-2">システム正常</p>
        </div>
      </div>

      {/* 最近の物件 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">最近追加された物件</h2>
            <Link href="/admin/properties" className="text-sm text-indigo-600 hover:text-indigo-700">
              すべて見る →
            </Link>
          </div>
          <div className="space-y-3">
            {recentProperties && recentProperties.length > 0 ? (
              recentProperties.map((property) => (
                <div key={property.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div>
                    <p className="font-semibold text-gray-800">{property.name}</p>
                    <p className="text-sm text-gray-600">{property.layout} - ¥{property.rent.toLocaleString()}</p>
                  </div>
                  <Link href={`/properties/${property.id}`} className="text-indigo-600 hover:text-indigo-700 text-sm">
                    表示
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">物件がありません</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">最近追加されたインテリア</h2>
            <Link href="/admin/interiors" className="text-sm text-purple-600 hover:text-purple-700">
              すべて見る →
            </Link>
          </div>
          <div className="space-y-3">
            {recentInteriors && recentInteriors.length > 0 ? (
              recentInteriors.map((interior) => (
                <div key={interior.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div>
                    <p className="font-semibold text-gray-800">{interior.title}</p>
                    <p className="text-sm text-gray-600">{interior.layout}</p>
                  </div>
                  <Link href="/interiors" className="text-purple-600 hover:text-purple-700 text-sm">
                    表示
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">インテリアがありません</p>
            )}
          </div>
        </div>
      </div>

      {/* クイックアクション */}
      <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">クイックアクション</h2>
        <div className="flex gap-4">
          <Link href="/admin/properties" className="bg-white text-indigo-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-semibold">
            + 物件を追加
          </Link>
          <Link href="/admin/interiors" className="bg-white text-purple-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-semibold">
            + インテリアを追加
          </Link>
        </div>
      </div>
    </div>
  )
}