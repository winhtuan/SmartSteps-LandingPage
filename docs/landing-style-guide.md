# SmartSteps Landing Style Guide

## 1. Mục đích

Tài liệu này mô tả ngôn ngữ hình ảnh của landing page SmartSteps để AI có thể thiết kế các màn hình mới, đặc biệt là màn hình học trên laptop và tablet, với phong cách đồng nhất.

Phong cách cốt lõi:

> Sáng, ấm áp, thân thiện với trẻ em và phụ huynh; vui nhộn nhưng đáng tin cậy; bo tròn, mềm mại, nhiều khoảng thở; dùng xanh lá và vàng làm màu nhận diện; tương tác có cảm giác như đồ chơi bấm được.

Không sao chép bố cục landing cho mọi màn hình. Hãy giữ **design language**, sau đó điều chỉnh bố cục theo chức năng.

---

## 2. Brand Personality

SmartSteps nên tạo cảm giác:

- An toàn và đáng tin cậy.
- Tích cực, khuyến khích trẻ thử và học.
- Dễ hiểu, không gây áp lực.
- Hiện đại nhưng không lạnh hoặc quá công nghệ.
- Vui nhộn vừa đủ, không biến thành game arcade.
- Phù hợp với cả trẻ nhỏ và phụ huynh.

Từ khóa hình ảnh:

`bright`, `warm`, `friendly`, `rounded`, `playful`, `safe`, `educational`, `soft`, `tactile`, `optimistic`.

---

## 3. Design Tokens

### 3.1 Màu nền

| Token | Giá trị | Cách dùng |
|---|---:|---|
| Warm cream | `#FFFDF7` | Nền hero, app shell, header và footer |
| White | `#FFFFFF` | Card, panel, nội dung chính |
| Lime surface | Tailwind `lime-50` | Vùng học tập, section tích cực |
| Yellow surface | Tailwind `yellow-50` | Section hướng dẫn, thông tin nhẹ |
| Sky surface | Tailwind `sky-50` | Coach, trợ giúp, audio và nội dung giải thích |
| Green surface | Tailwind `green-50` | Tiến trình, trạng thái hoàn thành |

Ưu tiên xen kẽ `#FFFDF7`, trắng và các nền pastel rất nhạt. Không phủ toàn màn hình bằng màu bão hòa mạnh.

### 3.2 Màu thương hiệu và trạng thái

| Vai trò | Token đề xuất |
|---|---|
| Primary green | `green-600` |
| Strong green text | `green-700` |
| Primary CTA yellow | `yellow-400` |
| CTA hover | `yellow-300` |
| Yellow text/icon | `yellow-700` hoặc `yellow-800` |
| Main text | `slate-900` |
| Body text | `slate-600` |
| Muted text | `slate-500` |
| Border neutral | `slate-100` hoặc `slate-200` |
| Soft green border | `green-100` |
| Soft yellow border | `yellow-100` |
| Disabled | `slate-100`, `slate-400`, `slate-200` |

### 3.3 Pastel icon tones

Mỗi nhóm nội dung có thể dùng badge icon pastel:

| Nhóm | Style |
|---|---|
| Thành công/an toàn | `bg-green-100 text-green-700` |
| Học tập/hướng dẫn | `bg-yellow-100 text-yellow-700` |
| Thông tin/giao tiếp | `bg-sky-100 text-sky-700` |
| Cảnh báo nhẹ | `bg-orange-100 text-orange-700` |
| Báo cáo | `bg-violet-100 text-violet-700` |
| Chăm sóc | `bg-rose-100 text-rose-700` |
| Phát triển kỹ năng | `bg-emerald-100 text-emerald-700` |

Không dùng đỏ đậm cho các lỗi học tập thông thường. Trẻ chọn sai nên nhận phản hồi nhẹ nhàng bằng cam pastel hoặc vàng.

---

## 4. Typography

### Font chính

```css
font-family: "Nunito", system-ui, sans-serif;
```

Nunito là font chủ đạo của landing page. Font cần tròn, dễ đọc và thân thiện.

### Phân cấp chữ

| Cấp | Style tham khảo |
|---|---|
| Hero title | `44–76px`, `font-black`, line-height `1–1.08`, tracking âm nhẹ |
| Section title | `30–48px`, `font-black`, `tracking-tight` |
| Card title | `18–24px`, `font-black` |
| Body large | `18px`, line-height khoảng `28px` |
| Body | `14–16px`, line-height `24–28px` |
| Label/kicker | `12–14px`, `font-extrabold` |
| Button | `14–16px`, `font-extrabold` |

Quy tắc:

