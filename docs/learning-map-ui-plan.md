# Learning Map UI Plan

## Mục tiêu

Tạo trang học cho trẻ theo dạng bản đồ đảo, dựa trên dữ liệu đảo và bài học lấy từ `I:/EXE/SmartSteps/SmartStepsServer`. Giao diện tham khảo tinh thần learning path trong ảnh người dùng gửi, nhưng dùng nội dung SmartSteps và loại bỏ các yếu tố không phù hợp.

## Nguồn dữ liệu đã đọc

- `I:/EXE/SmartSteps/SmartStepsServer/Program.cs`
- `I:/EXE/SmartSteps/SmartStepsServer/Properties/launchSettings.json`
- `I:/EXE/SmartSteps/SmartStepsServer/README.md`
- `I:/EXE/SmartSteps/SmartStepsServer/Controllers/IslandsController.cs`
- `I:/EXE/SmartSteps/SmartStepsServer/Controllers/SituationsController.cs`
- `I:/EXE/SmartSteps/SmartStepsServer/Controllers/MediaController.cs`
- `I:/EXE/SmartSteps/smartsteps/src/app/App.css`
- `I:/EXE/SmartSteps/smartsteps/src/features/landing/pages/LandingView.jsx`
- `I:/EXE/SmartSteps/smartsteps/src/features/landing/components/HeroSection.jsx`
- `I:/EXE/SmartSteps/smartsteps/src/features/landing/components/WorldsSection.jsx`
- `I:/EXE/SmartSteps/smartsteps/src/features/landing/data/landingContent.js`
- `I:/EXE/SmartSteps/smartsteps/src/components/common/Header.jsx`
- `I:/EXE/SmartSteps/smartsteps/src/components/ui/ButtonLink.jsx`
- `I:/EXE/SmartSteps/smartsteps/src/components/ui/SectionHeading.jsx`

## Ràng buộc nội dung

Không dùng:

- Cửa hàng
- Gem
- Mạng/tim
- Sao
- Emoji trong UI

Dùng thay thế:

- Bài đã học
- Chuỗi ngày
- Mục tiêu hôm nay
- Tiến trình đảo
- Gợi ý an toàn cho bé

## Icon rule

Không dùng emoji trong UI, mockup, button, stat, navigation, node, card, label, hoặc empty state. Emoji chỉ được xem là ký hiệu trong phần phác thảo text thô, không được đưa vào code.

Khi cần biểu tượng, dùng:

- Icon từ `@phosphor-icons/react` cho web React.
- Icon component dùng chung nếu cần chuẩn hóa kích thước/màu.
- Asset hình ảnh có sẵn trong `assets/images` nếu biểu tượng là nhân vật, đảo, hoặc huy hiệu học tập.

Ví dụ thay thế:

| Không dùng | Dùng |
|---|---|
| `📘 Bài đã học` | `BookOpen` + `Bài đã học` |
| `🔥 Chuỗi ngày` | `Flame` + `Chuỗi ngày` |
| `🎯 Mục tiêu` | `Target` + `Mục tiêu` |
| `🏠 Học` | `House` + `Học` |
| `🧭 Các đảo` | `MapTrifold` + `Các đảo` |
| `👤 Hồ sơ` | `UserCircle` + `Hồ sơ` |
| `🔒` | `Lock` |
| `▶` | `Play` |

## Đảo hiện có

### Đảo an toàn cá nhân

- Bài 1: Vật tròn lấp lánh
- Bài 2: Bàn tay kỳ diệu và các cái lỗ
- Bài 3: Cơn nghiện "ấn nút"

### Đảo an toàn xã hội

- Bài 1: Người lạ "biết tên bé"
- Bài 2: Lời thách đố của bạn bè
- Bài 3: Chiếc ví bị đánh rơi

### Đảo an toàn môi trường

- Bài 1: Qua đường an toàn
- Bài 2: Bị lạc trong siêu thị
- Bài 3: Hồ nước / hồ bơi

