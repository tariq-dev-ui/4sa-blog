import { AfterViewInit, Component, ElementRef, HostListener, input, OnDestroy, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

export interface ArticleCard {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl?: string;
  categoryKey: string;
  date: string;
  readTimeMinutes?: number;
}

const DEFAULT_ARTICLES: ArticleCard[] = [
  {
    id: '1',
    slug: 'best-ramadan-offers-2026',
    title: 'أفضل عروض رمضان 2026: دليل شامل للتوفير',
    excerpt: 'اكتشف أحدث العروض والخصومات من أشهر المتاجر السعودية في رمضان. كوبونات حصرية وتوصيل مجاني.',
    imageUrl: '/img/بنر رئيسي.jpeg',
    categoryKey: 'articles.catOffers',
    date: '2026-02-01',
    readTimeMinutes: 5,
  },
  {
    id: '2',
    slug: 'ramadan-shopping-tips',
    title: 'نصائح ذكية للتسوق في رمضان وتوفير الميزانية',
    excerpt: 'كيف تخطط لمشتريات رمضان وتتجنب الإنفاق الزائد. استراتيجيات عملية من خبراء التوفير.',
    imageUrl: '/img/بنر صغير بجوار البنر.png',
    categoryKey: 'articles.catTips',
    date: '2026-01-28',
    readTimeMinutes: 4,
  },
  {
    id: '3',
    slug: 'top-cashback-apps-saudi',
    title: 'أفضل تطبيقات الكاش باك في السعودية 2026',
    excerpt: 'مقارنة بين منصات استرداد النقود وكيفية Maximize أرباحك من كل عملية شراء.',
    imageUrl: '/img/صورة البنر الرئيسي.jpeg',
    categoryKey: 'articles.catTech',
    date: '2026-01-25',
    readTimeMinutes: 6,
  },
  {
    id: '4',
    slug: 'ramadan-grocery-guide',
    title: 'دليل مشتريات رمضان: قوائم وجدول تنظيمي',
    excerpt: 'قائمة جاهزة بمستلزمات الشهر الكريم ونصائح تخزين وحفظ الأطعمة.',
    categoryKey: 'articles.catLifestyle',
    date: '2026-01-22',
    readTimeMinutes: 7,
  },
  {
    id: '5',
    slug: 'eid-decorations-on-budget',
    title: 'زينة العيد بميزانية محدودة: أفكار مبتكرة',
    excerpt: 'أفكار ديكور بسيطة وأنيقة لعيد الفطر دون إنفاق كبير. خطوات عملية مع صور.',
    imageUrl: '/img/بنر الرئيسي.png',
    categoryKey: 'articles.catLifestyle',
    date: '2026-01-18',
    readTimeMinutes: 3,
  },
  {
    id: '6',
    slug: 'online-stores-free-shipping',
    title: 'متاجر سعودية بتوصيل مجاني طوال رمضان',
    excerpt: 'قائمة محدثة بأهم المتاجر التي تقدم شحن مجاني بدون حد أدنى للطلب.',
    categoryKey: 'articles.catOffers',
    date: '2026-01-15',
    readTimeMinutes: 4,
  },
];

@Component({
  selector: 'app-articles-section',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './articles-section.html',
  styleUrl: './articles-section.scss',
})
export class ArticlesSection implements AfterViewInit, OnDestroy {
  @ViewChild('gridWrap') gridWrapRef!: ElementRef<HTMLElement>;

  readonly mainTitleKey = input<string>('articles.mainTitle');
  readonly viewAllUrl = input<string>('/posts');
  readonly articles = input<ArticleCard[]>(DEFAULT_ARTICLES);
  readonly titleId = input<string>('articles-section-title');

  private autoSlideInterval: ReturnType<typeof setInterval> | null = null;
  private readonly scrollStep = 320;
  private readonly autoSlideDelayMs = 5000;

  getArticleUrl(article: ArticleCard): string {
    return `/posts/${article.slug}`;
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  ngAfterViewInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  @HostListener('window:resize')
  onResize(): void {}

  private startAutoSlide(): void {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      const el = this.gridWrapRef?.nativeElement;
      if (!el) return;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll <= 0) return;
      const isRtl = document.documentElement.dir === 'rtl';
      if (isRtl) {
        if (scrollLeft <= -maxScroll + 2) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: -this.scrollStep, behavior: 'smooth' });
        }
      } else {
        if (scrollLeft >= maxScroll - 2) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: this.scrollStep, behavior: 'smooth' });
        }
      }
    }, this.autoSlideDelayMs);
  }

  private stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  onGridMouseEnter(): void {
    this.stopAutoSlide();
  }

  onGridMouseLeave(): void {
    this.startAutoSlide();
  }
}
