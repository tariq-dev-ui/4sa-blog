import { Component, output, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/** بيانات العرض لعرضها في النافذة المنبثقة (قابلة لإعادة الاستخدام في أي صفحة) */
export interface OfferDetailModalData {
  id: string;
  storeName: string;
  storeLogoUrl?: string;
  storeUrl?: string;
  offerTitle: string;
  offerTypeLabel: string;
  offerType: 'direct' | 'coupon';
  couponCode?: string;
  /** نسبة الخصم أو نص مختصر (اختياري) */
  discount?: string;
}

@Component({
  selector: 'app-offer-detail-modal',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './offer-detail-modal.html',
  styleUrl: './offer-detail-modal.scss',
})
export class OfferDetailModal {
  /** هل النافذة مفتوحة */
  readonly isOpen = input<boolean>(false);
  /** بيانات العرض (عند null لا يُعرض المحتوى) */
  readonly offer = input<OfferDetailModalData | null>(null);

  /** يُصدَر عند طلب إغلاق النافذة (X أو النقر على الخلفية) */
  readonly closed = output<void>();

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(e: Event): void {
    if ((e.target as HTMLElement).classList.contains('offer-modal-backdrop')) {
      this.close();
    }
  }

  copyCode(code: string): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(code);
    }
    this.close();
  }

  goToStore(url: string | undefined): void {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  }
}
