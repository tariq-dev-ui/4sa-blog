# مراجعة مشروع 4SA Blog

## 1. نظرة عامة على الهيكل

المشروع عبارة عن **تطبيق Angular 20** (Standalone)، مدونة/موقع كوبونات وعروض (فور سعودي) مع دعم **RTL/LTR** و**الترجمة (ar/en)** عبر `@ngx-translate/core`.

### الجذر (`4sa-blog/`)
- **angular.json** – إعدادات البناء (SCSS، assets من `public/`)
- **package.json** – Angular 20، ngx-translate، RxJS، لا يوجد backend
- **tsconfig*.json** – إعدادات TypeScript
- **vercel.json** – بناء وتشغيل على Vercel (SPA مع rewrites)
- **public/** – أصول ثابتة: خطوط Qatar 2022، i18n (ar.json, en.json)، صور، webfonts

### التطبيق (`src/`)
- **main.ts** – تشغيل `bootstrapApplication(App, appConfig)`
- **index.html** – نقطة الدخول، Bootstrap Icons من CDN
- **styles.scss** – خطوط، ألوان CSS variables، فئات مساعدة (أزرار، تنبيهات، بطاقات)
- **app/** – المكونات والتوجيه والخدمات

---

## 2. هيكل مجلد التطبيق (`src/app/`)

### الجذر
| الملف | الوظيفة |
|-------|---------|
| **app.ts** | المكون الرئيسي: Navbar، Banner، CategoriesSidebar، StoresStrip، MainSidebar، Footer؛ إخفاء البانر والسايدبار في المسارات المستقلة (`/blog`, `/stores`) |
| **app.html** | قالب التخطيط العام مع `router-outlet` |
| **app.scss** | تخطيط الصفحة (content-with-sidebar، main-wrap، responsive) |
| **app.config.ts** | `provideRouter`, `provideTranslateService`, `provideTranslateHttpLoader`, `provideHttpClient` |
| **app.routes.ts** | تحميل كسول لـ `PublicModule` فقط، ومسار عام `**` يعيد التوجيه إلى `''` |

### التخطيط (`layout/`)
مكونات مشتركة بين الصفحات:

| المكون | الاستخدام |
|--------|-----------|
| **navbar** | شريط علوي: قائمة، بحث، تبديل اللغة |
| **banner** | بنر مزدوج (يسار/يمين) مع تمرير تلقائي |
| **categories-sidebar** | شريط تصنيفات أفقية قابلة للتمرير |
| **stores-strip** | شريط متاجر مع أكواد خصم (الرئيسية) |
| **main-sidebar** | سايدبار الصفحة الرئيسية (مقالات، مراجعات، إحصائيات، روابط) |
| **footer** | تذييل الصفحة |
| **blog-sidebar** | سايدبار صفحات المدونة (ترتيب، متاجر، تصنيفات، كتاب) |
| **stores-sidebar** | سايدبار صفحة المتاجر |
| **offers-section** | قسم العروض (كاروسيل مع نسخ كود ونافذة تفاصيل) |
| **major-stores-section** | قسم المتاجر الكبرى |
| **articles-section** | قسم المقالات |
| **site-intro** | نص ترحيبي/تعريفي |
| **faq-section** | الأسئلة الشائعة |
| **section-strip** | عنوان عام + "عرض الكل" + محتوى (قابل لإعادة الاستخدام) |

### الوحدات (`modules/public/`)
- **public-module.ts** – NgModule يستورد الصفحات كـ Standalone
- **public-routing-module.ts** – المسارات: `''` (Home)، `blog`, `blog/:id`, `posts`, `posts/:id`, `categories`, `categories/:slug`, `stores`، و`**` → `''`
- **home** – الصفحة الرئيسية (MajorStoresSection، OffersSection، ArticlesSection، SiteIntro، FaqSection)
- **blog** – قائمة المدونة + BlogSidebar
- **blog-details** – تفاصيل مقال مدونة
- **posts** – قائمة المقالات
- **post-details** – تفاصيل المقال
- **categories** – التصنيفات
- **stores** – صفحة المتاجر + StoresSidebar

### المشترك (`shared/`)
- **breadcrumb** – مسار التنقل
- **offer-detail-modal** – نافذة تفاصيل العرض

---

## 3. محتوى وإعدادات مهمة

- **اللغة الافتراضية**: عربي، مع تطبيق `dir` و`lang` على `document.documentElement` عند التبديل.
- **الأصول**: الخطوط من `public/fonts/qatar-2022-arabic/`، الترجمات من `public/i18n/*.json`، الصور من `public/img/` (أسماء عربية).
- **المسارات المستقلة**: `/blog` و`/stores` لا يعرضان البانر ولا الـ categories-sidebar ولا الـ stores-strip ولا الـ main-sidebar (عرض كامل للمحتوى).

---

## 4. التعديلات المُنفذة

- **navbar.html**: استبدال `routerLink="{{ sub.path }}"` و`routerLink="{{ item.path }}"` بـ `[routerLink]="sub.path"` و`[routerLink]="item.path"` لاستخدام ربط الخصائص بدل النص، وهو الأفضل مع التوجيه الديناميكي.

---

## 5. اقتراحات تحسين (اختيارية)

### 5.1 روابط القائمة بدون صفحات
في **navbar** توجد روابط لمسارات غير معرّفة في التوجيه: `/about`, `/contact`, `/archive`, `/tags`, `/news`, `/reviews`, `/links`. حالياً المسار العام `**` يعيد التوجيه إلى الرئيسية، لذا النقر يأخذ المستخدم للرئيسية دون صفحة مخصصة.

- **الخيار أ**: إزالة أو إخفاء هذه العناصر من القائمة حتى تُنشأ الصفحات.
- **الخيار ب**: إضافة مسارات placeholder (مثل مكون "قريباً" أو صفحة ثابتة) لهذه المسارات حتى لا يختلط الأمر على المستخدم.

### 5.2 توحيد بيانات الصور والمتاجر
مصفوفات صور مؤقتة (مثل بنر رئيسي، بنر صغير…) ومتاجر افتراضية مكررة في عدة ملفات: `banner.ts`, `stores-strip.ts`, `offers-section.ts`, `stores.ts`, `main-sidebar.ts`, `stores-sidebar.ts`. يمكن إنشاء ملف مشترك (مثلاً `shared/constants/images.ts` أو `shared/data/store-logos.ts`) وتصدير مصفوفة واحدة للشعارات/الصور المؤقتة لسهولة الاستبدال لاحقاً بشعارات حقيقية.

### 5.3 توحيد وسم `standalone`
بعض المكونات تحتوي على `standalone: true` صراحةً (مثل Stores، Blog، OffersSection، …) والبعض لا (مثل Navbar، Banner، CategoriesSidebar، Home). في Angular 19+ المكونات الافتراضية standalone. للإبقاء على وضوح المشروع يمكن إما إضافة `standalone: true` لكل المكونات المستخدمة كـ standalone، أو الاعتماد على الافتراضي وإزالة السطر من المكونات التي لا تحتاجه. الأهم هو أن يكون السلوك موحداً في كل المشروع.

### 5.4 عنوان الصفحة (title)
في **index.html** العنوان ثابت: "4saBlog". يمكن استخدام `Title` من `@angular/platform-browser` مع `Router` لتعيين عنوان ديناميكي حسب المسار (مثل "الرئيسية | 4SA Blog"، "المدونة | 4SA Blog")؛ عناوين المسارات معرّفة في `public-routing-module.ts` (title: 'الرئيسية', 'المدونة', …) ويمكن ربطها بخدمة Title لتحسين SEO وتجربة المستخدم.

### 5.5 البحث في الـ Navbar
حقل البحث في الـ navbar غير مربوط بأي منطق (لا إرسال ولا توجيه). يمكن لاحقاً ربطه بمسار بحث (مثل `/search?q=...`) أو بفتح نافذة/صفحة بحث عند الإدخال أو عند زر "بحث".

### 5.6 الاختبارات
يوجد ملفات `*.spec.ts` لـ banner، footer، navbar، home، posts، post-details، categories. يمكن التأكد من تشغيل `ng test` بانتظام وإضافة اختبارات لأهم المكونات (مثل stores-strip، offers-section، التوجيه، الترجمة) لضمان عدم كسر الوظائف بعد التعديلات.

---

## 6. خلاصة

- الهيكل واضح: تطبيق Angular حديث، تخطيط منظم (layout / modules / shared)، ودعم جيد للعربية والترجمة والـ RTL.
- تم تحسين ربط **routerLink** في الـ navbar.
- الاقتراحات أعلاه تحسينات اختيارية لتنظيم البيانات، تجربة المستخدم (العنوان والبحث والروابط)، والاختبارات. لا توجد أخطاء Lint في المجلد المُفحوص.

إذا رغبت، يمكن تنفيذ أحد الاقتراحات (مثلاً إنشاء ملف ثوابت للصور، أو إضافة مسارات placeholder للقائمة) خطوة بخطوة في الملفات الفعلية.
