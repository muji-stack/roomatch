'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import InteriorCard from '@/components/InteriorCard'
import { Interior } from '@/lib/types'

export default function InteriorsPage() {
  const [interiors, setInteriors] = useState<Interior[]>([])
  const [filteredInteriors, setFilteredInteriors] = useState<Interior[]>([])
  const [selectedLayout, setSelectedLayout] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  const layouts = ['1K', '1DK', '1LDK', '2K', '2DK', '2LDK']

  useEffect(() => {
    async function fetchInteriors() {
      const { data, error } = await supabase
        .from('interiors')
        .select('*')
        .order('id', { ascending: true })

      if (error) {
        console.error('Error fetching interiors:', error)
      } else if (data) {
        setInteriors(data)
        setFilteredInteriors(data)
      }
      setLoading(false)
    }

    fetchInteriors()
  }, [])

  useEffect(() => {
    if (selectedLayout === 'all') {
      setFilteredInteriors(interiors)
    } else {
      setFilteredInteriors(interiors.filter(interior => interior.layout === selectedLayout))
    }
  }, [selectedLayout, interiors])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">読み込み中...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">インテリア実例</h2>
          <p className="text-gray-600">
            間取り別のインテリア実例を参考にして、理想の部屋づくりを
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-3xl font-bold text-indigo-600">{interiors.length}</p>
            <p className="text-sm text-gray-600 mt-1">総実例数</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-3xl font-bold text-purple-600">
              {new Set(interiors.map(i => i.layout)).size}
            </p>
            <p className="text-sm text-gray-600 mt-1">対応間取り</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-3xl font-bold text-pink-600">
              {interiors.filter(i => i.rakuten_url).length}
            </p>
            <p className="text-sm text-gray-600 mt-1">購入リンク付き</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-3xl font-bold text-green-600">
              {filteredInteriors.length}
            </p>
            <p className="text-sm text-gray-600 mt-1">表示中</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">間取りで絞り込む</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedLayout('all')}
              className={`px-6 py-3 rounded-xl font-semibold transition transform hover:scale-105 ${
                selectedLayout === 'all'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              すべて ({interiors.length})
            </button>
            {layouts.map((layout) => {
              const count = interiors.filter(i => i.layout === layout).length
              return (
                <button
                  key={layout}
                  onClick={() => setSelectedLayout(layout)}
                  className={`px-6 py-3 rounded-xl font-semibold transition transform hover:scale-105 ${
                    selectedLayout === layout
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {layout} ({count})
                </button>
              )
            })}
          </div>
        </div>

        {filteredInteriors && filteredInteriors.length > 0 ? (
          <>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                {filteredInteriors.length}件のインテリア実例
              </p>
              {selectedLayout !== 'all' && (
                <button
                  onClick={() => setSelectedLayout('all')}
                  className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm flex items-center gap-1"
                >
                  <span>×</span> フィルターをクリア
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInteriors.map((interior) => (
                <InteriorCard key={interior.id} interior={interior} />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              該当するインテリア実例が見つかりませんでした
            </h3>
            <p className="text-gray-600 mb-6">
              他の間取りをお試しください
            </p>
            <button
              onClick={() => setSelectedLayout('all')}
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
            >
              すべて表示
            </button>
          </div>
        )}

        <section className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            インテリアコーディネートのヒント
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl mb-3">📏</div>
              <h4 className="font-bold text-gray-800 mb-2">サイズを確認</h4>
              <p className="text-sm text-gray-600">
                家具を購入する前に、部屋のサイズと家具のサイズを必ず確認しましょう。
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl mb-3">🎨</div>
              <h4 className="font-bold text-gray-800 mb-2">カラーを統一</h4>
              <p className="text-sm text-gray-600">
                2-3色に絞ることで、統一感のあるおしゃれな空間になります。
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl mb-3">💡</div>
              <h4 className="font-bold text-gray-800 mb-2">照明にこだわる</h4>
              <p className="text-sm text-gray-600">
                間接照明を活用することで、部屋の雰囲気が大きく変わります。
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-start gap-6">
            <div className="text-6xl">🛒</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                楽天ROOMで簡単にお買い物
              </h3>
              <p className="text-gray-600 mb-4">
                気に入ったインテリアは楽天ROOMから直接購入できます。
                実際に使っている人のレビューも参考にしながら、あなたにぴったりの家具を見つけましょう。
              </p>
              <button
                onClick={() => window.open('https://room.rakuten.co.jp/', '_blank')}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold cursor-pointer"
              >
                楽天ROOMについて詳しく見る
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}