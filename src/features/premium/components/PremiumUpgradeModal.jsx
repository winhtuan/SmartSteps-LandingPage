import { useEffect, useState } from "react";
import {
  CheckCircle,
  Crown,
  LockKey,
  X,
} from "@phosphor-icons/react";
import freePlanIcon from "../../../assets/icons/pricing/plan-free.svg";
import proPlanIcon from "../../../assets/icons/pricing/plan-pro.svg";
import { Modal } from "../../../components/ui/Modal";
import { getAuthSession } from "../../auth/services/authApi";
import { getPreferredLanguage } from "../../landing/services/languagePreference";
import {
  createPremiumPayment,
  ensurePremiumAccount,
  fallbackPremiumPlans,
  getPremiumPlans,
  getStoredPremiumAccount,
  redeemPremiumCode,
  savePremiumAccount,
} from "../services/premiumApi";

const premiumCopy = {
  vi: {
    badge: "SmartSteps Premium",
    title: "Mở khóa",
    defaultLessonTitle: "bài học premium",
    close: "Đóng",
    parentTitle: "Dành cho phụ huynh",
    parentCopy: "SmartSteps cần xác nhận người lớn trước khi mở khu vực thanh toán.",
    wrongAnswer: "Đáp án chưa đúng. Ba mẹ thử lại giúp SmartSteps nhé.",
    continue: "Tiếp tục",
    parentEmail: "Email phụ huynh",
    parentName: "Tên phụ huynh",
    parentNamePlaceholder: "Ba mẹ của bé",
    mvpCode: "Mã test MVP",
    activating: "Đang kích hoạt...",
    activateMonth: "Kích hoạt 1 tháng",
    redeemError: "Không kích hoạt được mã premium.",
    paymentLinkMissing: "PayOS chưa trả về link thanh toán.",
    paymentError: "Không tạo được thanh toán PayOS.",
    payosNotConfigured:
      "PayOS chưa được cấu hình. Ở môi trường Development, hãy chạy lại SmartStepsServer sau khi cập nhật appsettings để dùng thanh toán thử.",
    lifetime: "Trọn đời",
    monthUnit: "tháng premium",
    creatingPayment: "Đang tạo thanh toán...",
    payWithPayOs: "Thanh toán PayOS",
    premiumReady: "Premium đã sẵn sàng",
    premiumReadyCopy: "Các bài học bị khóa đã được mở cho tài khoản này",
    until: "đến",
    planLabels: {
      PRO_MONTHLY: {
        name: "PRO tháng",
        description: "Mở khóa toàn bộ bài học premium trong 1 tháng.",
      },
      PRO_YEARLY: {
        name: "PRO năm",
        description: "Mở khóa toàn bộ bài học premium trong 1 năm.",
      },
      MAX_LIFETIME: {
        name: "MAX trọn đời",
        description: "Truy cập trọn đời toàn bộ trải nghiệm SmartSteps.",
      },
    },
  },
  en: {
    badge: "SmartSteps Premium",
    title: "Unlock",
    defaultLessonTitle: "premium lesson",
    close: "Close",
    parentTitle: "For parents",
    parentCopy: "SmartSteps needs an adult confirmation before opening payment.",
    wrongAnswer: "That answer is not correct yet. Please try another question.",
    continue: "Continue",
    parentEmail: "Parent email",
    parentName: "Parent name",
    parentNamePlaceholder: "Child's parent",
    mvpCode: "MVP test code",
    activating: "Activating...",
    activateMonth: "Activate 1 month",
    redeemError: "Could not activate the premium code.",
    paymentLinkMissing: "PayOS did not return a payment link.",
    paymentError: "Could not create the PayOS payment.",
    payosNotConfigured:
      "PayOS is not configured. In Development, restart SmartStepsServer after updating appsettings to use mock checkout.",
    lifetime: "Lifetime",
    monthUnit: "months premium",
    creatingPayment: "Creating payment...",
    payWithPayOs: "Pay with PayOS",
    premiumReady: "Premium is ready",
    premiumReadyCopy: "Locked lessons are now unlocked for this account",
    until: "until",
    planLabels: {
      PRO_MONTHLY: {
        name: "PRO Monthly",
        description: "Unlock all premium lessons for one month.",
      },
      PRO_YEARLY: {
        name: "PRO Yearly",
        description: "Unlock all premium lessons for one year.",
      },
      MAX_LIFETIME: {
        name: "MAX Lifetime",
        description: "Lifetime SmartSteps premium access.",
      },
    },
  },
};

