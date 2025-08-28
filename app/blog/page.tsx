import Link from "next/link";
import { posts } from "@/lib/blog-posts";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto py-4 px-6">
          <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center mb-4 text-blue-600">Blog XENA TEKNO</h1>
          <p className="text-center text-gray-600 mb-12">Wawasan, berita, dan pemikiran dari tim kami.</p>

          <div className="space-y-8">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} legacyBehavior>
                <a className="block">
                  <Card className="hover:shadow-lg hover:border-blue-300 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-gray-800 hover:text-blue-600">{post.title}</CardTitle>
                      <p className="text-sm text-gray-500 pt-2">{post.date}</p>
                      <CardDescription className="pt-4 text-base">{post.excerpt}</CardDescription>
                    </CardHeader>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="text-center py-8 text-gray-500">
        <p>&copy; {new Date().getFullYear()} XENA TEKNO. All rights reserved.</p>
      </footer>
    </div>
  );
}
