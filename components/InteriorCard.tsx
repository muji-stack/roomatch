import Image from 'next/image'
import { Interior } from '@/lib/types'

interface InteriorCardProps {
  interior: Interior
}

export default function InteriorCard({ interior }: InteriorCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
      <div className="relative h-64 bg-gray-200">
        <Image 
          src={interior.image} 
          alt={interior.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          {interior.layout}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {interior.title}
        </h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">
          {interior.description}
        </p>
        
        <div className="flex gap-2">
          {interior.rakuten_url && (
            <a 
              href={interior.rakuten_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-semibold text-center"
              onClick={(e) => e.stopPropagation()}
            >
              🛒 楽天で見る
            </a>
          )}
          {interior.instagram_url && (
            <a 
              href={interior.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition text-sm font-semibold text-center"
              onClick={(e) => e.stopPropagation()}
            >
              📷 Instagram
            </a>
          )}
        </div>
      </div>
    </div>
  );
}