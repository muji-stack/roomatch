'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Interior } from '@/lib/types'

export default function AdminInteriorsPage() {
  const [interiors, setInteriors] = useState<Interior[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingInterior, setEditingInterior] = useState<Interior | null>(null)

  const [formData, setFormData] = useState({
    layout: '1K',
    title: '',
    description: '',
    image: '',
    rakuten_url: '',
    instagram_url: '',
  })

  useEffect(() => {
    fetchInteriors()
  }, [])

  async function fetchInteriors() {
    const { data, error } = await supabase
      .from('interiors')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error:', error)
    } else {
      setInteriors(data || [])
    }
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (editingInterior) {
      const { error } = await supabase
        .from('interiors')
        .update(formData)
        .eq('id', editingInterior.id)

      if (error) {
        alert('更新に失敗しました: ' + error.message)
      } else {
        alert('インテリアを更新しました!')
        resetForm()
        fetchInteriors()
      }
    } else {
      const { error } = await supabase
        .from('interiors')
        .insert([formData])

      if (error) {
        alert('追加に失敗しました: ' + error.message)
      } else {
        alert('インテリアを追加しました!')
        resetForm()
        fetchInteriors()
      }
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('本当に削除しますか?')) return

    const { error } = await supabase
      .from('interiors')
      .delete()
      .eq('id', id)

    if (error) {
      alert('削除に失敗しました: ' + error.message)
    } else {
      alert('インテリアを削除しました!')
      fetchInteriors()
    }
  }

  function handleEdit(interior: Interior) {
    setEditingInterior(interior)
    setFormData({
      layout: interior.layout,
      title: interior.title,
      description: interior.description,
      image: interior.image,
      rakuten_url: interior.rakuten_url || '',
      instagram_url: interior.instagram_url || '',
    })
    setShowAddForm(true)
  }

  function resetForm() {
    setFormData({
      layout: '1K',
      title: '',
      description: '',
      image: '',
      rakuten_url: '',
      instagram_url: '',
    })
    setEditingInterior(null)
    setShowAddForm(false)
  }

  if (loading) {
    return <div className="text-center py-12">読み込み中...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">インテリア管理</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
        >
          {showAddForm ? 'キャンセル' : '+ インテリアを追加'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {editingInterior ? 'インテリアを編集' : '新しいインテリアを追加'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">間取り *</label>
                <select
                  required
                  value={formData.layout}
                  onChange={(e) => setFormData({ ...formData, layout: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">タイトル *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="例: ミニマルな一人暮らし部屋"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">説明</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  placeholder="インテリアの特徴や使用している家具など"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">画像URL *</label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">楽天ROOM URL</label>
                <input
                  type="url"
                  value={formData.rakuten_url}
                  onChange={(e) => setFormData({ ...formData, rakuten_url: e.target.value })}
                  placeholder="https://room.rakuten.co.jp/..."
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Instagram URL</label>
                <input
                  type="url"
                  value={formData.instagram_url}
                  onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                  placeholder="https://www.instagram.com/..."
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
              >
                {editingInterior ? '更新する' : '追加する'}
              </button>
              {editingInterior && (
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interiors.map((interior) => (
          <div key={interior.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-48 bg-gray-200">
              <img src={interior.image} alt={interior.title} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {interior.layout}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-2">{interior.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{interior.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(interior)}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-semibold"
                >
                  編集
                </button>
                <button
                  onClick={() => handleDelete(interior.id)}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-semibold"
                >
                  削除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {interiors.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">🛋️</div>
          <p className="text-gray-500 mb-4">インテリアがありません。上のボタンから追加してください。</p>
        </div>
      )}
    </div>
  )
}