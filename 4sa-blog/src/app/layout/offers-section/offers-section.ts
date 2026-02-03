import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

export type OfferType = 'direct' | 'coupon';

export interface OfferCard {
  id: string;
  storeName: string;
  storeLogoUrl?: string;
  storeUrl?: string;
  offerTitle: string;
  /** سطر ثانوي يوضح نوع العرض (بدون تكرار العنوان) */
  offerTypeLabel: string;
  offerType: OfferType;
  /** كود الكوبون إن وُجد (للعروض من نوع coupon) */
  couponCode?: string;
  isNew: boolean;
}

/** صور المتاجر من public/img (مكان مؤقت حتى إضافة شعارات المتاجر الفعلية) */
const STORE_IMAGES = [
  '/img/بنر رئيسي.jpeg',
  '/img/بنر صغير بجوار البنر.png',
  '/img/صورة البنر الرئيسي.jpeg',
  '/img/بنر الرئيسي.png',
];

const DEFAULT_OFFERS: OfferCard[] = [
  {
    id: '1',
    storeName: 'Amazon',
    storeLogoUrl: STORE_IMAGES[0],
    storeUrl: 'https://www.amazon.sa',
    offerTitle: 'عروض رمضان حتى 80% خصم',
    offerTypeLabel: 'الخصم يطبّق تلقائياً في المتجر',
    offerType: 'direct',
    isNew: true,
  },
  {
    id: '2',
    storeName: 'Noon',
    storeLogoUrl: STORE_IMAGES[1],
    storeUrl: 'https://www.noon.com',
    offerTitle: 'تجهيزات رمضان حتى 70% خصم + 15% كاش باك',
    offerTypeLabel: 'الخصم يطبّق تلقائياً في المتجر',
    offerType: 'direct',
    isNew: true,
  },
  {
    id: '3',
    storeName: 'To You',
    storeLogoUrl: STORE_IMAGES[2],
    storeUrl: 'https://toyou.sa',
    offerTitle: 'خصم 30% + توصيل مجاني + 30 ريال كاش باك',
    offerTypeLabel: 'كوبون خصم + كاش باك',
    offerType: 'coupon',
    couponCode: 'RAMADAN30',
    isNew: true,
  },
  {
    id: '4',
    storeName: 'Jarir',
    storeLogoUrl: STORE_IMAGES[3],
    storeUrl: 'https://www.jarir.com',
    offerTitle: 'إلكترونيات رمضان حتى 50% خصم',
    offerTypeLabel: 'كود خصم رمضان 2026',
    offerType: 'coupon',
    couponCode: 'JARIR50',
    isNew: true,
  },
  {
    id: '5',
    storeName: 'Extra',
    storeLogoUrl: STORE_IMAGES[0],
    storeUrl: 'https://www.extra.com',
    offerTitle: 'خصم 20% على أول طلب + توصيل مجاني',
    offerTypeLabel: 'صالح على أول طلب فقط',
    offerType: 'coupon',
    couponCode: 'EXTRA20',
    isNew: false,
  },
];

@Component({
  selector: 'app-offers-section',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './offers-section.html',
  styleUrl: './offers-section.scss',
})
export class OffersSection implements AfterViewInit, OnDestroy {
  @ViewChild('cardsWrap') cardsWrapRef!: ElementRef<HTMLElement>;

  private readonly translate = inject(TranslateService);

  /** إن وُجد يُستخدم بدلاً من ترجمة offers.mainTitle */
  readonly mainTitle = input<string | undefined>(undefined);
  /** إن وُجد يُستخدم بدلاً من ترجمة offers.subTitle */
  readonly subTitle = input<string | undefined>(undefined);
  readonly offers = input<OfferCard[]>(DEFAULT_OFFERS);
  /** رابط "عرض الكل" (إن لم يُحدد يُستخدم #) */
  readonly viewAllUrl = input<string>('#');

  /** معرف العرض الذي تم نسخ كوده (الزر يعرض "تم نسخ الكود") */
  readonly copiedOfferId = signal<string | null>(null);
  /** إظهار سهم السابق */
  readonly canScrollPrev = signal(false);
  /** إظهار سهم التالي */
  readonly canScrollNext = signal(false);

  private copyResetTimeout: ReturnType<typeof setTimeout> | null = null;
  private autoSlideInterval: ReturnType<typeof setInterval> | null = null;
  private readonly scrollStep = 300;
  private readonly autoSlideDelayMs = 5000;
  private readonly copyFeedbackMs = 2500;

  getButtonLabel(offer: OfferCard): string {
    if (offer.offerType === 'direct') return this.translate.instant('offers.goToOffer');
    return this.copiedOfferId() === offer.id
      ? this.translate.instant('offers.copiedCode')
      : this.translate.instant('offers.copyCode');
  }

  onCopyCode(offer: OfferCard): void {
    if (offer.offerType !== 'coupon' || !offer.couponCode) return;
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(offer.couponCode).then(() => {
        this.setCopiedFeedback(offer.id);
      });
    } else {
      this.setCopiedFeedback(offer.id);
    }
  }

  private setCopiedFeedback(offerId: string): void {
    if (this.copyResetTimeout) clearTimeout(this.copyResetTimeout);
    this.copiedOfferId.set(offerId);
    this.copyResetTimeout = setTimeout(() => {
      this.copiedOfferId.set(null);
      this.copyResetTimeout = null;
    }, this.copyFeedbackMs);
  }

  onGoToOffer(offer: OfferCard): void {
    if (offer.offerType === 'direct' && offer.storeUrl) {
      window.open(offer.storeUrl, '_blank', 'noopener,noreferrer');
    }
  }

  ngAfterViewInit(): void {
    this.updateScrollState();
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
    const el = this.cardsWrapRef?.nativeElement;
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
    const el = this.cardsWrapRef?.nativeElement;
    if (!el) return;
    const step = document.documentElement.dir === 'rtl' ? this.scrollStep : -this.scrollStep;
    el.scrollBy({ left: step, behavior: 'smooth' });
    setTimeout(() => this.updateScrollState(), 350);
  }

  scrollNext(): void {
    const el = this.cardsWrapRef?.nativeElement;
    if (!el) return;
    const step = document.documentElement.dir === 'rtl' ? -this.scrollStep : this.scrollStep;
    el.scrollBy({ left: step, behavior: 'smooth' });
    setTimeout(() => this.updateScrollState(), 350);
  }

  private startAutoSlide(): void {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      const el = this.cardsWrapRef?.nativeElement;
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

  onCardsWrapMouseEnter(): void {
    this.stopAutoSlide();
  }

  onCardsWrapMouseLeave(): void {
    this.startAutoSlide();
  }
}
