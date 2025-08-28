import Link from "next/link";
import { posts } from "@/lib/blog-posts";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface PostPageProps {
  params: {
    slug: string;
  };
}

// This function allows Next.js to know which slugs are available at build time
export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function PostPage({ params }: PostPageProps) {
  const { slug } = params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto py-4 px-6">
          <Link href="/blog" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Daftar Blog</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <article className="prose lg:prose-xl max-w-none">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-sm text-gray-500 mb-8">{post.date}</p>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </div>
      </main>

      <footer className="text-center py-8 text-gray-500">
        <p>&copy; {new Date().getFullYear()} XENA TEKNO. All rights reserved.</p>
      </footer>
    </div>
  );
}
