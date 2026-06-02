import { useEffect, useState } from "react";
import {
  ArrowRight,
  Barbell,
  BookOpen,
  Brain,
  ChartLineUp,
  Check,
  CheckCircle,
  ClockCounterClockwise,
  EnvelopeSimple,
  GameController,
  Heart,
  Lightning,
  List,
  Lock,
  LockKey,
  MapTrifold,
  Medal,
  Play,
  ShieldCheck,
  Sparkle,
  Star,
  Target,
  TrendUp,
  Users,
  X,
} from "@phosphor-icons/react";
import "./App.css";
import heroImage from "./assets/hero-img.png";
import brandLogo from "./assets/logo/logo-smartstep.png";
import mascotConfident from "./assets/mascot/mascot-cat-confident.png";
import mascotHappyWave from "./assets/mascot/mascot-cat-happy-wave.png";
import mascotSinging from "./assets/mascot/mascot-cat-singing.png";
import mascotSpeaking from "./assets/mascot/mascot-cat-speaking.png";
import freePlanIcon from "./assets/pricing/plan-free.svg";
import proPlanIcon from "./assets/pricing/plan-pro.svg";
import maxPlanIcon from "./assets/pricing/plan-max.svg";

const translations = {
  en: {
    nav: [
      "About",
      "Learning Worlds",
      "Learning Steps",
      "Parent Dashboard",
      "Plans & Pricing",
    ],
    login: "Sign In",
    getStarted: "Get Started",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    hero: {
      lead: "Build life skills for kids through",
      accent: "playful steps",
      copy: "SmartSteps helps children practice safety, communication, and problem-solving through short, interactive lessons.",
      primary: "Start Learning Free",
      secondary: "See How It Works",
      alt: "SmartSteps life skills app lesson teaching children how to cross the road safely",
      skill: "Skill unlocked",
      road: "Road safety basics",
      streak: "7 day streak",
      momentum: "Keep the momentum",
      complete: "Lesson complete",
      stranger: "Stranger awareness",
      reward: "Reward earned",
      rewardCopy: "First safety badge",
    },
    stats: [
      ["10k+", "active learners"],
      ["250k+", "lessons completed"],
      ["96%", "parent satisfaction"],
      ["100%", "ad-free learning"],
    ],
    why: {
      kicker: "Why parents choose SmartSteps",
      title: "Essential life skills in short daily lessons.",
      copy: "SmartSteps turns everyday situations into practical lessons children can understand and use beyond the screen.",
      highlight: "Designed for young learners and the parents guiding them.",
      pills: ["5-minute lessons", "Age-appropriate content", "Clear progress tracking"],
    },
    features: [
      [
        "Practical life skills",
        "Children practice real situations like road safety, asking for help, sharing, and handling small problems.",
      ],
      [
        "Short lessons",
        "Each activity is quick, focused, and easy for young children to complete without feeling overwhelmed.",
      ],
      [
        "Motivating rewards",
        "Badges, streaks, and progress milestones keep children excited to continue learning every day.",
      ],
      [
        "Parent dashboard",
        "Parents can see what their child learned, where they improved, and which skills need more practice.",
      ],
      [
        "Safe for children",
        "A calm learning space designed for kids, with age-appropriate content and no unsafe distractions.",
      ],
      [
        "Confidence beyond the screen",
        "SmartSteps helps children use what they learn in real life, not just inside the app.",
      ],
    ],
    worldsHeading: {
      kicker: "Life skills curriculum",
      title: "Every island builds an essential skill.",
      copy: "Children explore safety, communication, teamwork, and problem-solving through interactive learning worlds.",
    },
    worlds: [
      [
        "Safety Island",
        "Road awareness, trusted adults, and safe choices.",
        "12 lessons",
        "Ready to explore",
      ],
      [
        "Friendship Island",
        "Sharing, empathy, and clear communication.",
        "10 lessons",
        "New adventures",
      ],
      [
        "School Island",
        "Listening, organizing, and teamwork.",
        "9 lessons",
        "Practice daily",
      ],
      [
        "Adventure Island",
        "Problem-solving and critical thinking.",
        "Coming soon",
        "Unlock next",
      ],
    ],
    how: {
      kicker: "How SmartSteps works",
      title: "Five simple steps to practice life skills.",
      copy: "Every lesson guides children from exploration to practice, feedback, and visible progress.",
    },
    steps: [
      ["Explore", "Pick a colorful learning world."],
      ["Learn", "Follow a short, story-led lesson."],
      ["Practice", "Try the skill in a playful challenge."],
      ["Get feedback", "Receive a helpful next step."],
      ["Earn rewards", "Celebrate growth and keep going."],
    ],
    coach: {
      kicker: "AI learning coach",
      title: "Personalized feedback that helps children grow.",
      copy: "After each challenge, the SmartSteps coach highlights what went well and suggests a practical next step.",
      alt: "SmartSteps mascot giving friendly guidance",
      items: [
        "Personalized to each response",
        "Encouraging language for young learners",
        "Clear next steps for continued practice",
      ],
    },
    parents: {
      kicker: "Progress tracking for parents",
      title: "Know what your child learned and what to practice next.",
      copy: "Weekly reports help parents track life skills, celebrate progress, and support children at the right time.",
      items: [
        "Weekly summaries",
        "Skill tracking",
        "Strengths and growth areas",
        "Family-friendly guidance",
      ],
      weekly: "Weekly progress",
      path: "Mia's learning path",
      skills: [
        ["Road safety", "4 of 4 complete"],
        ["Speaking clearly", "3 of 4 complete"],
        ["Teamwork", "2 of 4 complete"],
      ],
      note: "Coach note",
      noteCopy:
        "Mia is building a strong habit of pausing before making a safety choice.",
    },
    testimonials: {
      kicker: "Parent stories",
      title: "Helping families build confidence one skill at a time.",
      copy: "SmartSteps helps families practice useful life skills through familiar situations and lessons children can apply.",
      stars: "5 out of 5 stars",
    },
    pricing: {
      kicker: "SmartSteps plans",
      title: "Choose the right life skills learning plan.",
      copy: "Start free or unlock more interactive lessons, personalized feedback, and progress reports.",
      monthly: "Monthly",
      yearly: "Yearly",
      save: "-54%",
      plans: [
        {
          name: "FREE",
          copy: "Explore the essential lessons before choosing a learning plan.",
          price: "0 VND",
          billing: "No payment required",
          cta: "Start Learning Free",
          items: [
            "Basic lessons for real-life situations",
            "Core safety awareness principles",
            "Interactive visual learning",
            "Overview progress tracking",
          ],
        },
        {
          name: "PRO",
          copy: "Unlock the full learning experience with advanced features.",
          paid: true,
          pricing: {
            monthly: ["199,000 VND", "/ month"],
            yearly: ["1,299,000 VND", "/ year"],
          },
          items: [
            "All features from the free version",
            "Advanced lessons based on real-life situations",
            "Personalized learning path",
            "Practice activities with feedback",
          ],
        },
        {
          name: "MAX",
          copy: "Lifetime access to the complete SmartSteps learning experience.",
          price: "2,999,999 VND",
          billing: "/ lifetime",
          paid: true,
          items: [
            "All Premium features",
            "Exclusive real-life simulations",
            "Detailed progress reports for parents",
            "Three months of premium gifts",
          ],
        },
      ],
      signup: "Sign Up",
    },
    cta: {
      title: "Start building your child's life skills today.",
      copy: "Explore the first interactive lesson and help your child feel more confident in everyday situations.",
      primary: "Start Learning Free",
      secondary: "Explore Lessons",
    },
    footer: {
      copy: "A life skills learning app for kids with interactive lessons about safety, communication, and problem-solving.",
      groups: [
        ["Product", "How it Works", "Curriculum Map", "For Parents", "Pricing"],
        [
          "Resources",
          "Parent Guides",
          "Teacher Portal",
          "Help Center",
          "Contact",
        ],
        [
          "Legal",
          "Privacy Policy",
          "Terms of Service",
          "COPPA Compliance",
          "Safety",
        ],
      ],
      copyright: "Copyright 2026 SmartSteps. All rights reserved.",
      safety: "Child-friendly, ad-free learning",
    },
  },
  vi: {
    nav: ["Giới thiệu", "Khám phá", "Cách học", "Phụ huynh", "Học phí"],
    login: "Đăng nhập",
    getStarted: "Bắt đầu",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    hero: {
      lead: "Rèn kỹ năng sống cho trẻ qua",
      accent: "từng bước vui học",
      copy: "SmartSteps giúp trẻ luyện tập an toàn, giao tiếp và giải quyết vấn đề qua các bài học tương tác ngắn gọn.",
      primary: "Học miễn phí",
      secondary: "Xem cách hoạt động",
      alt: "Ứng dụng SmartSteps minh họa bài học kỹ năng an toàn qua đường cho trẻ",
      skill: "Đã mở kỹ năng",
      road: "An toàn qua đường",
      streak: "Chuỗi 7 ngày",
      momentum: "Tiếp tục cố gắng",
      complete: "Đã hoàn thành bài",
      stranger: "Nhận biết người lạ",
      feedback: "Phản hồi từ AI",
      feedbackCopy: "Bé đã biết nhờ trợ giúp",
      insight: "Góc nhìn phụ huynh",
      insightCopy: "Mức độ tự tin đã tăng",
      reward: "Đã nhận phần thưởng",
      rewardCopy: "Huy hiệu an toàn đầu tiên",
    },
    stats: [
      ["10k+", "Bạn nhỏ đang học"],
      ["250k+", "Bài học đã hoàn thành"],
      ["96%", "Phụ huynh hài lòng"],
      ["100%", "Không quảng cáo"],
    ],
    why: {
      kicker: "Vì sao phụ huynh chọn SmartSteps",
      title: "Kỹ năng sống thiết yếu, bài học ngắn mỗi ngày.",
      copy: "SmartSteps biến các tình huống đời thường thành bài học kỹ năng sống dễ hiểu để trẻ tự tin áp dụng ngoài đời.",
      highlight:
        "Thiết kế vừa sức cho trẻ nhỏ, dễ theo dõi cho phụ huynh.",
      pills: [
        "Bài học 5 phút",
        "Nội dung phù hợp lứa tuổi",
        "Theo dõi tiến độ rõ ràng",
      ],
    },
    features: [
      [
        "Kỹ năng sống thực tế",
        "Trẻ luyện tập các tình huống như an toàn qua đường, nhờ trợ giúp, chia sẻ và xử lý vấn đề nhỏ.",
      ],
      [
        "Bài học ngắn",
        "Mỗi hoạt động nhanh, tập trung và vừa sức để trẻ nhỏ hoàn thành mà không thấy quá tải.",
      ],
      [
        "Phần thưởng khích lệ",
        "Huy hiệu, chuỗi ngày học và cột mốc tiến bộ giúp trẻ hào hứng học mỗi ngày.",
      ],
      [
        "Bảng theo dõi phụ huynh",
        "Phụ huynh biết trẻ đã học gì, tiến bộ ở đâu và kỹ năng nào cần luyện thêm.",
      ],
      [
        "An toàn cho trẻ",
        "Không gian học yên tâm, nội dung phù hợp lứa tuổi và không có yếu tố gây xao nhãng không an toàn.",
      ],
      [
        "Tự tin ngoài màn hình",
        "SmartSteps giúp trẻ áp dụng điều đã học vào cuộc sống, không chỉ trong ứng dụng.",
      ],
    ],
    worldsHeading: {
      kicker: "Nội dung học kỹ năng sống",
      title: "Mỗi hòn đảo, một nhóm kỹ năng thiết yếu.",
      copy: "Trẻ khám phá bài học về an toàn, giao tiếp, làm việc nhóm và giải quyết vấn đề trong từng thế giới tương tác.",
    },
    worlds: [
      [
        "Đảo An Toàn",
        "Nhận biết đường phố, người đáng tin cậy và lựa chọn an toàn.",
        "12 bài học",
        "Sẵn sàng khám phá",
      ],
      [
        "Đảo Tình Bạn",
        "Chia sẻ, đồng cảm và giao tiếp rõ ràng.",
        "10 bài học",
        "Phiêu lưu mới",
      ],
      [
        "Đảo Trường Học",
        "Lắng nghe, sắp xếp và làm việc nhóm.",
        "9 bài học",
        "Luyện tập mỗi ngày",
      ],
      [
        "Đảo Khám Phá",
        "Giải quyết vấn đề và tư duy phản biện.",
        "Sắp ra mắt",
        "Mở khóa tiếp theo",
      ],
    ],
    how: {
      kicker: "Cách SmartSteps hoạt động",
      title: "Năm bước học kỹ năng sống dễ làm quen.",
      copy: "Mỗi bài học dẫn trẻ từ khám phá đến luyện tập, nhận phản hồi và ghi nhận tiến bộ.",
    },
    steps: [
      ["Khám phá", "Chọn một thế giới học tập đầy màu sắc."],
      ["Học", "Theo dõi bài học ngắn qua câu chuyện."],
      ["Luyện tập", "Thử kỹ năng qua thử thách vui nhộn."],
      ["Nhận phản hồi", "Nhận gợi ý hữu ích cho bước tiếp theo."],
      ["Nhận thưởng", "Mừng tiến bộ và tiếp tục cố gắng."],
    ],
    coach: {
      kicker: "Trợ lý học tập AI",
      title: "Phản hồi cá nhân hóa giúp trẻ tiến bộ.",
      copy: "Sau mỗi thử thách, trợ lý SmartSteps ghi nhận điểm tốt và gợi ý bước luyện tập phù hợp cho trẻ.",
      alt: "Linh vật SmartSteps đưa ra hướng dẫn thân thiện",
      items: [
        "Cá nhân hóa theo từng câu trả lời",
        "Lời động viên phù hợp với trẻ nhỏ",
        "Gợi ý rõ ràng cho lần luyện tập tiếp theo",
      ],
    },
    parents: {
      kicker: "Theo dõi tiến độ cho phụ huynh",
      title: "Hiểu con đang học gì và cần luyện thêm gì.",
      copy: "Báo cáo tuần giúp phụ huynh theo dõi kỹ năng sống của trẻ, ghi nhận tiến bộ và hỗ trợ đúng lúc.",
      items: [
        "Tổng kết mỗi tuần",
        "Theo dõi kỹ năng",
        "Điểm mạnh và phần cần cải thiện",
        "Gợi ý thân thiện cho gia đình",
      ],
      weekly: "Tiến bộ trong tuần",
      path: "Hành trình học của Mia",
      skills: [
        ["An toàn qua đường", "Hoàn thành 4/4"],
        ["Giao tiếp rõ ràng", "Hoàn thành 3/4"],
        ["Làm việc nhóm", "Hoàn thành 2/4"],
      ],
      note: "Gợi ý từ trợ lý",
      noteCopy:
        "Mia đang tạo thói quen dừng lại suy nghĩ trước khi đưa ra lựa chọn an toàn.",
    },
    testimonials: {
      kicker: "Chia sẻ từ phụ huynh",
      title: "Đồng hành cùng trẻ tự tin hơn mỗi ngày.",
      copy: "SmartSteps hỗ trợ gia đình luyện kỹ năng sống cho trẻ qua những tình huống gần gũi và bài học dễ áp dụng.",
      stars: "5 trên 5 sao",
    },
    pricing: {
      kicker: "Gói học SmartSteps",
      title: "Chọn gói học kỹ năng sống phù hợp cho bé.",
      copy: "Bắt đầu miễn phí hoặc mở khóa thêm bài học tương tác, phản hồi cá nhân hóa và báo cáo tiến độ.",
      monthly: "Hàng tháng",
      yearly: "Hàng năm",
      save: "-54%",
      plans: [
        {
          name: "FREE",
          copy: "Khám phá các bài học thiết yếu trước khi chọn gói học phù hợp cho bé.",
          price: "0 VND",
          billing: "Không cần thanh toán",
          cta: "Bắt đầu học miễn phí",
          items: [
            "Các bài học cơ bản về tình huống thực tế",
            "Nguyên tắc cơ bản về nhận thức an toàn",
            "Học tập tương tác dựa trên hình ảnh",
            "Tổng quan theo dõi tiến độ",
          ],
        },
        {
          name: "PRO",
          copy: "Mở khóa đầy đủ các tính năng học tập và bài học tình huống nâng cao.",
          paid: true,
          pricing: {
            monthly: ["199,000 VND", "/ tháng"],
            yearly: ["1,299,000 VND", "/ năm"],
          },
          items: [
            "Tất cả các tính năng của phiên bản miễn phí",
            "Bài học nâng cao dựa trên các tình huống thực tế",
            "Lộ trình học tập cá nhân hóa",
            "Bài tập thực hành kèm phản hồi",
          ],
        },
        {
          name: "MAX",
          copy: "Truy cập trọn đời toàn bộ trải nghiệm học tập SmartSteps.",
          price: "2,999,999 VND",
          billing: "/ trọn đời",
          paid: true,
          items: [
            "Tất cả các tính năng của phiên bản Premium",
            "Các kịch bản mô phỏng thực tế độc quyền",
            "Báo cáo và thông tin chi tiết dành cho phụ huynh về tiến độ học tập của con em họ",
            "Gói học tập cao cấp 3 tháng kèm quà tặng",
          ],
        },
      ],
      signup: "Đăng ký",
    },
    cta: {
      title: "Bắt đầu rèn kỹ năng sống cho bé hôm nay.",
      copy: "Khám phá bài học tương tác đầu tiên và giúp bé tự tin hơn trong những tình huống hằng ngày.",
      primary: "Học miễn phí",
      secondary: "Xem nội dung học",
    },
    footer: {
      copy: "Ứng dụng học kỹ năng sống cho trẻ qua bài học tương tác về an toàn, giao tiếp và giải quyết vấn đề.",
      groups: [
        [
          "Sản phẩm",
          "Cách hoạt động",
          "Bản đồ nội dung học",
          "Dành cho phụ huynh",
          "Học phí",
        ],
        [
          "Tài liệu",
          "Cẩm nang phụ huynh",
          "Cổng giáo viên",
          "Trung tâm hỗ trợ",
          "Liên hệ",
        ],
        [
          "Pháp lý",
          "Chính sách bảo mật",
          "Điều khoản dịch vụ",
          "Tuân thủ COPPA",
          "An toàn",
        ],
      ],
      copyright: "Bản quyền 2026 SmartSteps. Đã đăng ký mọi quyền.",
      safety: "An toàn cho trẻ, không quảng cáo",
    },
  },
};

