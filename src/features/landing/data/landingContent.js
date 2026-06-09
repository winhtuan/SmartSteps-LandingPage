import {
  Barbell,
  BookOpen,
  Brain,
  ChartLineUp,
  ClockCounterClockwise,
  GameController,
  Heart,
  Lock,
  MapTrifold,
  Medal,
  ShieldCheck,
  Sparkle,
  Target,
  TrendUp,
  Users,
} from "@phosphor-icons/react";
import freePlanIcon from "../../../assets/icons/pricing/plan-free.svg";
import proPlanIcon from "../../../assets/icons/pricing/plan-pro.svg";
import maxPlanIcon from "../../../assets/icons/pricing/plan-max.svg";
export const featureMeta = [
  [
    MapTrifold,
    "bg-yellow-100 text-yellow-700",
    "lg:col-span-6",
    "Everyday learning",
    "Học mỗi ngày",
    "from-yellow-50 to-white",
    true,
  ],
  [
    Brain,
    "bg-green-100 text-green-700",
    "lg:col-span-6",
    "5-minute practice",
    "Luyện tập 5 phút",
    "from-green-50 to-white",
    false,
  ],
  [
    Medal,
    "bg-orange-100 text-orange-700",
    "lg:col-span-3",
    "Positive habits",
    "Thói quen tích cực",
    "from-orange-50 to-white",
    false,
  ],
  [
    ChartLineUp,
    "bg-violet-100 text-violet-700",
    "lg:col-span-3",
    "Easy tracking",
    "Dễ theo dõi",
    "from-violet-50 to-white",
    false,
  ],
  [
    ShieldCheck,
    "bg-rose-100 text-rose-700",
    "lg:col-span-3",
    "Child-friendly",
    "Thân thiện với trẻ",
    "from-rose-50 to-white",
    false,
  ],
  [
    Target,
    "bg-emerald-100 text-emerald-700",
    "lg:col-span-3",
    "Real-world confidence",
    "Tự tin thực tế",
    "from-emerald-50 to-white",
    false,
  ],
];
export const worldMeta = [
  [ShieldCheck, "bg-green-100 text-green-700"],
  [Users, "bg-sky-100 text-sky-700"],
  [BookOpen, "bg-yellow-100 text-yellow-700"],
  [Lock, "bg-orange-100 text-orange-700"],
];
export const stepIcons = [MapTrifold, BookOpen, GameController, Sparkle, Medal];
export const stepTones = [
  {
    card: "border-green-100 bg-green-50/55",
    icon: "bg-green-100 text-green-700 group-hover:bg-green-200",
  },
  {
    card: "border-yellow-100 bg-yellow-50/65",
    icon: "bg-yellow-100 text-yellow-700 group-hover:bg-yellow-200",
  },
  {
    card: "border-sky-100 bg-sky-50/65",
    icon: "bg-sky-100 text-sky-700 group-hover:bg-sky-200",
  },
  {
    card: "border-orange-100 bg-orange-50/60",
    icon: "bg-orange-100 text-orange-700 group-hover:bg-orange-200",
  },
  {
    card: "border-lime-100 bg-lime-50/65",
    icon: "bg-lime-100 text-lime-700 group-hover:bg-lime-200",
  },
];
export const parentIcons = [ClockCounterClockwise, TrendUp, Barbell, Heart];
export const testimonials = [
  [
    "Sarah M.",
    "Parent of a 7-year-old",
    "Phụ huynh của bé 7 tuổi",
    "London",
    "SmartSteps helped my daughter understand road safety in a fun and simple way. She now talks about what to do before crossing the street.",
    "SmartSteps giúp con gái tôi hiểu an toàn giao thông theo cách vui và đơn giản. Giờ bé luôn nhắc lại những điều cần làm trước khi qua đường.",
  ],
  [
    "James K.",
    "Parent of a 6-year-old",
    "Phụ huynh của bé 6 tuổi",
    "Toronto",
    "The lessons are short, playful, and easy for my son to follow. I like that I can see his progress after each activity.",
    "Bài học ngắn, vui và con trai tôi dễ theo dõi. Tôi thích việc có thể xem tiến bộ của bé sau mỗi hoạt động.",
  ],
  [
    "Amira N.",
    "Teacher and parent",
    "Giáo viên và phụ huynh",
    "Dubai",
    "I recommend SmartSteps to families because the scenarios are practical, age-appropriate, and engaging for young children.",
    "Tôi giới thiệu SmartSteps cho các gia đình vì tình huống thực tế, phù hợp lứa tuổi và cuốn hút trẻ nhỏ.",
  ],
  [
    "Linh T.",
    "Parent of a 5-year-old",
    "Phụ huynh của bé 5 tuổi",
    "Ho Chi Minh City",
    "My child enjoys the island map and reward system. It feels like a game, but the lessons are actually useful in real life.",
    "Con tôi thích bản đồ hòn đảo và hệ thống phần thưởng. Cảm giác như đang chơi nhưng bài học thật sự hữu ích trong cuộc sống.",
  ],
  [
    "David R.",
    "Parent of an 8-year-old",
    "Phụ huynh của bé 8 tuổi",
    "Sydney",
    "The AI coach gives gentle feedback without making children feel pressured. That makes learning feel positive and safe.",
    "Trợ lý AI phản hồi nhẹ nhàng mà không khiến trẻ áp lực. Nhờ vậy việc học luôn tích cực và an toàn.",
  ],
  [
    "Mai P.",
    "Primary school teacher",
    "Giáo viên tiểu học",
    "Hanoi",
    "SmartSteps turns everyday life skills into small lessons that children can understand and practice.",
    "SmartSteps biến kỹ năng sống hằng ngày thành những bài học nhỏ trẻ có thể hiểu và luyện tập.",
  ],
  [
    "Emily W.",
    "Parent of a 4-year-old",
    "Phụ huynh của bé 4 tuổi",
    "Singapore",
    "The design is bright, friendly, and easy to use. My child can navigate the learning path with very little help.",
    "Thiết kế tươi sáng, thân thiện và dễ dùng. Con tôi có thể tự theo hành trình học mà chỉ cần rất ít trợ giúp.",
  ],
  [
    "Omar A.",
    "Parent of a 9-year-old",
    "Phụ huynh của bé 9 tuổi",
    "Doha",
    "I like that SmartSteps teaches more than school subjects. It helps children build confidence, communication, and problem-solving skills.",
    "Tôi thích SmartSteps dạy nhiều hơn kiến thức ở trường. Trẻ được rèn sự tự tin, giao tiếp và giải quyết vấn đề.",
  ],
  [
    "Grace L.",
    "Parent of two children",
    "Phụ huynh của hai bé",
    "Melbourne",
    "The parent dashboard is clear and helpful. I can quickly understand what my children learned and what they should practice next.",
    "Bảng phụ huynh rõ ràng và hữu ích. Tôi nhanh chóng biết các con đã học gì và nên luyện tập gì tiếp theo.",
  ],
  [
    "Daniel C.",
    "Parent of a 7-year-old",
    "Phụ huynh của bé 7 tuổi",
    "New York",
    "The mini-games keep my child engaged, and the lessons feel meaningful instead of repetitive.",
    "Các trò chơi ngắn giữ con tôi hứng thú và bài học có ý nghĩa thay vì lặp lại nhàm chán.",
  ],
];
export const tones = [
  "bg-yellow-100 text-yellow-700",
  "bg-green-100 text-green-700",
  "bg-sky-100 text-sky-700",
  "bg-orange-100 text-orange-700",
];
export const navHrefs = [
  "#why-smartsteps",
  "#curriculum",
  "#how-it-works",
  "#parents",
  "#pricing",
];
export const planIcons = [maxPlanIcon, proPlanIcon, freePlanIcon];

