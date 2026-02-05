import { AfterViewInit, Component, ElementRef, OnDestroy, signal, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { BlogSidebar } from '../../../layout/blog-sidebar/blog-sidebar';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  categoryKey: string;
  imageUrl: string;
  author: string;
  publishedDate: string;
  updatedDate: string;
}

const BLOG_POSTS: BlogPost[] = [
  { id: '1', slug: 'mothers-day-flawerd', title: 'أفكار هدايا يوم الأم من متجر فلاورد مع كود خصم حصري', excerpt: 'اكتشف أفكار هدايا مميزة ليوم الأم من متجر فلاورد مع كوبونات حصرية. اطلب الآن ووفر مع صحصح.', categoryKey: 'blog.catMothersDay', imageUrl: '/img/صورة البنر الرئيسي.jpeg', author: 'طارق عامر', publishedDate: '2026-01-31', updatedDate: '2026-02-05' },
  { id: '2', slug: 'flawerd-vs-joy-gifts', title: 'مقارنة بين فلاورد وجوي قفتس لاختيار الهدايا الفاخرة', excerpt: 'مقارنة شاملة بين متجر فلاورد وجوي قفتس لمساعدتك في اختيار أفضل الهدايا مع كود خصم فلاورد.', categoryKey: 'blog.catStores', imageUrl: '/img/بنر رئيسي.jpeg', author: 'طارق عامر', publishedDate: '2026-01-31', updatedDate: '2026-02-04' },
  { id: '3', slug: 'bath-body-works', title: 'عروض باث اند بودي وركس للمحلات والأونلاين مع كود خصم', excerpt: 'استكشف عروض باث اند بودي وركس للمحلات والأونلاين. طبق كود الخصم ووفر على مشترياتك.', categoryKey: 'blog.catSaving', imageUrl: '/img/بنر صغير بجوار البنر.png', author: 'طارق عامر', publishedDate: '2026-01-31', updatedDate: '2026-02-04' },
  { id: '4', slug: 'bath-vs-victoria-secret', title: 'باث اند بودي وركس vs فيكتوريا سيكرت: أيهما قيمة أفضل؟', excerpt: 'مقارنة بين كود خصم باث اند بودي وركس وكود خصم فيكتوريا سيكرت لمساعدتك في الاختيار.', categoryKey: 'blog.catBeauty', imageUrl: '/img/بنر الرئيسي.png', author: 'طارق عامر', publishedDate: '2026-01-31', updatedDate: '2026-02-05' },
  { id: '5', slug: 'victoria-secret-perfumes-2026', title: 'أفضل عطور فيكتوريا سيكرت لعام 2026 مع كود خصم', excerpt: 'تعرف على أفضل عطور فيكتوريا سيكرت لعام 2026 واستخدم كود الخصم للحصول على توفير إضافي.', categoryKey: 'blog.catBestSellers', imageUrl: '/img/صورة البنر الرئيسي.jpeg', author: 'طارق عامر', publishedDate: '2026-01-31', updatedDate: '2026-02-03' },
  { id: '6', slug: 'darua-winter-2026', title: 'عروض باقات الشتاء لمتجر درعة مع كود خصم شتاء 2026', excerpt: 'اكتشف عروض باقات الشتاء من متجر درعة للعطور مع كود خصم حصري لشتاء 2026.', categoryKey: 'blog.catWinter', imageUrl: '/img/بنر رئيسي.jpeg', author: 'طارق عامر', publishedDate: '2026-01-31', updatedDate: '2026-02-03' },
  { id: '7', slug: 'darua-new-year-2026', title: 'عروض بداية العام 2026 لمتجر درعة مع كود خصم', excerpt: 'استعد لبداية العام مع عروض متجر درعة وكود خصم بداية العام 2026 من صحصح.', categoryKey: 'blog.catNewYear', imageUrl: '/img/بنر صغير بجوار البنر.png', author: 'طارق عامر', publishedDate: '2026-01-29', updatedDate: '2026-02-03' },
  { id: '8', slug: 'darua-vs-namshi', title: 'مقارنة كود خصم درعة وكود خصم نمشي عبر موقع صحصح', excerpt: 'مقارنة بين عروض درعة ونمشي لمساعدتك في اختيار أفضل كود خصم لمشترياتك.', categoryKey: 'blog.catStores', imageUrl: '/img/بنر الرئيسي.png', author: 'طارق عامر', publishedDate: '2026-01-29', updatedDate: '2026-02-04' },
  { id: '9', slug: 'darua-women-watches', title: 'أفضل الساعات النسائية من متجر درعة مع كود خصم', excerpt: 'تعرف على أفضل الساعات النسائية من متجر درعة مع كود خصم درعة للساعات من صحصح.', categoryKey: 'blog.catSaving', imageUrl: '/img/صورة البنر الرئيسي.jpeg', author: 'طارق عامر', publishedDate: '2026-01-29', updatedDate: '2026-02-03' },
  { id: '10', slug: 'asos-alternatives', title: 'بدائل رخيصة لمتجر أسوس | صحصح للتسوق الذكي', excerpt: 'اكتشف بدائل رخيصة لمتجر أسوس الشهير مع أفضل كوبونات للتسوق الذكي في السعودية.', categoryKey: 'blog.catStores', imageUrl: '/img/بنر رئيسي.jpeg', author: 'طارق عامر', publishedDate: '2026-01-29', updatedDate: '2026-02-04' },
  { id: '11', slug: 'asos-winter-2026', title: 'عروض موقع أسوس للشتاء مع كود خصم أسوس شتاء 2026', excerpt: 'استمتع بعروض موقع أسوس للشتاء مع كود خصم أسوس شتاء 2026 من صحصح.', categoryKey: 'blog.catWinter', imageUrl: '/img/بنر صغير بجوار البنر.png', author: 'طارق عامر', publishedDate: '2026-01-29', updatedDate: '2026-02-03' },
  { id: '12', slug: 'riyadh-booking-apps', title: 'أفضل تطبيقات حجز أماكن في الرياض مع أكواد خصم', excerpt: 'تعرف على أفضل تطبيقات حجز أماكن في الرياض مع أكواد خصم حصرية من صحصح.', categoryKey: 'blog.catStores', imageUrl: '/img/بنر الرئيسي.png', author: 'طارق عامر', publishedDate: '2026-01-29', updatedDate: '2026-02-05' },
];

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, TranslatePipe, BlogSidebar],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog implements AfterViewInit, OnDestroy {
  @ViewChild('blogCatsStrip') private blogCatsStripRef!: ElementRef<HTMLElement>;

  private catsScrollInterval: ReturnType<typeof setInterval> | null = null;
  private readonly catsScrollSpeed = 1;
  private readonly catsScrollIntervalMs = 35;
  private readonly catsScrollStep = 180;

  readonly categories = signal<{ key: string; slug?: string }[]>([
    { key: 'blog.catStores' },
    { key: 'blog.catSaving' },
    { key: 'blog.catFathersDay' },
    { key: 'blog.catMothersDay' },
    { key: 'blog.catBackToSchool' },
    { key: 'blog.catNationalDay' },
    { key: 'blog.catTodayOffers' },
    { key: 'blog.catPrimeDay' },
    { key: 'blog.catFunnyStories' },
    { key: 'blog.catYearEnd2025' },
    { key: 'blog.catWinter' },
    { key: 'blog.catBeauty' },
    { key: 'blog.catBestSellers' },
    { key: 'blog.catSaudiWinter' },
    { key: 'blog.catNewTrending' },
    { key: 'blog.catNewYear' },
    { key: 'blog.catHealthFitness' },
    { key: 'blog.catRamadan2026' },
  ]);

  readonly allPosts = signal<BlogPost[]>(BLOG_POSTS);
  readonly recentPosts = signal<BlogPost[]>(BLOG_POSTS.slice(0, 12));
  readonly mostViewedPosts = signal<BlogPost[]>(BLOG_POSTS.slice(0, 12));

  formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString('ar-SA', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  ngAfterViewInit(): void {
    const el = this.blogCatsStripRef?.nativeElement;
    if (!el) return;
    const maxScroll = () => el.scrollWidth - el.clientWidth;
    this.catsScrollInterval = setInterval(() => {
      el.scrollLeft += this.catsScrollSpeed;
      if (el.scrollLeft >= maxScroll()) el.scrollLeft = 0;
    }, this.catsScrollIntervalMs);
  }

  ngOnDestroy(): void {
    if (this.catsScrollInterval) clearInterval(this.catsScrollInterval);
  }

  scrollCats(direction: number): void {
    const el = this.blogCatsStripRef?.nativeElement;
    if (!el) return;
    const step = this.catsScrollStep * direction;
    el.scrollBy({ left: step, behavior: 'smooth' });
  }
}
