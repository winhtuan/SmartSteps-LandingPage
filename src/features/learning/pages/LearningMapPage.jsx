import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  BookOpen,
  Compass,
  Fire,
  House,
  Lock,
  MapTrifold,
  Medal,
  Play,
  UserCircle,
} from "@phosphor-icons/react";
import mascotConfident from "../../../assets/images/mascot/mascot-cat-confident.png";
import mascotHappy from "../../../assets/images/mascot/mascot-cat-happy-wave.png";
import mascotSinging from "../../../assets/images/mascot/mascot-cat-singing.png";
import mascotSpeaking from "../../../assets/images/mascot/mascot-cat-speaking.png";
import mascotSulking from "../../../assets/images/mascot/mascot-cat-sulking.png";
import planProIcon from "../../../assets/icons/pricing/plan-pro.svg";
import { navigateInApp } from "../../../app/navigation";
import { Brand } from "../../../components/ui/Brand";
import { ButtonLink } from "../../../components/ui/ButtonLink";
import { AuthSidebar } from "../../auth/components/AuthSidebar";
import { isAuthenticated } from "../../auth/services/authApi";
import { getPreferredLanguage } from "../../landing/services/languagePreference";
import {
  enterLessonLandscape,
  isSmallLessonViewport,
} from "../../lesson/utils/lessonOrientation";
import { PremiumUpgradeModal } from "../../premium/components/PremiumUpgradeModal";
import { learnerProfile, learningStats } from "../data/learningMapContent";
import { LearningMapProvider, useLearningMap } from "../providers/LearningMapProvider";

const navItems = [
  { label: "Học", Icon: House, active: true },
  { label: "Các đảo", Icon: MapTrifold, active: false },
  { label: "Ôn tập", Icon: BookOpen, active: false },
  { label: "Hồ sơ", Icon: UserCircle, active: false },
];

const stateIcon = {
  current: Play,
  open: BookOpen,
  locked: Lock,
};

const islandVietnameseNames = {
  1: "Đảo an toàn cá nhân",
  2: "Đảo an toàn xã hội",
  3: "Đảo an toàn môi trường",
};

const islandShortNames = {
  1: "An toàn cá nhân",
  2: "An toàn xã hội",
  3: "An toàn môi trường",
};

const activeMascots = [mascotHappy, mascotConfident, mascotSinging, mascotSpeaking];

export function LearningMapPage() {
  return (
    <LearningMapProvider>
      <LearningMapView />
    </LearningMapProvider>
  );
}

