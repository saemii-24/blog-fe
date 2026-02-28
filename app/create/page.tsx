"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function CreatePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          image_url:
            imageUrl || `https://picsum.photos/seed/${Date.now()}/800/600`,
        }),
      });

      if (res.ok) router.push("/");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors mb-16 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Back to Journal
          </span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-5xl font-serif font-medium mb-16 text-stone-900">
            New Story
          </h2>

          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title..."
                className="w-full text-4xl serif border-none focus:ring-0 outline-none py-2 transition-colors placeholder:text-stone-100 text-stone-900"
                required
              />
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full py-4 border-b border-stone-100 focus:border-stone-900 outline-none transition-colors text-sm placeholder:text-stone-200"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your story here..."
                rows={12}
                className="w-full py-4 border-none focus:ring-0 outline-none transition-colors leading-relaxed resize-none text-stone-600"
                required
              />
            </div>

            <div className="pt-12">
              <button
                type="submit"
                disabled={submitting}
                className="w-full md:w-auto px-12 bg-stone-900 text-white py-4 rounded-md font-bold text-sm uppercase tracking-widest hover:bg-stone-800 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {submitting ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Publish Story"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
