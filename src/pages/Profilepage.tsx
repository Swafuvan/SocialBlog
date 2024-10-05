// ProfilePage.tsx
import { FC, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Edit, MessageCircle, ThumbsUp, Users } from 'lucide-react';
import { userContext } from './Provider';
import { AllUserBlogs } from '@/lib/routes/userRoutes';
import moment from 'moment';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  likes: number;
  comments: number;
}

const recentPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React Hooks',
    excerpt: 'Learn how to use React Hooks to manage state and side effects in your components.',
    date: '2023-09-15',
    likes: 42,
    comments: 8,
  },
  {
    id: '2',
    title: 'Building Responsive Layouts with Tailwind CSS',
    excerpt: 'Discover how to create beautiful, responsive layouts quickly using Tailwind CSS.',
    date: '2023-09-10',
    likes: 35,
    comments: 5,
  },
  {
    id: '3',
    title: 'Introduction to TypeScript for JavaScript Developers',
    excerpt: 'Learn the basics of TypeScript and how it can improve your JavaScript development workflow.',
    date: '2023-09-05',
    likes: 28,
    comments: 3,
  },
];

const ProfilePage: FC = () => {


  const { user, loading } = useContext<any>(userContext);
  const [allBlogs, setAllBlogs] = useState([]);
  const naviagte = useNavigate()

  useEffect(() => {
    if (user) {
      AllUserBlogs(user?._id).then((data) => {
        console.log(data)
        setAllBlogs(data.Blogs)
      })
    }
  }, [user]);

  useEffect(() => {
    if (!user && !loading) {
      naviagte('/login')
    }
  }, [])


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Profile card */}
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="John Doe" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4 text-2xl">{user?.username}</CardTitle>
              <p className="text-muted-foreground">{user?.bio}</p>
            </CardHeader>
            <CardContent>

              <div className="mt-6 flex justify-center space-x-4">
                <Button variant="outline" size="sm">
                  <Users className="mr-2 h-4 w-4" />
                  Follow
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Posts</span>
                <span className="font-semibold">{user?.Blogs?.length}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Followers</span>
                <span className="font-semibold">{user?.followers?.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Following</span>
                <span className="font-semibold">{user?.following?.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right side - Tabs */}
        <div className="md:w-2/3">
          <Tabs defaultValue="posts">
            <TabsList className="mb-4">
              <TabsTrigger value="posts">Recent Posts</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <TabsContent value="posts">
              {allBlogs.length > 0 ? allBlogs?.map((blog: any, index: number) => (
                <Card key={index} className="mb-4">
                  <CardHeader>
                    <CardTitle>{blog.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{moment(blog.createdAt).fromNow()}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{blog.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-4">
                        <span className="flex items-center text-muted-foreground">
                          <ThumbsUp className="mr-1 h-4 w-4" />
                          {blog.likes.length}
                        </span>
                      </div>
                      {/* <Link to={`/blog/${post.id}`}>
                        <Button variant="ghost" size="sm">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Read More
                        </Button>
                      </Link> */}
                    </div>
                  </CardContent>
                </Card>
              ))
                :
                <p>No Blogs found</p>
              }
              {/* <div className="text-center mt-6">
                <Button>
                  <Edit className="mr-2 h-4 w-4" />
                  Create New Post
                </Button>
              </div> */}
            </TabsContent>

            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    {user?.bio}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