## Hướng thiết kế

Reading this as: child learning product screen for kids and parents, implemented as a web React learning map backed by SmartStepsServer APIs and visually aligned with the existing landing page.

Thiết kế giữ cảm giác trò chơi, nhưng phải cùng hệ hình ảnh với landing page:

- Nền chính dùng `bg-[#fffdf7]`, `bg-white`, hoặc `bg-lime-50`; không dùng nền tối/xanh than làm vùng học chính.
- Có thể dùng `hero-grid` hoặc grid kem nhạt cho vùng learning hero/shell để nối với landing hero.
- Text chính dùng `text-slate-900`, text phụ dùng `text-slate-600`, label phụ dùng `text-slate-500`.
- Accent chính dùng xanh lá và vàng: `text-green-700`, `text-green-600`, `bg-yellow-400`, `bg-yellow-100`, `bg-green-100`, `bg-lime-50`.
- Card dùng nền trắng, border pastel, shadow mềm, bo góc lớn giống landing: `rounded-3xl`, `border-green-100`, `shadow-sm`, `shadow-soft`.
- CTA chính dùng style tactile giống `ButtonLink`: rounded-full, font-extrabold, `bg-yellow-400`, `text-slate-900`, shadow đáy `0_6px_0`.
- Node bài học dạng đường đi dọc nhưng dùng vòng tròn/card sáng, pastel, có hover/tap nhẹ.
- Node khóa dùng `bg-slate-100`, `text-slate-400`, `border-slate-200`; không tạo cảm giác disabled quá nặng.
- Node thưởng dùng huy hiệu kỹ năng màu vàng/xanh/cam pastel, không dùng sao.

## Landing style alignment

Learning map should reuse the landing page visual language rather than create a separate app skin.

### Reusable style tokens

| Purpose | Landing reference | Learning usage |
|---|---|---|
| Page background | `bg-[#fffdf7]`, `hero-grid` | Learning shell background and page header |
| Section background | `bg-white`, `bg-lime-50` | Main path area and island selector bands |
| Max width | `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8` | Learning shell container |
| Card shell | `rounded-3xl border bg-white shadow-sm hover:shadow-soft` | Island cards, insight cards, lesson panels |
| CTA | `ButtonLink` tactile yellow/outline | `Bắt đầu`, retry, continue lesson |
| Icon tone | pastel icon badges from `landingContent.js` | Stats, island type, safety tip, locked state |
| Motion | `fade-up`, `floating-card`, `hero-media-frame` | Page entrance, node float, active lesson highlight |

### Palette guidance

- Primary CTA: `bg-yellow-400 text-slate-900 shadow-[0_6px_0_#c99d00]`.
- Secondary CTA: `border-2 border-slate-200 bg-white text-slate-800 shadow-[0_6px_0_#dce2e7]`.
- Positive/progress: `bg-green-100 text-green-700`, `text-green-700`, `bg-lime-50`.
- Lesson path surface: `bg-white/90`, `border-green-100`, `shadow-soft`.
- Safety/info: `bg-sky-100 text-sky-700`, `bg-yellow-50`, `border-yellow-100`.
- Locked/disabled: `bg-slate-100 text-slate-400 border-slate-200`.

### Shape and spacing

- Use rounded, friendly shapes from landing: `rounded-full`, `rounded-2xl`, `rounded-3xl`.
- Keep cards airy but not huge: `p-4` to `p-6` for cards, `gap-4` to `gap-6` for grids.
- Avoid nested cards unless the inner element is an interactive lesson node.
- Avoid dark panels, glassy dashboard styling, and one-off gradients that do not appear in landing.

## Desktop Web Layout

