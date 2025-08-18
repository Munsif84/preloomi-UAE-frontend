import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Shield, Truck, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'

const HomePage = () => {
  const [featuredItems, setFeaturedItems] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const { apiCall } = useAuth()
  const { t, isRTL } = useTheme()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured items
        const featuredResult = await apiCall('/items/featured?limit=8')
        if (featuredResult.success) {
          setFeaturedItems(featuredResult.data)
        }

        // Fetch categories
        const categoriesResult = await apiCall('/categories')
        if (categoriesResult.success) {
          setCategories(categoriesResult.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [apiCall])

  const features = [
    {
      icon: Shield,
      title: t('home.buyerProtection'),
      description: t('home.buyerProtectionDesc'),
    },
    {
      icon: Truck,
      title: t('home.fastDelivery'),
      description: t('home.fastDeliveryDesc'),
    },
    {
      icon: Heart,
      title: t('home.sustainableFashion'),
      description: t('home.sustainableFashionDesc'),
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-primary mr-2" />
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {t('home.newInUAE')}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {t('home.heroTitle1')}
              <span className="text-primary block">{t('home.heroTitle2')}</span>
              {t('home.heroTitle3')}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('home.heroDescription')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="btn-primary">
                <Link to="/items">
                  {t('home.startShopping')}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="btn-outline">
                <Link to="/sell">
                  {t('home.startSelling')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t('home.shopByCategory')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('home.shopByCategoryDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/items?category=${encodeURIComponent(category.name)}`}
                className="group"
              >
                <Card className="card-hover cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                      <span className="text-2xl">
                        {category.name === 'Women' && '👗'}
                        {category.name === 'Men' && '👔'}
                        {category.name === 'Kids' && '🧸'}
                        {category.name === 'Home' && '🏠'}
                        {category.name === 'Electronics' && '📱'}
                        {category.name === 'Sports' && '⚽'}
                      </span>
                    </div>
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {t(`categories.${category.name.toLowerCase()}`)}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {t('items.featured')}
              </h2>
              <p className="text-muted-foreground">
                {t('home.featuredItemsDesc')}
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/items">
                {t('home.viewAll')}
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2' : 'ml-2'}`} />
              </Link>
            </Button>
          </div>
          
          {loading ? (
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
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredItems.map((item) => (
                <Link key={item.id} to={`/items/${item.id}`} className="group">
                  <Card className="card-hover overflow-hidden">
                    <div className="aspect-product bg-muted relative overflow-hidden">
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
                        {item.brand} • {item.size}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          {item.price} {t('common.aed')}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.seller?.location}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('home.readyToStart')}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {t('home.readyToStartDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Link to="/register">
                {t('home.joinToday')}
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/items">
                {t('home.browseItems')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

