export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-stone-200 mt-20">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-serif italic text-stone-400">
          Crafted with intention.
        </p>
        <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-stone-400">
          <a href="#" className="hover:text-stone-900 transition-colors">
            Archive
          </a>
          <a href="#" className="hover:text-stone-900 transition-colors">
            About
          </a>
          <a href="#" className="hover:text-stone-900 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
