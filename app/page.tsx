"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import PostCard from "@/components/PostCard";
import type { Post } from "@/lib/types";

const MOCK_POSTS: Post[] = [
  {
    id: 1,
    title: "작은 시작",
    content:
      "가끔은 가장 사소한 메모가 긴 이야기의 출발점이 되더라. 오늘은 서두르지 않고, 문장 하나씩 천천히 써보기로 했다.",
    image_url: "https://picsum.photos/seed/journal-1/800/600",
    likes: 2,
    created_at: "2026-02-20T09:00:00.000Z",
  },
  {
    id: 2,
    title: "조용한 오후",
    content:
      "속도를 조금만 늦추면 빛이 다르게 보인다. 오늘은 벽의 색, 주전자 소리, 그리고 할 일 사이의 짧은 멈춤까지 또렷하게 느꼈다.",
    image_url: "https://picsum.photos/seed/journal-2/800/600",
    likes: 0,
    created_at: "2026-02-22T12:30:00.000Z",
  },
  {
    id: 3,
    title: "만듦에 대한 노트",
    content:
      "좋은 결과물은 대개 눈에 잘 띄지 않는 곳에서 완성된다. 작은 선택들, 반복되는 수정, 아무도 보지 않을 때의 정성 같은 것들로.",
    image_url: "https://picsum.photos/seed/journal-3/800/600",
    likes: 7,
    created_at: "2026-02-25T18:10:00.000Z",
  },
];

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 목데이터 로딩 느낌만 살짝
    const t = setTimeout(() => {
      setPosts(MOCK_POSTS);
      setLoading(false);
    }, 250);

    return () => clearTimeout(t);
  }, []);

  const handleLike = async (id: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)),
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <Loader2 className="animate-spin text-stone-900" size={24} />
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
          Loading Journal
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <header className="mb-24">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-7xl font-serif font-medium mb-6 tracking-tight text-stone-900"
        >
          The Journal
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <div className="h-[1px] w-12 bg-stone-900" />
          <p className="text-stone-400 font-serif italic text-lg">
            A collection of stories, ideas, and moments.
          </p>
        </motion.div>
      </header>

      {posts.length === 0 ? (
        <div className="py-40 text-center">
          <p className="font-serif text-2xl text-stone-900">
            여러분의 새로운 글을 시작하세요!
          </p>
          <p className="mt-4 text-sm text-stone-400">
            상단의 New Post 버튼으로 바로 작성할 수 있어요.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onLike={handleLike} />
          ))}
        </div>
      )}
    </div>
  );
}