const seoTranslations = {
  en: {
    title: "SmartSteps | Life Skills App for Kids",
    description:
      "SmartSteps helps children practice safety, communication, and problem-solving through short interactive lessons with progress tracking for parents.",
    locale: "en_US",
  },
  vi: {
    title: "SmartSteps | Ứng dụng học kỹ năng sống cho trẻ",
    description:
      "SmartSteps là ứng dụng học kỹ năng sống cho trẻ, giúp bé luyện tập an toàn, giao tiếp và giải quyết vấn đề qua bài học tương tác ngắn gọn.",
    locale: "vi_VN",
  },
};

const authTranslations = {
  en: {
    title: "Welcome back",
    copy: "Log in to continue your child's learning journey.",
    email: "Email address",
    emailPlaceholder: "parent@example.com",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    forgot: "Forgot password?",
    submit: "Sign In",
    or: "Or continue with",
    google: "Continue with Google",
    facebook: "Continue with Facebook",
    noAccount: "New to SmartSteps?",
    signup: "Sign Up",
    signupTitle: "Create your account",
    signupCopy: "Start a safe, playful learning journey for your child.",
    parentName: "Parent name",
    parentNamePlaceholder: "Enter your name",
    confirmPassword: "Confirm password",
    confirmPasswordPlaceholder: "Enter your password again",
    signupSubmit: "Create Account",
    signupOr: "Or sign up with",
    haveAccount: "Already have an account?",
    signin: "Sign In",
    close: "Close login panel",
  },
  vi: {
    title: "Ch\u00e0o m\u1eebng b\u1ea1n tr\u1edf l\u1ea1i",
    copy: "\u0110\u0103ng nh\u1eadp \u0111\u1ec3 ti\u1ebfp t\u1ee5c h\u00e0nh tr\u00ecnh h\u1ecdc c\u1ee7a b\u00e9.",
    email: "\u0110\u1ecba ch\u1ec9 email",
    emailPlaceholder: "phuhuynh@example.com",
    password: "M\u1eadt kh\u1ea9u",
    passwordPlaceholder: "Nh\u1eadp m\u1eadt kh\u1ea9u",
    forgot: "Qu\u00ean m\u1eadt kh\u1ea9u?",
    submit: "\u0110\u0103ng nh\u1eadp",
    or: "Ho\u1eb7c ti\u1ebfp t\u1ee5c v\u1edbi",
    google: "Ti\u1ebfp t\u1ee5c v\u1edbi Google",
    facebook: "Ti\u1ebfp t\u1ee5c v\u1edbi Facebook",
    noAccount: "B\u1ea1n m\u1edbi d\u00f9ng SmartSteps?",
    signup: "\u0110\u0103ng k\u00fd",
    signupTitle: "T\u1ea1o t\u00e0i kho\u1ea3n",
    signupCopy:
      "B\u1eaft \u0111\u1ea7u h\u00e0nh tr\u00ecnh h\u1ecdc an to\u00e0n v\u00e0 vui nh\u1ed9n cho b\u00e9.",
    parentName: "T\u00ean ph\u1ee5 huynh",
    parentNamePlaceholder: "Nh\u1eadp t\u00ean c\u1ee7a b\u1ea1n",
    confirmPassword: "X\u00e1c nh\u1eadn m\u1eadt kh\u1ea9u",
    confirmPasswordPlaceholder: "Nh\u1eadp l\u1ea1i m\u1eadt kh\u1ea9u",
    signupSubmit: "T\u1ea1o t\u00e0i kho\u1ea3n",
    signupOr: "Ho\u1eb7c \u0111\u0103ng k\u00fd v\u1edbi",
    haveAccount: "\u0110\u00e3 c\u00f3 t\u00e0i kho\u1ea3n?",
    signin: "\u0110\u0103ng nh\u1eadp",
    close: "\u0110\u00f3ng b\u1ea3ng \u0111\u0103ng nh\u1eadp",
  },
};

