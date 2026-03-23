import { ChangeDetectionStrategy, Component, OnDestroy, computed, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Breadcrumb } from '../../../shared/breadcrumb/breadcrumb';
import type { BreadcrumbItem } from '../../../shared/breadcrumb/breadcrumb';
import type { StoreCouponItem } from '../../../layout/stores-strip/stores-strip';

/** عنصر متجر في صفحة المتاجر: يضاف عدد الأكواد ونسبة الخصم المعروضة */
export interface StorePageItem extends StoreCouponItem {
  /** عدد أكواد الخصم لهذا المتجر */
  couponCount: number;
  /** نسبة الخصم المعروضة فقط (مثل "30%" أو "حتى 70%") */
  discountLabel: string;
}

const STORE_LOGOS = [
  '/img/بنر رئيسي.jpeg',
  '/img/بنر صغير بجوار البنر.png',
  '/img/صورة البنر الرئيسي.jpeg',
  '/img/بنر الرئيسي.png',
];

const STORES_PAGE_DATA: StorePageItem[] = [
  { id: '1', storeName: 'تيمو', code: 'TEM30', description: 'خصم 30% للعملاء الجدد', logoUrl: STORE_LOGOS[0], storeUrl: 'https://www.temu.com', couponCount: 12, discountLabel: '30%' },
  { id: '2', storeName: 'نون', code: 'ALC57', description: 'كاش باك 10%', logoUrl: STORE_LOGOS[1], storeUrl: 'https://www.noon.com', couponCount: 8, discountLabel: '10%' },
  { id: '3', storeName: 'أمازون السعودية', code: 'AMZ20', description: 'خصومات حتى 70%', logoUrl: STORE_LOGOS[2], storeUrl: 'https://www.amazon.sa', couponCount: 15, discountLabel: 'حتى 70%' },
  { id: '4', storeName: 'نمشي', code: 'ACP42', description: 'تخفيض حتى 10%', logoUrl: STORE_LOGOS[3], storeUrl: 'https://www.namshi.com', couponCount: 6, discountLabel: '10%' },
  { id: '5', storeName: 'أناس', code: 'ANAS15', description: 'خصم 15%', logoUrl: STORE_LOGOS[0], storeUrl: 'https://www.anass.com', couponCount: 5, discountLabel: '15%' },
  { id: '6', storeName: 'شي إن', code: 'SHEIN25', description: 'خصم حتى 25%', logoUrl: STORE_LOGOS[1], storeUrl: 'https://www.shein.com', couponCount: 9, discountLabel: '25%' },
  { id: '7', storeName: 'اسوس', code: 'AABB', description: 'خصم 25%', logoUrl: STORE_LOGOS[2], storeUrl: 'https://www.asos.com', couponCount: 4, discountLabel: '25%' },
  { id: '8', storeName: 'اي هيرب', code: 'LNI1840', description: 'تخفيضات حتى 50%', logoUrl: STORE_LOGOS[3], storeUrl: 'https://www.iherb.com', couponCount: 11, discountLabel: '50%' },
  { id: '9', storeName: '6 ستريت', code: 'ALC9', description: 'خصومات حتى 80%', logoUrl: STORE_LOGOS[0], storeUrl: 'https://www.6thstreet.com', couponCount: 7, discountLabel: '80%' },
  { id: '10', storeName: 'النهدي', code: 'VYBK', description: 'خصومات تصل إلى 50%', logoUrl: STORE_LOGOS[1], storeUrl: 'https://www.alahli.com', couponCount: 3, discountLabel: '50%' },
  { id: '11', storeName: 'ممزورلد', code: 'LOVE10', description: 'كوبون خصم 17%', logoUrl: STORE_LOGOS[2], storeUrl: 'https://www.mamaworld.com', couponCount: 5, discountLabel: '17%' },
  { id: '12', storeName: 'جرير', code: 'JARIR10', description: 'خصم 10%', logoUrl: STORE_LOGOS[3], storeUrl: 'https://www.jarir.com', couponCount: 10, discountLabel: '10%' },
  { id: '13', storeName: 'إكسترا', code: 'EXTRA20', description: 'خصم حتى 20%', logoUrl: STORE_LOGOS[0], storeUrl: 'https://www.extra.com', couponCount: 6, discountLabel: '20%' },
  { id: '14', storeName: 'كالو', code: 'C52', description: 'خصم لغاية 40%', logoUrl: STORE_LOGOS[1], storeUrl: '#', couponCount: 2, discountLabel: '40%' },
  { id: '15', storeName: 'ريفا فاشون', code: 'BB44', description: 'خصم 10%', logoUrl: STORE_LOGOS[2], storeUrl: '#', couponCount: 4, discountLabel: '10%' },
  { id: '16', storeName: 'قولدن سنت للعطور', code: 'D245', description: 'خصم 5%', logoUrl: STORE_LOGOS[3], storeUrl: '#', couponCount: 1, discountLabel: '5%' },
];

export type StoreSortBy = 'popular' | 'newest' | 'az';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [TranslatePipe, Breadcrumb],
  templateUrl: './stores.html',
  styleUrl: './stores.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Stores implements OnDestroy {
  /** بنر هيرو صفحة المتاجر — عرض الشاشة بالكامل */
  readonly heroBannerSrc =
    '/img/' + encodeURIComponent('بنر رئيسي.jpeg');

  readonly breadcrumbItems: BreadcrumbItem[] = [
    { route: '/', labelKey: 'breadcrumb.home', icon: 'home' },
    { labelKey: 'storesPage.breadcrumbStores' },
  ];

  private readonly storesData = signal<StorePageItem[]>(STORES_PAGE_DATA);
  readonly sortBy = signal<StoreSortBy>('popular');
  readonly sortDropdownOpen = signal(false);
  readonly searchQuery = signal('');
  readonly copiedId = signal<string | null>(null);
  private copyResetTimeout: ReturnType<typeof setTimeout> | null = null;

  readonly stores = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    let list = [...this.storesData()];
    if (q) {
      list = list.filter(
        (s) =>
          s.storeName.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q)
      );
    }
    const by = this.sortBy();
    if (by === 'az') {
      list.sort((a, b) => a.storeName.localeCompare(b.storeName, 'ar'));
    }
    return list;
  });

  readonly storeCount = computed(() => this.stores().length);

  onSearchInput(event: Event): void {
    const el = event.target as HTMLInputElement;
    this.searchQuery.set(el.value);
  }

  setSort(value: StoreSortBy): void {
    this.sortBy.set(value);
    this.sortDropdownOpen.set(false);
  }

  toggleSortDropdown(): void {
    this.sortDropdownOpen.update((v) => !v);
  }

  onCopyCode(store: StorePageItem): void {
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

  ngOnDestroy(): void {
    if (this.copyResetTimeout) {
      clearTimeout(this.copyResetTimeout);
      this.copyResetTimeout = null;
    }
  }
}
