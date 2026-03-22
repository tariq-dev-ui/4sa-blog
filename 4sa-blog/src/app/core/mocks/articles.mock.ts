import { Article } from '../models/article.model';

/**
 * High-quality mock data for articles.
 * This data is used by the ArticleService in development mode to simulate API responses.
 */
export const MOCK_ARTICLES: Article[] = [
  { id: '1', slug: 'mothers-day-flawerd', title: 'هدايا عيد الأم من متجر فلاورد مع كوبون خصم', excerpt: 'استكشف هدايا مميزة لعيد الأم من متجر فلاورد واحصل على كوبون خصم. اجعل الهدية ذكرى لا تُنسى.', categoryKey: 'blog.catMothersDay', imageUrl: '/img/صورة البنر الرئيسي.jpeg', author: 'علي أحمد', publishedDate: '2026-01-31', updatedDate: '2026-02-05', couponCode: 'FLOWER20', storeUrl: 'https://www.flowerstore.com' },
  { id: '2', slug: 'flawerd-vs-joy-gifts', title: 'مقارنة بين فلاورد وجوي جيفتس لهدايا المناسبات', excerpt: 'مقارنة شاملة بين متجر فلاورد وجوي جيفتس لمساعدتك في اختيار أفضل الهدايا لمناسباتك.', categoryKey: 'blog.catStores', imageUrl: '/img/بنر رئيسي.jpeg', author: 'علي أحمد', publishedDate: '2026-01-31', updatedDate: '2026-02-04', couponCode: 'JOY15', storeUrl: 'https://www.joygifts.com' },
  { id: '3', slug: 'bath-body-works', title: 'كوبون باث اند بودي وركس للعطور والمستحضرات', excerpt: 'اكتشف كوبون باث اند بودي وركس للعطور والمستحضرات. احصل على كود خصم فعال لتجربة تسوق فريدة.', categoryKey: 'blog.catSaving', imageUrl: '/img/بنر صغير بجوار البنر.png', author: 'علي أحمد', publishedDate: '2026-01-31', updatedDate: '2026-02-04', couponCode: 'BATH25', storeUrl: 'https://www.bathandbodyworks.com' },
  { id: '4', slug: 'bath-vs-victoria-secret', title: 'باث اند بودي وركس vs فيكتوريا سيكريت: أيهما أفضل؟', excerpt: 'مقارنة بين كود خصم باث اند بودي وركس وكود خصم فيكتوريا سيكريت لمساعدتك في الاختيار.', categoryKey: 'blog.catBeauty', imageUrl: '/img/بنر رئيسي.png', author: 'علي أحمد', publishedDate: '2026-01-31', updatedDate: '2026-02-05', couponCode: 'VS2026', storeUrl: 'https://www.victoriassecret.com' },
  { id: '5', slug: 'victoria-secret-perfumes-2026', title: 'أفضل عطور فيكتوريا سيكريت لعام 2026', excerpt: 'تعرف على أفضل عطور فيكتوريا سيكريت لعام 2026 واحصل عليها. كود خصم حصري لأول طلب.', categoryKey: 'blog.catBestSellers', imageUrl: '/img/صورة البنر الرئيسي.jpeg', author: 'علي أحمد', publishedDate: '2026-01-31', updatedDate: '2026-02-03', couponCode: 'PERFUME15', storeUrl: 'https://www.victoriassecret.com' },
  { id: '6', slug: 'darua-winter-2026', title: 'كوبون درعه للشتاء بتخفيض حصري شتاء 2026', excerpt: 'استكشف كوبون درعه للشتاء مع متجر درعه، للتسوق من كود خصم حصري لشتاء 2026.', categoryKey: 'blog.catWinter', imageUrl: '/img/بنر رئيسي.jpeg', author: 'علي أحمد', publishedDate: '2026-01-31', updatedDate: '2026-02-03', couponCode: 'DARUA20', storeUrl: 'https://www.darua.com' },
];
