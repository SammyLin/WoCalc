/**
 * 全站頁尾:署名、3mi 產品線導覽、社群連結。
 * 與其他 3mi 站台一致(參考 putguard/web/src/components/SiteFooter.jsx),不要在這裡另外發明。
 */
import { MessageSquare } from "lucide-react";

// lucide 已移除品牌圖示,GitHub / LinkedIn / X 自己畫
const BRAND_PATHS = {
  GitHub:
    "M12 .297a12 12 0 0 0-3.79 23.39c.6.111.82-.26.82-.578v-2.234c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.42-1.305.762-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23A11.5 11.5 0 0 1 12 5.8c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.806 5.625-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .32.218.694.825.576A12 12 0 0 0 12 .297z",
  LinkedIn:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  X: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
};

const SOCIAL = [
  { href: "https://github.com/sammylin", label: "GitHub" },
  { href: "https://linkedin.com/in/sammylintw", label: "LinkedIn" },
  { href: "https://x.com/sammylintw", label: "X" },
] as const;

const PRODUCTS = [
  { href: "https://3mi.ai", label: "3mi.ai" },
  { href: "https://reads.3mi.ai", label: "Reads" },
  { href: "https://trending.3mi.ai", label: "Trending" },
  { href: "https://chunkup.3mi.ai", label: "ChunkUp" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-border mt-16 bg-muted/50">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="space-y-2 text-[11px] leading-relaxed text-muted-foreground">
          <a
            href="https://forms.gle/hUiH3yusdAcZgjoQ8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            窩算算 (WoCalc) 意見回饋
          </a>
          <p>試算結果僅供參考，實際核貸條件以銀行最終審核為準</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <span className="text-xs text-muted-foreground">
            由 Sammy Lin 製作 ·{" "}
            <a
              href="https://3mi.ai"
              target="_blank"
              rel="noopener"
              className="text-foreground hover:text-primary transition-colors"
            >
              3mi.ai
            </a>
          </span>

          <div className="flex items-center gap-3">
            {SOCIAL.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener"
                aria-label={label}
                title={label}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d={BRAND_PATHS[label]} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-4 border-t border-border">
          <span className="text-[11px] text-muted-foreground">其他作品</span>
          {PRODUCTS.map((p) => (
            <a
              key={p.href}
              href={p.href}
              target="_blank"
              rel="noopener"
              className="text-[11px] text-muted-foreground hover:text-primary transition-colors"
            >
              {p.label}
            </a>
          ))}
          <span className="text-[11px] text-muted-foreground ml-auto">
            © {new Date().getFullYear()} Sammy Lin
          </span>
        </div>
      </div>
    </footer>
  );
}