```text
┌──────────────┬──────────────────────────────┬──────────────────────┐
│ SmartSteps   │ ĐẢO AN TOÀN CÁ NHÂN           │ [Book] 0/9           │
│              │ Bé học tránh nguy hiểm        │ [Flame] 0            │
│ [House] Học  │                              │ [Target] 0/1         │
│ [Map] Đảo    │          [BẮT ĐẦU]            │                      │
│ [Book] Ôn tập│             [Play]            │ Tiến trình hôm nay   │
│ [Target] MT  │             │                │ [────── 0/1]          │
│ [User] Hồ sơ │            [Lock]            │                      │
│              │             │                │ Gợi ý cho bé         │
│              │       [Huy hiệu kỹ năng]      │ Hỏi người lớn khi    │
│              │             │                │ gặp đồ vật lạ.       │
│              │        [Hoàn tất đảo]         │                      │
└──────────────┴──────────────────────────────┴──────────────────────┘
```

### Desktop regions

- Top header should reuse the existing `Header`/`Brand` language where possible.
- Left sidebar: navigation only, white/lime surface with pastel active state.
- Center: selected island and lesson path on a white or cream card/surface.
- Right panel: progress, daily goal, safety tip, profile CTA if needed, using landing-style cards.

## Tablet Layout

```text
┌──────────────────────────────────────────────┐
│ SmartSteps    [Book] 0/9 [Flame] 0 [Target] │
├──────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────┐ │
│ │ Đảo an toàn cá nhân                      │ │
│ │ Bé học tránh nguy hiểm gần cơ thể         │ │
│ │ 3 bài học                    [Hướng dẫn] │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│                  [BẮT ĐẦU]                   │
│                   [Play]                     │
│                     │                        │
│                   [Lock]                     │
│                     │                        │
│              [Huy hiệu kỹ năng]              │
│                     │                        │
│               [Hoàn tất đảo]                 │
│                                              │
│ ┌────────────────────┐ ┌───────────────────┐ │
│ │ Tiến trình hôm nay │ │ Gợi ý cho bé      │ │
│ │ 0/1 bài            │ │ Hỏi người lớn     │ │
│ └────────────────────┘ └───────────────────┘ │
├──────────────────────────────────────────────┤
│ [House] Học [Map] Đảo [Book] Ôn tập [User]  │
└──────────────────────────────────────────────┘
```

### Tablet rules

- Không dùng sidebar cố định.
- Top stats chỉ giữ 3 chỉ số.
- Right panel chuyển thành cards dưới path.
- Bottom nav hiển thị 4 mục chính.
- Header and bottom nav should use white/cream surfaces with yellow or green active states.

## Mobile Layout

```text
┌──────────────────────────────┐
│ VI   [Book] 0/9 [Flame] 0    │
│      [Target] 0/1            │
├──────────────────────────────┤
│ ┌──────────────────────────┐ │
│ │ PHẦN 1                   │ │
│ │ Đảo an toàn cá nhân       │ │
│ │ Vật tròn lấp lánh         │ │
│ └──────────────────────────┘ │
│                              │
│           [BẮT ĐẦU]          │
│            [Play]            │
│              │               │
│            [Lock]            │
│              │               │
│       [Huy hiệu kỹ năng]      │
│              │               │
│        [Hoàn tất đảo]         │
│                              │
├──────────────────────────────┤
│ [House]  [Map]  [Book] [User]│
└──────────────────────────────┘
```

### Mobile rules

- Một cột duy nhất.
- Header bài học ngắn, không nhồi mô tả dài.
- Node path đặt giữa màn hình.
- Bottom nav cố định.
- Cards phụ nằm dưới path, có thể thu gọn.
- Avoid full-screen dark learning surfaces; mobile keeps the landing page's bright, friendly base.

## Node states

| State | Visual | Action |
|---|---|---|
| Current | Yellow tactile label plus green play circle, `Bắt đầu` label | Start lesson |
| Open | White/yellow or white/green circle with pastel icon badge | Open lesson |
| Locked | Slate pastel circle, lock icon, muted border | Show locked message |
| Skill reward | Pastel badge card or medal-like node, no star | Show skill earned |
| Island complete | Certificate/medal style node with green/yellow tone | Show island summary |

