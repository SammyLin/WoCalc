/**
 * 房貸計算核心邏輯
 * 根據使用者提供的銀行規則進行實作
 */

export interface MortgageInput {
  monthlyIncome: number;      // 借款人月收入
  monthlyExpenses: number;    // 借款人其他月支出 (信貸、生活費等)
  housePrice: number;         // 房屋總價 (元)
  interestRate: number;       // 年利率 (%)
  loanTermYears: number;      // 貸款年限
  gracePeriodYears: number;   // 寬限期
  isSecondHome: boolean;      // 是否為第二戶
  guarantorIncome?: number;   // 保證人月收入 (選填)
  guarantorExpenses?: number; // 保證人月支出 (選填)
}

export interface MortgageResult {
  maxLoanAmount: number;          // 可貸金額
  loanPercentage: number;         // 可貸成數 (0.8, 0.7, etc.)
  monthlyPayment: number;         // 每月還款 (本息攤還)
  monthlyPaymentGrace: number;    // 寬限期月付
  incomeExpenseRatio: number;     // 收支比 (月收入 / 總月支出 * 100)
  totalMonthlyDebt: number;       // 總月支出 (房貸 + 其他)
  totalMonthlyIncome: number;     // 總月收入 (借款人 + 保證人)
  requiredIncome: number;         // 建議月收入 (以收支比 166%~200% 推算)
  status: 'healthy' | 'warning' | 'danger'; // 財務健康度
  messages: string[];             // 分析建議訊息
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const {
    monthlyIncome,
    monthlyExpenses,
    housePrice,
    interestRate,
    loanTermYears,
    gracePeriodYears,
    isSecondHome,
    guarantorIncome = 0,
    guarantorExpenses = 0
  } = input;

  // 合併收入與支出
  const totalIncome = monthlyIncome + guarantorIncome;
  const totalOtherExpenses = monthlyExpenses + guarantorExpenses;

  // 1. 初始成數設定
  // 首購預設 8 成，第二戶預設 5 成
  let basePercentage = isSecondHome ? 0.5 : 0.8;
  const messages: string[] = [];

  if (isSecondHome) {
    messages.push("名下已有房貸（第二戶），基礎成數降為 5 成。");
  } else {
    messages.push("首購資格，基礎成數為 8 成。");
  }

  // 2. 試算房貸月付金 (用於計算收支比)
  // 先用基礎成數算一次，看看收支比是否過低，如果過低要降成數
  let currentPercentage = basePercentage;
  let loanAmount = housePrice * currentPercentage;
  
  // 計算月付金函數
  const calculateMonthlyPayment = (principal: number) => {
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanTermYears * 12;
    const graceMonths = gracePeriodYears * 12;
    const repaymentMonths = totalMonths - graceMonths;

    if (repaymentMonths <= 0) return 0;

    // 本息平均攤還公式
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, repaymentMonths)) / 
           (Math.pow(1 + monthlyRate, repaymentMonths) - 1);
  };

  let monthlyMortgage = calculateMonthlyPayment(loanAmount);
  let totalMonthlyDebt = monthlyMortgage + totalOtherExpenses;
  
  // 收支比 = 總收入 / 總月支出 * 100
  // 銀行規則：
  // 收支比 >= 200% (支出佔收入 <= 50%) -> 正常核貸
  // 收支比 180% (支出佔收入 ~55%) -> 減 0.5 成
  // 收支比 160% (支出佔收入 ~62.5%) -> 減 1 成
  // 收支比 < 140% (支出佔收入 > 71%) -> 減至 6 成 (若原為8成)
  
  let ratio = (totalIncome / totalMonthlyDebt) * 100;
  
  // 根據收支比調整成數 (Iterative check could be better, but simple rule application here)
  // 這裡的邏輯是：如果目前的成數算出來收支比不夠，就要降成數
  
  let adjustment = 0;
  
  if (ratio < 140) {
    // 嚴重不足
    if (!isSecondHome) {
        // 首購從 8 成降至 6 成
        adjustment = 0.2; 
        messages.push("收支比低於 140%，依規定成數大幅調降至 6 成。");
    } else {
        // 第二戶從 5 成降至 3 成
        adjustment = 0.2;
        messages.push("收支比低於 140%，第二戶成數調降至 3 成。");
    }
  } else if (ratio < 160) {
    adjustment = 0.1;
    messages.push("收支比低於 160%，依規定成數減少 1 成。");
  } else if (ratio < 180) {
    adjustment = 0.05;
    messages.push("收支比低於 180%，依規定成數減少 0.5 成。");
  } else if (ratio < 200) {
    messages.push("收支比低於 200%，可能影響核貸條件，建議增加收入或保證人。");
  } else {
    messages.push("收支比高於 200%，符合銀行優質核貸標準。");
  }

  if (guarantorIncome > 0) {
    messages.push(`已計入保證人收入 ${guarantorIncome.toLocaleString()} 元與支出 ${guarantorExpenses.toLocaleString()} 元。`);
    if (monthlyIncome === 0) {
        messages.push("借款人無收入，完全依賴保證人還款能力，建議保證人為二等親內親屬（如配偶）。");
    }
  }

  // 應用調整
  currentPercentage = Math.max(0, basePercentage - adjustment);
  
  // 重新計算最終金額
  loanAmount = housePrice * currentPercentage;
  monthlyMortgage = calculateMonthlyPayment(loanAmount);
  
  // 寬限期月付 (只繳息)
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPaymentGrace = loanAmount * monthlyRate;

  // 最終收支比
  totalMonthlyDebt = monthlyMortgage + totalOtherExpenses;
  ratio = (totalIncome / totalMonthlyDebt) * 100;

  // 狀態評估
  let status: 'healthy' | 'warning' | 'danger' = 'healthy';
  if (ratio < 130) status = 'danger';
  else if (ratio < 200) status = 'warning';

  // 建議收入 (逆推：希望收支比至少達到 160%~200% 的安全區間)
  // Target: Income >= TotalDebt * 1.6
  const requiredIncome = totalMonthlyDebt * 1.6;

  return {
    maxLoanAmount: loanAmount,
    loanPercentage: currentPercentage,
    monthlyPayment: Math.round(monthlyMortgage),
    monthlyPaymentGrace: Math.round(monthlyPaymentGrace),
    incomeExpenseRatio: Math.round(ratio),
    totalMonthlyDebt: Math.round(totalMonthlyDebt),
    totalMonthlyIncome: Math.round(totalIncome),
    requiredIncome: Math.round(requiredIncome),
    status,
    messages
  };
}
