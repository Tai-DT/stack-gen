export const locales = ["en", "ja", "vi", "ko"] as const;
export type Locale = typeof locales[number];

type Dict = Record<string, string>;

const dictionaries: Record<Locale, Dict> = {
  en: {
    home: "Home",
    products: "Products",
    projects: "Projects",
    licenses: "Licenses",
    contact: "Contact",
    admin: "Admin",
    adminProducts: "Manage Products",
    welcome: "Welcome to Our Business",
    explore: "Explore our products, projects, licenses and contact information.",
  },
  ja: {
    home: "ホーム",
    products: "製品",
    projects: "プロジェクト",
    licenses: "ライセンス",
    contact: "連絡先",
    admin: "管理",
    adminProducts: "製品管理",
    welcome: "私たちのビジネスへようこそ",
    explore: "製品、プロジェクト、ライセンス、連絡先情報をご覧ください。",
  },
  vi: {
    home: "Trang chủ",
    products: "Sản phẩm",
    projects: "Dự án",
    licenses: "Giấy phép",
    contact: "Liên hệ",
    admin: "Quản trị",
    adminProducts: "Quản lý sản phẩm",
    welcome: "Chào mừng đến với doanh nghiệp của chúng tôi",
    explore: "Khám phá sản phẩm, dự án, giấy phép và thông tin liên hệ.",
  },
  ko: {
    home: "홈",
    products: "제품",
    projects: "프로젝트",
    licenses: "라이선스",
    contact: "연락처",
    admin: "관리자",
    adminProducts: "제품 관리",
    welcome: "우리 비즈니스에 오신 것을 환영합니다",
    explore: "제품, 프로젝트, 라이선스 및 연락처 정보를 확인하세요.",
  },
};

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale];
}
