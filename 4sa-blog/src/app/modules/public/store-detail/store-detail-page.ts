import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

import {
  getStoreDetailBySlug,
  type StoreDetailCoupon,
} from '../../../core/data/store-detail.data';
import { Banner } from '../../../layout/banner/banner';
import type { BreadcrumbItem } from '../../../shared/breadcrumb/breadcrumb';
import { Breadcrumb } from '../../../shared/breadcrumb/breadcrumb';

function buildCouponPagination(
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
  selector: 'app-store-detail-page',
  standalone: true,
  imports: [TranslatePipe, Breadcrumb, Banner, RouterLink],
  templateUrl: './store-detail-page.html',
  styleUrl: './store-detail-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreDetailPage implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly translate = inject(TranslateService);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('slug'))),
    { initialValue: null },
  );

  readonly store = computed(() => getStoreDetailBySlug(this.slug()));

  readonly breadcrumbItems = computed<BreadcrumbItem[]>(() => {
    const s = this.store();
    if (!s) return [];
    return [
      { route: '/', labelKey: 'breadcrumb.home', icon: 'home' },
      { route: '/stores', labelKey: 'storesPage.breadcrumbStores' },
      { labelKey: s.titleKey },
    ];
  });

  readonly notFoundBreadcrumb: BreadcrumbItem[] = [
    { route: '/', labelKey: 'breadcrumb.home', icon: 'home' },
    { route: '/stores', labelKey: 'storesPage.breadcrumbStores' },
    { labelKey: 'storeDetail.page.notFoundBreadcrumb' },
  ];

  readonly copiedCodeId = signal<string | null>(null);
  private copyResetTimeout: ReturnType<typeof setTimeout> | null = null;

  /** عدد أكواد الخصم في كل صفحة (صف واحد: 4 في الديسكتوب، شبكة 2×2 في الهاتف) */
  readonly couponPageSize = 4;

  readonly currentCouponPage = signal(1);

  readonly couponTotalPages = computed(() => {
    const s = this.store();
    const n = s?.coupons.length ?? 0;
    if (n === 0) return 1;
    return Math.max(1, Math.ceil(n / this.couponPageSize));
  });

  readonly paginatedCoupons = computed((): readonly StoreDetailCoupon[] => {
    const s = this.store();
    if (!s) return [];
    const list = s.coupons;
    const tp = this.couponTotalPages();
    const p = Math.min(Math.max(1, this.currentCouponPage()), tp);
    const start = (p - 1) * this.couponPageSize;
    return list.slice(start, start + this.couponPageSize);
  });

  readonly couponPaginationItems = computed(() =>
    buildCouponPagination(
      Math.min(Math.max(1, this.currentCouponPage()), this.couponTotalPages()),
      this.couponTotalPages()
    )
  );

  constructor() {
    effect(() => {
      this.slug();
      untracked(() => this.currentCouponPage.set(1));
    });

    effect(() => {
      this.store();
      this.paginatedCoupons();
      untracked(() => {
        const tp = this.couponTotalPages();
        if (this.currentCouponPage() > tp) {
          this.currentCouponPage.set(tp);
        }
      });
    });

    effect(() => {
      const s = this.store();
      if (s) {
        const pageTitle = this.translate.instant(s.titleKey);
        const site = this.translate.instant('storeDetail.page.siteTitleSuffix');
        this.title.setTitle(`${pageTitle} | ${site}`);
      }
    });
  }

  goToCouponPage(page: number): void {
    const tp = this.couponTotalPages();
    this.currentCouponPage.set(Math.min(Math.max(1, page), tp));
  }

  couponPaginationPrev(): void {
    this.currentCouponPage.update((p) => Math.max(1, p - 1));
  }

  couponPaginationNext(): void {
    const tp = this.couponTotalPages();
    this.currentCouponPage.update((p) => Math.min(tp, p + 1));
  }

  onCopyCode(code: string, id: string): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(code).then(() => this.setCopied(id));
    } else {
      this.setCopied(id);
    }
  }

  private setCopied(id: string): void {
    if (this.copyResetTimeout) clearTimeout(this.copyResetTimeout);
    this.copiedCodeId.set(id);
    this.copyResetTimeout = setTimeout(() => {
      this.copiedCodeId.set(null);
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