export function PremiumUpgradeModal({
  lesson,
  onClose,
  onPremiumChanged,
  open,
  premiumStatus,
}) {
  const language = getPreferredLanguage();
  const copy = premiumCopy[language] || premiumCopy.vi;
  const authSession = getAuthSession();
  const initialAccount = getStoredPremiumAccount();
  const [answer, setAnswer] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState(() => initialAccount?.email || authSession?.email || "");
  const [fullName, setFullName] = useState(
    () => initialAccount?.fullName || authSession?.fullName || "",
  );
  const [error, setError] = useState("");
  const [isParentVerified, setIsParentVerified] = useState(false);
  const [loadingAction, setLoadingAction] = useState("");
  const [mathChallenge, setMathChallenge] = useState(() => createMathChallenge());
  const [plans, setPlans] = useState(fallbackPremiumPlans);

  useEffect(() => {
    if (!open) {
      return;
    }

    const account = getStoredPremiumAccount();
    const session = getAuthSession();
    setEmail(account?.email || session?.email || "");
    setFullName(account?.fullName || session?.fullName || "");
    setAnswer("");
    setCode("");
    setError("");
    setIsParentVerified(false);
    setMathChallenge(createMathChallenge());
  }, [open]);

  useEffect(() => {
    if (!open || !isParentVerified) {
      return;
    }

    let ignore = false;
    getPremiumPlans()
      .then((apiPlans) => {
        if (!ignore && Array.isArray(apiPlans) && apiPlans.length > 0) {
          setPlans(apiPlans);
        }
      })
      .catch(() => {
        if (!ignore) {
          setPlans(fallbackPremiumPlans);
        }
      });

    return () => {
      ignore = true;
    };
  }, [isParentVerified, open]);

  if (!open) {
    return null;
  }

  const lessonTitle = lesson?.title || copy.defaultLessonTitle;
  const hasPremium = premiumStatus?.hasPremium === true;
  const localizedPlans = plans.map((plan) => ({
    ...plan,
    ...(copy.planLabels[plan.planCode] || {}),
  }));

  const handleVerifyParent = (event) => {
    event.preventDefault();
    setError("");

    if (Number(answer.trim()) !== mathChallenge.answer) {
      setError(copy.wrongAnswer);
      setMathChallenge(createMathChallenge());
      setAnswer("");
      return;
    }

    setIsParentVerified(true);
  };

  const handleRedeemCode = async (event) => {
    event.preventDefault();
    setError("");
    setLoadingAction("code");

    try {
      const account = await ensureAccountForPremium();
      const nextStatus = await redeemPremiumCode({
        userId: account.userId,
        email: account.email,
        fullName: account.fullName,
        code,
      });

      onPremiumChanged?.(nextStatus, account);
      setCode("");
    } catch (apiError) {
      setError(formatPremiumError(apiError, copy, copy.redeemError));
    } finally {
      setLoadingAction("");
    }
  };

  const handleChoosePlan = async (plan) => {
    setError("");
    setLoadingAction(plan.planCode);

    try {
      const account = await ensureAccountForPremium();
      const payment = await createPremiumPayment({
        userId: account.userId,
        email: account.email,
        fullName: account.fullName,
        planCode: plan.planCode,
      });

      if (!payment?.checkoutUrl) {
        throw new Error(copy.paymentLinkMissing);
      }

      window.location.assign(payment.checkoutUrl);
    } catch (apiError) {
      setError(formatPremiumError(apiError, copy, copy.paymentError));
      setLoadingAction("");
    }
  };

  const ensureAccountForPremium = async () => {
    const account = await ensurePremiumAccount({ email, fullName });
    savePremiumAccount(account);
    setEmail(account.email);
    setFullName(account.fullName || fullName);
    return account;
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="mt-3 max-h-[calc(100dvh-1.5rem)] w-[calc(100vw-1rem)] !max-w-[72rem] overflow-y-auto rounded-[1.25rem] p-0 sm:mt-6 sm:w-[calc(100vw-2rem)] sm:rounded-[1.5rem]"
    >
      <div className="flex items-start justify-between gap-4 border-b border-yellow-100 px-5 py-4 sm:px-6">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-xs font-black text-yellow-800">
            <Crown size={16} weight="fill" />
            {copy.badge}
          </span>
          <h2 className="mt-3 text-xl font-black leading-tight text-slate-950 sm:text-2xl">
            {copy.title} {lessonTitle}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={copy.close}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
        >
          <X size={20} weight="bold" />
        </button>
      </div>

      <div className="px-5 py-5 sm:px-6">
        {hasPremium ? (
          <PremiumActiveState activeUntil={premiumStatus.activeUntil} copy={copy} language={language} />
        ) : isParentVerified ? (
          <PremiumPlansStep
            code={code}
            email={email}
            error={error}
            fullName={fullName}
            loadingAction={loadingAction}
            onChoosePlan={handleChoosePlan}
            onCodeChange={setCode}
            onEmailChange={setEmail}
            onFullNameChange={setFullName}
            onRedeemCode={handleRedeemCode}
            plans={localizedPlans}
            copy={copy}
            language={language}
          />
        ) : (
          <ParentGateStep
            answer={answer}
            copy={copy}
            error={error}
            mathChallenge={mathChallenge}
            onAnswerChange={setAnswer}
            onSubmit={handleVerifyParent}
          />
        )}
      </div>
    </Modal>
  );
}

