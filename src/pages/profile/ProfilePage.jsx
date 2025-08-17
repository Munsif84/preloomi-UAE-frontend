import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MapPin, Calendar, Star, Settings, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'

const ProfilePage = () => {
  const { userId } = useParams()
  const [profile, setProfile] = useState(null)
  const [userItems, setUserItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { apiCall, user } = useAuth()
  const { t, isRTL } = useTheme()

  const isOwnProfile = !userId || userId === user?.id?.toString()

  useEffect(() => {
    fetchProfile()
    fetchUserItems()
  }, [userId])

  const fetchProfile = async () => {
    try {
      const endpoint = isOwnProfile ? '/users/profile' : `/users/${userId}`
      const result = await apiCall(endpoint)
      
      if (result.success) {
        setProfile(result.data.user || result.data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const fetchUserItems = async () => {
    try {
      const endpoint = isOwnProfile ? '/items/my-items' : `/items?seller_id=${userId}`
      const result = await apiCall(endpoint)
      
      if (result.success) {
        setUserItems(result.data.items || [])
      }
    } catch (error) {
      console.error('Error fetching user items:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-6 rtl:space-x-reverse mb-8">
            <div className="w-24 h-24 loading-pulse rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-6 loading-pulse w-1/3" />
              <div className="h-4 loading-pulse w-1/2" />
              <div className="h-4 loading-pulse w-1/4" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Profile not found</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 rtl:space-x-reverse mb-8">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profile.profile_picture_url} />
            <AvatarFallback className="text-2xl">
              {profile.first_name?.[0] || profile.username?.[0] || 'U'}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center space-x-4 rtl:space-x-reverse mb-2">
              <h1 className="text-3xl font-bold text-foreground">
                {profile.first_name && profile.last_name 
                  ? `${profile.first_name} ${profile.last_name}`
                  : profile.username
                }
              </h1>
              {isOwnProfile && (
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              {profile.location && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {profile.location}
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Joined {new Date(profile.created_at).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1" />
                {profile.rating || 'No ratings yet'}
              </div>
            </div>

            {profile.bio && (
              <p className="text-muted-foreground mb-4">
                {profile.bio}
              </p>
            )}

            <div className="flex space-x-4 rtl:space-x-reverse">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{userItems.length}</div>
                <div className="text-sm text-muted-foreground">Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{profile.followers_count || 0}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{profile.following_count || 0}</div>
                <div className="text-sm text-muted-foreground">Following</div>
              </div>
            </div>
          </div>

          {!isOwnProfile && (
            <div className="flex flex-col space-y-2">
              <Button className="btn-primary">
                Follow
              </Button>
              <Button variant="outline">
                Message
              </Button>
            </div>
          )}
        </div>

        {/* Profile Content */}
        <Tabs defaultValue="items" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="items">
              Items ({userItems.length})
            </TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({profile.reviews_count || 0})
            </TabsTrigger>
            {isOwnProfile && (
              <TabsTrigger value="settings">
                Settings
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="items" className="mt-6">
            {userItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">👗</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {isOwnProfile ? 'No items listed yet' : 'No items found'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {isOwnProfile 
                    ? 'Start selling by listing your first item'
                    : 'This user hasn\'t listed any items yet'
                  }
                </p>
                {isOwnProfile && (
                  <Button className="btn-primary">
                    List Your First Item
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {userItems.map((item) => (
                  <Card key={item.id} className="card-hover overflow-hidden">
                    <div className="aspect-product bg-muted relative overflow-hidden">
                      {item.images && item.images.length > 0 ? (
                        <img
                          src={item.images[0].image_url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground">No Image</span>
                        </div>
                      )}
                      {item.status !== 'available' && (
                        <Badge className="absolute top-2 left-2 bg-muted text-muted-foreground">
                          {item.status}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-foreground text-truncate-2 mb-1">
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
                          {item.views_count} views
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No reviews yet
              </h3>
              <p className="text-muted-foreground">
                {isOwnProfile 
                  ? 'Complete your first sale to receive reviews'
                  : 'This user hasn\'t received any reviews yet'
                }
              </p>
            </div>
          </TabsContent>

          {isOwnProfile && (
            <TabsContent value="settings" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Account Settings
                    </h3>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        Edit Profile Information
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        Notification Preferences
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        Privacy Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  )
}

export default ProfilePage

