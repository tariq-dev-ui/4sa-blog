import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import {
  type OfferCard,
  DEFAULT_OFFERS,
} from '../../core/data/offers.data';
import { OfferDetailModal } from '../../shared/offer-detail-modal/offer-detail-modal';

export type { OfferCard };

@Component({
  selector: 'app-offers-section',
  standalone: true,
  imports: [TranslatePipe, OfferDetailModal, RouterLink],
  templateUrl: './offers-section.html',
  styleUrl: './offers-section.scss',
})
export class OffersSection implements AfterViewInit, OnDestroy {
  @ViewChild('cardsWrap') cardsWrapRef!: ElementRef<HTMLElement>;

  private readonly translate = inject(TranslateService);

  readonly mainTitle = input<string | undefined>(undefined);
  readonly sectionTitleKey = input<string | undefined>(undefined);
  readonly subTitle = input<string | undefined>(undefined);
  readonly offers = input<OfferCard[]>(DEFAULT_OFFERS);
  readonly viewAllUrl = input<string>('/offers');
  readonly showBackground = input<boolean>(true);
  readonly titleId = input<string>('offers-main-title');
  /** شريط تمرير (الرئيسية) أو شبكة (صفحة جميع العروض) */
  readonly displayMode = input<'carousel' | 'grid'>('carousel');
  /** إظهار رابط «عرض الكل» في الرأس */
  readonly showViewAllLink = input<boolean>(true);
  /** إظهار صف العنوان والأسهم (عطّله في صفحة مخصصة لها عنوان خارجي) */
  readonly showSectionHeader = input<boolean>(true);
  /** عند إخفاء الرأس: معرّف عنصر عنوان خارجي لـ aria-labelledby (مثل h1 الصفحة) */
  readonly labelledByHeadingId = input<string | null>(null);

  readonly copiedOfferId = signal<string | null>(null);
  readonly canScrollPrev = signal(false);
  readonly canScrollNext = signal(false);
  readonly selectedOfferForModal = signal<OfferCard | null>(null);

  @HostBinding('class.offers-section-host--modal-open') get hasModalOpen(): boolean {
    return !!this.selectedOfferForModal();
  }

  private copyResetTimeout: ReturnType<typeof setTimeout> | null = null;
  private autoSlideInterval: ReturnType<typeof setInterval> | null = null;
  private readonly scrollStep = 300;
  private readonly autoSlideDelayMs = 5000;
  private readonly copyFeedbackMs = 2500;

  isExternalViewAll(): boolean {
    const u = this.viewAllUrl();
    return u.startsWith('http://') || u.startsWith('https://') || u.startsWith('//');
  }

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

  openOfferModal(offer: OfferCard): void {
    this.selectedOfferForModal.set(offer);
  }

  closeOfferModal(): void {
    this.selectedOfferForModal.set(null);
  }

  ngAfterViewInit(): void {
    this.updateScrollState();
    if (this.displayMode() === 'carousel') {
      this.startAutoSlide();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
    if (this.copyResetTimeout) clearTimeout(this.copyResetTimeout);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.displayMode() === 'carousel') {
      this.updateScrollState();
    }
  }

  onCardsScroll(): void {
    if (this.displayMode() === 'carousel') {
      this.updateScrollState();
    }
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
    if (this.displayMode() === 'carousel') {
      this.stopAutoSlide();
    }
  }

  onCardsWrapMouseLeave(): void {
    if (this.displayMode() === 'carousel') {
      this.startAutoSlide();
    }
  }
}
