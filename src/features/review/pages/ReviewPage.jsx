import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Fire,
  House,
  MapTrifold,
  UserCircle,
  Warning,
  XCircle,
} from "@phosphor-icons/react";
import mascotConfident from "../../../assets/images/mascot/mascot-cat-confident.png";
import mascotHappy from "../../../assets/images/mascot/mascot-cat-happy-wave.png";
import { navigateInApp } from "../../../app/navigation";
import { Brand } from "../../../components/ui/Brand";
import { learnerProfile } from "../../learning/data/learningMapContent";
import {
  enterLessonLandscape,
  isSmallLessonViewport,
} from "../../lesson/utils/lessonOrientation";
import { getWrongAnswers } from "../services/wrongAnswerStorage";

const navItems = [
  { label: "Học", Icon: House, path: "/learning", active: false },
  { label: "Các đảo", Icon: MapTrifold, path: "/learning", active: false },
  { label: "Ôn tập", Icon: BookOpen, path: "/review", active: true },
  { label: "Hồ sơ", Icon: UserCircle, path: "/review", active: false },
];

export function ReviewPage() {
  const [wrongAnswers, setWrongAnswers] = useState(() => getWrongAnswers());

  // Refresh when returning from a lesson (visibility change or focus)
  useEffect(() => {
    const refresh = () => setWrongAnswers(getWrongAnswers());
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Ôn tập câu sai | SmartSteps";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const handleGoToLesson = async (situationId) => {
    if (isSmallLessonViewport()) {
      await enterLessonLandscape(document.documentElement);
    }
    navigateInApp(`/lesson/${encodeURIComponent(situationId)}`);
  };

  return (
    <div className="min-h-[100dvh] overflow-x-clip bg-[#fffdf7] text-slate-900">
      <ReviewHeader />
      <main className="hero-grid min-h-[100dvh] px-4 pb-28 pt-20 sm:px-6 xl:px-8 xl:pb-10 xl:pt-24">
        <div className="mx-auto grid max-w-7xl gap-5 xl:grid-cols-[13rem_minmax(0,1fr)_17rem]">
          <ReviewSidebar />

          <section className="min-w-0">
            <div className="fade-up rounded-[2rem] border border-yellow-100 bg-white/92 px-4 py-5 shadow-soft backdrop-blur sm:px-6 sm:py-6">
              <ReviewHeading count={wrongAnswers.length} />

              {wrongAnswers.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="mt-5 space-y-4">
                  {wrongAnswers.map((entry) => (
                    <WrongAnswerCard
                      key={entry.situationId}
                      entry={entry}
                      onReview={() => handleGoToLesson(entry.situationId)}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          <ReviewInsightPanel count={wrongAnswers.length} />
        </div>
      </main>

      {/* Mobile bottom navigation */}
      <MobileBottomNav />
    </div>
  );
}

function ReviewHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-yellow-100 bg-[#fffdf7]/95 backdrop-blur-lg">
      <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:h-[76px] sm:px-6 xl:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Quay lại trang học"
            onClick={() => navigateInApp("/learning")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-green-100 bg-white/80 text-slate-600 shadow-sm transition hover:bg-green-50 hover:text-green-700 sm:hidden"
          >
            <ArrowLeft size={18} weight="bold" />
          </button>
          <Brand compact hideWordOnSmall />
        </div>

        <LearnerSummary />

        <button
          type="button"
          onClick={() => navigateInApp("/learning")}
          className="hidden min-h-10 items-center gap-2 rounded-full border border-green-200 bg-white px-5 py-2 text-sm font-extrabold text-green-700 shadow-sm transition hover:bg-green-50 md:inline-flex"
        >
          <House size={16} weight="fill" />
          Trang học
        </button>
      </nav>
    </header>
  );
}

function LearnerSummary() {
  return (
    <div
      className="flex min-w-0 items-center gap-2 rounded-2xl border border-green-100 bg-white/95 px-2 py-1.5 shadow-[0_8px_20px_rgba(67,90,50,0.08)] sm:gap-3 sm:rounded-full sm:px-3 sm:py-2"
      aria-label={`${learnerProfile.name}, ${learnerProfile.levelLabel}, chuỗi ${learnerProfile.streakLabel}`}
    >
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-green-100 text-sm font-black text-green-700 sm:h-10 sm:w-10 sm:rounded-full sm:text-base">
        {learnerProfile.avatarInitial}
      </span>
      <span className="min-w-0 text-left">
        <span className="block max-w-[5.5rem] truncate text-xs font-black leading-4 text-slate-900 sm:max-w-none sm:text-sm">
          {learnerProfile.name}
        </span>
        <span className="flex items-center gap-1.5 text-[0.65rem] font-bold leading-4 text-slate-500 sm:gap-2 sm:text-xs">
          <span className="whitespace-nowrap">
            <span className="hidden sm:inline">{learnerProfile.ageLabel} · </span>
            {learnerProfile.levelLabel}
          </span>
          <span className="inline-flex items-center gap-0.5 whitespace-nowrap rounded-full bg-yellow-100 px-1.5 py-0.5 font-black text-yellow-700 sm:gap-1 sm:px-2">
            <Fire size={11} weight="fill" />
            {learnerProfile.streakLabel}
          </span>
        </span>
      </span>
    </div>
  );
}

function ReviewSidebar() {
  return (
    <aside className="fade-up hidden rounded-[2rem] border border-green-100 bg-white/90 p-3 shadow-sm xl:block">
      <nav className="space-y-2">
        {navItems.map(({ label, Icon, path, active }) => (
          <button
            key={label}
            type="button"
            onClick={() => navigateInApp(path)}
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-extrabold transition ${
              active
                ? "bg-green-100 text-green-700"
                : "text-slate-600 hover:bg-yellow-50 hover:text-green-700"
            }`}
          >
            <Icon size={21} weight={active ? "fill" : "duotone"} />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

function ReviewHeading({ count }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <div className="flex items-center gap-2">
          <span className="inline-flex rounded-2xl bg-red-100 p-2.5 text-red-600">
            <Warning size={22} weight="fill" />
          </span>
          <h1 className="text-xl font-black text-slate-900 sm:text-2xl">Câu sai cần ôn tập</h1>
        </div>
        <p className="mt-1.5 text-sm leading-6 text-slate-500">
          {count === 0
            ? "Bé chưa có câu nào cần ôn tập. Tuyệt vời!"
            : `Bé có ${count} câu hỏi cần ôn lại để ghi nhớ tốt hơn.`}
        </p>
      </div>

      {count > 0 && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-4 py-2 text-sm font-black text-red-600 ring-1 ring-red-100">
          <XCircle size={16} weight="fill" />
          {count} câu sai
        </span>
      )}
    </div>
  );
}

function WrongAnswerCard({ entry, onReview }) {
  const formattedDate = formatRelativeDate(entry.savedAt);

  return (
    <article className="group relative overflow-hidden rounded-[1.5rem] border border-red-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(220,38,38,0.08)]">
      {/* Top accent stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-red-400 to-orange-400" />

      <div className="p-4 sm:p-5">
        {/* Lesson meta */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-wide text-slate-500">
            {entry.islandName}
          </span>
          <span className="text-[0.68rem] font-semibold text-slate-400">{formattedDate}</span>
        </div>

        <h2 className="mt-2 text-base font-black leading-snug text-slate-900 sm:text-lg">
          {entry.lessonTitle}
        </h2>

        {entry.questionPrompt && (
          <p className="mt-1 text-sm font-semibold text-slate-500">{entry.questionPrompt}</p>
        )}

        {/* Answer comparison */}
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {/* Wrong answer */}
          <div className="flex items-start gap-2.5 rounded-xl bg-red-50 px-3.5 py-3 ring-1 ring-red-100">
            <XCircle
              size={18}
              weight="fill"
              className="mt-0.5 shrink-0 text-red-500"
            />
            <div className="min-w-0">
              <p className="text-[0.65rem] font-black uppercase tracking-wide text-red-400">
                Bé đã chọn
              </p>
              <p className="mt-0.5 text-sm font-bold leading-snug text-red-700">
                {entry.selectedOptionLabel}
              </p>
            </div>
          </div>

          {/* Correct answer */}
          <div className="flex items-start gap-2.5 rounded-xl bg-green-50 px-3.5 py-3 ring-1 ring-green-100">
            <CheckCircle
              size={18}
              weight="fill"
              className="mt-0.5 shrink-0 text-green-600"
            />
            <div className="min-w-0">
              <p className="text-[0.65rem] font-black uppercase tracking-wide text-green-500">
                Đáp án đúng
              </p>
              <p className="mt-0.5 text-sm font-bold leading-snug text-green-700">
                {entry.correctOptionLabel}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4 flex justify-end">
          <button
            id={`review-lesson-${entry.situationId}`}
            type="button"
            onClick={onReview}
            className="tactile-button inline-flex min-h-10 items-center gap-2 rounded-full bg-green-500 px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_6px_0_#2ea41f] transition hover:bg-green-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200 focus-visible:ring-offset-2 active:translate-y-[5px] active:shadow-none"
          >
            <BookOpen size={16} weight="fill" />
            Ôn lại bài này
          </button>
        </div>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center py-14 text-center">
      <div className="relative">
        <img
          src={mascotHappy}
          alt=""
          aria-hidden="true"
          className="h-36 w-36 object-contain drop-shadow-[0_16px_24px_rgba(67,90,50,0.15)]"
        />
        <span className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-400 text-xl shadow-[0_4px_0_#2ea41f]">
          🎉
        </span>
      </div>

      <h2 className="mt-6 text-xl font-black text-slate-900">Bé làm rất tốt!</h2>
      <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
        Chưa có câu hỏi nào cần ôn tập. Tiếp tục làm bài để kiểm tra kiến thức của bé nhé.
      </p>
      <button
        type="button"
        onClick={() => navigateInApp("/learning")}
        className="tactile-button mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-extrabold text-white shadow-[0_6px_0_#2ea41f] transition hover:bg-green-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200 focus-visible:ring-offset-2"
      >
        <House size={16} weight="fill" />
        Đi học bài mới
      </button>
    </div>
  );
}

function ReviewInsightPanel({ count }) {
  const allWrongAnswers = getWrongAnswers();

  // Group by island
  const byIsland = allWrongAnswers.reduce((acc, entry) => {
    const key = entry.islandName || "Khác";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const islandStats = Object.entries(byIsland).map(([name, total]) => ({ name, total }));

  return (
    <aside className="fade-up animation-delay-1 hidden space-y-4 md:block">
      {/* Summary card */}
      <div className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
        <span className="inline-flex rounded-2xl bg-red-100 p-3 text-red-600">
          <Warning size={24} weight="fill" />
        </span>
        <h2 className="mt-4 text-lg font-black text-slate-900">Tóm tắt ôn tập</h2>

        {count === 0 ? (
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Bé chưa có câu sai nào. Giỏi lắm!
          </p>
        ) : (
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Bé có <strong className="text-red-600">{count} câu</strong> cần ôn tập thêm.
          </p>
        )}

        {count > 0 && (
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-red-100">
            <div
              className="h-full rounded-full bg-red-400 transition-all duration-700"
              style={{ width: `${Math.min(100, (count / 9) * 100)}%` }}
            />
          </div>
        )}
      </div>

      {/* By island breakdown */}
      {islandStats.length > 0 && (
        <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm">
          <h2 className="text-base font-black text-slate-900">Theo đảo</h2>
          <div className="mt-3 space-y-2.5">
            {islandStats.map(({ name, total }) => (
              <div key={name} className="flex items-center justify-between gap-3">
                <span className="min-w-0 flex-1 truncate text-xs font-bold text-slate-600">
                  {name}
                </span>
                <span className="shrink-0 rounded-full bg-red-50 px-2.5 py-1 text-xs font-black text-red-600">
                  {total} sai
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Encouragement */}
      <div className="rounded-3xl border border-yellow-100 bg-yellow-50 p-5 shadow-sm">
        <img
          src={mascotConfident}
          alt=""
          aria-hidden="true"
          className="mx-auto h-20 w-20 object-contain"
        />
        <p className="mt-3 text-center text-sm font-bold leading-6 text-slate-700">
          Ôn tập đều đặn giúp bé nhớ lâu hơn và an toàn hơn mỗi ngày! 🌟
        </p>
      </div>
    </aside>
  );
}

function MobileBottomNav() {
  return (
    <nav
      aria-label="Điều hướng chính"
      className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-around border-t border-yellow-100 bg-[#fffdf7]/95 px-2 py-2 backdrop-blur-lg xl:hidden"
    >
      {navItems.map(({ label, Icon, path, active }) => (
        <button
          key={label}
          type="button"
          onClick={() => navigateInApp(path)}
          aria-label={label}
          aria-current={active ? "page" : undefined}
          className={`flex flex-col items-center gap-0.5 rounded-2xl px-3 py-2 text-[0.65rem] font-black transition ${
            active
              ? "text-green-700"
              : "text-slate-400 hover:text-green-700"
          }`}
        >
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-xl transition ${
              active ? "bg-green-100" : "bg-transparent"
            }`}
          >
            <Icon size={20} weight={active ? "fill" : "duotone"} />
          </span>
          {label}
        </button>
      ))}
    </nav>
  );
}

/**
 * Format a date string into a human-readable relative time (Vietnamese).
 * @param {string} isoString
 * @returns {string}
 */
function formatRelativeDate(isoString) {
  if (!isoString) return "";

  try {
    const date = new Date(isoString);
    const diffMs = Date.now() - date.getTime();
    const diffMin = Math.floor(diffMs / 60_000);
    const diffH = Math.floor(diffMs / 3_600_000);
    const diffD = Math.floor(diffMs / 86_400_000);

    if (diffMin < 1) return "Vừa xong";
    if (diffMin < 60) return `${diffMin} phút trước`;
    if (diffH < 24) return `${diffH} giờ trước`;
    if (diffD === 1) return "Hôm qua";
    if (diffD < 7) return `${diffD} ngày trước`;

    return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
  } catch {
    return "";
  }
}