## Data mapping

Use SmartStepsServer API contracts:

- `GET /api/islands`
- `GET /api/islands/{id}/situations`
- `GET /api/situations`
- `GET /api/situations/{id}`
- `POST /api/media/signed-url`
- `POST /api/media/signed-voice-url`

Base URL by environment:

- Local web development: `http://localhost:5078`
- HTTPS development if needed: `https://localhost:7289`
- Configure through an environment value such as `REACT_APP_SMARTSTEPS_API_BASE_URL`.

API service plan:

```text
src/features/learning/
├─ services/learningApi.js
├─ types/learning.type.js
```

Service methods:

- `getIslands()`: calls `GET /api/islands`.
- `getIslandSituations(islandId)`: calls `GET /api/islands/{islandId}/situations`.
- `getSituationDetail(situationId)`: calls `GET /api/situations/{situationId}`.
- `createSignedMediaUrl(stepId, accessToken)`: calls `POST /api/media/signed-url`.
- `createSignedVoiceUrl(mediaUrl, accessToken)`: calls `POST /api/media/signed-voice-url`.

Networking rules:

- Keep API base URL in config, not hardcoded in components.
- Keep Cloudinary API secret only on `SmartStepsServer`; never expose it in web code.
- Handle loading, error, empty, and retry states around every API request.
- Media endpoints are signed on the server; the web app should not need to send a media auth token.

Map UI like this:

- Island card title: `IslandSummary.name`
- Island card description: `IslandSummary.description`
- Lesson count: `IslandSummary.situationCount`
- Lesson node title: `SituationSummary.title`
- Lesson node intro: `SituationSummary.intro`
- Skill badge: first `SituationDetail.skills`
- Parent/safety tip: `SituationDetail.parentReview.questionText` or `SituationDetail.parentReview.suggestedActivity`
- Step media: `SituationDetail.steps[].mediaUrl`; request a signed URL before playback when the object is private.

## Component plan

For the web React project:

```text
src/features/learning/
├─ pages/LearningMapPage.jsx
├─ providers/LearningMapProvider.jsx
├─ services/learningApi.js
├─ types/learning.type.js
├─ components/
│  ├─ LearningShell.jsx
│  ├─ LearningSidebar.jsx
│  ├─ LearningTopStats.jsx
│  ├─ IslandSelector.jsx
│  ├─ IslandLessonHeader.jsx
│  ├─ IslandPath.jsx
│  ├─ LessonNode.jsx
│  ├─ LearningInsightPanel.jsx
│  └─ LearningBottomNav.jsx
```

## Shared component plan

These components should live outside `features/learning` because they can be reused by landing, auth, profile, review, and future pages.

```text
src/components/ui/
├─ Button.jsx
├─ ButtonLink.jsx
├─ SectionHeading.jsx
├─ AppCard.jsx
├─ AppIconButton.jsx
├─ AppProgressBar.jsx
├─ AppStatPill.jsx
├─ AppBadge.jsx
├─ AppTooltip.jsx
├─ ResponsiveContainer.jsx
└─ MotionPress.jsx
```

### Shared components

| Component | Purpose | Reuse cases |
|---|---|---|
| `Button` / `ButtonLink` | Existing rounded/tactile button foundation | Landing CTA, auth, learning actions |
| `SectionHeading` | Existing title/kicker/copy rhythm | Learning section headers |
| `AppCard` | Landing-style rounded card shell with border/shadow variants | Mission cards, profile cards, review cards |
| `AppIconButton` | Circular icon action | Back, menu, close, guide |
| `AppProgressBar` | Progress meter with label support | Daily goal, island progress, profile progress |
| `AppStatPill` | Compact stat display | Top stats on learning page and profile |
| `AppBadge` | Small status/skill badge | Skill reward, premium status, completion labels |
| `AppTooltip` | Small anchored label | `Bắt đầu`, locked reason, guidance hint |
| `ResponsiveContainer` | Width/padding wrapper | Page sections and app shell content |
| `MotionPress` | Tap/press animation wrapper | Buttons, nodes, cards |

