import React, { useContext, useEffect,  useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Bell, PlusCircleIcon, Home, LogOut, MessageCircle, Search, ThumbsUp, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { userContext } from './Provider'
import moment from 'moment'
import { FindAllBlogs } from '@/lib/routes/userRoutes'
import { PostEditModal } from './EditBlog'

// Define BlogPost interface
interface BlogPost {
    id: string
    author: {
        name: string
        avatar: string
    }
    content: string
    likes: number
    comments: number
    timestamp: string
}

const HomePage: React.FC = () => {
    const Navigate = useNavigate();

    const [Blogs, setBlogs] = useState([]);
    const [singlePost, setSinglePost] = useState();
    const { user, logOut, loading } = useContext<any>(userContext);
    const [showModal, setShowModal] = useState(false);
    const userData = localStorage.getItem('userToken');

    console.log(user, userData);

    useEffect(() => {
        if (!user && !loading) {
            Navigate('/login');
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            FindAllBlogs().then((res) => {
                console.log(res.Blogs);
                setBlogs(res.Blogs);
            })
        }
    }, [user,setBlogs]);

    const handleCLose = () => {
        setShowModal(false);
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-background border-b">
                <div className="container mx-auto px-4 py-2 flex items-center justify-between">
                    <a href="/" className="text-2xl font-bold">BlogSocial</a>
                    <div className="flex items-center space-x-4">
                        <Button size="icon" variant="ghost">
                            <Search className="h-5 w-5" />
                            <span className="sr-only">Search</span>
                        </Button>
                        <Button size="icon" variant="ghost">
                            <Bell className="h-5 w-5" />
                            <span className="sr-only">Notifications</span>
                        </Button>
                        <Avatar onClick={() => Navigate('/profile')} className='cursor-pointer'>
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-8 flex gap-8">
                <nav className="hidden md:block w-64 space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                        <Home onClick={() => Navigate('/')} className="mr-2 h-4 w-4" />
                        Home
                    </Button>
                    <Button onClick={() => Navigate('/profile')} variant="ghost" className="w-full justify-start">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </Button>
                    <Button onClick={() => Navigate('/create')} variant="ghost" className="w-full justify-start">
                        <PlusCircleIcon className="mr-2 h-4 w-4" />
                        Create
                    </Button>
                    {/* <Button onClick={userDetailsFind} variant="ghost" className="w-full justify-start">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Messages
                    </Button> */}
                    <Separator />
                    <Button onClick={logOut} variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </nav>
                {showModal && <PostEditModal handleCLose={handleCLose} setBlogs={setBlogs} singlePost={singlePost} />}
                {/* Blog Post Section */}
                <section className="flex-grow space-y-4">
                    {/* <Card>
                        <CardHeader>
                            <Input placeholder="What's on your mind?" />
                        </CardHeader>
                        <CardFooter>
                            <Button>
                                <PenSquare className="mr-2 h-4 w-4" />
                                Post
                            </Button>
                        </CardFooter>
                    </Card> */}
                    {Blogs?.map((datas: any, index: number) => {
                        return (
                            <Card key={index}>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div className='flex '>
                                        <Avatar>
                                            <AvatarImage src={datas?.author?.image} alt='userimage' />
                                            <AvatarFallback>{datas?.author?.username}</AvatarFallback>
                                        </Avatar>
                                        <div className='ml-3'>
                                            <h3 className="font-semibold">{datas?.author?.username}</h3>
                                            <p className="text-sm text-muted-foreground">{moment(datas?.createdAt).fromNow()}</p>
                                        </div>
                                    </div>
                                    <div className='justify-end '>
                                        <img className='cursor-pointer' onClick={() => { setShowModal(true), setSinglePost(datas) }} src="/icons8.png" alt="image" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <h2 className="font-bold text-lg mb-1 flex justify-center">{datas?.title}</h2>
                                    {datas?.Data ? (
                                        <>
                                            {datas?.Data?.fileType === 'image' ? (
                                                <img src={datas?.Data?.file} alt='blog picture' />
                                            ) : (
                                                <video controls autoPlay loop muted
                                                    controlsList="nodownload nofullscreen noremoteplayback"
                                                    disablePictureInPicture >
                                                    <source src={datas?.Data?.file} type="video/mp4" />
                                                </video>
                                            )}
                                            <p className='mt-2'>{datas?.content}</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className='mt-2'>{datas?.content}</p>
                                        </>
                                    )}
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button variant="ghost">
                                        <ThumbsUp className="mr-2 h-4 w-4" />
                                        {datas?.likes?.length} Likes
                                    </Button>
                                    <Button variant="ghost">
                                        <MessageCircle className="mr-2 h-4 w-4" />
                                        Comments
                                    </Button>
                                </CardFooter>
                            </Card>
                        )
                    })}
                    {/* {sampleBlogPosts.map((post) => (
                        <Card key={post.id}>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold">{post.author.name}</h3>
                                    <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p>{post.content}</p>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="ghost">
                                    <ThumbsUp className="mr-2 h-4 w-4" />
                                    {post.likes} Likes
                                </Button>
                                <Button variant="ghost">
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    {post.comments} Comments
                                </Button>
                            </CardFooter>
                        </Card>
                    ))} */}
                </section>

                {/* Sidebar */}
                <aside className="hidden lg:block w-64 space-y-6">

                    <Card>
                        <CardHeader>
                            <h2 className="font-semibold">Suggested Users</h2>
                        </CardHeader>
                        <CardContent >
                            <ul className="space-y-4">
                                {['Alice', 'Bob', 'Charlie'].map((user, index) => (
                                    <li key={index} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Avatar>
                                                <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${user[0]}`} alt={user} />
                                                <AvatarFallback>{user[0]}</AvatarFallback>
                                            </Avatar>
                                            <span>{user}</span>
                                        </div>
                                        <Button size="sm">Follow</Button>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </aside>
            </main>

            {/* Footer */}
            <footer className="bg-muted py-6">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                    <p>&copy; 2023 BlogSocial. All rights reserved.</p>
                    <p className="mt-2">
                        <a href="#" className="hover:underline">Terms of Service</a>
                        {' • '}
                        <a href="#" className="hover:underline">Privacy Policy</a>
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default HomePage