- Heading dùng `font-black`.
- CTA, label và chỉ số dùng `font-extrabold`.
- Body dùng `font-medium` hoặc regular.
- Hạn chế chữ in hoa toàn bộ.
- Không dùng font mảnh.
- Giữ dòng ngắn, đặc biệt trong giao diện dành cho trẻ.

---

## 5. Layout System

### Container

```text
max-width: 1280px
mobile padding: 16px
tablet padding: 24px
desktop padding: 32px
```

Tailwind tương ứng:

```text
mx-auto max-w-7xl px-4 sm:px-6 lg:px-8
```

### Section spacing

| Kích thước | Khoảng cách dọc |
|---|---:|
| Mobile | `72px` |
| Tablet | `96px` |
| Desktop | `112px` |

### Grid

- Mobile: một cột.
- Tablet: thường dùng hai cột.
- Laptop/desktop: 12-column grid hoặc 3–5 cột tùy nội dung.
- Khoảng cách card phổ biến: `16–24px`.
- Nội dung cần nhiều khoảng thở, tránh dồn quá nhiều module vào một viewport.

### Breakpoint tham khảo

| Breakpoint | Hành vi |
|---|---|
| `< 640px` | Mobile, CTA full width, một cột |
| `640–767px` | Mobile lớn |
| `768–1023px` | Tablet, hai cột khi phù hợp |
| `>= 1024px` | Laptop/desktop, navigation và layout nhiều vùng |

---

## 6. Shape Language

SmartSteps sử dụng hình khối tròn và mềm:

- Button chính: `rounded-full`.
- Badge/pill: `rounded-full`.
- Input và item nhỏ: `rounded-2xl`.
- Card: `rounded-3xl` hoặc bán kính `24–32px`.
- Hero media lớn: bán kính `32–48px`.
- Icon container: `rounded-xl` hoặc `rounded-2xl`.

Không dùng:

- Góc vuông sắc.
- Border đen hoặc quá tương phản.
- Card kính tối.
- Panel kiểu dashboard doanh nghiệp.

---

## 7. Card Style

### Card tiêu chuẩn

```text
background: white
border: 1px solid pastel/neutral color
border-radius: 24–32px
padding: 20–28px
shadow: soft and diffuse
```

CSS shadow đặc trưng:

```css
box-shadow: 0 16px 36px rgba(67, 90, 50, 0.12);
```

### Card tương tác

- Hover desktop: nâng lên `4–8px`.
- Shadow tăng nhẹ khi hover.
- Border chuyển sang xanh pastel.
- Icon có thể xoay khoảng `3deg` hoặc scale nhẹ.
- Không làm toàn bộ card rung, xoay mạnh hoặc phát sáng neon.

### Card nổi trên hình

- Nền `white/95`.
- Border trắng bán trong suốt.
- Có thể dùng blur nhẹ.
- Chỉ dùng như annotation hoặc thông tin bổ trợ, không lạm dụng glassmorphism.

---

## 8. Button System

### Primary CTA

```text
yellow-400 background
slate-900 text
rounded-full
font-extrabold
minimum height: 48px
bottom shadow: 0 6px 0 #C99D00
```

Hover:

```text
background -> yellow-300
```

Pressed:

```text
translateY(5px)
remove bottom shadow
```

Đây là hiệu ứng **tactile button**, khiến CTA giống một nút đồ chơi có thể bấm.

### Secondary CTA

```text
white background
2px slate-200 border
slate-800 text
bottom shadow: 0 6px 0 #DCE2E7
```

### White CTA trên nền xanh

```text
white background
green-700 text
bottom shadow: 0 6px 0 #DCEACB
```

### Button rules

- Dùng icon Phosphor trước hoặc sau label.
- Touch target tối thiểu `48px`.
- Một vùng chỉ nên có một CTA primary nổi bật.
- Không dùng gradient đậm hoặc nút vuông.
- Trạng thái disabled dùng slate pastel, không giảm opacity đến mức khó đọc.

---

## 9. Iconography

Thư viện chuẩn:

```text
@phosphor-icons/react
```

Style:

- `duotone` cho card và tính năng.
- `fill` cho trạng thái rõ ràng hoặc CTA.
- `bold` cho navigation và action nhỏ.
- Kích thước thông dụng: `18`, `22`, `24`, `27`, `28px`.
- Icon thường nằm trong badge pastel bo `12–16px`.

Không dùng emoji làm icon UI.

Không trộn icon từ nhiều họ có độ dày nét khác nhau.

---

## 10. Imagery And Mascot

### Phong cách hình ảnh