### Shared animation primitives

```text
src/components/motion/
├─ FadeIn.jsx
├─ SlideIn.jsx
├─ ScaleIn.jsx
├─ StaggerChildren.jsx
├─ PulseRing.jsx
└─ FloatingElement.jsx
```

| Component | Purpose |
|---|---|
| `FadeIn` | Soft entrance for cards and panels |
| `SlideIn` | Sidebar/panel entrance |
| `ScaleIn` | Node and badge entrance |
| `StaggerChildren` | Sequential reveal for lesson nodes |
| `PulseRing` | Active lesson node highlight |
| `FloatingElement` | Gentle mascot/badge floating |

Do not add an animation library unless needed. CSS keyframes and Tailwind classes are enough for the first pass. If the page later needs scroll-linked or physics motion, add `motion` deliberately and isolate motion components.

Prefer reusing existing animation classes first:

- `fade-up`
- `floating-card`
- `hero-media-frame`
- `tactile-button`
- `shadow-soft`

## Learning-only component plan

These components belong in `src/features/learning/components` because they depend on the learning map domain.

```text
src/features/learning/components/
├─ LearningShell.jsx
├─ LearningSidebar.jsx
├─ LearningTopStats.jsx
├─ LearningMobileHeader.jsx
├─ LearningBottomNav.jsx
├─ IslandSelector.jsx
├─ IslandCard.jsx
├─ IslandLessonHeader.jsx
├─ IslandPath.jsx
├─ IslandPathConnector.jsx
├─ LessonNode.jsx
├─ LessonNodeLabel.jsx
├─ SkillRewardNode.jsx
├─ IslandCompleteNode.jsx
├─ LearningInsightPanel.jsx
├─ DailyGoalCard.jsx
├─ IslandProgressCard.jsx
├─ SafetyTipCard.jsx
├─ LockedLessonDialog.jsx
└─ GuideDrawer.jsx
```

### Learning-only components

| Component | Purpose |
|---|---|
| `LearningShell` | Desktop/tablet/mobile layout frame |
| `LearningSidebar` | Desktop navigation |
| `LearningTopStats` | Desktop/tablet stat row |
| `LearningMobileHeader` | Mobile compact header |
| `LearningBottomNav` | Tablet/mobile bottom navigation |
| `IslandSelector` | Shows 3 islands before selecting one |
| `IslandCard` | One island summary card |
| `IslandLessonHeader` | Green header for selected island/current lesson |
| `IslandPath` | Vertical lesson path area |
| `IslandPathConnector` | Curved/dashed line between nodes |
| `LessonNode` | Current/open/locked lesson node |
| `LessonNodeLabel` | Floating label such as `Bắt đầu` |
| `SkillRewardNode` | Reward marker after lesson completion |
| `IslandCompleteNode` | Final island completion marker |
| `LearningInsightPanel` | Desktop right panel wrapper |
| `DailyGoalCard` | Today's goal progress |
| `IslandProgressCard` | Selected island progress |
| `SafetyTipCard` | Contextual safety tip from parent review |
| `LockedLessonDialog` | Explains why a lesson is locked |
| `GuideDrawer` | Short guidance/help panel |

## Animation plan

The page should feel playful but not distracting. Motion is used for hierarchy, feedback, and progression.

### Entrance animation

| Element | Animation | Timing |
|---|---|---|
| Page shell | Fade in | 180ms |
| Sidebar | Slide from left | 220ms desktop only |
| Right insight panel | Slide from right | 220ms desktop only |
| Island header | Scale/fade | 180ms |
| Lesson nodes | Staggered scale in | 80ms delay per node |
| Bottom nav | Slide from bottom | 180ms mobile/tablet |