function ParentGateStep({ answer, copy, error, mathChallenge, onAnswerChange, onSubmit }) {
  return (
    <form className="grid gap-5 md:grid-cols-[1fr_15rem]" onSubmit={onSubmit}>
      <div>
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
          <LockKey size={26} weight="duotone" />
        </div>
        <h3 className="mt-4 text-lg font-black text-slate-950">
          {copy.parentTitle}
        </h3>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
          {copy.parentCopy}
        </p>
        {error ? (
          <p className="mt-3 rounded-2xl border border-rose-100 bg-rose-50 px-3 py-2 text-sm font-bold text-rose-700">
            {error}
          </p>
        ) : null}
      </div>

      <div className="rounded-[1.25rem] border border-yellow-100 bg-yellow-50 p-4">
        <label className="block text-sm font-black text-slate-900" htmlFor="parent-gate-answer">
          {mathChallenge.label} =
        </label>
        <input
          id="parent-gate-answer"
          inputMode="numeric"
          value={answer}
          onChange={(event) => onAnswerChange(event.target.value)}
          className="mt-3 h-12 w-full rounded-2xl border border-yellow-200 bg-white px-4 text-center text-xl font-black text-slate-950 outline-none transition focus:border-green-400 focus:ring-4 focus:ring-green-100"
          autoFocus
        />
        <button
          type="submit"
          className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-full bg-green-500 px-4 text-sm font-black text-white shadow-[0_6px_0_#2ea41f] transition hover:bg-green-400"
        >
          {copy.continue}
        </button>
      </div>
    </form>
  );
}

function PremiumPlansStep({
  code,
  copy,
  email,
  error,
  fullName,
  language,
  loadingAction,
  onChoosePlan,
  onCodeChange,
  onEmailChange,
  onFullNameChange,
  onRedeemCode,
  plans,
}) {
  return (
    <div className="space-y-5">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="block text-sm font-bold text-slate-700">
          {copy.parentEmail}
          <input
            type="email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            className="mt-2 h-11 w-full rounded-2xl border border-slate-200 px-4 text-sm font-bold text-slate-900 outline-none transition focus:border-green-400 focus:ring-4 focus:ring-green-100"
            placeholder="parent@email.com"
            required
          />
        </label>
        <label className="block text-sm font-bold text-slate-700">
          {copy.parentName}
          <input
            type="text"
            value={fullName}
            onChange={(event) => onFullNameChange(event.target.value)}
            className="mt-2 h-11 w-full rounded-2xl border border-slate-200 px-4 text-sm font-bold text-slate-900 outline-none transition focus:border-green-400 focus:ring-4 focus:ring-green-100"
            placeholder={copy.parentNamePlaceholder}
          />
        </label>
      </div>

      <form
        className="flex flex-col gap-3 rounded-[1.25rem] border border-green-100 bg-green-50 p-4 sm:flex-row sm:items-end"
        onSubmit={onRedeemCode}
      >
        <label className="min-w-0 flex-1 text-sm font-bold text-green-900">
          {copy.mvpCode}
          <input
            type="text"
            value={code}
            onChange={(event) => onCodeChange(event.target.value)}
            className="mt-2 h-11 w-full rounded-2xl border border-green-200 bg-white px-4 text-sm font-black uppercase text-slate-900 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
            placeholder="PREMIUM"
          />
        </label>
        <button
          type="submit"
          disabled={loadingAction === "code"}
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-green-600 px-5 text-sm font-black text-white shadow-[0_6px_0_#25751d] transition hover:bg-green-500 disabled:cursor-wait disabled:opacity-70"
        >
          {loadingAction === "code" ? copy.activating : copy.activateMonth}
        </button>
      </form>

      {error ? (
        <p className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {plans.map((plan) => (
          <PremiumPlanCard
            key={plan.planCode}
            loading={loadingAction === plan.planCode}
            onChoose={() => onChoosePlan(plan)}
            plan={plan}
            copy={copy}
            language={language}
          />
        ))}
      </div>
    </div>
  );
}

function PremiumPlanCard({ copy, language, loading, onChoose, plan }) {
  const planIcon = getPlanIcon(plan.planCode);

  return (
    <article className="flex min-h-[17rem] flex-col rounded-[1.25rem] border border-yellow-100 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-yellow-100/70">
          <img src={planIcon} alt="" aria-hidden="true" className="h-8 w-8 object-contain" />
        </span>
        <h3 className="text-lg font-black text-slate-950">{plan.name}</h3>
      </div>
      <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
        {plan.description}
      </p>
      <p className="mt-4 text-2xl font-black text-slate-950">
        {formatCurrency(plan.amount, plan.currency, language)}
      </p>
      <p className="mt-1 text-xs font-bold text-slate-500">
        {plan.isLifetime ? copy.lifetime : `${plan.durationMonths || 1} ${copy.monthUnit}`}
      </p>
      <button
        type="button"
        onClick={onChoose}
        disabled={loading}
        className="mt-auto inline-flex h-11 items-center justify-center rounded-full bg-yellow-400 px-4 text-sm font-black text-slate-950 shadow-[0_6px_0_#c99d00] transition hover:bg-yellow-300 disabled:cursor-wait disabled:opacity-70"
      >
        {loading ? copy.creatingPayment : copy.payWithPayOs}
      </button>
    </article>
  );
}

function PremiumActiveState({ activeUntil, copy, language }) {
  return (
    <div className="rounded-[1.25rem] border border-green-100 bg-green-50 p-5 text-center">
      <CheckCircle className="mx-auto text-green-600" size={44} weight="fill" />
      <h3 className="mt-3 text-xl font-black text-green-900">{copy.premiumReady}</h3>
      <p className="mt-2 text-sm font-bold leading-6 text-green-800">
        {copy.premiumReadyCopy}
        {activeUntil
          ? ` ${copy.until} ${new Date(activeUntil).toLocaleDateString(language === "en" ? "en-US" : "vi-VN")}`
          : ` ${copy.lifetime.toLowerCase()}`}.
      </p>
    </div>
  );
}

function formatPremiumError(error, copy, fallbackMessage) {
  const message = error?.message || "";

  if (message.toLowerCase().includes("payos is not configured")) {
    return copy.payosNotConfigured;
  }

  return message || fallbackMessage;
}

function formatCurrency(amount, currency, language = "vi") {
  return `${new Intl.NumberFormat(language === "en" ? "en-US" : "vi-VN").format(amount)} ${currency || "VND"}`;
}

function createMathChallenge() {
  const operations = ["x", "x", "x", "x", "+", "-"];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  let left = randomInt(6, 12);
  let right = randomInt(4, 12);

  if (operation === "+") {
    left = randomInt(18, 65);
    right = randomInt(12, 48);
  }

  if (operation === "-") {
    left = randomInt(35, 95);
    right = randomInt(12, left - 8);
  }

  const answer =
    operation === "+"
      ? left + right
      : operation === "-"
        ? left - right
        : left * right;

  return {
    answer,
    label: `${left} ${operation} ${right}`,
  };
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getPlanIcon(planCode) {
  if (planCode === "MAX_LIFETIME") {
    return freePlanIcon;
  }

  return proPlanIcon;
}
