import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  computed,
  effect,
  signal,
  untracked,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { ALL_OFFERS, type OfferCard } from '../../../core/data/offers.data';
import { Banner } from '../../../layout/banner/banner';
import { OfferDetailModal } from '../../../shared/offer-detail-modal/offer-detail-modal';
import type { BreadcrumbItem } from '../../../shared/breadcrumb/breadcrumb';
import { Breadcrumb } from '../../../shared/breadcrumb/breadcrumb';

export type OfferFilterId = 'all' | 'coupon' | 'direct' | 'new';

export interface OfferFilterNavItem {
  id: OfferFilterId;
  icon: string;
  labelKey: string;
}

export type OfferSortBy = 'popular' | 'newest' | 'az';

function buildOfferPagination(
  current: number,
  total: number
): (number | 'ellipsis')[] {
  if (total <= 0) return [];
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  for (const p of [...pages]) {
    if (p < 1 || p > total) pages.delete(p);
  }
  const sorted = [...pages].sort((a, b) => a - b);
  const out: (number | 'ellipsis')[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      out.push('ellipsis');
    }
    out.push(sorted[i]);
  }
  return out;
}

@Component({
  selector: 'app-offers-page',
  standalone: true,
  imports: [TranslatePipe, Breadcrumb, Banner, OfferDetailModal],
  templateUrl: './offers-page.html',
  styleUrl: './offers-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersPage implements OnDestroy {
  readonly pageSize = 6;

  readonly filterNavItems: OfferFilterNavItem[] = [
    { id: 'all', icon: 'bi-grid-3x3-gap', labelKey: 'offersPage.catAll' },
    { id: 'coupon', icon: 'bi-ticket-perforated', labelKey: 'offersPage.catCoupon' },
    { id: 'direct', icon: 'bi-lightning-charge', labelKey: 'offersPage.catDirect' },
    { id: 'new', icon: 'bi-stars', labelKey: 'offersPage.catNew' },
  ];

  readonly breadcrumbItems: BreadcrumbItem[] = [
    { route: '/', labelKey: 'breadcrumb.home', icon: 'home' },
    { labelKey: 'offersPage.breadcrumbCurrent' },
  ];

  private readonly offersData = signal<OfferCard[]>(ALL_OFFERS);
  readonly sortBy = signal<OfferSortBy>('popular');
  readonly sortDropdownOpen = signal(false);
  readonly searchQuery = signal('');
  readonly selectedFilter = signal<OfferFilterId>('all');
  readonly currentPage = signal(1);
  readonly copiedId = signal<string | null>(null);
  readonly selectedOfferForModal = signal<OfferCard | null>(null);
  private copyResetTimeout: ReturnType<typeof setTimeout> | null = null;

  readonly filterCounts = computed(() => {
    const data = this.offersData();
    return {
      all: data.length,
      coupon: data.filter((o) => o.offerType === 'coupon').length,
      direct: data.filter((o) => o.offerType === 'direct').length,
      new: data.filter((o) => o.isNew).length,
    } satisfies Record<OfferFilterId, number>;
  });

  constructor() {
    effect(() => {
      this.filteredOffers();
      untracked(() => {
        const tp = this.totalPages();
        if (this.currentPage() > tp) {
          this.currentPage.set(tp);
        }
      });
    });
  }

  readonly filteredOffers = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const f = this.selectedFilter();
    let list = [...this.offersData()];
    if (f === 'coupon') {
      list = list.filter((o) => o.offerType === 'coupon');
    } else if (f === 'direct') {
      list = list.filter((o) => o.offerType === 'direct');
    } else if (f === 'new') {
      list = list.filter((o) => o.isNew);
    }
    if (q) {
      list = list.filter(
        (o) =>
          o.storeName.toLowerCase().includes(q) ||
          o.offerTitle.toLowerCase().includes(q) ||
          o.offerTypeLabel.toLowerCase().includes(q) ||
          (o.couponCode?.toLowerCase().includes(q) ?? false) ||
          (o.discount?.toLowerCase().includes(q) ?? false)
      );
    }
    const by = this.sortBy();
    if (by === 'az') {
      list.sort((a, b) => a.storeName.localeCompare(b.storeName, 'ar'));
    } else if (by === 'popular') {
      list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    } else if (by === 'newest') {
      list.sort((a, b) => Number(b.id) - Number(a.id));
    }
    return list;
  });

  readonly offerCount = computed(() => this.filteredOffers().length);

  readonly totalPages = computed(() => {
    const n = this.filteredOffers().length;
    if (n === 0) return 1;
    return Math.max(1, Math.ceil(n / this.pageSize));
  });

  readonly paginatedOffers = computed(() => {
    const list = this.filteredOffers();
    const tp = this.totalPages();
    const p = Math.min(Math.max(1, this.currentPage()), tp);
    const start = (p - 1) * this.pageSize;
    return list.slice(start, start + this.pageSize);
  });

  readonly paginationItems = computed(() =>
    buildOfferPagination(
      Math.min(Math.max(1, this.currentPage()), this.totalPages()),
      this.totalPages()
    )
  );

  onSearchInput(event: Event): void {
    const el = event.target as HTMLInputElement;
    this.searchQuery.set(el.value);
    this.currentPage.set(1);
  }

  setFilter(id: OfferFilterId): void {
    this.selectedFilter.set(id);
    this.currentPage.set(1);
  }

  setSort(value: OfferSortBy): void {
    this.sortBy.set(value);
    this.sortDropdownOpen.set(false);
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    const tp = this.totalPages();
    this.currentPage.set(Math.min(Math.max(1, page), tp));
  }

  paginationPrev(): void {
    this.currentPage.update((p) => Math.max(1, p - 1));
  }

  paginationNext(): void {
    const tp = this.totalPages();
    this.currentPage.update((p) => Math.min(tp, p + 1));
  }

  toggleSortDropdown(): void {
    this.sortDropdownOpen.update((v) => !v);
  }

  onCopyCode(offer: OfferCard): void {
    const code = offer.couponCode;
    if (!code) return;
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(code).then(() => this.setCopied(offer.id));
    } else {
      this.setCopied(offer.id);
    }
  }

  openOfferModal(offer: OfferCard): void {
    this.selectedOfferForModal.set(offer);
  }

  closeOfferModal(): void {
    this.selectedOfferForModal.set(null);
  }

  private setCopied(id: string): void {
    if (this.copyResetTimeout) clearTimeout(this.copyResetTimeout);
    this.copiedId.set(id);
    this.copyResetTimeout = setTimeout(() => {
      this.copiedId.set(null);
      this.copyResetTimeout = null;
    }, 2500);
  }

  ngOnDestroy(): void {
    if (this.copyResetTimeout) {
      clearTimeout(this.copyResetTimeout);
      this.copyResetTimeout = null;
    }
  }
}