### Interaction animation

| Element | Animation | Trigger |
|---|---|---|
| Lesson node | Press down, then rebound | Tap/click |
| Current node | Soft pulse ring | Idle loop |
| Locked node | Small shake | Tap locked lesson |
| Skill reward node | Pop scale + glow | Appears after completion |
| Progress bar | Width fill | Page load and update |
| Island card | Lift + border accent | Hover desktop |
| Guide button | Tiny bounce | First render only |

### Motion details

Use CSS classes:

```text
motion-fade-in
motion-slide-left
motion-slide-right
motion-slide-up
motion-scale-in
motion-node-pulse
motion-node-shake
motion-pop
motion-float
```

Reduced motion:

- Respect `prefers-reduced-motion: reduce`.
- Disable looping pulse/float.
- Keep instant state changes readable.
- Do not rely on animation alone to explain locked/open/current state.

### Animation ownership

Shared animation wrappers:

- `FadeIn`
- `SlideIn`
- `ScaleIn`
- `StaggerChildren`
- `PulseRing`
- `FloatingElement`

Learning-specific animated components:

- `LessonNode`
- `LessonNodeLabel`
- `SkillRewardNode`
- `IslandCompleteNode`
- `IslandPathConnector`

## Implementation phases

### Phase 0: Server readiness

Goal: confirm `SmartStepsServer` can serve the learning catalog before wiring UI to it.

Tasks:

- Run `SmartStepsServer` with the `http` launch profile.
- Confirm base URL is reachable at `http://localhost:5078`.
- Verify Swagger or direct requests for `GET /api/islands`, `GET /api/situations`, and `GET /api/situations/{id}`.
- Confirm CORS allows the React dev origin.
- Move or override Cloudinary secret configuration outside committed frontend code.

Done when:

- API returns active islands and published situations.
- The web project can call the API from local dev without CORS failure.

### Phase 1: API client foundation

Goal: create the frontend boundary for all SmartStepsServer calls.

Tasks:

- Add environment-based API base URL config.
- Create `src/features/learning/services/learningApi.js`.
- Create `src/features/learning/types/learning.type.js` for response-shape documentation.
- Implement `getIslands`, `getIslandSituations`, `getSituationDetail`, `createSignedMediaUrl`, and `createSignedVoiceUrl`.
- Normalize fetch errors into a consistent error object.

Done when:

- API calls are usable from components without hardcoding URLs.
- Loading, empty, and failure responses can be distinguished by callers.

### Phase 2: Static learning map shell

Goal: build the page structure without relying on remote data yet.

Tasks:

- Create `LearningMapPage`.
- Create `LearningShell`, `LearningSidebar`, `LearningTopStats`, `LearningBottomNav`, and `LearningMobileHeader`.
- Reuse landing style primitives: `Header`, `Brand`, `ButtonLink`, `SectionHeading`, `hero-grid`, `shadow-soft`, and tactile button behavior where appropriate.
- Add responsive desktop, tablet, and mobile layout rules.
- Use temporary static data shaped like API responses.
- Keep all shop, gem, lives, heart, star, and emoji concepts out of the UI.

Done when:

- The learning map renders on desktop, tablet, and mobile widths.
- Layout regions match the plan: sidebar/center/right on desktop, top stats and bottom nav on tablet/mobile.
- The screen feels visually continuous with the landing page: bright cream/lime/white surfaces, rounded cards, pastel icon badges, and tactile yellow CTAs.

### Phase 3: Island and lesson path components

Goal: complete the core learning map visuals with domain components.

Tasks:

- Create `IslandSelector`, `IslandCard`, and `IslandLessonHeader`.
- Create `IslandPath`, `IslandPathConnector`, `LessonNode`, and `LessonNodeLabel`.
- Create `SkillRewardNode` and `IslandCompleteNode`.
- Add current, open, locked, skill reward, and island complete node states.
- Add locked lesson feedback through `LockedLessonDialog`.

