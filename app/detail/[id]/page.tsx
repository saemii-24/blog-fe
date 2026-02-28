"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart } from "lucide-react";
import type { Post } from "@/lib/types";
import { useParams } from "next/navigation";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const MOCK_POSTS: Post[] = [
  {
    id: 1,
    title: "작은 시작",
    content:
      "가끔은 가장 사소한 메모가 긴 이야기의 출발점이 되더라. 오늘은 서두르지 않고, 문장 하나씩 천천히 써보기로 했다.\n\n생각보다 어렵지 않았다. 오히려 멈춰서 바라보는 시간이 늘어나면서, 글을 쓰는 일이 ‘정리’가 아니라 ‘관찰’에 가까워졌다.\n\n내가 어떤 속도로 살아가는지, 무엇을 놓치고 있는지, 단어 사이로 조용히 드러난다.",
    image_url: "https://picsum.photos/seed/journal-1/1200/800",
    likes: 2,
    created_at: "2026-02-20T09:00:00.000Z",
  },
  {
    id: 2,
    title: "조용한 오후",
    content:
      "속도를 조금만 늦추면 빛이 다르게 보인다.\n\n오늘은 벽의 색, 주전자 소리, 그리고 할 일 사이의 짧은 멈춤까지 또렷하게 느꼈다. 작은 소리들이 생각을 정리해주고, 정리된 생각은 다시 나를 편안하게 만든다.\n\n아무것도 하지 않아도 괜찮은 시간. 그런 오후가 가끔은 필요하다.",
    image_url: "https://picsum.photos/seed/journal-2/1200/800",
    likes: 0,
    created_at: "2026-02-22T12:30:00.000Z",
  },
  {
    id: 3,
    title: "만듦에 대한 노트",
    content:
      "좋은 결과물은 대개 눈에 잘 띄지 않는 곳에서 완성된다.\n\n작은 선택들, 반복되는 수정, 아무도 보지 않을 때의 정성 같은 것들로. ‘완성’은 대단한 영감보다, 지루한 디테일을 견디는 시간에서 나온다.\n\n오늘도 한 줄을 고쳤다. 어쩌면 그게 전부일지 모른다. 하지만 그게 쌓인다.",
    image_url: "https://picsum.photos/seed/journal-3/1200/800",
    likes: 7,
    created_at: "2026-02-25T18:10:00.000Z",
  },
];

export default function PostDetailPage() {
  const params = useParams();

  const post: Post | undefined = useMemo(() => {
    const idNum = Number(params.id);
    return MOCK_POSTS.find((p) => p.id === idNum);
  }, [params.id]);

  if (!post) {
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

          <h1 className="text-4xl font-serif text-stone-900">
            글을 찾을 수 없어요.
          </h1>
          <p className="mt-4 text-stone-400">
            주소가 잘못되었거나, 존재하지 않는 글입니다.
          </p>
        </div>
      </div>
    );
  }

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

        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10"
        >
          {/* Meta */}
          <div className="flex items-center justify-between gap-6">
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.3em]">
              {formatDate(post.created_at)}
            </span>

            <div className="flex items-center gap-2 text-stone-400">
              <Heart size={16} />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                {post.likes} Likes
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-stone-900 leading-[1.05]">
            {post.title}
          </h1>

          {/* Cover Image */}
          {post.image_url && (
            <div className="overflow-hidden rounded-lg border border-stone-100 bg-stone-50">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Content */}
          <div className="pt-4">
            <div className="prose prose-stone max-w-none">
              {post.content.split("\n").map((line, idx) => (
                <p key={idx} className="leading-relaxed text-stone-600">
                  {line.trim() === "" ? "\u00A0" : line}
                </p>
              ))}
            </div>
          </div>

          {/* Bottom actions */}
          <div className="pt-10 border-t border-stone-100 flex items-center justify-between">
            <Link
              href="/"
              className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
            >
              Back to list
            </Link>

            <Link
              href="/create"
              className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
            >
              Write a new story
            </Link>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