- Minh họa sáng, màu pastel, dễ hiểu.
- Nhân vật thân thiện, nét mặt tích cực và rõ cảm xúc.
- Hạn chế chi tiết nền gây nhiễu.
- Hình ảnh nên phục vụ việc hiểu hành động hoặc tình huống.

### Mascot

Mascot mèo là một phần nhận diện quan trọng:

- Dùng ở hero, coach, trạng thái khuyến khích và CTA lớn.
- Có thể tràn nhẹ ra ngoài card.
- Có thể đặt trên vùng glow pastel mềm.
- Không đặt mascot ở mọi card.
- Không dùng mascot như vật trang trí nếu không hỗ trợ thông điệp.

### Media frame

Khung hình lớn có thể dùng:

```text
gradient pastel: sky-50 -> lime-50 -> yellow-50
white border: 4–8px
radius: 32–48px
large soft green shadow
```

---

## 11. Background Treatments

### Cream grid

Hero dùng nền kem với grid vàng rất nhạt:

```css
background-image:
  linear-gradient(rgba(255, 253, 247, 0.83), rgba(255, 253, 247, 0.95)),
  linear-gradient(rgba(244, 210, 79, 0.16) 1px, transparent 1px),
  linear-gradient(90deg, rgba(244, 210, 79, 0.16) 1px, transparent 1px);
background-size: auto, 44px 44px, 44px 44px;
```

Có thể tái sử dụng cho:

- Header màn học.
- Empty state.
- Trang chọn bài.
- Vùng giới thiệu nhiệm vụ.

Không dùng grid phía sau đoạn văn dài hoặc màn hình đã có nhiều card.

### Decorative blobs

- Hình tròn lớn màu vàng/xanh pastel.
- Opacity thấp.
- Blur mạnh.
- Đặt lệch khỏi khung nhìn.
- Chỉ dùng 1–2 blob trong một vùng.

---

## 12. Motion

Motion phải mềm và có mục đích:

| Tương tác | Motion |
|---|---|
| Page/card entrance | Fade + translateY khoảng `18px`, `700ms` |
| Mascot/media | Float dọc `8–12px`, chu kỳ `5–8s` |
| Card hover | TranslateY `-4px` đến `-8px`, `300ms` |
| Icon hover | Scale `1.08–1.1`, rotate `3deg` |
| Button press | TranslateY `5px`, mất shadow đáy |
| Active learning item | Pulse/glow pastel nhẹ |

Quy tắc:

- Không dùng bounce liên tục cho nhiều phần tử cùng lúc.
- Không dùng animation nhanh, chớp hoặc neon.
- Tôn trọng `prefers-reduced-motion`.
- Motion không được là cách duy nhất để truyền đạt trạng thái.

---

## 13. Header And Navigation

Header landing:

- Fixed top.
- Nền `#FFFDF7` với opacity khoảng `95%`.
- Backdrop blur nhẹ.
- Border dưới `yellow-100`.
- Cao `68px` mobile và `76px` từ tablet.
- Logo bên trái.
- Navigation chữ đậm, màu slate.
- CTA vàng bên phải.

Navigation active trong app nên dùng:

- Nền `yellow-100` hoặc `lime-50`.
- Icon/text `green-700` hoặc `slate-900`.
- Hình pill hoặc card bo tròn.
- Không dùng sidebar nền tối.

---

## 14. Responsive Behavior

### Laptop

- Dùng chiều rộng hiệu quả, không kéo nội dung thành một cột hẹp.
- Có thể dùng 2–3 vùng: nội dung chính, hành động và thông tin bổ trợ.
- Giới hạn chiều rộng đoạn văn khoảng `600–760px`.
- Card không nên rộng quá mức nếu chỉ có một dòng thông tin.
- Hover và keyboard focus phải rõ.

### Tablet landscape

- Ưu tiên hai cột hoặc nội dung chính + panel phụ.
- CTA và lựa chọn cần đủ lớn cho thao tác chạm.
- Tránh sidebar cố định quá rộng.
- Có thể dùng bottom navigation hoặc compact top navigation.

### Tablet portrait

- Chuyển về một cột hoặc card stack.
- CTA quan trọng luôn trong tầm nhìn.
- Nội dung bổ trợ có thể chuyển thành bottom sheet hoặc accordion.

### Mobile

- CTA full width khi phù hợp.
- Một cột.
- Giảm bán kính và padding nhẹ nhưng vẫn giữ cảm giác bo tròn.
- Ẩn floating decoration không thiết yếu.

---

## 15. Accessibility