Done when:

- The page can show 3 islands and 3 lessons per selected island from static API-shaped data.
- Current and locked lesson states are visually distinct and actionable.

### Phase 4: API data wiring

Goal: replace static learning data with SmartStepsServer API data.

Tasks:

- Load islands from `GET /api/islands`.
- On island selection, load lessons from `GET /api/islands/{id}/situations`.
- On lesson selection, load detail from `GET /api/situations/{id}`.
- Map `IslandSummary`, `SituationSummary`, and `SituationDetail` to UI state.
- Add page-level loading, error, retry, and empty states.

Done when:

- Learning map content comes from `SmartStepsServer`.
- API failures do not break the page and show a clear retry path.

### Phase 5: Insight panel and lesson detail data

Goal: use detailed lesson data to power the supporting learning context.

Tasks:

- Create `LearningInsightPanel`, `DailyGoalCard`, `IslandProgressCard`, and `SafetyTipCard`.
- Show lesson intro, first skill badge, and parent review guidance from `SituationDetail`.
- Calculate island progress from available lesson state.
- Keep progress concepts limited to `Bài đã học`, `Chuỗi ngày`, `Mục tiêu hôm nay`, and `Tiến trình đảo`.

Done when:

- Selecting a lesson updates the right panel or stacked mobile insight cards.
- Parent/safety guidance is visible when available and has a fallback when missing.

### Phase 6: Signed media URL flow

Goal: support private video/audio assets through backend signed URL endpoints.

Tasks:

- Detect lesson steps and flashcard voice fields that need playback.
- Call `POST /api/media/signed-url` with `stepId` before private step media playback.
- Call `POST /api/media/signed-voice-url` with `mediaUrl` before private voice playback.
- Request fresh signed media URLs from the backend when playback needs them.
- Handle expired signed URLs by requesting a fresh URL before replay.

Done when:

- Private step media and voice media can be played without exposing Cloudinary API secrets.
- Missing auth, missing media, and signing failures show clear user-facing errors.

### Phase 7: Motion and interaction polish

Goal: add feedback and motion without making the learning flow distracting.

Tasks:

- Add shared motion primitives: `FadeIn`, `SlideIn`, `ScaleIn`, `StaggerChildren`, `PulseRing`, and `FloatingElement`.
- Add CSS classes listed in the animation plan.
- Add current-node pulse, node press feedback, locked-node shake, and progress fill animation.
- Respect `prefers-reduced-motion: reduce`.

Done when:

- Motion supports hierarchy and interaction feedback.
- Reduced-motion users still get complete state information.

### Phase 8: QA, build, and cleanup

Goal: verify the feature end to end and remove temporary scaffolding.

Tasks:

- Remove temporary static data that is no longer needed.
- Check imports, unused code, naming consistency, and duplicated logic.
- Run build and relevant tests.
- Manually verify desktop, tablet, and mobile layouts.
- Verify API behavior with server running and server stopped.

Done when:

- Build and tests pass.
- The acceptance checklist below is satisfied.
- Any required manual configuration is documented.

## Acceptance checklist

- No shop UI.
- No gem UI.
- No lives/heart UI.
- No star reward UI.
- UI style matches the existing landing page visual language.
- Uses bright cream/white/lime surfaces instead of dark dashboard panels.
- Uses landing-style rounded cards, tactile CTA, pastel icon badges, and soft shadows.
- Shows 3 real islands.
- Shows 3 lessons per island.
- Desktop has left nav, center path, right insight panel.
- Tablet has top stats, centered path, stacked insight cards.
- Mobile has compact stats, centered path, bottom nav.
- Current lesson can start existing lesson flow.
- Locked lesson gives clear feedback.
- Learning map loads island and lesson data from SmartStepsServer API.
- API errors show a clear retry or fallback state.
- Private media uses backend signed URL endpoints before playback.
- Build and tests pass.
