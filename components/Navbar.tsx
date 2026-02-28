import Link from "next/link";
import { Plus } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100 px-6 py-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-serif font-bold tracking-tight text-stone-900"
        >
          Crafted Thoughts
        </Link>

        <Link
          href="/create"
          className="flex items-center gap-2 bg-stone-900 text-white px-5 py-2 rounded-md hover:bg-stone-800 transition-colors text-sm font-medium"
        >
          <Plus size={16} />
          <span>New Post</span>
        </Link>
      </div>
    </nav>
  );
}