const featureMeta = [
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
const worldMeta = [
  [ShieldCheck, "bg-green-100 text-green-700"],
  [Users, "bg-sky-100 text-sky-700"],
  [BookOpen, "bg-yellow-100 text-yellow-700"],
  [Lock, "bg-orange-100 text-orange-700"],
];
const stepIcons = [MapTrifold, BookOpen, GameController, Sparkle, Medal];
const stepTones = [
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
const parentIcons = [ClockCounterClockwise, TrendUp, Barbell, Heart];
const testimonials = [
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
const tones = [
  "bg-yellow-100 text-yellow-700",
  "bg-green-100 text-green-700",
  "bg-sky-100 text-sky-700",
  "bg-orange-100 text-orange-700",
];
const navHrefs = [
  "#why-smartsteps",
  "#curriculum",
  "#how-it-works",
  "#parents",
  "#pricing",
];
const planIcons = [maxPlanIcon, proPlanIcon, freePlanIcon];

function Brand({ compact = false }) {
  return (
    <a
      className="inline-flex items-center gap-2"
      href="#top"
      aria-label="SmartSteps home"
    >
      <span
        className={`${compact ? "h-9 w-9" : "h-11 w-11"} brand-logo rounded-2xl bg-lime-100`}
      >
        <img src={brandLogo} alt="" />
      </span>
      <span
        className={`${compact ? "text-xl" : "text-2xl"} font-black tracking-tight text-slate-900`}
      >
        Smart<span className="text-green-600">Steps</span>
      </span>
    </a>
  );
}

function ButtonLink({
  children,
  href = "#pricing",
  tone = "yellow",
  className = "",
}) {
  const styles = {
    yellow:
      "bg-yellow-400 text-slate-900 shadow-[0_6px_0_#c99d00] hover:bg-yellow-300",
    white: "bg-white text-green-700 shadow-[0_6px_0_#dceacb] hover:bg-lime-50",
    outline:
      "border-2 border-slate-200 bg-white text-slate-800 shadow-[0_6px_0_#dce2e7] hover:border-yellow-300",
  };
  return (
    <a
      href={href}
      className={`tactile-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold tracking-tight transition ${styles[tone]} ${className}`}
    >
      {children}
    </a>
  );
}

function SectionHeading({ kicker, title, copy, align = "center" }) {
  return (
    <div
      className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl`}
    >
      {kicker && (
        <p className="mb-3 text-sm font-extrabold text-green-700">{kicker}</p>
      )}
      <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {copy && (
        <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
          {copy}
        </p>
      )}
    </div>
  );
}

function Flag({ language }) {
  return (
    <span className={`flag flag-${language}`} aria-hidden="true">
      <span />
    </span>
  );
}

function LanguageSwitcher({ language, setLanguage }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-yellow-100 bg-white p-1">
      {["vi", "en"].map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          className={`rounded-full p-1.5 transition ${language === code ? "bg-yellow-100 ring-2 ring-yellow-300" : "opacity-60 hover:opacity-100"}`}
          aria-label={code === "vi" ? "Tiếng Việt" : "English"}
          aria-pressed={language === code}
        >
          <Flag language={code} />
        </button>
      ))}
    </div>
  );
}

function GoogleBrandIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M21.35 12.22c0-.68-.06-1.2-.19-1.75H12v3.34h5.38a4.66 4.66 0 0 1-2 3.02l-.02.11 2.9 2.25.2.02c1.85-1.71 2.9-4.22 2.9-7Z"
      />
      <path
        fill="#34A853"
        d="M12 21.75c2.65 0 4.87-.87 6.49-2.54l-3.1-2.38c-.84.57-1.93.97-3.39.97a5.89 5.89 0 0 1-5.57-4.07l-.1.01-3.02 2.34-.04.1A9.8 9.8 0 0 0 12 21.75Z"
      />
      <path
        fill="#FBBC05"
        d="M6.43 13.73A5.98 5.98 0 0 1 6.1 11.8c0-.67.12-1.32.32-1.93v-.13L3.35 7.37l-.1.04A9.85 9.85 0 0 0 2.2 11.8c0 1.58.38 3.07 1.06 4.38l3.17-2.45Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.8c1.84 0 3.08.8 3.79 1.45l2.76-2.7C16.86 2.97 14.65 2 12 2a9.8 9.8 0 0 0-8.74 5.41l3.17 2.46A5.9 5.9 0 0 1 12 5.8Z"
      />
    </svg>
  );
}

function FacebookBrandIcon() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-end justify-center overflow-hidden rounded-full bg-[#1877F2]">
      <svg
        aria-hidden="true"
        className="h-[18px] w-[18px] translate-y-[2px]"
        viewBox="0 0 24 24"
      >
        <path
          fill="#fff"
          d="M14.5 22v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H8.2V14H11v8h3.5Z"
        />
      </svg>
    </span>
  );
}

function LoginSidebar({ language, mode, open, onClose, onModeChange }) {
  const t = authTranslations[language] || authTranslations.en;
  const isSignup = mode === "signup";

  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
    >
      <button
        className="login-overlay absolute inset-0 bg-slate-950/30 backdrop-blur-[2px]"
        type="button"
        onClick={onClose}
        aria-label={t.close}
      />
      <aside className="login-sidebar absolute inset-y-0 right-0 flex w-full max-w-md flex-col overflow-y-auto bg-[#fffdf7] px-6 py-7 shadow-[-20px_0_55px_rgba(15,23,42,0.16)] sm:px-8">
        <div className="flex items-center justify-between">
          <Brand compact />
          <button
            className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-yellow-300 hover:text-slate-900"
            type="button"
            onClick={onClose}
            aria-label={t.close}
          >
            <X size={21} weight="bold" />
          </button>
        </div>
        <div className="mt-14">
          <h2
            id="login-title"
            className="text-3xl font-black tracking-tight text-slate-900"
          >
            {isSignup ? t.signupTitle : t.title}
          </h2>
          {isSignup && (
            <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
              {t.signupCopy}
            </p>
          )}
          <p className="mt-5 text-sm font-semibold text-slate-600">
            {isSignup ? t.haveAccount : t.noAccount}{" "}
            <button
              className="font-black text-green-700 transition hover:text-green-600"
              type="button"
              onClick={() => onModeChange(isSignup ? "signin" : "signup")}
            >
              {isSignup ? t.signin : t.signup}
            </button>
          </p>
        </div>
        <form
          className="mt-8 space-y-5"
          onSubmit={(event) => event.preventDefault()}
        >
          {isSignup && (
            <label className="block">
              <span className="text-sm font-extrabold text-slate-700">
                {t.parentName}
              </span>
              <span className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
                <Users
                  className="shrink-0 text-green-700"
                  size={20}
                  weight="bold"
                />
                <input
                  className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                  type="text"
                  name="parentName"
                  placeholder={t.parentNamePlaceholder}
                  autoComplete="name"
                  required
                />
              </span>
            </label>
          )}
          <label className="block">
            <span className="text-sm font-extrabold text-slate-700">
              {t.email}
            </span>
            <span className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
              <EnvelopeSimple
                className="shrink-0 text-green-700"
                size={20}
                weight="bold"
              />
              <input
                className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                type="email"
                name="email"
                placeholder={t.emailPlaceholder}
                autoComplete="email"
                required
              />
            </span>
          </label>
          <label className="block">
            <span className="text-sm font-extrabold text-slate-700">
              {t.password}
            </span>
            <span className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
              <LockKey
                className="shrink-0 text-green-700"
                size={20}
                weight="bold"
              />
              <input
                className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                type="password"
                name="password"
                placeholder={t.passwordPlaceholder}
                autoComplete={isSignup ? "new-password" : "current-password"}
                required
              />
            </span>
          </label>
          {isSignup && (
            <label className="block">
              <span className="text-sm font-extrabold text-slate-700">
                {t.confirmPassword}
              </span>
              <span className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
                <LockKey
                  className="shrink-0 text-green-700"
                  size={20}
                  weight="bold"
                />
                <input
                  className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                  type="password"
                  name="confirmPassword"
                  placeholder={t.confirmPasswordPlaceholder}
                  autoComplete="new-password"
                  required
                />
              </span>
            </label>
          )}
          {!isSignup && (
            <div className="text-right">
              <a
                className="text-sm font-extrabold text-green-700 transition hover:text-green-600"
                href="#top"
              >
                {t.forgot}
              </a>
            </div>
          )}
          <button
            className="tactile-button w-full rounded-full bg-yellow-400 px-6 py-4 text-sm font-black text-slate-900 shadow-[0_6px_0_#c99d00] transition hover:bg-yellow-300"
            type="submit"
          >
            {isSignup ? t.signupSubmit : t.submit}
          </button>
        </form>
        <div className="my-7 flex items-center gap-3 text-xs font-extrabold text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          <span>{isSignup ? t.signupOr : t.or}</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="space-y-3">
          <button
            className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:border-yellow-300 hover:bg-yellow-50"
            type="button"
          >
            <GoogleBrandIcon />
            {t.google}
          </button>
          <button
            className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50"
            type="button"
          >
            <FacebookBrandIcon />
            {t.facebook}
          </button>
        </div>
      </aside>
    </div>
  );
}

function Navbar({ t, language, setLanguage, onLogin }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-yellow-100 bg-[#fffdf7]/95 backdrop-blur-lg">
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 xl:pr-24">
        <Brand compact />
        <div className="hidden items-center gap-6 lg:flex">
          {t.nav.map((label, index) => (
            <a
              key={label}
              href={navHrefs[index]}
              className="text-sm font-bold text-slate-600 transition hover:text-green-700"
            >
              {label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          <button
            type="button"
            onClick={onLogin}
            className="text-sm font-bold text-slate-600 transition hover:text-green-700"
          >
            {t.login}
          </button>
          <ButtonLink className="min-h-10 px-5 py-2">{t.getStarted}</ButtonLink>
        </div>
        <div className="flex items-center gap-2 sm:hidden">
          <button
            className="rounded-full border border-slate-200 bg-white p-2 text-slate-700"
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? t.closeMenu : t.openMenu}
          >
            {open ? (
              <X size={22} weight="bold" />
            ) : (
              <List size={22} weight="bold" />
            )}
          </button>
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </div>
      </nav>
      <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 sm:block">
        <LanguageSwitcher language={language} setLanguage={setLanguage} />
      </div>
      {open && (
        <div className="border-t border-yellow-100 bg-[#fffdf7] px-4 pb-5 pt-3 sm:hidden">
          {t.nav.map((label, index) => (
            <a
              key={label}
              href={navHrefs[index]}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-3 text-sm font-bold text-slate-700 hover:bg-yellow-50"
            >
              {label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onLogin();
            }}
            className="block w-full rounded-xl px-3 py-3 text-left text-sm font-bold text-slate-700 hover:bg-yellow-50"
          >
            {t.login}
          </button>
          <ButtonLink className="mt-3 w-full">{t.getStarted}</ButtonLink>
        </div>
      )}
    </header>
  );
}

function HeroSection({ t }) {
  const floatingCards = [
    {
      title: t.skill,
      copy: t.road,
      Icon: Medal,
      tone: "bg-yellow-100 text-yellow-700",
      position: "-left-10 top-8",
      delay: "",
    },
    {
      title: t.streak,
      copy: t.momentum,
      Icon: Lightning,
      tone: "bg-green-100 text-green-700",
      position: "-right-8 top-20",
      delay: "animation-delay-1",
    },
    {
      title: t.reward,
      copy: t.rewardCopy,
      Icon: Sparkle,
      tone: "bg-orange-100 text-orange-700",
      position: "right-6 -bottom-7",
      delay: "animation-delay-2",
    },
  ];

  return (
    <section
      id="top"
      className="hero-grid relative flex flex-1 items-center overflow-hidden bg-[#fffdf7] px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-16 lg:pt-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="text-center lg:col-span-5 lg:text-left">
          <h1 className="hero-title fade-up text-5xl font-black leading-[0.98] tracking-[-0.055em] text-slate-900 sm:text-6xl lg:text-[4.75rem]">
            {t.lead}{" "}
            <span className="hero-title-accent text-green-600">
              {t.accent}
            </span>
          </h1>
          <p className="fade-up animation-delay-1 mx-auto mt-8 max-w-xl text-base font-medium leading-7 text-slate-600 sm:text-lg lg:mx-0">
            {t.copy}
          </p>
          <div className="fade-up animation-delay-2 mt-9 flex w-full flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <ButtonLink className="px-8 py-4 text-base">
              {t.primary} <ArrowRight size={18} weight="bold" />
            </ButtonLink>
            <ButtonLink
              href="#how-it-works"
              tone="outline"
              className="px-8 py-4 text-base"
            >
              <Play size={18} weight="fill" /> {t.secondary}
            </ButtonLink>
          </div>
        </div>

        <div className="fade-up animation-delay-3 relative mx-auto w-full max-w-2xl lg:col-span-7 lg:pr-5">
          <div className="absolute -left-4 top-12 h-44 w-44 rounded-full bg-yellow-200/65 blur-3xl" />
          <div className="absolute -right-2 bottom-12 h-52 w-52 rounded-full bg-green-200/65 blur-3xl" />
          <div className="hero-media-frame relative mx-auto aspect-square max-w-[34rem] overflow-hidden rounded-[3rem] border-8 border-white bg-gradient-to-br from-sky-50 via-lime-50 to-yellow-50 p-3 shadow-[0_28px_70px_rgba(72,118,48,0.2)] sm:p-5">
            <img
              className="h-full w-full rounded-[2.25rem] object-contain"
              src={heroImage}
              alt={t.alt}
            />
          </div>
          {floatingCards.map(({ title, copy, Icon, tone, position, delay }) => (
            <div
              key={title}
              className={`hero-floating-card floating-card ${delay} absolute ${position} hidden items-center gap-3 rounded-2xl border border-white/80 bg-white/95 p-3 shadow-soft backdrop-blur-sm lg:flex`}
            >
              <span
                className={`rounded-xl p-2 transition-transform duration-300 ${tone}`}
              >
                <Icon size={21} weight="fill" />
              </span>
              <span className="text-left">
                <strong className="block text-sm text-slate-900">
                  {title}
                </strong>
                <small className="block max-w-40 text-xs leading-5 text-slate-500">
                  {copy}
                </small>
              </span>
            </div>
          ))}
          <div className="mt-5 grid grid-cols-2 gap-2 lg:hidden">
            {floatingCards.map(({ title, copy, Icon, tone }) => (
              <div
                key={title}
                className="flex items-center gap-2 rounded-2xl border border-white bg-white/90 p-2.5 shadow-sm"
              >
                <span className={`shrink-0 rounded-xl p-2 ${tone}`}>
                  <Icon size={18} weight="fill" />
                </span>
                <span className="min-w-0 text-left">
                  <strong className="block text-xs text-slate-900">
                    {title}
                  </strong>
                  <small className="block text-[11px] leading-4 text-slate-500">
                    {copy}
                  </small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection({ items }) {
  return (
    <section className="bg-yellow-50/70">
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map(([value, label]) => (
          <div key={label} className="px-4 py-7 text-center sm:py-9">
            <strong className="block text-3xl font-black tracking-tight text-green-700 sm:text-4xl">
              {value}
            </strong>
            <span className="mt-1 block text-xs font-extrabold text-slate-600 sm:text-sm">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhySection({ t, language }) {
  return (
    <section
      id="why-smartsteps"
      className="relative scroll-mt-28 overflow-hidden bg-white px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pt-20"
    >
      <div className="pointer-events-none absolute -left-24 top-52 h-72 w-72 rounded-full bg-yellow-200/40 blur-3xl blob-float" />
      <div className="pointer-events-none absolute -right-24 bottom-28 h-80 w-80 rounded-full bg-green-200/40 blur-3xl blob-float animation-delay-2" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-2 text-sm font-extrabold text-yellow-800">
            {t.why.kicker}
          </span>
          <h2 className="mx-auto mt-5 max-w-[800px] text-4xl font-black leading-[1.08] tracking-tight text-slate-900 sm:text-5xl">
            {t.why.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[650px] text-base leading-7 text-slate-600 sm:text-lg">
            {t.why.copy}
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
          {t.features.map(([title, copy], index) => {
            const [Icon, tone, span, labelEn, labelVi, gradient, decorated] =
              featureMeta[index];
            return (
              <article
                key={title}
                className={`${span} feature-card fade-up group relative min-h-60 overflow-hidden rounded-[2rem] border border-slate-100 bg-gradient-to-br ${gradient} p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-200 hover:shadow-xl sm:p-7`}
                style={{ animationDelay: `${index * 70}ms` }}
              >
                {decorated && (
                  <>
                    <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-yellow-200/40" />
                    <span className="pointer-events-none absolute -bottom-12 right-20 h-24 w-24 rounded-full bg-green-200/30" />
                  </>
                )}
                <span
                  className={`feature-icon relative inline-flex rounded-2xl p-3 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110 ${tone}`}
                >
                  <Icon size={27} weight="duotone" />
                </span>
                <h3 className="relative mt-6 text-xl font-black tracking-tight text-slate-900">
                  {title}
                </h3>
                <p className="relative mt-2 max-w-2xl leading-7 text-slate-600">
                  {copy}
                </p>
                <span className="relative mt-7 inline-flex items-center gap-2 text-xs font-extrabold text-green-700">
                  <span className="h-2 w-2 rounded-full bg-yellow-400" />
                  {language === "vi" ? labelVi : labelEn}
                </span>
              </article>
            );
          })}
        </div>
        <div className="mt-6 flex flex-col gap-5 rounded-[2rem] border border-yellow-100 bg-white p-5 shadow-soft lg:flex-row lg:items-center lg:justify-between sm:p-6">
          <p className="max-w-2xl text-base font-extrabold leading-7 text-slate-800">
            {t.why.highlight}
          </p>
          <div className="flex flex-wrap gap-2">
            {t.why.pills.map((pill, index) => (
              <span
                key={pill}
                className="inline-flex items-center gap-2 rounded-full bg-lime-50 px-3 py-2 text-xs font-extrabold text-green-800"
              >
                <span
                  className={`h-2 w-2 rounded-full ${index === 1 ? "bg-green-500" : "bg-yellow-400"}`}
                />
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorldsSection({ t }) {
  return (
    <section
      id="curriculum"
      className="section-space overflow-hidden bg-lime-50 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div>
          <SectionHeading align="left" {...t.worldsHeading} />
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {t.worlds.map(([title, copy, lessons, progress], index) => {
            const [Icon, tone] = worldMeta[index];
            return (
              <article
                key={title}
                className="group relative min-h-72 overflow-hidden rounded-3xl border border-green-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-soft"
              >
                <span className={`inline-flex rounded-2xl p-3 ${tone}`}>
                  <Icon size={28} weight="duotone" />
                </span>
                <h3 className="mt-8 text-xl font-black text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
                <div className="absolute inset-x-6 bottom-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-extrabold">
                  <span className="text-slate-500">{lessons}</span>
                  <span className="text-green-700">{progress}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StepsSection({ t }) {
  return (
    <section
      id="how-it-works"
      className="section-space bg-yellow-50/45 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading {...t.how} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {t.steps.map(([title, copy], index) => {
            const Icon = stepIcons[index];
            const tone = stepTones[index];
            return (
              <article
                key={title}
                className={`group relative flex min-h-56 flex-col overflow-hidden rounded-3xl border p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft ${tone.card}`}
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl transition duration-300 group-hover:rotate-3 ${tone.icon}`}
                >
                  <Icon size={27} weight="duotone" />
                </span>
                <h3 className="mt-8 text-lg font-black text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CoachSection({ t }) {
  return (
    <section className="section-space bg-sky-50 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative mx-auto max-w-md">
          <div className="absolute inset-8 rounded-full bg-sky-200/70 blur-3xl" />
          <img
            className="relative z-10 w-full"
            src={mascotSpeaking}
            alt={t.coach.alt}
          />
        </div>
        <div>
          <SectionHeading align="left" {...t.coach} />
          <div className="mt-8 space-y-3">
            {t.coach.items.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm"
              >
                <CheckCircle
                  className="shrink-0 text-green-600"
                  size={22}
                  weight="fill"
                />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ParentsSection({ t }) {
  return (
    <section
      id="parents"
      className="section-space bg-white px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
        <div>
          <SectionHeading align="left" {...t.parents} />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {t.parents.items.map((label, index) => {
              const Icon = parentIcons[index];
              return (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl bg-lime-50 p-4 text-sm font-extrabold text-slate-700"
                >
                  <Icon className="text-green-700" size={22} weight="duotone" />
                  {label}
                </div>
              );
            })}
          </div>
        </div>
        <div className="relative">
          <div className="rounded-[2rem] border border-green-100 bg-lime-50 p-5 shadow-soft sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold text-green-700">
                  {t.parents.weekly}
                </p>
                <h3 className="mt-1 text-xl font-black text-slate-900">
                  {t.parents.path}
                </h3>
              </div>
              <span className="rounded-full bg-white p-3 text-green-700">
                <ChartLineUp size={24} weight="duotone" />
              </span>
            </div>
            <div className="mt-7 space-y-3">
              {t.parents.skills.map(([label, progress], index) => (
                <div key={label} className="rounded-2xl bg-white p-4">
                  <div className="flex justify-between gap-4 text-sm font-extrabold text-slate-700">
                    <span>{label}</span>
                    <span className="text-slate-500">{progress}</span>
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {[0, 1, 2, 3].map((item) => (
                      <span
                        key={item}
                        className={`h-2 rounded-full ${item < 4 - index ? ["bg-green-500", "bg-yellow-400", "bg-sky-400"][index] : "bg-slate-100"}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-green-600 p-4 text-white">
              <p className="text-xs font-bold text-green-100">
                {t.parents.note}
              </p>
              <p className="mt-1 text-sm font-bold leading-6">
                {t.parents.noteCopy}
              </p>
            </div>
          </div>
          <img
            className="absolute -bottom-12 -right-5 hidden w-32 sm:block"
            src={mascotConfident}
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ review, language, stars }) {
  const [name, roleEn, roleVi, location, quoteEn, quoteVi] = review;
  return (
    <article className="flex w-[min(84vw,23rem)] shrink-0 flex-col rounded-3xl border border-yellow-100 bg-white p-6 shadow-soft sm:w-[25rem]">
      <div className="flex gap-1 text-yellow-500" aria-label={stars}>
        {[0, 1, 2, 3, 4].map((item) => (
          <Star key={item} size={17} weight="fill" />
        ))}
      </div>
      <p className="mt-5 flex-1 leading-7 text-slate-700">
        "{language === "vi" ? quoteVi : quoteEn}"
      </p>
      <div className="mt-7 flex items-center gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-black ${tones[name.charCodeAt(0) % tones.length]}`}
        >
          {name[0]}
        </span>
        <span>
          <strong className="block text-sm text-slate-900">{name}</strong>
          <small className="block text-slate-500">
            {language === "vi" ? roleVi : roleEn}
          </small>
          <small className="block font-bold text-green-700">{location}</small>
        </span>
      </div>
    </article>
  );
}

function TestimonialsSection({ t, language }) {
  const cards = [...testimonials, ...testimonials];
  return (
    <section className="section-space overflow-hidden bg-yellow-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <SectionHeading {...t.testimonials} />
      </div>
      <div className="testimonial-marquee mt-12">
        <div className="testimonial-track">
          {cards.map((review, index) => (
            <TestimonialCard
              key={`${review[0]}-${index}`}
              review={review}
              language={language}
              stars={t.testimonials.stars}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection({ t }) {
  const [billingCycle, setBillingCycle] = useState("yearly");

  return (
    <section
      id="pricing"
      className="section-space overflow-hidden bg-[#fffdf7] px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading {...t.pricing} />
        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3 xl:gap-6">
          {t.pricing.plans.map((plan, index) => {
            const planIcon = planIcons[index];
            const [price, billing] = plan.pricing
              ? plan.pricing[billingCycle]
              : [plan.price, plan.billing];

            return (
              <article
                key={plan.name}
                className={`relative flex flex-col overflow-hidden rounded-[2rem] border p-6 transition duration-300 sm:p-7 xl:p-8 ${
                  plan.paid
                    ? plan.pricing
                      ? "border-green-600 bg-green-600 text-white shadow-[0_18px_40px_rgba(22,163,74,0.2)] hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(22,163,74,0.28)]"
                      : "border-[#149447] bg-[#149447] text-white shadow-[0_18px_40px_rgba(20,148,71,0.2)] hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(20,148,71,0.28)]"
                    : "border-slate-200 bg-slate-50 shadow-sm hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
                }`}
              >
                <div className="flex min-h-12 items-center gap-3">
                  <img
                    className={`h-12 w-12 shrink-0 ${plan.paid ? "brightness-0 invert" : "opacity-80"}`}
                    src={planIcon}
                    alt=""
                  />
                  <h3
                    className={`text-3xl font-black ${plan.paid ? "text-white" : "text-slate-900"}`}
                  >
                    {plan.name}
                  </h3>
                </div>
                <p
                  className={`mt-5 text-sm leading-6 lg:min-h-[4.5rem] ${plan.paid ? "text-green-100" : "text-slate-600"}`}
                >
                  {plan.copy}
                </p>
                {plan.pricing && (
                  <div className="mt-1">
                    <div className="inline-flex w-fit rounded-full bg-green-900/70 p-1 text-xs font-bold">
                      {["monthly", "yearly"].map((cycle) => (
                        <button
                          key={cycle}
                          type="button"
                          aria-pressed={billingCycle === cycle}
                          onClick={() => setBillingCycle(cycle)}
                          className={`relative rounded-full px-3 py-1.5 transition ${
                            billingCycle === cycle
                              ? "bg-white text-green-800 shadow-sm"
                              : "text-green-100 hover:text-white"
                          }`}
                        >
                          {t.pricing[cycle]}
                          {cycle === "yearly" && (
                            <span className="absolute -right-3 -top-4 -rotate-6 whitespace-nowrap rounded-full bg-yellow-300 px-2 py-0.5 text-[10px] font-black text-yellow-900 shadow-sm">
                              {t.pricing.save}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <p
                  className={`mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1 whitespace-nowrap text-[1.75rem] font-black tracking-tight xl:text-3xl ${plan.paid ? "text-white" : "text-slate-950"}`}
                >
                  <span>{price}</span>
                  <span
                    className={`text-xs font-bold tracking-normal ${plan.paid ? "text-green-100" : "text-slate-500"}`}
                  >
                    {billing}
                  </span>
                </p>
                <ButtonLink
                  tone={plan.paid ? "yellow" : "outline"}
                  className="mt-5 w-full"
                >
                  {plan.cta || t.pricing.signup}
                </ButtonLink>
                <ul
                  className={`mt-7 flex-1 space-y-3 border-t pt-6 ${plan.paid ? "border-[#35a964]" : "border-slate-200"}`}
                >
                  {plan.items.map((item) => (
                    <li
                      key={item}
                      className={`flex gap-2 text-sm font-medium leading-5 ${plan.paid ? "text-white" : "text-slate-600"}`}
                    >
                      <Check
                        className={`mt-0.5 shrink-0 ${plan.paid ? "text-yellow-300" : "text-green-600"}`}
                        size={18}
                        weight="bold"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ t }) {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-green-600 px-6 py-14 text-center shadow-[0_22px_60px_rgba(35,113,30,0.2)] sm:px-10 lg:py-20">
        <div className="absolute -left-16 -top-20 h-56 w-56 rounded-full bg-yellow-300/20 blur-2xl" />
        <div className="absolute -bottom-28 -right-10 h-64 w-64 rounded-full bg-lime-200/20 blur-2xl" />
        <img
          className="absolute bottom-0 left-4 hidden w-36 lg:block"
          src={mascotHappyWave}
          alt=""
        />
        <img
          className="absolute bottom-0 right-5 hidden w-36 lg:block"
          src={mascotSinging}
          alt=""
        />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            {t.cta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-7 text-green-50 sm:text-lg">
            {t.cta.copy}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <ButtonLink className="px-8 py-4 text-base">
              {t.cta.primary} <ArrowRight size={18} weight="bold" />
            </ButtonLink>
            <ButtonLink
              href="#curriculum"
              tone="white"
              className="px-8 py-4 text-base"
            >
              {t.cta.secondary}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer className="border-t border-yellow-100 bg-[#fffdf7] px-4 pb-6 pt-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Brand compact />
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-600">
            {t.footer.copy}
          </p>
        </div>
        {t.footer.groups.map(([title, ...links]) => (
          <div key={title}>
            <h3 className="text-sm font-black text-slate-900">{title}</h3>
            <div className="mt-4 flex flex-col gap-3">
              {links.map((link) => (
                <a
                  key={link}
                  className="text-sm font-medium text-slate-600 transition hover:text-green-700"
                  href="#top"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-yellow-100 pt-5 text-xs font-medium text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>{t.footer.copyright}</p>
        <p className="inline-flex items-center gap-2">
          <ShieldCheck size={16} weight="fill" /> {t.footer.safety}
        </p>
      </div>
    </footer>
  );
}

function App() {
  const [language, setLanguage] = useState("vi");
  const [loginOpen, setLoginOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const t = translations[language] || translations.en;
  useEffect(() => {
    const seo = seoTranslations[language] || seoTranslations.vi;
    document.documentElement.lang = language;
    document.title = seo.title;
    [
      ['meta[name="description"]', seo.description],
      ['meta[property="og:title"]', seo.title],
      ['meta[property="og:description"]', seo.description],
      ['meta[property="og:locale"]', seo.locale],
      ['meta[name="twitter:title"]', seo.title],
      ['meta[name="twitter:description"]', seo.description],
    ].forEach(([selector, content]) => {
      document.querySelector(selector)?.setAttribute("content", content);
    });
  }, [language]);
  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-white text-slate-900">
      <Navbar
        t={t}
        language={language}
        setLanguage={setLanguage}
        onLogin={() => {
          setAuthMode("signin");
          setLoginOpen(true);
        }}
      />
      <LoginSidebar
        language={language}
        mode={authMode}
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onModeChange={setAuthMode}
      />
      <main>
        <div className="flex min-h-[100dvh] flex-col">
          <HeroSection t={t.hero} />
          <StatsSection items={t.stats} />
        </div>
        <WhySection t={t} language={language} />
        <WorldsSection t={t} />
        <StepsSection t={t} />
        <CoachSection t={t} />
        <ParentsSection t={t} />
        <TestimonialsSection t={t} language={language} />
        <PricingSection t={t} />
        <FinalCta t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}

export default App;
