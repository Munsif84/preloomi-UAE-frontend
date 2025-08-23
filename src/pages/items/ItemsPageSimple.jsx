import React from 'react'

const ItemsPageSimple = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Items for Sale</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Sample Item 1 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="aspect-square bg-gray-200 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop" 
              alt="Vintage Chanel Handbag"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-1">Vintage Chanel Handbag</h3>
            <p className="text-sm text-gray-600 mb-2">Chanel • Medium</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-green-600">1200 AED</span>
              <span className="text-xs text-gray-500">Dubai, UAE</span>
            </div>
          </div>
        </div>

        {/* Sample Item 2 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="aspect-square bg-gray-200 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1566479179817-c0b6b4b8b5b5?w=400&h=400&fit=crop" 
              alt="Designer Evening Dress"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-1">Designer Evening Dress</h3>
            <p className="text-sm text-gray-600 mb-2">Zara • M</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-green-600">800 AED</span>
              <span className="text-xs text-gray-500">Abu Dhabi, UAE</span>
            </div>
          </div>
        </div>

        {/* Sample Item 3 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="aspect-square bg-gray-200 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop" 
              alt="Men's Leather Jacket"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-1">Men's Leather Jacket</h3>
            <p className="text-sm text-gray-600 mb-2">H&M • L</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-green-600">450 AED</span>
              <span className="text-xs text-gray-500">Sharjah, UAE</span>
            </div>
          </div>
        </div>

        {/* Sample Item 4 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="aspect-square bg-gray-200 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=400&fit=crop" 
              alt="Kids Summer Outfit"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-1">Kids Summer Outfit Set</h3>
            <p className="text-sm text-gray-600 mb-2">Next • Age 5-6</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-green-600">120 AED</span>
              <span className="text-xs text-gray-500">Ajman, UAE</span>
            </div>
          </div>
        </div>

        {/* Sample Item 5 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="aspect-square bg-gray-200 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop" 
              alt="Vintage Sunglasses"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-1">Vintage Sunglasses</h3>
            <p className="text-sm text-gray-600 mb-2">Ray-Ban • One Size</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-green-600">180 AED</span>
              <span className="text-xs text-gray-500">Ras Al Khaimah, UAE</span>
            </div>
          </div>
        </div>

        {/* Sample Item 6 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="aspect-square bg-gray-200 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop" 
              alt="Sports Sneakers"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-1">Sports Sneakers</h3>
            <p className="text-sm text-gray-600 mb-2">Nike • 42</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-green-600">320 AED</span>
              <span className="text-xs text-gray-500">Fujairah, UAE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemsPageSimple

