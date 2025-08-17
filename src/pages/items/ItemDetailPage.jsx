import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Heart, MessageCircle, Share2, ArrowLeft, MapPin, Eye, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'

const ItemDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { apiCall, user, isAuthenticated } = useAuth()
  const { t, isRTL } = useTheme()

  useEffect(() => {
    fetchItem()
  }, [id])

  const fetchItem = async () => {
    setLoading(true)
    try {
      const result = await apiCall(`/items/${id}`)
      if (result.success) {
        setItem(result.data)
      } else {
        navigate('/items')
      }
    } catch (error) {
      console.error('Error fetching item:', error)
      navigate('/items')
    } finally {
      setLoading(false)
    }
  }

  const handleMessageSeller = () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    // Navigate to messages with seller
    navigate('/messages', { state: { recipientId: item.seller.id, itemId: item.id } })
  }

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    // Navigate to checkout/order creation
    navigate('/checkout', { state: { itemId: item.id } })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="aspect-square loading-pulse rounded-lg" />
          <div className="space-y-4">
            <div className="h-8 loading-pulse" />
            <div className="h-6 loading-pulse w-2/3" />
            <div className="h-6 loading-pulse w-1/2" />
            <div className="h-20 loading-pulse" />
          </div>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Item not found</h1>
        <Button onClick={() => navigate('/items')}>
          Back to Items
        </Button>
      </div>
    )
  }

  const isOwner = user?.id === item.seller?.id

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            {item.images && item.images.length > 0 ? (
              <img
                src={item.images[currentImageIndex]?.image_url}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground">No Image</span>
              </div>
            )}
          </div>
          
          {/* Image Thumbnails */}
          {item.images && item.images.length > 1 && (
            <div className="flex space-x-2 rtl:space-x-reverse overflow-x-auto">
              {item.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image.image_url}
                    alt={`${item.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Item Details */}
        <div className="space-y-6">
          {/* Title and Price */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-3xl font-bold text-foreground">{item.title}</h1>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Button variant="ghost" size="sm">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="text-3xl font-bold text-primary mb-4">
              {item.price} {t('common.aed')}
            </div>
          </div>

          {/* Item Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Brand</span>
              <p className="font-medium">{item.brand || 'Not specified'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Size</span>
              <p className="font-medium">{item.size || 'Not specified'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Condition</span>
              <Badge variant={item.condition === 'New' ? 'default' : 'secondary'}>
                {item.condition}
              </Badge>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Category</span>
              <p className="font-medium">{item.category}</p>
            </div>
          </div>

          {/* Description */}
          {item.description && (
            <div>
              <h3 className="font-semibold text-foreground mb-2">Description</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {item.description}
              </p>
            </div>
          )}

          {/* Seller Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Avatar>
                  <AvatarImage src={item.seller?.profile_picture_url} />
                  <AvatarFallback>
                    {item.seller?.first_name?.[0] || item.seller?.username?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">
                    {item.seller?.first_name || item.seller?.username}
                  </h4>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3 mr-1" />
                    {item.seller?.location}
                  </div>
                </div>
                <Link to={`/profile/${item.seller?.id}`}>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Item Stats */}
          <div className="flex items-center space-x-6 rtl:space-x-reverse text-sm text-muted-foreground">
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {item.views_count} views
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              {item.likes_count} likes
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(item.created_at).toLocaleDateString()}
            </div>
          </div>

          {/* Action Buttons */}
          {!isOwner && item.status === 'available' && (
            <div className="space-y-3">
              <Button
                onClick={handleBuyNow}
                className="w-full btn-primary"
                size="lg"
              >
                Buy Now
              </Button>
              <Button
                onClick={handleMessageSeller}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <MessageCircle className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                Message Seller
              </Button>
            </div>
          )}

          {isOwner && (
            <div className="space-y-3">
              <Button
                onClick={() => navigate(`/items/${item.id}/edit`)}
                className="w-full"
                size="lg"
              >
                Edit Item
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                This is your item
              </p>
            </div>
          )}

          {item.status !== 'available' && (
            <div className="text-center">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {item.status === 'sold' ? 'Sold' : 'Not Available'}
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ItemDetailPage

