import { useState, useEffect } from 'react'
import { Send, Search, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'

const MessagesPage = () => {
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const { apiCall, user } = useAuth()
  const { t, isRTL } = useTheme()

  useEffect(() => {
    fetchConversations()
  }, [])

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id)
    }
  }, [selectedConversation])

  const fetchConversations = async () => {
    try {
      const result = await apiCall('/messages/conversations')
      if (result.success) {
        setConversations(result.data.conversations || [])
        if (result.data.conversations?.length > 0) {
          setSelectedConversation(result.data.conversations[0])
        }
      }
    } catch (error) {
      console.error('Error fetching conversations:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (conversationId) => {
    try {
      const result = await apiCall(`/messages/conversations/${conversationId}/messages`)
      if (result.success) {
        setMessages(result.data.messages || [])
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return

    try {
      const result = await apiCall('/messages', {
        method: 'POST',
        body: JSON.stringify({
          conversation_id: selectedConversation.id,
          content: newMessage.trim(),
        }),
      })

      if (result.success) {
        setMessages(prev => [...prev, result.data.message])
        setNewMessage('')
        // Update conversation list with new message
        fetchConversations()
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="h-96 loading-pulse rounded-lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          {t('nav.messages')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardContent className="p-0">
              <div className="p-4 border-b border-border">
                <div className="relative">
                  <Search className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                  <Input
                    placeholder="Search conversations..."
                    className={`${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                  />
                </div>
              </div>

              <div className="overflow-y-auto h-[500px]">
                {conversations.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No conversations yet
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Start a conversation by messaging a seller
                    </p>
                  </div>
                ) : (
                  conversations.map((conversation) => {
                    const otherUser = conversation.participants.find(p => p.id !== user?.id)
                    const isSelected = selectedConversation?.id === conversation.id
                    
                    return (
                      <div
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation)}
                        className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                          isSelected ? 'bg-muted' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <Avatar>
                            <AvatarImage src={otherUser?.profile_picture_url} />
                            <AvatarFallback>
                              {otherUser?.first_name?.[0] || otherUser?.username?.[0] || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-foreground truncate">
                                {otherUser?.first_name || otherUser?.username}
                              </h4>
                              {conversation.unread_count > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  {conversation.unread_count}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {conversation.last_message?.content || 'No messages yet'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {conversation.last_message?.created_at && 
                                new Date(conversation.last_message.created_at).toLocaleDateString()
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="lg:col-span-2">
            <CardContent className="p-0 h-full flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Avatar>
                        <AvatarImage src={selectedConversation.participants.find(p => p.id !== user?.id)?.profile_picture_url} />
                        <AvatarFallback>
                          {selectedConversation.participants.find(p => p.id !== user?.id)?.first_name?.[0] || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-foreground">
                          {selectedConversation.participants.find(p => p.id !== user?.id)?.first_name || 
                           selectedConversation.participants.find(p => p.id !== user?.id)?.username}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedConversation.item?.title && `About: ${selectedConversation.item.title}`}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => {
                      const isOwn = message.sender_id === user?.id
                      return (
                        <div
                          key={message.id}
                          className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              isOwn
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-foreground'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            }`}>
                              {new Date(message.created_at).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-border">
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        className="flex-1"
                      />
                      <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Choose a conversation from the list to start messaging
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MessagesPage

