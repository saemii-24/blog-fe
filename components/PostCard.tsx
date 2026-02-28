"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function PostCard({
  post,
  onLike,
}: {
  post: Post;
  onLike: (id: number) => void | Promise<void>;
}) {
  const router = useRouter();
  return (
    <motion.div
      onClick={() => {
        router.push(`/detail/${post.id}`);
      }}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg overflow-hidden border border-stone-100 hover:border-stone-200 transition-colors group"
    >
      {post.image_url && (
        <div className="aspect-[16/10] overflow-hidden bg-stone-50">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      <div className="p-8">
        <h3 className="text-2xl serif font-medium mb-4 leading-tight text-stone-900">
          {post.title}
        </h3>
        <p className="text-stone-500 line-clamp-2 mb-8 leading-relaxed text-sm">
          {post.content}
        </p>

        <div className="flex justify-between items-center pt-6 border-t border-stone-50">
          <span className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em]">
            {new Date(post.created_at).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>

          <button
            onClick={() => onLike(post.id)}
            className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors"
            aria-label="Like"
          >
            <Heart
              size={18}
              className={cn(
                "transition-all",
                post.likes > 0 && "fill-stone-900 text-stone-900",
              )}
            />
            <span className="text-xs font-bold tracking-wider">
              {post.likes}
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
