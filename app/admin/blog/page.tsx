"use client";

import { useEffect, useState } from "react";
import { useUser, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { supabase } from "@/lib/supabaseClient";

type Blog = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  author?: string;
};

// Simple Text Editor Component dengan Rich Text Features
function SimpleTextEditor({
  value,
  onChange,
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  const [isPreview, setIsPreview] = useState(false);

  const insertFormatting = (startTag: string, endTag: string = "") => {
    const textarea = document.getElementById(
      "content-editor"
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);

    let newText;
    if (endTag) {
      newText = beforeText + startTag + selectedText + endTag + afterText;
    } else {
      newText = beforeText + startTag + selectedText + afterText;
    }

    onChange(newText);

    // Set cursor position
    setTimeout(() => {
      textarea.focus();
      const newPos =
        start + startTag.length + selectedText.length + endTag.length;
      textarea.setSelectionRange(newPos, newPos);
    }, 10);
  };

  const formatButtons = [
    {
      label: "B",
      title: "Bold",
      action: () => insertFormatting("<b>", "</b>"),
    },
    {
      label: "I",
      title: "Italic",
      action: () => insertFormatting("<i>", "</i>"),
    },
    {
      label: "U",
      title: "Underline",
      action: () => insertFormatting("<u>", "</u>"),
    },
    {
      label: "H1",
      title: "Heading 1",
      action: () => insertFormatting("<h1>", "</h1>"),
    },
    {
      label: "H2",
      title: "Heading 2",
      action: () => insertFormatting("<h2>", "</h2>"),
    },
    {
      label: "H3",
      title: "Heading 3",
      action: () => insertFormatting("<h3>", "</h3>"),
    },
    {
      label: "P",
      title: "Paragraph",
      action: () => insertFormatting("<p>", "</p>"),
    },
    {
      label: "🔗",
      title: "Link",
      action: () => insertFormatting('<a href="URL">', "</a>"),
    },
    {
      label: "• List",
      title: "Bullet List",
      action: () => insertFormatting("<ul>\n<li>", "</li>\n</ul>"),
    },
    {
      label: "1. List",
      title: "Number List",
      action: () => insertFormatting("<ol>\n<li>", "</li>\n</ol>"),
    },
    {
      label: "Quote",
      title: "Blockquote",
      action: () => insertFormatting("<blockquote>", "</blockquote>"),
    },
    {
      label: "Code",
      title: "Code",
      action: () => insertFormatting("<code>", "</code>"),
    },
  ];

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-3">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-medium text-gray-600">Format:</span>
          {formatButtons.map((button) => (
            <button
              key={button.label}
              type="button"
              onClick={button.action}
              disabled={disabled}
              title={button.title}
              className="px-3 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 font-medium transition-colors"
            >
              {button.label}
            </button>
          ))}
          <div className="ml-auto flex gap-1">
            <button
              type="button"
              onClick={() => setIsPreview(false)}
              className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                !isPreview
                  ? "bg-blue-500 text-white"
                  : "bg-white border border-gray-300 hover:bg-gray-50"
              }`}
            >
              ✏️ Edit
            </button>
            <button
              type="button"
              onClick={() => setIsPreview(true)}
              className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                isPreview
                  ? "bg-blue-500 text-white"
                  : "bg-white border border-gray-300 hover:bg-gray-50"
              }`}
            >
              👁️ Preview
            </button>
          </div>
        </div>
      </div>

      {/* Editor/Preview Area */}
      {isPreview ? (
        <div className="p-4 min-h-[250px] bg-white">
          {value ? (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          ) : (
            <p className="text-gray-500 italic">
              Belum ada konten untuk preview...
            </p>
          )}
        </div>
      ) : (
        <div className="p-0">
          <textarea
            id="content-editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            placeholder="Tulis konten blog di sini... 

Contoh formatting:
<h2>Judul Besar</h2>
<p>Ini adalah paragraf biasa.</p>
<b>Text tebal</b> dan <i>text miring</i>
<ul>
<li>Item list 1</li>
<li>Item list 2</li>
</ul>"
            className="w-full p-4 min-h-[250px] border-none resize-none focus:outline-none focus:ring-0 font-mono text-sm leading-relaxed"
            style={{ fontFamily: 'Monaco, Consolas, "Courier New", monospace' }}
          />
        </div>
      )}
    </div>
  );
}

