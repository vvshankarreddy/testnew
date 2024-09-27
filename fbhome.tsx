'use client'

import { useState, useRef, useEffect } from 'react'
import { Bell, Bookmark, ChevronDown, Home, Menu, MessageCircle, Search, Settings, Share, ThumbsUp, Users, Video, X, Smile, Image as ImageIcon, Paperclip, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Post = {
  id: number;
  author: string;
  avatar: string;
  content: string;
  image: string;
  likes: number;
  comments: Comment[];
  shares: number;
  timeAgo: string;
  isLiked: boolean;
}

type Comment = {
  id: number;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  timeAgo: string;
}

export default function FacebookHome() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "The 80s Rule",
      avatar: "/placeholder-user.jpg",
      content: "Happy Birthday Linda Hamilton (born September 26, 1956)! Known for portraying tough, resilient characters, she made her film debut in 1979 before achieving fame with her starring role as Sarah Connor in The Terminator (1984).",
      image: "/placeholder.svg?height=300&width=500",
      likes: 48000,
      comments: [
        { id: 1, author: "Krissa Coonse", avatar: "/placeholder-user.jpg", content: "Still beautiful!", likes: 60, timeAgo: "2h" },
        { id: 2, author: "Kathy M. Copiskey", avatar: "/placeholder-user.jpg", content: "Happy Birthday! 🎂🎉🎈❤️ Absolutely love your movies and the series Beauty and the Beast w Ron Perlman.", likes: 95, timeAgo: "5h" },
        { id: 3, author: "Lori Carlson", avatar: "/placeholder-user.jpg", content: "I love her! My 3 sons called me Sarah Conner because of her strength, determination and love for her son. They still call me that even tho I'm in my 70s. When they were pre teens I divorced their abusive dad in 1991.. Took 3 yrs. We owned 4 homes which he sold, even the roof over our heads. I worked 2 jobs and found a rental. My sons saw all the hardship and we were the 4 Musketeers! Some times I felt like giving up but never did. I went back to school earned my Master's in Soc work. President of their PTA and Scout's Mother. Today my boys are a Life Star Pilot, a PHD college Professor and an ER RN. They still call me Sarah! Our fav movie is Terminator!", likes: 128, timeAgo: "4h" },
      ],
      shares: 1700,
      timeAgo: "12h",
      isLiked: false
    },
    // Add more posts here if needed
  ]);

  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState('');
  const [showShareDialog, setShowShareDialog] = useState(false);

  const postRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (postRef.current) {
        const { top } = postRef.current.getBoundingClientRect();
        postRef.current.style.position = top <= 0 ? 'fixed' : 'static';
        postRef.current.style.top = top <= 0 ? '0' : 'auto';
        postRef.current.style.width = top <= 0 ? '100%' : 'auto';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked } : post
    ));
  };

  const handleComment = (post: Post) => {
    setSelectedPost(post);
    setShowCommentDialog(true);
  };

  const handleAddComment = () => {
    if (selectedPost && newComment.trim()) {
      const newCommentObj: Comment = {
        id: Date.now(),
        author: "You",
        avatar: "/placeholder-user.jpg",
        content: newComment,
        likes: 0,
        timeAgo: "Just now"
      };
      setPosts(posts.map(post =>
        post.id === selectedPost.id
          ? { ...post, comments: [newCommentObj, ...post.comments] }
          : post
      ));
      setNewComment('');
    }
  };

  const handleShare = (post: Post) => {
    setSelectedPost(post);
    setShowShareDialog(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-14 items-center px-4">
          <div className="flex flex-1 items-center justify-between">
            <a href="#" className="flex items-center space-x-2">
              <svg className="h-8 w-8 text-primary" viewBox="0 0 36 36">
                <path fill="currentColor" d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471L14 34h5.5l.681 1.87Z"></path>
                <path fill="#fff" d="M13.651 35.471v-11.97H9.936V18h3.715v-2.37c0-6.127 2.772-8.964 8.784-8.964 1.138 0 3.103.223 3.91.446v4.983c-.425-.043-1.167-.065-2.081-.065-2.952 0-4.09 1.117-4.09 4.025V18h5.883l-1.008 5.5h-4.874v12.37a18.183 18.183 0 01-6.524-.399Z"></path>
              </svg>
            </a>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">
                <Home className="h-5 w-5" />
              </Button>
              <Button variant="ghost">
                <Users className="h-5 w-5" />
              </Button>
              <Button variant="ghost">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost">
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <Button size="icon" variant="ghost">
                <Menu className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="container flex flex-col md:flex-row gap-4 py-4">
        <aside className="hidden md:flex flex-col w-[300px] space-y-4">
          <nav className="space-y-1">
            <a className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent" href="#">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Your Name</span>
            </a>
            <a className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent" href="#">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Friends</span>
            </a>
            <a className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent" href="#">
              <Bookmark className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Saved</span>
            </a>
            <a className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent" href="#">
              <Video className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Watch</span>
            </a>
            <Button variant="ghost" className="w-full justify-start">
              <ChevronDown className="h-5 w-5 mr-3" />
              <span className="text-sm font-medium">See more</span>
            </Button>
          </nav>
        </aside>

        <section className="flex-1 space-y-4">
          <Card ref={postRef}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Input placeholder="What's on your mind?" className="flex-1" />
              </div>
              <div className="mt-4 flex justify-between">
                <Button variant="ghost" className="flex-1">
                  <Video className="h-5 w-5 mr-2" />
                  Live video
                </Button>
                <Button variant="ghost" className="flex-1">
                  <img src="/placeholder.svg?height=20&width=20" alt="Photo" className="h-5 w-5 mr-2" />
                  Photo/video
                </Button>
                <Button variant="ghost" className="flex-1">
                  <img src="/placeholder.svg?height=20&width=20" alt="Feeling" className="h-5 w-5 mr-2" />
                  Feeling/activity
                </Button>
              </div>
            </CardContent>
          </Card>

          <ScrollArea className="h-[calc(100vh-200px)]">
            {posts.map((post) => (
              <Card key={post.id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={post.avatar} alt={post.author} />
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{post.author}</p>
                      <p className="text-sm text-muted-foreground">{post.timeAgo}</p>
                      <p className="mt-2">{post.content}</p>
                      {post.image && (
                        <img 
                          src={post.image} 
                          alt="Post content" 
                          className="mt-4 rounded-lg w-full cursor-pointer" 
                        />
                      )}
                      <div className="mt-4 flex items-center justify-between">
                        <Button 
                          variant="ghost" 
                          className={`flex-1 transition-colors duration-200 ${post.isLiked ? 'text-red-500' : ''}`} 
                          onClick={() => handleLike(post.id)}
                        >
                          <ThumbsUp className={`h-5 w-5 mr-2 ${post.isLiked ? 'fill-current' : ''}`} />
                          Like ({post.likes})
                        </Button>
                        <Button variant="ghost" className="flex-1" onClick={() => handleComment(post)}>
                          <MessageCircle className="h-5 w-5 mr-2" />
                          Comment ({post.comments.length})
                        </Button>
                        <Button variant="ghost" className="flex-1" onClick={() => handleShare(post)}>
                          <Share className="h-5 w-5 mr-2" />
                          Share ({post.shares})
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        </section>

        <aside className="hidden xl:block w-[300px] space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground mb-2">Sponsored</h2>
            <Card>
              <CardContent className="p-4">
                <img src="/placeholder.svg?height=150&width=268" alt="Ad" className="rounded-lg w-full mb-2" />
                <h3 className="font-semibold">Sponsored Content</h3>
                <p className="text-sm text-muted-foreground">Check out this amazing product!</p>
              </CardContent>
            </Card>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-muted-foreground">Contacts</h2>
              <div className="flex space-x-2">
                <Button size="icon" variant="ghost">
                  <Video className="h-4 w-4" />
                  <span className="sr-only">New room</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Options</span>
                </Button>
              </div>
            </div>
            <ScrollArea className="h-[400px]">
              <div className="space-y-1">
                {Array.from({length: 10}).map((_, i) => (
                  <Button key={i} variant="ghost" className="w-full justify-start">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={`/placeholder-user.jpg?${i}`} alt={`Friend ${i + 1}`} />
                      <AvatarFallback>F{i + 1}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Friend {i + 1}</span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </aside>
      </main>

      <Dialog open={showCommentDialog} onOpenChange={setShowCommentDialog}>
        <DialogContent className="sm:max-w-[600px] p-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>{selectedPost?.author}'s post</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p>{selectedPost?.content}</p>
            {selectedPost?.image && (
              <img src={selectedPost.image} alt="Post content" className="mt-4 rounded-lg w-full" />
            )}
          </div>
          <ScrollArea className="h-[300px] px-4">
            {selectedPost?.comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-4 mb-4">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={comment.avatar} alt={comment.author} />
                  <AvatarFallback>{comment.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{comment.author}</p>
                  <p>{comment.content}</p>
                  <div className="flex items-center space-x-2 mt-1 text-sm text-muted-foreground">
                    <button>Like</button>
                    <span>·</span>
                    <span>{comment.timeAgo}</span>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-user.jpg" alt="You" />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex items-center space-x-2 bg-accent rounded-full px-3 py-2">
                <Input
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 border-0 bg-transparent focus:ring-0"
                />
                <Button size="icon" variant="ghost">
                  <Smile className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <ImageIcon className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Paperclip className="h-5 w-5" />
                </Button>
              </div>
              <Button size="icon" onClick={handleAddComment} disabled={!newComment.trim()}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Share this post from {selectedPost?.author}</p>
            <div className="flex space-x-4">
              <Button className="flex-1">
                <MessageCircle className="mr-2 h-4 w-4" />
                Messenger
              </Button>
              <Button className="flex-1">
                <Users className="mr-2 h-4 w-4" />
                Group
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
