import { useState, useRef } from "react";
import { calculateMortgage, MortgageResult } from "@/lib/mortgage-calculator";
import { Calculator, Home as HomeIcon, DollarSign, TrendingUp, Info as InfoIcon, CheckCircle2, AlertTriangle, XCircle, Sparkles, ArrowRight, ArrowLeft, Check } from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Home() {
  // Step State
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [income, setIncome] = useState("");
  const [existingLoanPayment, setExistingLoanPayment] = useState("");
  const [livingExpenses, setLivingExpenses] = useState("");
  const [housePrice, setHousePrice] = useState("");
  const [loanTerm, setLoanTerm] = useState("30");
  const [interestRate, setInterestRate] = useState("2.185");
  const [gracePeriod, setGracePeriod] = useState("0");
  const [hasOtherLoan, setHasOtherLoan] = useState(false);
  const [hasGuarantor, setHasGuarantor] = useState(false);
  const [guarantorIncome, setGuarantorIncome] = useState("");
  const [guarantorExistingLoan, setGuarantorExistingLoan] = useState("");
  const [guarantorLivingExpenses, setGuarantorLivingExpenses] = useState("");

  // Validation State
  const [errors, setErrors] = useState<{income?: string; housePrice?: string}>({});

  // Calculation Results
  const [result, setResult] = useState<MortgageResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Validate current step
  const validateStep = (step: number): boolean => {
    const newErrors: {income?: string; housePrice?: string} = {};

    if (step === 1) {
      if (!income) {
        newErrors.income = "請輸入月收入";
        setErrors(newErrors);
        return false;
      }
    } else if (step === 2) {
      if (!housePrice) {
        newErrors.housePrice = "請輸入房屋總價";
        setErrors(newErrors);
        return false;
      }
    }

    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateLoan = () => {
    if (!validateStep(2)) return;

    const calculationResult = calculateMortgage({
      monthlyIncome: parseFloat(income),
      monthlyExpenses: (parseFloat(existingLoanPayment) || 0) + (parseFloat(livingExpenses) || 0),
      housePrice: parseFloat(housePrice) * 10000,
      interestRate: parseFloat(interestRate),
      loanTermYears: parseFloat(loanTerm),
      gracePeriodYears: parseFloat(gracePeriod),
      isSecondHome: hasOtherLoan,
      guarantorIncome: hasGuarantor ? parseFloat(guarantorIncome) || 0 : 0,
      guarantorExpenses: hasGuarantor ? (parseFloat(guarantorExistingLoan) || 0) + (parseFloat(guarantorLivingExpenses) || 0) : 0
    });

    setResult(calculationResult);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const resetCalculator = () => {
    setCurrentStep(1);
    setResult(null);
    setIncome("");
    setExistingLoanPayment("");
    setLivingExpenses("");
    setHousePrice("");
    setLoanTerm("30");
    setInterestRate("2.185");
    setGracePeriod("0");
    setHasOtherLoan(false);
    setHasGuarantor(false);
    setGuarantorIncome("");
    setGuarantorExistingLoan("");
    setGuarantorLivingExpenses("");
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper for Tooltip
  const InfoTooltip = ({ content }: { content: string }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help inline-block" />
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p className="text-sm">{content}</p>
      </TooltipContent>
    </Tooltip>
  );

  // Format number with commas
  const formatNumber = (value: string) => {
    const num = value.replace(/,/g, '');
    if (!num || isNaN(Number(num))) return value;
    return Number(num).toLocaleString();
  };

  // Step indicator component
  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-3 mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`flex items-center gap-2 ${step > 1 ? 'ml-3' : ''}`}>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold transition-all duration-300 ${
              currentStep > step
                ? 'bg-primary border-primary text-white'
                : currentStep === step
                ? 'bg-primary/10 border-primary text-primary scale-110'
                : 'bg-slate-100 border-slate-300 text-slate-400 dark:bg-slate-800 dark:border-slate-700'
            }`}>
              {currentStep > step ? <Check className="h-5 w-5" /> : step}
            </div>
            <span className={`text-sm font-medium hidden sm:inline ${
              currentStep >= step ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {step === 1 ? '基本資料' : step === 2 ? '房貸條件' : '進階選項'}
            </span>
          </div>
          {step < 3 && (
            <div className={`h-0.5 w-12 sm:w-20 ml-3 transition-all duration-300 ${
              currentStep > step ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="窩算算" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
                窩算算
              </h1>
              <p className="text-xs text-muted-foreground">溫暖成家，理性規劃</p>
            </div>
          </div>
          <Badge variant="secondary" className="hidden md:flex items-center gap-1.5 px-3 py-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">專業試算</span>
          </Badge>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            精準計算您的<span className="text-primary">購屋能力</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            基於銀行真實審核標準，提供專業的收支比分析與核貸評估
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Input Form */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="space-y-4 pb-6">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Calculator className="h-6 w-6 text-primary" />
                    開始試算
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    請依照步驟填寫資料，我們將為您計算最適合的貸款方案
                  </CardDescription>
                </div>
                <StepIndicator />
              </CardHeader>

              <CardContent>
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="space-y-2">
                      <Label htmlFor="income" className="flex items-center gap-2 text-base font-medium">
                        月收入 <Badge variant="outline" className="text-xs">必填</Badge>
                      </Label>
                      <div className="relative">
                        <Input
                          id="income"
                          placeholder="例如：22,000"
                          type="text"
                          value={formatNumber(income)}
                          onChange={(e) => {
                            const value = e.target.value.replace(/,/g, '');
                            setIncome(value);
                            if (errors.income) setErrors({...errors, income: undefined});
                          }}
                          className={`h-12 text-lg pr-12 ${errors.income ? "border-red-500" : ""}`}
                        />
                        <span className="absolute right-4 top-3.5 text-sm text-muted-foreground font-medium">元/月</span>
                      </div>
                      {errors.income && <p className="text-sm text-red-500">{errors.income}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="existingLoan" className="flex items-center gap-1.5 text-sm">
                          現有貸款月付金
                          <InfoTooltip content="包含現有房貸、信貸、車貸等每月需償還金額" />
                        </Label>
                        <div className="relative">
                          <Input
                            id="existingLoan"
                            placeholder="1,000"
                            type="text"
                            value={formatNumber(existingLoanPayment)}
                            onChange={(e) => setExistingLoanPayment(e.target.value.replace(/,/g, ''))}
                            className="h-11 pr-10"
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">元</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="livingExpenses" className="flex items-center gap-1.5 text-sm">
                          每月基本生活費
                          <InfoTooltip content="包含伙食、交通、水電等日常開銷" />
                        </Label>
                        <div className="relative">
                          <Input
                            id="livingExpenses"
                            placeholder="1,000"
                            type="text"
                            value={formatNumber(livingExpenses)}
                            onChange={(e) => setLivingExpenses(e.target.value.replace(/,/g, ''))}
                            className="h-11 pr-10"
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">元</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleNext}
                      size="lg"
                      className="w-full mt-4 h-12 text-lg font-semibold"
                    >
                      下一步：房貸條件
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                )}

                {/* Step 2: House Info */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="space-y-2">
                      <Label htmlFor="housePrice" className="flex items-center gap-2 text-base font-medium">
                        房屋總價 <Badge variant="outline" className="text-xs">必填</Badge>
                      </Label>
                      <div className="relative">
                        <Input
                          id="housePrice"
                          placeholder="例如：1,500"
                          type="text"
                          value={formatNumber(housePrice)}
                          onChange={(e) => {
                            const value = e.target.value.replace(/,/g, '');
                            setHousePrice(value);
                            if (errors.housePrice) setErrors({...errors, housePrice: undefined});
                          }}
                          className={`h-12 text-lg pr-12 ${errors.housePrice ? "border-red-500" : ""}`}
                        />
                        <span className="absolute right-4 top-3.5 text-sm text-muted-foreground font-medium">萬元</span>
                      </div>
                      {errors.housePrice && <p className="text-sm text-red-500">{errors.housePrice}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="interestRate" className="text-sm">房貸利率</Label>
                        <div className="relative">
                          <Input
                            id="interestRate"
                            placeholder="2.6"
                            type="number"
                            step="0.001"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                            className="h-11 pr-10"
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="loanTerm" className="text-sm">貸款年限</Label>
                        <div className="relative">
                          <Input
                            id="loanTerm"
                            placeholder="30"
                            type="number"
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(e.target.value)}
                            className="h-11 pr-10"
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">年</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gracePeriod" className="flex items-center gap-1.5 text-sm">
                        寬限期
                        <InfoTooltip content="寬限期內只需繳交利息，不用償還本金" />
                      </Label>
                      <div className="relative">
                        <Input
                          id="gracePeriod"
                          placeholder="0"
                          type="number"
                          value={gracePeriod}
                          onChange={(e) => setGracePeriod(e.target.value)}
                          className="h-11 pr-10"
                        />
                        <span className="absolute right-3 top-3 text-sm text-muted-foreground">年</span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <Button
                        onClick={handlePrev}
                        variant="outline"
                        size="lg"
                        className="flex-1 h-12 text-lg"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        上一步
                      </Button>
                      <Button
                        onClick={handleNext}
                        size="lg"
                        className="flex-1 h-12 text-lg font-semibold"
                      >
                        下一步：進階選項
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Advanced Options */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    {/* Second Home */}
                    <div className="flex items-start justify-between p-4 rounded-lg border bg-slate-50/50 dark:bg-slate-900/50">
                      <div className="flex-1 space-y-1">
                        <Label htmlFor="hasOtherLoan" className="text-base font-medium cursor-pointer">
                          名下已有其他房貸（第二戶）
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          若勾選，基礎核貸成數將降為 5 成
                        </p>
                      </div>
                      <Switch
                        id="hasOtherLoan"
                        checked={hasOtherLoan}
                        onCheckedChange={setHasOtherLoan}
                        className="mt-1"
                      />
                    </div>

                    {/* Guarantor */}
                    <div className="space-y-4">
                      <div className="flex items-start justify-between p-4 rounded-lg border bg-slate-50/50 dark:bg-slate-900/50">
                        <div className="flex-1 space-y-1">
                          <Label htmlFor="hasGuarantor" className="text-base font-medium cursor-pointer">
                            加入保證人/配偶擔保
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            合併計算收支比，適用於借款人收入不足時
                          </p>
                        </div>
                        <Switch
                          id="hasGuarantor"
                          checked={hasGuarantor}
                          onCheckedChange={setHasGuarantor}
                          className="mt-1"
                        />
                      </div>

                      {hasGuarantor && (
                        <div className="space-y-4 p-4 bg-primary/5 rounded-lg border-2 border-primary/20 animate-in fade-in slide-in-from-top-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-primary" />
                            保證人財務資料
                          </h4>
                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="guarantorIncome" className="text-sm">保證人月收入</Label>
                              <div className="relative">
                                <Input
                                  id="guarantorIncome"
                                  placeholder="22,000"
                                  type="text"
                                  value={formatNumber(guarantorIncome)}
                                  onChange={(e) => setGuarantorIncome(e.target.value.replace(/,/g, ''))}
                                  className="h-11 pr-10 bg-white dark:bg-slate-950"
                                />
                                <span className="absolute right-3 top-3 text-sm text-muted-foreground">元</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="guarantorExistingLoan" className="text-sm">現有貸款月付金</Label>
                                <div className="relative">
                                  <Input
                                    id="guarantorExistingLoan"
                                    placeholder="10,000"
                                    type="text"
                                    value={formatNumber(guarantorExistingLoan)}
                                    onChange={(e) => setGuarantorExistingLoan(e.target.value.replace(/,/g, ''))}
                                    className="h-11 pr-10 bg-white dark:bg-slate-950"
                                  />
                                  <span className="absolute right-3 top-3 text-sm text-muted-foreground">元</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="guarantorLivingExpenses" className="text-sm">每月生活費</Label>
                                <div className="relative">
                                  <Input
                                    id="guarantorLivingExpenses"
                                    placeholder="15,000"
                                    type="text"
                                    value={formatNumber(guarantorLivingExpenses)}
                                    onChange={(e) => setGuarantorLivingExpenses(e.target.value.replace(/,/g, ''))}
                                    className="h-11 pr-10 bg-white dark:bg-slate-950"
                                  />
                                  <span className="absolute right-3 top-3 text-sm text-muted-foreground">元</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3 mt-4">
                      <Button
                        onClick={handlePrev}
                        variant="outline"
                        size="lg"
                        className="flex-1 h-12 text-lg"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        上一步
                      </Button>
                      <Button
                        onClick={calculateLoan}
                        size="lg"
                        className="flex-1 h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <TrendingUp className="mr-2 h-5 w-5" />
                        立即試算
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Info Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="formula" className="border rounded-lg px-4 bg-white dark:bg-slate-950">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2 text-left">
                    <InfoIcon className="h-4 w-4 text-primary shrink-0" />
                    <span className="font-medium">計算公式與審核標準</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">收支比定義</h4>
                      <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border font-mono text-center text-primary font-semibold">
                        收支比 = (總月收入 / 總月支出) × 100%
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">核貸成數調整</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between items-center p-2 rounded bg-green-50 dark:bg-green-950/20">
                          <span>收支比 ≥ 200%</span>
                          <Badge className="bg-green-600">正常核貸</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 rounded bg-yellow-50 dark:bg-yellow-950/20">
                          <span>180% ~ 200%</span>
                          <Badge className="bg-yellow-600">減 0.5 成</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 rounded bg-orange-50 dark:bg-orange-950/20">
                          <span>160% ~ 180%</span>
                          <Badge className="bg-orange-600">減 1 成</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 rounded bg-red-50 dark:bg-red-950/20">
                          <span>收支比 &lt; 160%</span>
                          <Badge className="bg-red-600">大幅調降</Badge>
                        </li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Right: Result Display */}
          <div className="lg:col-span-5" ref={resultRef}>
            {result ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500 sticky top-24">
                <Card className={`border-2 shadow-xl ${
                  result.status === 'healthy' ? 'border-green-500/50 bg-gradient-to-br from-green-50/50 to-white dark:from-green-950/20 dark:to-slate-950' :
                  result.status === 'warning' ? 'border-yellow-500/50 bg-gradient-to-br from-yellow-50/50 to-white dark:from-yellow-950/20 dark:to-slate-950' :
                  'border-red-500/50 bg-gradient-to-br from-red-50/50 to-white dark:from-red-950/20 dark:to-slate-950'
                }`}>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">試算結果</CardTitle>
                        <CardDescription>基於銀行審核標準評估</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={resetCalculator}
                        className="hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <Calculator className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Status Badge */}
                    <div className={`flex items-center gap-3 p-4 rounded-xl border-2 ${
                      result.status === 'healthy' ? 'bg-green-100 border-green-300 text-green-800 dark:bg-green-950/40 dark:border-green-900 dark:text-green-400' :
                      result.status === 'warning' ? 'bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-950/40 dark:border-yellow-900 dark:text-yellow-400' :
                      'bg-red-100 border-red-300 text-red-800 dark:bg-red-950/40 dark:border-red-900 dark:text-red-400'
                    }`}>
                      {result.status === 'healthy' ? <CheckCircle2 className="h-6 w-6 shrink-0" /> :
                       result.status === 'warning' ? <AlertTriangle className="h-6 w-6 shrink-0" /> :
                       <XCircle className="h-6 w-6 shrink-0" />}
                      <span className="font-bold text-sm leading-tight">
                        {result.status === 'healthy' ? '財務健康，核貸成數高' :
                         result.status === 'warning' ? '收支比略低，成數可能受限' :
                         '收支比過低，建議增加收入'}
                      </span>
                    </div>

                    {/* Main Metrics */}
                    <div className="space-y-4">
                      <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20">
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-sm font-medium text-muted-foreground">最高可貸金額</span>
                          <Badge variant="outline" className="font-mono">
                            {(result.loanPercentage * 100).toFixed(0)}% 成數
                          </Badge>
                        </div>
                        <div className="text-4xl font-bold text-primary mb-1">
                          {(result.maxLoanAmount / 10000).toLocaleString()}
                          <span className="text-xl text-foreground ml-2">萬</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border">
                          <div className="text-xs text-muted-foreground mb-1">每月房貸</div>
                          <div className="text-2xl font-bold">
                            {result.monthlyPayment.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">本息攤還</div>
                        </div>

                        {result.monthlyPaymentGrace > 0 && (
                          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border">
                            <div className="text-xs text-muted-foreground mb-1">寬限期內</div>
                            <div className="text-2xl font-bold text-green-600">
                              {result.monthlyPaymentGrace.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">僅繳利息</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Ratio Analysis */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">收支比</span>
                        <span className={`text-2xl font-bold ${
                          result.status === 'healthy' ? 'text-green-600' :
                          result.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {result.incomeExpenseRatio}%
                        </span>
                      </div>
                      <Progress
                        value={Math.min(result.incomeExpenseRatio, 100)}
                        className={`h-3 ${
                          result.status === 'healthy' ? '[&>div]:bg-green-500' :
                          result.status === 'warning' ? '[&>div]:bg-yellow-500' : '[&>div]:bg-red-500'
                        }`}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>收入 {result.totalMonthlyIncome.toLocaleString()}</span>
                        <span>支出 {result.totalMonthlyDebt.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="space-y-2 pt-2 border-t">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <HomeIcon className="h-4 w-4 text-primary" />
                        審核建議
                      </h4>
                      <ul className="space-y-2">
                        {result.messages.map((msg, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                            <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-primary shrink-0" />
                            {msg}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="hidden lg:flex h-96 items-center justify-center rounded-xl border-2 border-dashed bg-slate-50/50 dark:bg-slate-900/50">
                <div className="text-center space-y-3 px-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Calculator className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-muted-foreground">完成左側步驟後即可查看試算結果</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t bg-slate-50/50 dark:bg-slate-950/50">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <img src="/logo.png" alt="窩算算" className="w-14 h-14 object-contain" />
            <div className="text-left">
              <h3 className="font-bold text-foreground text-lg">窩算算 WoCalc</h3>
              <p className="text-xs text-muted-foreground">溫暖成家，理性規劃</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} WoCalc. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60">
            試算結果僅供參考，實際核貸條件以銀行最終審核為準
          </p>
        </div>
      </footer>
    </div>
  );
}