function LearningMapView() {
  const {
    currentLesson,
    error,
    islands,
    applyPremiumSession,
    premiumStatus,
    retry,
    selectedIsland,
    selectedIslandId,
    selectedSituations,
    setSelectedIslandId,
    status,
  } = useLearningMap();
  const [collapsedIslandIds, setCollapsedIslandIds] = useState([]);
  const [authMode, setAuthMode] = useState("signin");
  const [authOpen, setAuthOpen] = useState(false);
  const [pendingPremiumLesson, setPendingPremiumLesson] = useState(null);
  const [premiumLesson, setPremiumLesson] = useState(null);
  const language = getPreferredLanguage();

  const handleSelectIsland = (islandId) => {
    const selectedIndex = islands.findIndex((island) => island.islandId === islandId);

    setCollapsedIslandIds(
      selectedIndex > 0 ? islands.slice(0, selectedIndex).map((island) => island.islandId) : [],
    );
    setSelectedIslandId(islandId);
  };

  const handleOpenPremium = (lesson) => {
    const nextLesson = lesson || currentLesson || selectedSituations[0] || null;

    if (!isAuthenticated()) {
      setPendingPremiumLesson(nextLesson);
      setAuthMode("signin");
      setAuthOpen(true);
      return;
    }

    setPremiumLesson(nextLesson);
  };

  return (
    <div className="min-h-[100dvh] overflow-x-clip bg-[#fffdf7] text-slate-900">
      <LearningHeader />
      <main className="hero-grid min-h-[100dvh] px-4 pb-28 pt-20 sm:px-6 xl:px-8 xl:pb-10 xl:pt-24">
        <div className="mx-auto grid max-w-7xl gap-5 xl:grid-cols-[13rem_minmax(0,1fr)_17rem]">
          <LearningSidebar />
          <section className="min-w-0">
            <div className="fade-up rounded-[2rem] border border-yellow-100 bg-white/92 px-4 py-5 shadow-soft backdrop-blur sm:px-6 sm:py-6">
              <ApiStatusBanner error={error} onRetry={retry} status={status} />
              <IslandRoadmap
                collapsedIslandIds={collapsedIslandIds}
                islands={islands}
                onSelect={handleSelectIsland}
                onLockedLessonSelect={handleOpenPremium}
                selectedIslandId={selectedIslandId}
                selectedSituations={selectedSituations}
              />
            </div>
          </section>
          <LearningInsightPanel island={selectedIsland} lesson={currentLesson} />
        </div>
      </main>
      <AuthSidebar
        language={language}
        mode={authMode}
        open={authOpen}
        onAuthenticated={() => {
          setAuthOpen(false);
          setPremiumLesson(pendingPremiumLesson || currentLesson || selectedSituations[0] || null);
          setPendingPremiumLesson(null);
        }}
        onClose={() => {
          setAuthOpen(false);
          setPendingPremiumLesson(null);
        }}
        onModeChange={setAuthMode}
      />
      <PremiumUpgradeModal
        lesson={premiumLesson}
        onClose={() => setPremiumLesson(null)}
        onPremiumChanged={(nextStatus, nextAccount) => {
          applyPremiumSession(nextStatus, nextAccount);
          setPremiumLesson(null);
        }}
        open={Boolean(premiumLesson)}
        premiumStatus={premiumStatus}
      />
    </div>
  );
}

function ApiStatusBanner({ error, onRetry, status }) {
  if (status === "success" || status === "idle") {
    return null;
  }

  if (status === "loading") {
    return (
      <div className="mt-5 rounded-3xl border border-sky-100 bg-sky-50 p-4 text-sm font-bold text-sky-800">
        Đang tải dữ liệu bài học từ SmartStepsServer...
      </div>
    );
  }

  return (
    <div className="mt-5 rounded-3xl border border-yellow-100 bg-yellow-50 p-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
      <p className="text-sm font-bold leading-6 text-slate-700">
        Chưa kết nối được SmartStepsServer, đang hiển thị dữ liệu mẫu.
        {error?.message ? <span className="block text-slate-500">{error.message}</span> : null}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="tactile-button mt-3 inline-flex min-h-10 items-center justify-center rounded-full bg-yellow-400 px-5 py-2 text-sm font-extrabold text-slate-900 shadow-[0_6px_0_#c99d00] transition hover:bg-yellow-300 sm:mt-0"
      >
        Thử lại
      </button>
    </div>
  );
}

function LearningHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-yellow-100 bg-[#fffdf7]/95 backdrop-blur-lg">
      <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:h-[76px] sm:px-6 xl:px-8">
        <Brand compact hideWordOnSmall />
        <LearnerSummary />
        <ButtonLink href="#learning-path" className="hidden min-h-10 px-5 py-2 md:inline-flex">
          Bắt đầu
        </ButtonLink>
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

function LearningSidebar() {
  return (
    <aside className="fade-up hidden rounded-[2rem] border border-green-100 bg-white/90 p-3 shadow-sm xl:block">
      <nav className="space-y-2">
        {navItems.map(({ label, Icon, active }) => (
          <button
            key={label}
            type="button"
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

function IslandPath({
  active,
  className = "mt-8",
  id,
  islandIndex,
  lessons,
  onLockedLessonSelect,
}) {
  if (lessons.length === 0) {
    return (
      <div className="mt-8 rounded-3xl border border-yellow-100 bg-white p-6 text-center text-sm font-bold text-slate-600">
        Chưa có bài học cho đảo này.
      </div>
    );
  }

  const pathDirection = getPathDirection(islandIndex);
  const pathItems = [...lessons.map((lesson) => ({ type: "lesson", lesson })), { type: "reward" }];

  return (
    <div
      id={id}
      className={`learning-island-path relative mx-auto max-w-[34rem] ${className}`}
      style={{ "--learning-path-item-count": pathItems.length }}
    >
      <PathGuide active={active} direction={pathDirection} />
      <MascotDecoration active={active} direction={pathDirection} islandIndex={islandIndex} />
      {pathItems.map((item, index) =>
        item.type === "lesson" ? (
          <LessonNode
            index={index}
            key={item.lesson.situationId}
            lesson={item.lesson}
            onLockedLessonSelect={onLockedLessonSelect}
            pathDirection={pathDirection}
            totalItems={pathItems.length}
          />
        ) : (
          <RewardNode
            index={index}
            key="reward"
            pathDirection={pathDirection}
            totalItems={pathItems.length}
          />
        ),
      )}
    </div>
  );
}

function PathGuide({ active, direction }) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <path
        d={
          direction === "right"
            ? "M50 6 C76 24 76 39 50 50 C24 61 24 76 50 94"
            : "M50 6 C24 24 24 39 50 50 C76 61 76 76 50 94"
        }
        fill="none"
        stroke={active ? "#d8f7d9" : "#dfe7e4"}
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function MascotDecoration({ active, direction, islandIndex }) {
  const primaryMascot = activeMascots[islandIndex % activeMascots.length];
  const secondaryMascot = activeMascots[(islandIndex + 2) % activeMascots.length];
  const primarySide = direction === "right" ? "left-4" : "right-4";
  const secondarySide = direction === "right" ? "right-8" : "left-8 -scale-x-100";

  return (
    <>
      <img
        src={primaryMascot}
        alt=""
        aria-hidden="true"
        className={`pointer-events-none absolute top-[35%] z-10 hidden w-16 select-none drop-shadow-[0_18px_20px_rgba(67,90,50,0.14)] sm:block ${primarySide} ${
          active ? "opacity-100" : "opacity-45 saturate-[0.7]"
        }`}
      />
      <img
        src={secondaryMascot}
        alt=""
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-[18%] z-10 hidden w-14 select-none drop-shadow-[0_18px_20px_rgba(67,90,50,0.1)] sm:block ${secondarySide} ${
          active ? "opacity-85" : "opacity-35 grayscale"
        }`}
      />
    </>
  );
}

function LessonNode({ lesson, index, onLockedLessonSelect, pathDirection, totalItems }) {
  const Icon = stateIcon[lesson.state] || BookOpen;
  const locked = lesson.state === "locked";
  const premiumLocked = lesson.state === "premium_locked";
  const current = lesson.state === "current";
  const position = getPathPosition(pathDirection, index, totalItems);
  const displayTitle = getLessonDisplayTitle(lesson);

  return (
    <article
      className="absolute z-20"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <button
        type="button"
        onClick={() => {
          if (premiumLocked) {
            onLockedLessonSelect?.(lesson);
            return;
          }

          if (locked) {
            return;
          }

          openLesson(lesson);
        }}
        aria-label={
          locked
            ? `Bài ${lesson.orderIndex} Khóa`
            : `Bài ${lesson.orderIndex} ${displayTitle} ${current ? "Bắt đầu" : "Mở"}`
        }
        className={`group relative mx-auto flex h-[5.25rem] w-[5.25rem] items-center justify-center rounded-full border-[6px] border-white text-left shadow-[0_8px_0_#dceacb] transition duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200 focus-visible:ring-offset-4 ${
          current
            ? "learning-action-node learning-action-node--start bg-yellow-400 text-slate-950 shadow-[0_8px_0_#c99d00] hover:bg-yellow-300"
            : premiumLocked
              ? "bg-violet-100 text-violet-700 shadow-[0_8px_0_#d9c8ff] hover:bg-violet-50"
              : locked
              ? "bg-slate-100 text-slate-400"
              : "bg-green-100 text-green-700"
        }`}
      >
        {current ? <LearningActionCallout label="Bắt đầu học" tone="start" /> : null}
        {premiumLocked ? (
          <img src={planProIcon} alt="" aria-hidden="true" className="h-9 w-9 object-contain" />
        ) : (
          <Icon size={34} weight={current ? "fill" : "duotone"} />
        )}
      </button>
      {current || premiumLocked ? (
        <LessonLabel
          lesson={lesson}
          side={position.x > 50 ? "left" : "right"}
          title={displayTitle}
        />
      ) : null}
    </article>
  );
}

function LearningActionCallout({ label, tone }) {
  return (
    <span className={`learning-action-callout learning-action-callout--${tone}`} aria-hidden="true">
      {label}
    </span>
  );
}

function LessonLabel({ lesson, side, title }) {
  return (
    <span
      className={`absolute top-1/2 hidden w-[13rem] -translate-y-1/2 rounded-[1.4rem] border border-yellow-200 bg-white px-4 py-3 text-left text-slate-900 shadow-[0_10px_24px_rgba(67,90,50,0.1)] md:block lg:w-[15.5rem] ${
        side === "left"
          ? "right-[5.5rem] lg:right-[6rem]"
          : "left-[5.5rem] lg:left-[6rem]"
      }`}
    >
      <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-wide text-green-700">
        Bài {lesson.orderIndex}
      </span>
      <span className="mt-2 block whitespace-normal break-words text-base font-black leading-[1.2] text-slate-900">
        {title}
      </span>
    </span>
  );
}

function RewardNode({ index, pathDirection, totalItems }) {
  const position = getPathPosition(pathDirection, index, totalItems);

  return (
    <article
      className="absolute z-20"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <span
        className="mx-auto inline-flex h-[5.25rem] w-[5.25rem] shrink-0 items-center justify-center rounded-full border-[6px] border-white bg-yellow-50 text-yellow-700 shadow-[0_8px_0_#f2dd8b]"
      >
        <Medal size={28} weight="duotone" />
      </span>
    </article>
  );
}

function LearningInsightPanel({ island, lesson }) {
  const [isTipOpen, setIsTipOpen] = useState(false);

  if (!island || !lesson) {
    return null;
  }
  const islandName = getIslandDisplayName(island);
  const lessonTitle = getLessonDisplayTitle(lesson);

  return (
    <>
      <aside className="fade-up animation-delay-1 hidden space-y-4 md:block">
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-1">
          {learningStats.map(({ id, label, value, tone }) => (
            <StatCard key={id} label={label} value={value} tone={tone} />
          ))}
        </div>
        <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm">
          <span className="inline-flex rounded-2xl bg-green-100 p-3 text-green-700">
            <Compass size={26} weight="duotone" />
          </span>
          <h2 className="mt-4 text-lg font-black text-slate-900">Tiến trình đảo</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {islandName}: 0/{island.situationCount} bài đã học.
          </p>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-lime-100">
            <div className="h-full w-1/12 rounded-full bg-green-500" />
          </div>
        </div>
      </aside>

      <div className="pointer-events-none fixed bottom-24 right-3 z-30 flex w-[min(20rem,calc(100vw-1.5rem))] flex-col items-end gap-3 sm:right-5 xl:bottom-6 xl:right-6">
        <aside
          aria-hidden={!isTipOpen}
          aria-labelledby="learning-tip-title"
          id="learning-tip-panel"
          className={`w-full origin-bottom-right rounded-[1.5rem] border border-yellow-100 bg-white/95 p-4 shadow-soft backdrop-blur transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            isTipOpen
              ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-3 scale-95 opacity-0"
          }`}
        >
          <h2 id="learning-tip-title" className="text-sm font-black text-slate-900">
            Gợi ý cho bé
          </h2>
          <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">
            Với bài "{lessonTitle}", hãy hỏi người lớn khi gặp tình huống chưa chắc chắn.
          </p>
        </aside>

        <button
          aria-controls="learning-tip-panel"
          aria-expanded={isTipOpen}
          aria-label={isTipOpen ? "Ẩn gợi ý cho bé" : "Mở gợi ý cho bé"}
          className="group pointer-events-auto relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white p-1 shadow-soft ring-2 ring-yellow-200 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-300 active:scale-95 sm:h-24 sm:w-24"
          type="button"
          onClick={() => setIsTipOpen((isOpen) => !isOpen)}
        >
          <span className="absolute -left-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-black text-white shadow-sm">
            ?
          </span>
          <img
            alt=""
            aria-hidden="true"
            className="h-full w-full rounded-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:rotate-2 group-hover:scale-105"
            src={mascotSpeaking}
          />
        </button>
      </div>
    </>
  );
}

function IslandRoadmap({
  collapsedIslandIds,
  islands,
  onLockedLessonSelect,
  onSelect,
  selectedIslandId,
  selectedSituations,
}) {
  const roadmapRef = useRef(null);
  const [stickyIslandId, setStickyIslandId] = useState(selectedIslandId || islands?.[0]?.islandId);

  useEffect(() => {
    setStickyIslandId(selectedIslandId || islands?.[0]?.islandId);
  }, [islands, selectedIslandId]);

  useEffect(() => {
    const updateStickyIsland = () => {
      const sectionNodes = roadmapRef.current?.querySelectorAll("[data-island-section]");

      if (!sectionNodes || sectionNodes.length === 0) {
        return;
      }

      const activationLine = 168;
      let currentId = sectionNodes[0].getAttribute("data-island-section");
      if (typeof document.elementFromPoint !== "function") {
        return;
      }

      const sectionUnderCard =
        document
          .elementFromPoint(window.innerWidth / 2, 360)
          ?.closest("[data-island-section]");

      if (sectionUnderCard) {
        currentId = sectionUnderCard.getAttribute("data-island-section");
      } else {
        sectionNodes.forEach((sectionNode) => {
          const rect = sectionNode.getBoundingClientRect();

          if (rect.top <= activationLine) {
            currentId = sectionNode.getAttribute("data-island-section");
          }
        });
      }

      const numericCurrentId = Number(currentId);
      const normalizedCurrentId = Number.isNaN(numericCurrentId) ? currentId : numericCurrentId;

      setStickyIslandId((previousId) =>
        String(previousId) === String(normalizedCurrentId) ? previousId : normalizedCurrentId,
      );
    };

    updateStickyIsland();
    window.addEventListener("scroll", updateStickyIsland, { passive: true });
    window.addEventListener("resize", updateStickyIsland);

    return () => {
      window.removeEventListener("scroll", updateStickyIsland);
      window.removeEventListener("resize", updateStickyIsland);
    };
  }, [islands]);

  if (!Array.isArray(islands) || islands.length === 0) {
    return null;
  }

  const stickyIsland =
    islands.find((island) => String(island.islandId) === String(stickyIslandId)) || islands[0];
  const stickyIslandIndex = islands.findIndex((island) => island.islandId === stickyIsland.islandId);
  const stickyIslandActive = stickyIsland.islandId === selectedIslandId;
  const stickyIslandName = getIslandShortName(stickyIsland);

  return (
    <section ref={roadmapRef} className="mx-auto mt-2 w-full max-w-3xl">
      <IslandHeaderCard
        island={stickyIsland}
        islandIndex={stickyIslandIndex}
        islandName={stickyIslandName}
        onSelect={onSelect}
        state={stickyIslandActive ? "active" : "locked"}
      />
      <div className="space-y-16">
        {islands.map((island, index) => {
          const active = island.islandId === selectedIslandId;
          const lessons = getIslandLessons(island, active, selectedSituations);
          const lessonCount = island.situationCount || lessons.length;
          const islandName = getIslandShortName(island);
          const collapsed = collapsedIslandIds.includes(island.islandId);

          if (collapsed) {
            return (
              <article
                className="relative scroll-mt-40"
                data-island-section={island.islandId}
                key={island.islandId}
              >
                <IslandDivider
                  islandIndex={index}
                  islandName={islandName}
                />
                <CollapsedIslandSummary
                  island={island}
                  islandIndex={index}
                  islandName={islandName}
                  lessonCount={lessonCount}
                  onSelect={onSelect}
                />
              </article>
            );
          }

          if (!active) {
            return (
              <article
                className="relative scroll-mt-40"
                data-island-section={island.islandId}
                key={island.islandId}
              >
                <IslandDivider
                  islandIndex={index}
                  islandName={islandName}
                />
                <LockedIslandPreview
                  island={island}
                  islandName={islandName}
                  islandIndex={index}
                  onLockedLessonSelect={onLockedLessonSelect}
                  onSelect={onSelect}
                />
              </article>
            );
          }

          return (
            <article
              key={island.islandId}
              className="relative scroll-mt-40"
              data-island-section={island.islandId}
            >
              {index > 0 ? (
                <IslandDivider
                  islandIndex={index}
                  islandName={islandName}
                />
              ) : null}
              <IslandPath
                active={active}
                className="mt-16"
                id={index === 0 ? "learning-path" : undefined}
                islandIndex={index}
                lessons={lessons}
                onLockedLessonSelect={onLockedLessonSelect}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}

function IslandHeaderCard({ island, islandIndex, islandName, onSelect, state }) {
  const locked = state === "locked";

  return (
    <button
      type="button"
      onClick={() => onSelect(island.islandId)}
      className={`sticky top-24 z-30 flex w-full items-center gap-4 rounded-[2rem] px-4 py-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-soft sm:top-28 sm:px-5 ${
        locked
          ? "bg-violet-400 text-white shadow-[0_8px_0_#a855f7]"
          : "bg-green-500 text-white shadow-[0_8px_0_#2ea41f]"
      }`}
    >
      <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-white">
        <MapTrifold size={26} weight="duotone" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-extrabold text-white/90">
          Đảo {island.orderIndex || islandIndex + 1}
        </span>
        <span className="mt-1 block whitespace-normal break-words text-lg font-black leading-tight text-white">
          {islandName}
        </span>
      </span>
      <span className="rounded-full bg-white/20 px-3 py-2 text-xs font-black text-white">
        {locked ? "Chưa mở" : "Đang học"}
      </span>
    </button>
  );
}

function IslandDivider({ islandIndex, islandName }) {
  return (
    <div className="mb-9 flex items-center gap-4 text-center text-slate-400">
      <span className="h-px flex-1 bg-green-100" />
      <span className="shrink-0 text-sm font-black leading-tight sm:text-base">
        {`\u0110\u1ea3o ${islandIndex + 1} \u00b7 ${islandName}`}
      </span>
      <span className="h-px flex-1 bg-green-100" />
    </div>
  );
}

function CollapsedIslandSummary({ island, islandIndex, islandName, lessonCount, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(island.islandId)}
      className="group flex w-full items-center gap-4 rounded-[1.5rem] border border-green-100 bg-white/80 px-4 py-3 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-soft sm:px-5"
    >
      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
        <MapTrifold size={24} weight="duotone" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-extrabold text-green-700">
          Đảo {island.orderIndex || islandIndex + 1}
        </span>
        <span className="block whitespace-normal break-words text-sm font-black leading-tight text-slate-900">
          {islandName}
        </span>
      </span>
      <span className="rounded-full bg-green-50 px-3 py-2 text-xs font-bold text-green-700">
        {lessonCount} bài
      </span>
    </button>
  );
}

function LockedIslandPreview({
  island,
  islandIndex,
  islandName,
  onLockedLessonSelect,
  onSelect,
}) {
  const pathDirection = getPathDirection(islandIndex);
  const lockedItems = ["skip", "lock", "chest", "lock", "reward"];

  return (
    <div className="relative mx-auto mt-20 max-w-[34rem]" style={{ height: "35rem" }}>
        <PathGuide active={false} direction={pathDirection} />
        <img
          src={mascotSulking}
          alt=""
          aria-hidden="true"
          className={`pointer-events-none absolute top-[40%] z-10 hidden w-16 select-none opacity-30 grayscale sm:block ${
            pathDirection === "right" ? "right-8" : "left-8 -scale-x-100"
          }`}
        />
        {lockedItems.map((item, index) => (
          <LockedPreviewNode
            index={index}
            islandName={islandName}
            key={`${item}-${index}`}
            onSelect={() =>
              item === "skip"
                ? onLockedLessonSelect?.({
                    islandId: island.islandId,
                    orderIndex: island.orderIndex,
                    title: islandName,
                  })
                : onSelect(island.islandId)
            }
            pathDirection={pathDirection}
            totalItems={lockedItems.length}
            type={item}
          />
        ))}
      </div>
  );
}

function LockedPreviewNode({ index, islandName, onSelect, pathDirection, totalItems, type }) {
  const position = getPathPosition(pathDirection, index, totalItems);
  const isSkip = type === "skip";
  const isChest = type === "chest";
  const isReward = type === "reward";
  return (
    <article
      className="absolute z-20"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {isSkip ? (
        <button
          type="button"
          onClick={onSelect}
          aria-label={`Học vượt ${islandName}`}
          className="learning-action-node learning-action-node--skip group relative mx-auto flex h-[5.25rem] w-[5.25rem] items-center justify-center rounded-full border-[6px] border-white bg-violet-400 text-white shadow-[0_8px_0_#a855f7] transition duration-300 hover:-translate-y-1 hover:bg-violet-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-200 focus-visible:ring-offset-4"
        >
          <LearningActionCallout label="Học vượt?" tone="skip" />
          <Play size={34} weight="fill" />
        </button>
      ) : (
        <span
          className={`mx-auto inline-flex h-[5.25rem] w-[5.25rem] items-center justify-center border-[6px] border-white bg-slate-100 text-slate-300 shadow-[0_8px_0_#d7e1dc] ${
            isChest ? "rounded-[1.4rem]" : "rounded-full"
          }`}
        >
          {isReward ? (
            <Medal size={30} weight="duotone" />
          ) : (
            <Lock size={isChest ? 24 : 30} weight="duotone" />
          )}
        </span>
      )}
    </article>
  );
}

function getIslandLessons(island, active, selectedSituations) {
  if (active && selectedSituations.length > 0) {
    return ensureActiveLesson(selectedSituations);
  }

  if (Array.isArray(island.situations) && island.situations.length > 0) {
    return active ? ensureActiveLesson(island.situations) : island.situations;
  }

  return Array.from({ length: island.situationCount || 0 }, (_, index) => ({
    situationId: `${island.islandId}-placeholder-${index + 1}`,
    islandId: island.islandId,
    title: `Bài ${index + 1}`,
    orderIndex: index + 1,
    state: "locked",
  }));
}

function ensureActiveLesson(lessons) {
  if (lessons.some((lesson) => lesson.state === "current" || lesson.state === "open")) {
    return lessons;
  }

  return lessons.map((lesson, index) => ({
    ...lesson,
    state: index === 0 ? "current" : "locked",
  }));
}

function getPathDirection(islandIndex) {
  return islandIndex % 2 === 0 ? "right" : "left";
}

function getPathPosition(direction, index, totalItems) {
  const progress = totalItems <= 1 ? 0 : index / (totalItems - 1);
  const baseY = 8 + progress * 84;
  const wave = Math.sin(progress * Math.PI * 2);
  const amplitude = 22;
  const x = direction === "right" ? 50 + wave * amplitude : 50 - wave * amplitude;

  return { x, y: baseY };
}

function getLessonDisplayTitle(lesson) {
  const title = String(lesson?.title || "").trim();
  const normalizedTitle = title.replace(/^Bài\s*\d+\s*[:.\-–—]?\s*/iu, "").trim();

  return normalizedTitle || title;
}

async function openLesson(lesson) {
  if (!lesson?.situationId) {
    return;
  }

  if (isSmallLessonViewport()) {
    await enterLessonLandscape(document.documentElement);
  }

  navigateInApp(`/lesson/${encodeURIComponent(lesson.situationId)}`);
}

function getIslandDisplayName(island) {
  if (!island) {
    return "";
  }

  return islandVietnameseNames[island.islandId] || island.name;
}

function getIslandShortName(island) {
  if (!island) {
    return "";
  }

  return islandShortNames[island.islandId] || getIslandDisplayName(island);
}

function StatCard({ label, value, tone }) {
  return (
    <article className="rounded-3xl border border-green-100 bg-white p-4 shadow-sm">
      <span className={`inline-flex rounded-2xl px-3 py-2 text-sm font-black ${tone}`}>
        {value}
      </span>
      <p className="mt-3 text-sm font-extrabold text-slate-700">{label}</p>
    </article>
  );
}


