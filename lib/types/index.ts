export interface Property {
    id: number
    created_at: string
    name: string
    address: string
    rent: number
    layout: string
    size: string
    floor: string
    age: string
    description: string
    image: string
    latitude?: number
    longitude?: number
    station?: string
    walk_time?: number
    images?: string[]
    amenities?: string[]
  }
  
  export interface Interior {
    id: number
    created_at: string
    layout: string
    title: string
    description: string
    image: string
    rakuten_url?: string
    instagram_url?: string
  }
  
  export interface Favorite {
    id: number
    created_at: string
    user_id: string
    property_id: number
  }
  
  export type LayoutType = '1K' | '1R' | '1DK' | '1LDK' | '2K' | '2DK' | '2LDK' | '3K' | '3DK' | '3LDK'
  
  export interface SearchParams {
    area?: string
    minRent?: number
    maxRent?: number
    layout?: string
    sortBy?: 'rent_asc' | 'rent_desc' | 'created_desc'
  }