import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'

const ItemsPage = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid')
  const [searchParams, setSearchParams] = useSearchParams()
  const { apiCall } = useAuth()
  const { t, isRTL } = useTheme()

  // Get current filters from URL
  const currentQuery = searchParams.get('q') || ''
  const currentCategory = searchParams.get('category') || ''
  const currentSort = searchParams.get('sort_by') || 'created_at'

  useEffect(() => {
    fetchItems()
  }, [searchParams])

  const fetchItems = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams(searchParams)
      const result = await apiCall(`/items?${params.toString()}`)
      
      if (result.success) {
        setItems(result.data.items || [])
      }
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams)
    if (value) {
      newParams.set(key, value)
    } else {
      newParams.delete(key)
    }
    setSearchParams(newParams)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-product loading-pulse" />
              <CardContent className="p-4">
                <div className="h-4 loading-pulse mb-2" />
                <div className="h-4 loading-pulse w-2/3 mb-2" />
                <div className="h-4 loading-pulse w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {currentCategory ? `${currentCategory} Items` : t('items.title')}
          </h1>
          <p className="text-muted-foreground">
            {items.length} items found
          </p>
        </div>
        
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 p-4 bg-muted/30 rounded-lg">
        <div className="flex-1 min-w-[200px]">
          <Input
            placeholder={t('common.search')}
            value={currentQuery}
            onChange={(e) => updateFilter('q', e.target.value)}
            className="w-full"
          />
        </div>
        
        <Select value={currentCategory} onValueChange={(value) => updateFilter('category', value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('common.category')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            <SelectItem value="Women">Women</SelectItem>
            <SelectItem value="Men">Men</SelectItem>
            <SelectItem value="Kids">Kids</SelectItem>
            <SelectItem value="Home">Home</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Sports">Sports</SelectItem>
          </SelectContent>
        </Select>

        <Select value={currentSort} onValueChange={(value) => updateFilter('sort_by', value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('common.sort')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created_at">Newest First</SelectItem>
            <SelectItem value="price">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
            <SelectItem value="views">Most Viewed</SelectItem>
            <SelectItem value="likes">Most Liked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Items Grid */}
      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {t('items.noResults')}
          </h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <Button variant="outline" onClick={() => setSearchParams({})}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {items.map((item) => (
            <Link key={item.id} to={`/items/${item.id}`} className="group">
              <Card className="card-hover overflow-hidden">
                <div className={`bg-muted relative overflow-hidden ${
                  viewMode === 'grid' ? 'aspect-product' : 'aspect-square md:aspect-video'
                }`}>
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0].image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">No Image</span>
                    </div>
                  )}
                  {item.condition === 'New' && (
                    <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
                      New
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-foreground text-truncate-2 mb-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.brand && `${item.brand} • `}{item.size}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      {item.price} {t('common.aed')}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.seller?.location}
                    </span>
                  </div>
                  {viewMode === 'list' && (
                    <p className="text-sm text-muted-foreground mt-2 text-truncate-3">
                      {item.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default ItemsPage

