import { Heart, MessageCircle } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  content: string
  image: string
  author: {
    name: string
    avatar: string
  }
  date: string
  readTime: string
  tags: string[]
  likes: number
  comments: number
}

const blogPost: BlogPost = {
  id: '1',
  title: 'The Future of Web Development: Trends to Watch in 2024',
  content: `
    <p>As we approach 2024, the landscape of web development continues to evolve at a rapid pace...</p>
    <h2>1. AI-Driven Development</h2>
    <p>Artificial Intelligence is no longer just a buzzword...</p>
    <h2>2. WebAssembly and the Rise of Browser-Based Applications</h2>
    <p>WebAssembly (Wasm) is enabling developers to run high-performance applications...</p>
  `,
  image: '/placeholder.svg?height=400&width=800',
  author: {
    name: 'Jane Doe',
    avatar: '/placeholder.svg?height=40&width=40'
  },
  date: 'November 15, 2023',
  readTime: '5 min read',
  tags: ['Web Development', 'Technology Trends', 'AI', 'WebAssembly', 'PWA'],
  likes: 128,
  comments: 32
}

export default function BlogDetailPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{blogPost.title}</h1>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <img
                src={blogPost.author.avatar}
                alt={blogPost.author.name}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{blogPost.author.name}</p>
                <p className="text-sm text-gray-500">{blogPost.date} · {blogPost.readTime}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {blogPost.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        <img
          src={blogPost.image}
          alt="Blog post cover"
          className="w-full h-auto rounded-lg mb-8"
        />

        <div
          className="prose max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />

        <hr className="my-8" />
        <footer>
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-900">
                <Heart className="h-5 w-5" />
                <span>{blogPost.likes} Likes</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-900">
                <MessageCircle className="h-5 w-5" />
                <span>{blogPost.comments} Comments</span>
              </button>
            </div>
            
          </div>
        </footer>
      </article>
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <div className="border rounded-lg p-6 bg-gray-50">
          <p className="text-center text-gray-500">Comments are loading...</p>
        </div>
      </section>
    </div>
  )
}
