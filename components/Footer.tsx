export default function Footer() {
  return (
    <footer className="w-full py-8 mt-16 border-t border-gray-900">
      <div className="max-w-[1024px] mx-auto px-8">
        <p className="text-center text-muted text-sm">
          © 2026 Peakwalls — Developed & maintained by{" "}
          <a
            href="https://nirajrajput.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:text-foreground transition-colors"
          >
            Niraj Rajput
          </a>
        </p>
      </div>
    </footer>
  );
}
