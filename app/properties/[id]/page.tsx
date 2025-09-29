'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import InteriorCard from '@/components/InteriorCard'
import PropertyCard from '@/components/PropertyCard'
import Link from 'next/link'
import Image from 'next/image'
import { Property, Interior } from '@/lib/types'

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const [property, setProperty] = useState<Property | null>(null)
  const [interiors, setInteriors] = useState<Interior[]>([])
  const [similarProperties, setSimilarProperties] = useState<Property[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      // 物件データを取得
      const { data: propertyData, error: propertyError } = await supabase
        .from('properties')
        .select('*')
        .eq('id', params.id)
        .single()

      if (propertyError || !propertyData) {
        setLoading(false)
        return
      }

      setProperty(propertyData)

      // インテリアデータを取得
      const { data: interiorsData } = await supabase
        .from('interiors')
        .select('*')
        .eq('layout', propertyData.layout)
        .limit(4)

      if (interiorsData) {
        setInteriors(interiorsData)
      }

      // 類似物件を取得
      const { data: similarData } = await supabase
        .from('properties')
        .select('*')
        .eq('layout', propertyData.layout)
        .neq('id', params.id)
        .limit(3)

      if (similarData) {
        setSimilarProperties(similarData)
      }

      setLoading(false)
    }

    fetchData()
  }, [params.id])

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

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">物件が見つかりませんでした</h2>
          <Link href="/properties" className="text-indigo-600 hover:text-indigo-700 font-semibold">
            物件一覧に戻る
          </Link>
        </div>
      </div>
    )
  }

  const displayImages = property.images && property.images.length > 0 ? property.images : [property.image]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* パンくずリスト */}
        <div className="mb-6 text-sm text-gray-600 flex items-center gap-2">
          <Link href="/" className="hover:text-indigo-600">ホーム</Link>
          <span>/</span>
          <Link href="/properties" className="hover:text-indigo-600">物件一覧</Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold">{property.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左側: 物件情報 */}
          <div className="lg:col-span-2">
            {/* 画像ギャラリー */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
              <div className="relative h-96 md:h-[500px] bg-gray-200">
                <Image 
                  src={displayImages[currentImageIndex]} 
                  alt={property.name}
                  fill
                  className="object-cover"
                />
                
                {/* 画像ナビゲーション */}
                {displayImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev + 1) % displayImages.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition"
                    >
                      →
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {displayImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition ${
                            index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* サムネイル */}
              {displayImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2 p-4">
                  {displayImages.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition ${
                        index === currentImageIndex ? 'border-indigo-600' : 'border-transparent'
                      }`}
                    >
                      <Image 
                        src={img} 
                        alt={`${property.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 物件詳細 */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{property.name}</h1>
              
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-bold">
                  {property.layout}
                </span>
                {property.station && (
                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                    🚶 {property.station} 徒歩{property.walk_time}分
                  </span>
                )}
                <span className="text-gray-600 flex items-center gap-1">
                  📍 {property.address}
                </span>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                {property.description}
              </p>

              {/* 物件スペック */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">間取り</p>
                  <p className="text-xl font-bold text-gray-800">{property.layout}</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">専有面積</p>
                  <p className="text-xl font-bold text-gray-800">{property.size}</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">階数</p>
                  <p className="text-xl font-bold text-gray-800">{property.floor}</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">築年数</p>
                  <p className="text-xl font-bold text-gray-800">{property.age}</p>
                </div>
              </div>

              {/* 設備・条件 */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="border-t pt-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">🏠 設備・条件</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-700">
                        <span className="text-green-500">✓</span>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 地図 */}
            {property.latitude && property.longitude && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">📍 地図</h3>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">地図: {property.address}</p>
                  <p className="text-xs text-gray-400 ml-2">
                    (緯度: {property.latitude}, 経度: {property.longitude})
                  </p>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  ※ Google Maps API連携は次のステップで実装予定
                </p>
              </div>
            )}

            {/* インテリア実例セクション */}
            <div className="bg-white rounded-xl shadow-lg p-6">
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
                    <InteriorCard key={interior.id} interior={interior} />
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

          {/* 右側: 問い合わせボックス */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">賃料</p>
                <p className="text-5xl font-bold text-indigo-600">
                  ¥{property.rent.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">/ 月</p>
              </div>

              <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition font-bold text-lg mb-3 shadow-lg">
                📧 この物件に問い合わせる
              </button>

              <button className="w-full bg-white border-2 border-indigo-600 text-indigo-600 py-4 rounded-xl hover:bg-indigo-50 transition font-bold text-lg mb-6">
                ❤️ お気に入りに追加
              </button>

              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3 text-lg">物件のポイント</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 text-lg">✓</span>
                    <span>駅から徒歩{property.walk_time || 10}分以内</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 text-lg">✓</span>
                    <span>日当たり良好</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 text-lg">✓</span>
                    <span>インテリア実例あり ({interiors?.length || 0}件)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 類似物件 */}
        {similarProperties && similarProperties.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold text-gray-800">類似物件</h3>
              <Link href="/properties" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                もっと見る →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}