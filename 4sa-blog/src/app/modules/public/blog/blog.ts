import { AfterViewInit, Component, ElementRef, OnDestroy, signal, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { BlogSidebar } from '../../../layout/blog-sidebar/blog-sidebar';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  categoryKey: string;
  imageUrl: string;
  author: string;
  publishedDate: string;
  updatedDate: string;
}

const BLOG_POSTS: BlogPost[] = [
  { id: '1', slug: 'mothers-day-flawerd', title: 'صحصح – أفضل موقع كوبونات – أفكار هدايا يوم الأم من متجر فلاورد مع كود خصم حصري', categoryKey: 'blog.catMothersDay', imageUrl: '/img/صورة البنر الرئيسي.jpeg', author: 'Hussam', publishedDate: '2026-01-31', updatedDate: '2026-02-05' },
  { id: '2', slug: 'flawerd-vs-joy-gifts', title: 'صحصح – أفضل موقع كوبونات – مقارنة بين فلاورد وجوي قفتس لاختيار الهدايا الفاخرة مع كود خصم فلاورد', categoryKey: 'blog.catStores', imageUrl: '/img/بنر رئيسي.jpeg', author: 'Hussam', publishedDate: '2026-01-31', updatedDate: '2026-02-04' },
  { id: '3', slug: 'bath-body-works', title: 'صحصح – أفضل موقع كوبونات – عروض باث اند بودي وركس للمحلات والأونلاين مع كود خصم باث اند بودي وركس', categoryKey: 'blog.catSaving', imageUrl: '/img/بنر صغير بجوار البنر.png', author: 'Hussam', publishedDate: '2026-01-31', updatedDate: '2026-02-04' },
  { id: '4', slug: 'bath-vs-victoria-secret', title: 'صحصح – أفضل موقع كوبونات – مقارنة بين كود خصم باث اند بودي وركس وكود خصم فيكتوريا سيكرت: أيهما يمنحك قيمة أفضل؟', categoryKey: 'blog.catBeauty', imageUrl: '/img/بنر الرئيسي.png', author: 'Hussam', publishedDate: '2026-01-31', updatedDate: '2026-02-05' },
  { id: '5', slug: 'victoria-secret-perfumes-2026', title: 'صحصح – أفضل موقع كوبونات – أفضل عطور فيكتوريا سيكرت لعام 2026 مع كود خصم فيكتوريا سيكرت', categoryKey: 'blog.catBestSellers', imageUrl: '/img/صورة البنر الرئيسي.jpeg', author: 'Hussam', publishedDate: '2026-01-31', updatedDate: '2026-02-03' },
  { id: '6', slug: 'darua-winter-2026', title: 'صحصح – أفضل موقع كوبونات – عروض باقات الشتاء لمتجر درعة مع كود خصم متجر درعة للعطور شتاء 2026', categoryKey: 'blog.catWinter', imageUrl: '/img/بنر رئيسي.jpeg', author: 'Hussam', publishedDate: '2026-01-31', updatedDate: '2026-02-03' },
  { id: '7', slug: 'darua-new-year-2026', title: 'صحصح – أفضل موقع كوبونات – عروض بداية العام 2026 لمتجر درعة مع كود خصم متجر درعة بداية العام 2026', categoryKey: 'blog.catNewYear', imageUrl: '/img/بنر صغير بجوار البنر.png', author: 'Hussam', publishedDate: '2026-01-29', updatedDate: '2026-02-03' },
  { id: '8', slug: 'darua-vs-namshi', title: 'صحصح – أفضل موقع كوبونات – مقارنة بين كود خصم درعة وكود خصم نمشي عبر موقع صحصح', categoryKey: 'blog.catStores', imageUrl: '/img/بنر الرئيسي.png', author: 'Hussam', publishedDate: '2026-01-29', updatedDate: '2026-02-04' },
  { id: '9', slug: 'darua-women-watches', title: 'صحصح – أفضل موقع كوبونات – أفضل الساعات النسائية من متجر درعة مع كود خصم درعة للساعات النسائية', categoryKey: 'blog.catSaving', imageUrl: '/img/صورة البنر الرئيسي.jpeg', author: 'Hussam', publishedDate: '2026-01-29', updatedDate: '2026-02-03' },
  { id: '10', slug: 'asos-alternatives', title: 'بدائل رخيصة لمتجر أسوس الشهير | موقع صحصح أفضل موقع كوبونات للتسوق الذكي في السعودية', categoryKey: 'blog.catStores', imageUrl: '/img/بنر رئيسي.jpeg', author: 'Hussam', publishedDate: '2026-01-29', updatedDate: '2026-02-04' },
  { id: '11', slug: 'asos-winter-2026', title: 'عروض موقع أسوس للشتاء مع كود خصم أسوس شتاء 2026 | موقع صحصح أفضل موقع كوبونات للتسوق الذكي في السعودية', categoryKey: 'blog.catWinter', imageUrl: '/img/بنر صغير بجوار البنر.png', author: 'Hussam', publishedDate: '2026-01-29', updatedDate: '2026-02-03' },
  { id: '12', slug: 'riyadh-booking-apps', title: 'أفضل تطبيقات حجز أماكن في الرياض مع أكواد خصم حصرية | موقع صحصح أفضل موقع كوبونات للتسوق الذكي', categoryKey: 'blog.catStores', imageUrl: '/img/بنر الرئيسي.png', author: 'Hussam', publishedDate: '2026-01-29', updatedDate: '2026-02-05' },
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
