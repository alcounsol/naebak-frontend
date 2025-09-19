# 🏛️ نائبك.كوم - الواجهة الأمامية (Frontend)

> **منصة تربط المواطنين بالنواب والمرشحين في مصر**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5-0081CB?style=flat-square&logo=mui)](https://mui.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## 📋 نظرة عامة

هذا هو الجزء الأمامي (Frontend) لمنصة **نائبك.كوم** - منصة تفاعلية تهدف إلى ربط المواطنين المصريين بنوابهم ومرشحيهم في البرلمان، مما يعزز الشفافية والمشاركة المدنية.

## 🎯 الميزات الرئيسية

### ✅ **المكتملة حالياً:**
- ⚙️ إعداد Next.js 14 مع TypeScript
- 🎨 Tailwind CSS للتصميم
- 📱 دعم التصميم المتجاوب (Responsive)
- 🌐 دعم اللغة العربية (RTL)

### 🚧 **قيد التطوير (المرحلة 3):**
- 🏠 صفحة الهبوط الرئيسية
- 🔐 صفحات التسجيل وتسجيل الدخول
- 👥 صفحات عرض المرشحين والنواب
- 💬 نماذج إرسال الرسائل والمشاكل
- 📊 لوحات التحكم للمستخدمين والإدارة

### 📅 **المخطط للمراحل القادمة:**
- 🔍 نظام البحث المتقدم
- 📈 الإحصائيات والتقارير
- 🔔 نظام الإشعارات
- 📱 تطبيق الهاتف المحمول (PWA)

## 🛠️ التقنيات المستخدمة

### **الأساسية:**
- **Next.js 14** - إطار عمل React مع App Router
- **TypeScript** - لغة البرمجة مع الأنواع الثابتة
- **Tailwind CSS** - إطار عمل CSS للتصميم السريع

### **واجهة المستخدم:**
- **Material-UI (MUI)** - مكتبة مكونات React
- **Emotion** - CSS-in-JS للتصميم
- **React Hook Form** - إدارة النماذج
- **Yup** - التحقق من صحة البيانات

### **إدارة الحالة:**
- **Zustand** - إدارة الحالة البسيطة والفعالة
- **Axios** - للتواصل مع APIs

### **أدوات التطوير:**
- **ESLint** - فحص جودة الكود
- **Prettier** - تنسيق الكود
- **Husky** - Git hooks للجودة

## 📁 هيكل المشروع

```
naebak-frontend/
├── src/
│   ├── app/                    # App Router (Next.js 14)
│   │   ├── (auth)/            # مجموعة المصادقة
│   │   ├── candidates/        # صفحات المرشحين
│   │   ├── dashboard/         # لوحات التحكم
│   │   └── globals.css        # الأنماط العامة
│   ├── components/            # المكونات القابلة لإعادة الاستخدام
│   │   ├── common/           # المكونات العامة
│   │   ├── forms/            # مكونات النماذج
│   │   └── layout/           # مكونات التخطيط
│   ├── hooks/                # React Hooks المخصصة
│   ├── lib/                  # المكتبات والأدوات المساعدة
│   ├── store/                # إدارة الحالة (Zustand)
│   ├── types/                # تعريفات TypeScript
│   └── utils/                # الدوال المساعدة
├── public/                   # الملفات العامة
└── docs/                    # التوثيق
```

## 🚀 البدء السريع

### المتطلبات:
- Node.js 18+ 
- npm أو yarn أو pnpm

### التثبيت:
```bash
# استنساخ المستودع
git clone https://github.com/naebak-com/naebak-frontend.git
cd naebak-frontend

# تثبيت التبعيات
npm install

# تشغيل الخادم التطويري
npm run dev
```

### الأوامر المتاحة:
```bash
npm run dev          # تشغيل الخادم التطويري
npm run build        # بناء المشروع للإنتاج
npm run start        # تشغيل المشروع المبني
npm run lint         # فحص جودة الكود
npm run type-check   # فحص أنواع TypeScript
```

## 🌐 البيئات

| البيئة | الرابط | الحالة |
|--------|---------|---------|
| **التطوير** | http://localhost:3000 | 🟢 نشط |
| **الاختبار** | https://staging.naebak.com | 🟡 قيد الإعداد |
| **الإنتاج** | https://naebak.com | 🔴 قيد التطوير |

## 📊 تقدم المشروع

### المرحلة الحالية: **3 - Frontend الأساسي**

| المهمة | الحالة | التقدم |
|--------|---------|---------|
| إعداد Next.js + TypeScript | ✅ مكتمل | 100% |
| إعداد Material-UI + RTL | 🚧 جاري | 20% |
| صفحة الهبوط | 📋 مخطط | 0% |
| صفحات المصادقة | 📋 مخطط | 0% |
| صفحات المرشحين | 📋 مخطط | 0% |
| نماذج الرسائل | 📋 مخطط | 0% |
| لوحات التحكم | 📋 مخطط | 0% |

**التقدم الإجمالي للمرحلة:** 15% (6/40 يوم عمل)

## 🔗 الروابط المهمة

- **Backend API:** https://naebak-backend-822351033701.us-central1.run.app
- **التوثيق:** [docs/](./docs/)
- **التصميم:** [Figma Design](#) (قيد الإنشاء)
- **المخطط الرئيسي:** [Master Plan](../master-plan.md)

## 🤝 المساهمة

نرحب بالمساهمات! يرجى قراءة [دليل المساهمة](CONTRIBUTING.md) قبل البدء.

### خطوات المساهمة:
1. Fork المستودع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى Branch (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت [MIT License](LICENSE).

## 📞 التواصل

- **الموقع:** https://naebak.com
- **البريد الإلكتروني:** dev@naebak.com
- **GitHub:** [@naebak-com](https://github.com/naebak-com)

---

**تم التحديث:** 19 سبتمبر 2025  
**الإصدار:** 0.1.0 (Alpha)  
**الحالة:** 🚧 قيد التطوير النشط
