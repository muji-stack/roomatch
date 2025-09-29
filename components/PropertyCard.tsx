import Link from 'next/link'
import Image from 'next/image'
import { Property } from '@/lib/types'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
        <div className="relative h-56 bg-gray-200">
          <Image 
            src={property.image} 
            alt={property.name}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 right-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {property.layout}
          </div>
          {property.station && (
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              🚶 {property.station} 徒歩{property.walk_time}分
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
            {property.name}
          </h3>
          <p className="text-gray-600 mb-3 flex items-center gap-1 text-sm">
            📍 {property.address}
          </p>
          
          {property.amenities && property.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {property.amenities.slice(0, 3).map((amenity, index) => (
                <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  +{property.amenities.length - 3}
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div>
              <p className="text-3xl font-bold text-indigo-600">
                ¥{property.rent.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">/ 月</p>
            </div>
            <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-semibold">
              詳細を見る
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}