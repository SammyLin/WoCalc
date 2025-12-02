import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, Share, Plus, Smartphone } from "lucide-react";
import { toast } from "sonner";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface PWAInstallButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showText?: boolean;
}

export default function PWAInstallButton({
  variant = "outline",
  size = "default",
  className = "",
  showText = true,
}: PWAInstallButtonProps) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    // 檢查是否為 iOS
    const iOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // 檢查是否已經安裝
    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    setIsStandalone(standalone);

    // 監聽 beforeinstallprompt 事件
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // iOS 顯示按鈕（即使沒有 prompt API）
    if (iOS && !standalone) {
      setIsInstallable(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (isIOS) {
      // iOS 顯示教學 Dialog
      setShowDialog(true);
      return;
    }

    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        toast.success("安裝成功！", {
          description: "窩算算已加入到你的裝置",
        });
        setIsInstallable(false);
      } else {
        toast.info("已取消安裝");
      }

      setDeferredPrompt(null);
    } catch (error) {
      console.error("PWA install error:", error);
      toast.error("安裝失敗，請稍後再試");
    }
  };

  // 已安裝或不支援，不顯示按鈕
  if (!isInstallable || isStandalone) {
    return null;
  }

  return (
    <>
      <Button
        onClick={handleInstall}
        variant={variant}
        size={size}
        className={className}
      >
        <Download className="w-4 h-4 mr-2" />
        {showText && (isIOS ? "安裝教學" : "安裝 App")}
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#5F9EA0] to-[#4A7C8C] flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl">安裝到主畫面</DialogTitle>
                <DialogDescription>三個步驟，輕鬆完成</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* 步驟 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#5F9EA0] text-white flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div className="flex-1 pt-1">
                <p className="font-medium text-base mb-2">
                  點擊下方的「分享」按鈕
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Share className="w-5 h-5 text-[#5F9EA0]" />
                  <span>通常在畫面底部中央</span>
                </div>
              </div>
            </div>

            {/* 步驟 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#5F9EA0] text-white flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div className="flex-1 pt-1">
                <p className="font-medium text-base mb-2">
                  向下滾動找到「加入主畫面」
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Plus className="w-5 h-5 text-[#5F9EA0]" />
                  <span>在分享選單中</span>
                </div>
              </div>
            </div>

            {/* 步驟 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#5F9EA0] text-white flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div className="flex-1 pt-1">
                <p className="font-medium text-base mb-2">
                  點擊「新增」完成安裝
                </p>
                <div className="text-sm text-muted-foreground">
                  安裝後可從主畫面開啟
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={() => setShowDialog(false)}
              variant="outline"
              className="flex-1"
            >
              知道了
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
