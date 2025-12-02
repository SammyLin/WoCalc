import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Download, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // 檢查是否為 iOS
    const iOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // 檢查是否已經安裝（standalone 模式）
    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    setIsStandalone(standalone);

    // 檢查是否已經關閉過提示
    const dismissed = localStorage.getItem("pwa-install-dismissed");
    if (dismissed) {
      return;
    }

    // 監聽 beforeinstallprompt 事件（Android/Desktop）
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // 延遲顯示，讓用戶先體驗網站
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // iOS 沒有 beforeinstallprompt，直接顯示提示
    if (iOS && !standalone && !dismissed) {
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("pwa-install-dismissed", "true");
  };

  // 不顯示提示的情況
  if (!showPrompt || isStandalone) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md">
      <Card className="relative bg-gradient-to-br from-[#5F9EA0]/10 to-[#D4A574]/10 backdrop-blur-sm border-[#5F9EA0]/20 shadow-xl">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100/50 transition-colors"
          aria-label="關閉"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>

        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#5F9EA0] flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-1">
                安裝窩算算到手機
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {isIOS
                  ? "在 Safari 點擊分享按鈕，然後選擇「加入主畫面」"
                  : "快速存取、離線使用，就像原生 App 一樣"}
              </p>

              {isIOS ? (
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5F9EA0] text-white flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <span>點擊下方的「分享」圖示</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5F9EA0] text-white flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <span>向下滾動找到「加入主畫面」</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5F9EA0] text-white flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <span>點擊「新增」完成安裝</span>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleInstall}
                    className="flex-1 bg-[#5F9EA0] hover:bg-[#5F9EA0]/90 text-white shadow-md"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    立即安裝
                  </Button>
                  <Button
                    onClick={handleDismiss}
                    variant="outline"
                    className="border-[#5F9EA0]/30 hover:bg-[#5F9EA0]/5"
                  >
                    稍後再說
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
