'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Property } from '@/lib/types'
import Link from 'next/link'

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [amenityInput, setAmenityInput] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    rent: 0,
    layout: '1K',
    size: '',
    floor: '',
    age: '',
    description: '',
    image: '',
    station: '',
    walk_time: 0,
    latitude: 0,
    longitude: 0,
    amenities: [] as string[],
    images: [] as string[],
  })

  useEffect(() => {
    fetchProperties()
  }, [])

  async function fetchProperties() {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error:', error)
    } else {
      setProperties(data || [])
    }
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (editingProperty) {
      const { error } = await supabase
        .from('properties')
        .update(formData)
        .eq('id', editingProperty.id)

      if (error) {
        alert('更新に失敗しました: ' + error.message)
      } else {
        alert('物件を更新しました!')
        resetForm()
        fetchProperties()
      }
    } else {
      const { error } = await supabase
        .from('properties')
        .insert([formData])

      if (error) {
        alert('追加に失敗しました: ' + error.message)
      } else {
        alert('物件を追加しました!')
        resetForm()
        fetchProperties()
      }
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('本当に削除しますか?')) return

    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)

    if (error) {
      alert('削除に失敗しました: ' + error.message)
    } else {
      alert('物件を削除しました!')
      fetchProperties()
    }
  }

  function handleEdit(property: Property) {
    setEditingProperty(property)
    setFormData({
      name: property.name,
      address: property.address,
      rent: property.rent,
      layout: property.layout,
      size: property.size,
      floor: property.floor,
      age: property.age,
      description: property.description,
      image: property.image,
      station: property.station || '',
      walk_time: property.walk_time || 0,
      latitude: property.latitude || 0,
      longitude: property.longitude || 0,
      amenities: property.amenities || [],
      images: property.images || [],
    })
    setShowAddForm(true)
  }

  function resetForm() {
    setFormData({
      name: '',
      address: '',
      rent: 0,
      layout: '1K',
      size: '',
      floor: '',
      age: '',
      description: '',
      image: '',
      station: '',
      walk_time: 0,
      latitude: 0,
      longitude: 0,
      amenities: [],
      images: [],
    })
    setEditingProperty(null)
    setShowAddForm(false)
    setAmenityInput('')
  }

  function addAmenity() {
    if (amenityInput.trim()) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenityInput.trim()]
      })
      setAmenityInput('')
    }
  }

  function removeAmenity(index: number) {
    setFormData({
      ...formData,
      amenities: formData.amenities.filter((_, i) => i !== index)
    })
  }

  if (loading) {
    return <div className="text-center py-12">読み込み中...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">物件管理</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
        >
          {showAddForm ? 'キャンセル' : '+ 物件を追加'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {editingProperty ? '物件を編集' : '新しい物件を追加'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">物件名 *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="例: サンシャインマンション"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">住所 *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="例: 東京都渋谷区神南1-2-3"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">家賃(円) *</label>
                <input
                  type="number"
                  required
                  value={formData.rent}
                  onChange={(e) => setFormData({ ...formData, rent: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="85000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">間取り *</label>
                <select
                  required
                  value={formData.layout}
                  onChange={(e) => setFormData({ ...formData, layout: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="1K">1K</option>
                  <option value="1DK">1DK</option>
                  <option value="1LDK">1LDK</option>
                  <option value="2K">2K</option>
                  <option value="2DK">2DK</option>
                  <option value="2LDK">2LDK</option>
                  <option value="3LDK">3LDK</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">専有面積</label>
                <input
                  type="text"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  placeholder="例: 25㎡"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">階数</label>
                <input
                  type="text"
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                  placeholder="例: 5階"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">築年数</label>
                <input
                  type="text"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="例: 築5年"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">最寄駅</label>
                <input
                  type="text"
                  value={formData.station}
                  onChange={(e) => setFormData({ ...formData, station: e.target.value })}
                  placeholder="例: 渋谷駅"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">徒歩(分)</label>
                <input
                  type="number"
                  value={formData.walk_time}
                  onChange={(e) => setFormData({ ...formData, walk_time: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="8"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">緯度</label>
                <input
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="35.6639"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">経度</label>
                <input
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="139.6983"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">メイン画像URL *</label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">説明</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="物件の特徴や魅力を記入してください"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">設備・条件</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={amenityInput}
                    onChange={(e) => setAmenityInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
                    placeholder="例: エアコン"
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={addAmenity}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    追加
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {amenity}
                      <button
                        type="button"
                        onClick={() => removeAmenity(index)}
                        className="text-indigo-800 hover:text-red-600 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  例: エアコン、バルコニー、独立洗面台、WiFi完備、オートロック等
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
              >
                {editingProperty ? '更新する' : '追加する'}
              </button>
              {editingProperty && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  キャンセル
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">物件名</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">住所</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">間取り</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">家賃</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {properties.map((property) => (
              <tr key={property.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-800">{property.name}</div>
                  {property.amenities && property.amenities.length > 0 && (
                    <div className="text-xs text-gray-500 mt-1">
                      設備: {property.amenities.length}件
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{property.address}</td>
                <td className="px-6 py-4">
                  <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold">
                    {property.layout}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-800">
                  ¥{property.rent.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/properties/${property.id}`}
                      target="_blank"
                      className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold"
                    >
                      表示
                    </Link>
                    <button
                      onClick={() => handleEdit(property)}
                      className="text-green-600 hover:text-green-700 text-sm font-semibold"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-semibold"
                    >
                      削除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {properties.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            物件がありません。上のボタンから追加してください。
          </div>
        )}
      </div>
    </div>
  )
}