- Text chính trên nền sáng phải có độ tương phản tốt.
- Không dùng pastel nhạt cho body text.
- Touch target tối thiểu `48x48px`.
- Có focus ring rõ cho bàn phím.
- Không truyền đạt đúng/sai chỉ bằng màu sắc; luôn có icon và label.
- Hỗ trợ reduced motion.
- Nội dung trẻ em nên dùng câu ngắn và hành động rõ ràng.
- Audio phải có điều khiển phát lại và nội dung text tương ứng.

---

## 16. Do And Do Not

### Do

- Dùng nền kem, trắng và pastel.
- Dùng xanh lá cho tiến bộ/an toàn.
- Dùng vàng cho CTA và điểm nhấn.
- Dùng card bo lớn, border nhẹ và shadow mềm.
- Dùng Nunito với heading rất đậm.
- Dùng icon Phosphor trong badge pastel.
- Dùng mascot có chủ đích.
- Tạo cảm giác tương tác bằng tactile press.
- Giữ bố cục rõ, ít lựa chọn mỗi bước.

### Do not

- Không dùng dark mode làm phong cách mặc định.
- Không dùng navy/black dashboard làm vùng nội dung chính.
- Không dùng neon, glassmorphism nặng hoặc gradient bão hòa.
- Không dùng góc vuông sắc và shadow đen nặng.
- Không dùng font mảnh hoặc font công nghệ.
- Không dùng emoji thay icon.
- Không nhồi quá nhiều badge, điểm số và hiệu ứng game.
- Không dùng đỏ mạnh để “phạt” trẻ khi trả lời sai.
- Không làm tất cả phần tử chuyển động cùng lúc.

---

## 17. AI Design Prompt

Có thể đưa nguyên prompt sau cho AI thiết kế:

```text
Design a responsive SmartSteps learning experience for laptop and tablet.

Match the existing SmartSteps landing-page visual language:
- warm cream #FFFDF7, white, lime-50, yellow-50 and sky-50 surfaces
- green-600/700 as the main brand and progress color
- yellow-400 as the primary CTA color
- slate-900 headings, slate-600 body text and slate-500 secondary labels
- Nunito typography with very bold, rounded headings
- large 24-32px rounded cards, subtle pastel borders and soft diffuse shadows
- pill-shaped tactile buttons with a visible 6px bottom shadow and pressed state
- Phosphor-style duotone icons inside pastel rounded badges
- friendly child-safety illustrations and the SmartSteps cat mascot used selectively
- generous spacing, clear hierarchy and a bright optimistic educational mood
- gentle floating, fade and hover-lift motion only

The product is for children aged 4-9 and their parents. It must feel playful,
safe and encouraging, but not like an arcade game. Avoid dark dashboards,
neon colors, heavy glassmorphism, sharp corners, thin typography, emoji icons,
harsh red error states and excessive gamification.

For laptop, use the available width with a clear multi-region layout.
For tablet landscape, use two columns where useful.
For tablet portrait, stack supporting content below the primary task.
All controls must be touch friendly and keyboard accessible.
```

---

## 18. Prompt Cho Màn Hình Học

```text
Create a SmartSteps lesson screen for children aged 4-9, optimized for laptop
and tablet. Preserve the SmartSteps landing style: warm cream background,
white rounded cards, green progress accents, yellow tactile primary buttons,
Nunito extra-bold typography, pastel Phosphor icon badges, friendly safety
illustrations and selective use of the SmartSteps cat mascot.

The screen should include:
- lesson title and clear step progress
- video or illustrated scenario area
- replay audio and exit controls
- one short question
- two large visual answer choices
- gentle correct/try-again feedback
- reward/encouragement state
- a parent summary at the end

Laptop layout: scenario on the left and question/actions on the right.
Tablet landscape: balanced two-column layout.
Tablet portrait: stacked layout with the primary action visible without
unnecessary scrolling.

Use large 48px+ touch targets, soft shadows, 24-32px radii and clear focus
states. Wrong answers should use a gentle orange pastel treatment, not harsh
red. Keep each step focused and avoid displaying unrelated dashboard data
during the lesson.
```

---

## 19. Source References

Style này được tổng hợp từ:

- `src/index.css`
- `src/app/App.css`
- `src/components/common/Header.jsx`
- `src/components/ui/Brand.jsx`
- `src/components/ui/ButtonLink.jsx`
- `src/components/ui/SectionHeading.jsx`
- `src/features/landing/components/HeroSection.jsx`
- `src/features/landing/components/WhySection.jsx`
- `src/features/landing/components/WorldsSection.jsx`
- `src/features/landing/components/StepsSection.jsx`
- `src/features/landing/components/ParentsSection.jsx`
- `src/features/landing/components/CoachSection.jsx`
- `src/features/landing/components/FinalCta.jsx`
- `src/features/landing/data/landingContent.js`

