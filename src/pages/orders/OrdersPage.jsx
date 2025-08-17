import { useState, useEffect } from 'react'
import { Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'

const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('buying')
  const { apiCall } = useAuth()
  const { t, isRTL } = useTheme()

  useEffect(() => {
    fetchOrders()
  }, [activeTab])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const endpoint = activeTab === 'buying' ? '/orders/buying' : '/orders/selling'
      const result = await apiCall(endpoint)
      
      if (result.success) {
        setOrders(result.data.orders || [])
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'paid':
        return <CheckCircle className="w-4 h-4" />
      case 'shipped':
        return <Truck className="w-4 h-4" />
      case 'delivered':
        return <Package className="w-4 h-4" />
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      case 'cancelled':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500'
      case 'paid':
        return 'bg-blue-500'
      case 'shipped':
        return 'bg-purple-500'
      case 'delivered':
        return 'bg-green-500'
      case 'completed':
        return 'bg-green-600'
      case 'cancelled':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const handleOrderAction = async (orderId, action) => {
    try {
      const result = await apiCall(`/orders/${orderId}/${action}`, {
        method: 'POST',
      })
      
      if (result.success) {
        fetchOrders() // Refresh orders
      }
    } catch (error) {
      console.error(`Error ${action} order:`, error)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-16 h-16 loading-pulse rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 loading-pulse w-1/3" />
                    <div className="h-4 loading-pulse w-1/2" />
                    <div className="h-4 loading-pulse w-1/4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          My Orders
        </h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buying">
              Buying ({orders.filter(o => activeTab === 'buying').length})
            </TabsTrigger>
            <TabsTrigger value="selling">
              Selling ({orders.filter(o => activeTab === 'selling').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buying" className="mt-6">
            <OrdersList 
              orders={orders} 
              type="buying" 
              onAction={handleOrderAction}
              t={t}
              isRTL={isRTL}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
            />
          </TabsContent>

          <TabsContent value="selling" className="mt-6">
            <OrdersList 
              orders={orders} 
              type="selling" 
              onAction={handleOrderAction}
              t={t}
              isRTL={isRTL}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

const OrdersList = ({ orders, type, onAction, t, isRTL, getStatusIcon, getStatusColor }) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No orders yet
        </h3>
        <p className="text-muted-foreground">
          {type === 'buying' 
            ? 'Start shopping to see your purchases here'
            : 'Your sales will appear here once you make them'
          }
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  {getStatusIcon(order.status)}
                  <Badge className={`${getStatusColor(order.status)} text-white`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <CardTitle className="text-lg">
                    Order #{order.id}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary">
                  {order.total_amount} {t('common.aed')}
                </div>
                <p className="text-sm text-muted-foreground">
                  {order.payment_method}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
              <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                {order.item?.images?.[0] ? (
                  <img
                    src={order.item.images[0].image_url}
                    alt={order.item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-foreground">
                  {order.item?.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {order.item?.brand} • {order.item?.size}
                </p>
                <div className="flex items-center space-x-4 rtl:space-x-reverse mt-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={
                        type === 'buying' 
                          ? order.seller?.profile_picture_url 
                          : order.buyer?.profile_picture_url
                      } />
                      <AvatarFallback className="text-xs">
                        {type === 'buying' 
                          ? (order.seller?.first_name?.[0] || 'S')
                          : (order.buyer?.first_name?.[0] || 'B')
                        }
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {type === 'buying' 
                        ? `Sold by ${order.seller?.first_name || order.seller?.username}`
                        : `Bought by ${order.buyer?.first_name || order.buyer?.username}`
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            {order.shipping_address && (
              <div className="bg-muted/30 rounded-lg p-4 mb-4">
                <h5 className="font-medium text-foreground mb-2">
                  Shipping Address
                </h5>
                <p className="text-sm text-muted-foreground">
                  {order.shipping_address.street}, {order.shipping_address.city}, {order.shipping_address.emirate}
                </p>
                {order.tracking_number && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Tracking: {order.tracking_number}
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-2 rtl:space-x-reverse">
              {type === 'buying' && order.status === 'delivered' && (
                <Button
                  onClick={() => onAction(order.id, 'confirm-delivery')}
                  className="btn-primary"
                >
                  Confirm Delivery
                </Button>
              )}
              
              {type === 'selling' && order.status === 'paid' && (
                <Button
                  onClick={() => onAction(order.id, 'ship')}
                  className="btn-primary"
                >
                  Mark as Shipped
                </Button>
              )}
              
              {order.status === 'pending' && (
                <Button
                  onClick={() => onAction(order.id, 'cancel')}
                  variant="outline"
                >
                  Cancel Order
                </Button>
              )}
              
              <Button variant="outline">
                View Details
              </Button>
              
              <Button variant="outline">
                Contact {type === 'buying' ? 'Seller' : 'Buyer'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default OrdersPage