export default function AdminBlogPage() {
  const { user } = useUser();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editing, setEditing] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching blogs:", error);
        return;
      }

      setBlogs(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreate = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Judul dan konten tidak boleh kosong!");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.from("blogs").insert([
        {
          title: title.trim(),
          content: content.trim(),
          author: user?.fullName || "Admin",
        },
      ]);

      if (error) {
        console.error("Error creating blog:", error);
        alert("Gagal membuat blog. Silakan coba lagi.");
        return;
      }

      setTitle("");
      setContent("");
      await fetchBlogs();
      alert("Blog berhasil ditambahkan!");
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!editing || !title.trim() || !content.trim()) {
      alert("Judul dan konten tidak boleh kosong!");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from("blogs")
        .update({
          title: title.trim(),
          content: content.trim(),
        })
        .eq("id", editing.id);

      if (error) {
        console.error("Error updating blog:", error);
        alert("Gagal mengupdate blog. Silakan coba lagi.");
        return;
      }

      setEditing(null);
      setTitle("");
      setContent("");
      await fetchBlogs();
      alert("Blog berhasil diupdate!");
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin hapus blog ini?")) return;

    try {
      setLoading(true);
      const { error } = await supabase.from("blogs").delete().eq("id", id);

      if (error) {
        console.error("Error deleting blog:", error);
        alert("Gagal menghapus blog. Silakan coba lagi.");
        return;
      }

      await fetchBlogs();
      alert("Blog berhasil dihapus!");
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditing(null);
    setTitle("");
    setContent("");
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        📝 Admin - Kelola Blog
      </h1>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        {/* Form */}
        <div className="mb-8 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {editing ? "✏️ Edit Blog" : "➕ Tambah Blog Baru"}
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Blog *
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul blog..."
              className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Konten Blog *
            </label>
            <SimpleTextEditor
              value={content}
              onChange={setContent}
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-2">
              💡 Tips: Gunakan tombol format di toolbar atau ketik HTML tags
              langsung
            </p>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            {editing ? (
              <>
                <button
                  onClick={handleUpdate}
                  disabled={loading || !title.trim() || !content.trim()}
                  className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Mengupdate...
                    </>
                  ) : (
                    <>💾 Update Blog</>
                  )}
                </button>
                <button
                  onClick={resetForm}
                  disabled={loading}
                  className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  ❌ Batal
                </button>
              </>
            ) : (
              <button
                onClick={handleCreate}
                disabled={loading || !title.trim() || !content.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Menambah...
                  </>
                ) : (
                  <>✨ Tambah Blog</>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Blog List */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              📚 Daftar Blog ({blogs.length})
            </h2>
            {loading && (
              <div className="flex items-center gap-2 text-blue-600">
                <span className="animate-spin">⏳</span>
                <span className="text-sm">Loading...</span>
              </div>
            )}
          </div>

          {blogs.length === 0 && !loading ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500 text-lg">Belum ada blog.</p>
              <p className="text-gray-400">
                Tambahkan blog pertama Anda di form di atas!
              </p>
            </div>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className="border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-gray-800 pr-4">
                      {blog.title}
                    </h3>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditing(blog);
                          setTitle(blog.title);
                          setContent(blog.content);
                          // Scroll ke form
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        disabled={loading}
                        className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        🗑️ Hapus
                      </button>
                    </div>
                  </div>

                  <div
                    className="prose max-w-none text-gray-700 mb-4"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />

                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500 flex items-center gap-4">
                      <span>
                        📅{" "}
                        {new Date(blog.created_at).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {blog.author && <span>👤 {blog.author}</span>}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </SignedIn>
    </div>
  );
}
