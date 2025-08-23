import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Search } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { sampleItems } from '@/data/sampleItems'

const HomePage = () => {
  const { t, isRTL } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [recommendedItems, setRecommendedItems] = useState([])

  const categories = [
    { id: 'All', name: 'All', nameAr: 'الكل' },
    { id: 'Women', name: 'Women', nameAr: 'نساء' },
    { id: 'Men', name: 'Men', nameAr: 'رجال' },
    { id: 'Kids', name: 'Kids', nameAr: 'أطفال' },
    { id: 'Home', name: 'Home', nameAr: 'منزل' },
    { id: 'Electronics', name: 'Electronics', nameAr: 'إلكترونيات' },
    { id: 'Sports', name: 'Sports', nameAr: 'رياضة' }
  ]

  useEffect(() => {
    // Filter items based on selected category
    let filtered = sampleItems
    if (selectedCategory !== 'All') {
      filtered = sampleItems.filter(item => item.category === selectedCategory)
    }
    setRecommendedItems(filtered)
  }, [selectedCategory])

  const calculateProtectionFee = (price) => {
    const fee = Math.round((price * 0.05 + 2.5) * 100) / 100 // 5% + 2.5 AED
    return price + fee
  }

  const formatPrice = (price) => {
    return `€${price.toFixed(2)}`
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Search Header */}
      <div className="sticky top-0 z-50 bg-gray-900 px-4 pt-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={isRTL ? "البحث عن العناصر أو الأعضاء" : "Search for items or members"}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 text-white rounded-full py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {isRTL ? category.nameAr : category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Section */}
      <div className="px-4">
        <h2 className="text-xl font-semibold mb-4">
          {isRTL ? "موصى لك" : "Recommended for you"}
        </h2>

        {/* Items Grid */}
        <div className="grid grid-cols-2 gap-3 pb-20">
          {recommendedItems.map((item) => (
            <Link
              key={item.id}
              to={`/items/${item.id}`}
              className="block group"
            >
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                {/* Item Image */}
                <div className="relative aspect-square">
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0].image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">No Image</span>
                    </div>
                  )}
                  
                  {/* Heart Icon with Count */}
                  <div className="absolute top-2 right-2 bg-black bg-opacity-60 rounded-full px-2 py-1 flex items-center gap-1">
                    <Heart className="w-3 h-3 text-white" />
                    <span className="text-white text-xs">{item.likes || Math.floor(Math.random() * 50)}</span>
                  </div>

                  {/* Condition Badge */}
                  {item.condition === 'New' && (
                    <div className="absolute top-2 left-2 bg-teal-500 text-white text-xs px-2 py-1 rounded">
                      New
                    </div>
                  )}
                </div>

                {/* Item Details */}
                <div className="p-3">
                  {/* Brand */}
                  <div className="text-white font-medium text-sm mb-1">
                    {item.brand}
                  </div>
                  
                  {/* Size and Condition */}
                  <div className="text-gray-400 text-xs mb-2">
                    {item.size} • {item.condition}
                  </div>
                  
                  {/* Pricing */}
                  <div className="space-y-1">
                    {/* Original Price */}
                    <div className="text-gray-300 text-sm">
                      {formatPrice(item.price)}
                    </div>
                    
                    {/* Price with Protection (incl.) */}
                    <div className="flex items-center gap-1">
                      <span className="text-teal-400 font-semibold text-sm">
                        {formatPrice(calculateProtectionFee(item.price))} incl.
                      </span>
                      <div className="w-3 h-3 bg-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom spacing for mobile navigation */}
      <div className="h-20"></div>
    </div>
  )
}

export default HomePage

