import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  input,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

export interface StoreCouponItem {
  id: string;
  storeName: string;
  code: string;
  description: string;
  /** رابط شعار المتجر (اختياري) */
  logoUrl?: string;
  /** رابط زيارة المتجر (اختياري) */
  storeUrl?: string;
}

const STORE_LOGOS = [
  '/img/بنر رئيسي.jpeg',
  '/img/بنر صغير بجوار البنر.png',
  '/img/صورة البنر الرئيسي.jpeg',
  '/img/بنر الرئيسي.png',
];

const DEFAULT_STORES: StoreCouponItem[] = [
  { id: '1', storeName: 'تيمو', code: 'TEM30', description: 'خصم 30% للعملاء الجدد', logoUrl: STORE_LOGOS[0], storeUrl: 'https://www.temu.com' },
  { id: '2', storeName: 'اسوس', code: 'AABB', description: 'خصم 25%', logoUrl: STORE_LOGOS[1], storeUrl: 'https://www.asos.com' },
  { id: '3', storeName: 'اي هيرب', code: 'LNI1840', description: 'تخفيضات رمضان حتى 50%', logoUrl: STORE_LOGOS[2], storeUrl: 'https://www.iherb.com' },
  { id: '4', storeName: 'المطار', code: 'ARA22', description: 'كاش باك 5%', logoUrl: STORE_LOGOS[3], storeUrl: '#' },
  { id: '5', storeName: 'نون', code: 'ALC57', description: 'كاش باك 10%', logoUrl: STORE_LOGOS[0], storeUrl: 'https://www.noon.com' },
  { id: '6', storeName: 'ريفا فاشون', code: 'BB44', description: 'خصم 10%', logoUrl: STORE_LOGOS[1], storeUrl: '#' },
  { id: '7', storeName: 'النهدي', code: 'VYBK', description: 'خصومات تصل إلى 50% + كوبون 5%', logoUrl: STORE_LOGOS[2], storeUrl: 'https://www.alahli.com' },
  { id: '8', storeName: 'كالو', code: 'C52', description: 'خصم لغاية 40%', logoUrl: STORE_LOGOS[3], storeUrl: '#' },
  { id: '9', storeName: 'ممزورلد', code: 'LOVE10', description: 'كوبون خصم 17%', logoUrl: STORE_LOGOS[0], storeUrl: 'https://www.mamaworld.com' },
  { id: '10', storeName: 'نمشي', code: 'ACP42', description: 'تخفيض حتى 10% + 5% كاش باك', logoUrl: STORE_LOGOS[1], storeUrl: 'https://www.namshi.com' },
  { id: '11', storeName: '6 ستريت', code: 'ALC9', description: 'خصومات حصرية حتى 80% + 16% خصم إضافي', logoUrl: STORE_LOGOS[2], storeUrl: 'https://www.6thstreet.com' },
  { id: '12', storeName: 'قولدن سنت للعطور', code: 'D245', description: 'خصم 5%', logoUrl: STORE_LOGOS[3], storeUrl: '#' },
];

@Component({
  selector: 'app-stores-strip',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './stores-strip.html',
  styleUrl: './stores-strip.scss',
})
export class StoresStrip implements AfterViewInit, OnDestroy {
  @ViewChild('stripWrap') stripWrapRef!: ElementRef<HTMLElement>;

  readonly stores = input<StoreCouponItem[]>(DEFAULT_STORES);
  readonly viewAllUrl = input<string>('/stores');
  readonly titleId = input<string>('stores-strip-title');

  readonly canScrollPrev = signal(false);
  readonly canScrollNext = signal(false);
  readonly copiedId = signal<string | null>(null);

  private autoSlideInterval: ReturnType<typeof setInterval> | null = null;
  private readonly scrollStep = 220;
  private readonly autoSlideDelayMs = 5000;
  private copyResetTimeout: ReturnType<typeof setTimeout> | null = null;

  ngAfterViewInit(): void {
    this.updateScrollState();
    setTimeout(() => this.updateScrollState(), 150);
    setTimeout(() => this.updateScrollState(), 500);
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
    if (this.copyResetTimeout) clearTimeout(this.copyResetTimeout);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateScrollState();
  }

  updateScrollState(): void {
    const el = this.stripWrapRef?.nativeElement;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const isRtl = document.documentElement.dir === 'rtl';
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      this.canScrollPrev.set(false);
      this.canScrollNext.set(false);
      return;
    }
    if (isRtl) {
      this.canScrollPrev.set(scrollLeft < -2);
      this.canScrollNext.set(scrollLeft > -maxScroll + 2);
    } else {
      this.canScrollPrev.set(scrollLeft > 2);
      this.canScrollNext.set(scrollLeft < maxScroll - 2);
    }
  }

  scrollPrev(): void {
    if (!this.canScrollPrev()) return;
    const el = this.stripWrapRef?.nativeElement;
    if (!el) return;
    const step = document.documentElement.dir === 'rtl' ? this.scrollStep : -this.scrollStep;
    el.scrollBy({ left: step, behavior: 'smooth' });
    setTimeout(() => this.updateScrollState(), 350);
  }

  scrollNext(): void {
    if (!this.canScrollNext()) return;
    const el = this.stripWrapRef?.nativeElement;
    if (!el) return;
    const step = document.documentElement.dir === 'rtl' ? -this.scrollStep : this.scrollStep;
    el.scrollBy({ left: step, behavior: 'smooth' });
    setTimeout(() => this.updateScrollState(), 350);
  }

  onCopyCode(store: StoreCouponItem): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(store.code).then(() => this.setCopied(store.id));
    } else {
      this.setCopied(store.id);
    }
  }

  private setCopied(id: string): void {
    if (this.copyResetTimeout) clearTimeout(this.copyResetTimeout);
    this.copiedId.set(id);
    this.copyResetTimeout = setTimeout(() => {
      this.copiedId.set(null);
      this.copyResetTimeout = null;
    }, 2500);
  }

  private startAutoSlide(): void {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      const el = this.stripWrapRef?.nativeElement;
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
      setTimeout(() => this.updateScrollState(), 350);
    }, this.autoSlideDelayMs);
  }

  private stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  onStripMouseEnter(): void {
    this.stopAutoSlide();
  }

  onStripMouseLeave(): void {
    this.startAutoSlide();
  }
}
