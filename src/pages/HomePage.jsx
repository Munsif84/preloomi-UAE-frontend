import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Search } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import { sampleItems } from '@/data/sampleItems'

const HomePage = () => {
  const { t, isRTL } = useTheme()
  const { isAuthenticated } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [newsfeedItems, setNewsfeedItems] = useState([])

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
    // Show all items in newsfeed
    setNewsfeedItems(sampleItems)
  }, [])

  const calculateProtectionFee = (price) => {
    const fee = Math.round((price * 0.05 + 2.5) * 100) / 100 // 5% + 2.5 AED
    return price + fee
  }

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Only show for non-authenticated users or new visitors */}
      {!isAuthenticated && (
        <section className="relative h-[600px] bg-gradient-to-br from-orange-100 to-pink-100 overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop&crop=center')`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent"></div>
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-md">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {isRTL ? "هل أنت مستعد لتنظيف خزانتك؟" : "Ready to declutter your closet?"}
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                {isRTL 
                  ? "اكتشف القطع المحبوبة مسبقاً وانضم إلى الاستدامة" 
                  : "Discover pre-loved pieces and join sustainability"
                }
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/sell"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-medium transition-colors text-center"
                >
                  {isRTL ? "ابدأ البيع الآن" : "Sell now"}
                </Link>
                <Link
                  to="/how-it-works"
                  className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-lg font-medium transition-colors text-center"
                >
                  {isRTL ? "تعلم كيف يعمل" : "Learn how it works"}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mobile Search Header - Only show on mobile */}
      <div className="md:hidden sticky top-0 z-50 bg-white border-b px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={isRTL ? "البحث عن العناصر" : "Search for items"}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 text-gray-900 rounded-full py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Category Filters - Mobile Only */}
      <div className="md:hidden px-4 py-3 bg-white border-b">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isRTL ? category.nameAr : category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Newsfeed Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {isRTL ? "الأخبار" : "Newsfeed"}
            </h2>
            <p className="text-sm text-gray-500">
              {isRTL ? "سيتم إضافة رسوم الشحن عند الدفع" : "Shipping fees will be added at checkout."}
            </p>
          </div>

          {/* Items Grid - Responsive: 2 cols mobile, 3 cols tablet, 5 cols desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {newsfeedItems.map((item) => (
              <Link
                key={item.id}
                to={`/items/${item.id}`}
                className="block group"
              >
                <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                  {/* Item Image */}
                  <div className="relative aspect-square">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0].image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No Image</span>
                      </div>
                    )}
                    
                    {/* Heart Icon with Count */}
                    <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full px-2 py-1 flex items-center gap-1 shadow-sm">
                      <Heart className="w-3 h-3 text-gray-600" />
                      <span className="text-gray-700 text-xs font-medium">
                        {item.likes || Math.floor(Math.random() * 50)}
                      </span>
                    </div>

                    {/* Condition Badge */}
                    {item.condition === 'New' && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        New
                      </div>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="p-3">
                    {/* Brand */}
                    <div className="text-gray-900 font-medium text-sm mb-1 truncate">
                      {item.brand}
                    </div>
                    
                    {/* Size and Condition */}
                    <div className="text-gray-500 text-xs mb-2">
                      {item.size} • {item.condition}
                    </div>
                    
                    {/* Pricing */}
                    <div className="space-y-1">
                      {/* Original Price */}
                      <div className="text-gray-600 text-sm">
                        {formatPrice(item.price)}
                      </div>
                      
                      {/* Price with Protection (incl.) */}
                      <div className="flex items-center gap-1">
                        <span className="text-teal-600 font-semibold text-sm">
                          {formatPrice(calculateProtectionFee(item.price))}incl.
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
      </section>

      {/* Bottom spacing for mobile navigation */}
      <div className="h-20 md:h-0"></div>
    </div>
  )
}

export default HomePage

