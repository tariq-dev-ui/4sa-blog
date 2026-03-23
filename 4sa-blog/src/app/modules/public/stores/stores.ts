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
import { Banner } from '../../../layout/banner/banner';
import { Breadcrumb } from '../../../shared/breadcrumb/breadcrumb';
import type { BreadcrumbItem } from '../../../shared/breadcrumb/breadcrumb';
import type { StoreCouponItem } from '../../../layout/stores-strip/stores-strip';

/** معرّفات فئات شريط التصفح — تطابق عناصر القائمة الجانبية */
export type StoreCategoryId =
  | 'all'
  | 'fashion'
  | 'restaurants'
  | 'electronics'
  | 'delivery'
  | 'beauty'
  | 'kids'
  | 'perfumes'
  | 'flowers'
  | 'abayas'
  | 'furniture'
  | 'pets';

export interface StoreCategoryNavItem {
  id: StoreCategoryId;
  icon: string;
  labelKey: string;
}

/** عنصر متجر في صفحة المتاجر: يضاف عدد الأكواد ونسبة الخصم المعروضة */
export interface StorePageItem extends StoreCouponItem {
  couponCount: number;
  discountLabel: string;
  category: StoreCategoryId;
}

const STORE_LOGOS = [
  '/img/بنر رئيسي.jpeg',
  '/img/بنر صغير بجوار البنر.png',
  '/img/صورة البنر الرئيسي.jpeg',
  '/img/بنر الرئيسي.png',
];

const STORES_PAGE_DATA: StorePageItem[] = [
  { id: '1', storeName: 'تيمو', code: 'TEM30', description: 'خصم 30% للعملاء الجدد', logoUrl: STORE_LOGOS[0], storeUrl: 'https://www.temu.com', couponCount: 12, discountLabel: '30%', category: 'electronics' },
  { id: '2', storeName: 'نون', code: 'ALC57', description: 'كاش باك 10%', logoUrl: STORE_LOGOS[1], storeUrl: 'https://www.noon.com', couponCount: 8, discountLabel: '10%', category: 'delivery' },
  { id: '3', storeName: 'أمازون السعودية', code: 'AMZ20', description: 'خصومات حتى 70%', logoUrl: STORE_LOGOS[2], storeUrl: 'https://www.amazon.sa', couponCount: 15, discountLabel: 'حتى 70%', category: 'electronics' },
  { id: '4', storeName: 'نمشي', code: 'ACP42', description: 'تخفيض حتى 10%', logoUrl: STORE_LOGOS[3], storeUrl: 'https://www.namshi.com', couponCount: 6, discountLabel: '10%', category: 'fashion' },
  { id: '5', storeName: 'أناس', code: 'ANAS15', description: 'خصم 15%', logoUrl: STORE_LOGOS[0], storeUrl: 'https://www.anass.com', couponCount: 5, discountLabel: '15%', category: 'fashion' },
  { id: '6', storeName: 'شي إن', code: 'SHEIN25', description: 'خصم حتى 25%', logoUrl: STORE_LOGOS[1], storeUrl: 'https://www.shein.com', couponCount: 9, discountLabel: '25%', category: 'fashion' },
  { id: '7', storeName: 'اسوس', code: 'AABB', description: 'خصم 25%', logoUrl: STORE_LOGOS[2], storeUrl: 'https://www.asos.com', couponCount: 4, discountLabel: '25%', category: 'fashion' },
  { id: '8', storeName: 'اي هيرب', code: 'LNI1840', description: 'تخفيضات حتى 50%', logoUrl: STORE_LOGOS[3], storeUrl: 'https://www.iherb.com', couponCount: 11, discountLabel: '50%', category: 'beauty' },
  { id: '9', storeName: '6 ستريت', code: 'ALC9', description: 'خصومات حتى 80%', logoUrl: STORE_LOGOS[0], storeUrl: 'https://www.6thstreet.com', couponCount: 7, discountLabel: '80%', category: 'fashion' },
  { id: '10', storeName: 'النهدي', code: 'VYBK', description: 'خصومات تصل إلى 50%', logoUrl: STORE_LOGOS[1], storeUrl: 'https://www.alahli.com', couponCount: 3, discountLabel: '50%', category: 'beauty' },
  { id: '11', storeName: 'ممزورلد', code: 'LOVE10', description: 'كوبون خصم 17%', logoUrl: STORE_LOGOS[2], storeUrl: 'https://www.mamaworld.com', couponCount: 5, discountLabel: '17%', category: 'kids' },
  { id: '12', storeName: 'جرير', code: 'JARIR10', description: 'خصم 10%', logoUrl: STORE_LOGOS[3], storeUrl: 'https://www.jarir.com', couponCount: 10, discountLabel: '10%', category: 'electronics' },
  { id: '13', storeName: 'إكسترا', code: 'EXTRA20', description: 'خصم حتى 20%', logoUrl: STORE_LOGOS[0], storeUrl: 'https://www.extra.com', couponCount: 6, discountLabel: '20%', category: 'electronics' },
  { id: '14', storeName: 'كالو', code: 'C52', description: 'خصم لغاية 40%', logoUrl: STORE_LOGOS[1], storeUrl: '#', couponCount: 2, discountLabel: '40%', category: 'furniture' },
  { id: '15', storeName: 'ريفا فاشون', code: 'BB44', description: 'خصم 10%', logoUrl: STORE_LOGOS[2], storeUrl: '#', couponCount: 4, discountLabel: '10%', category: 'abayas' },
  { id: '16', storeName: 'قولدن سنت للعطور', code: 'D245', description: 'خصم 5%', logoUrl: STORE_LOGOS[3], storeUrl: '#', couponCount: 1, discountLabel: '5%', category: 'perfumes' },
  { id: '17', storeName: 'هنقرستيشن', code: 'HNGR15', description: 'خصم على الطلبات', logoUrl: STORE_LOGOS[0], storeUrl: '#', couponCount: 4, discountLabel: '15%', category: 'restaurants' },
  { id: '18', storeName: 'مسك الورد', code: 'WARD10', description: 'توصيل ورد وبوكيهات', logoUrl: STORE_LOGOS[1], storeUrl: '#', couponCount: 2, discountLabel: '10%', category: 'flowers' },
  { id: '19', storeName: 'بيت الحيوان', code: 'PET20', description: 'مستلزمات الحيوانات الأليفة', logoUrl: STORE_LOGOS[2], storeUrl: '#', couponCount: 3, discountLabel: '20%', category: 'pets' },
];

/** أرقام الصفحات مع نقاط عند وجود فجوات — مثل 1، 2، 3، …، 17 */
function buildStorePagination(
  current: number,
  total: number
): (number | 'ellipsis')[] {
  if (total <= 0) return [];
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = new Set<number>([
    1,
    total,
    current,
    current - 1,
    current + 1,
  ]);
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

export type StoreSortBy = 'popular' | 'newest' | 'az';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [TranslatePipe, Breadcrumb, Banner],
  templateUrl: './stores.html',
  styleUrl: './stores.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Stores implements OnDestroy {
  /** عدد البطاقات لكل صفحة */
  readonly pageSize = 6;

  /** عدد المتاجر لكل فئة (من الكatalog الكامل، بلا بحث) */
  readonly categoryCounts = computed(() => {
    const data = this.storesData();
    const counts: Record<StoreCategoryId, number> = {
      all: data.length,
      fashion: 0,
      restaurants: 0,
      electronics: 0,
      delivery: 0,
      beauty: 0,
      kids: 0,
      perfumes: 0,
      flowers: 0,
      abayas: 0,
      furniture: 0,
      pets: 0,
    };
    for (const s of data) {
      counts[s.category] = (counts[s.category] ?? 0) + 1;
    }
    return counts;
  });

  readonly categoryNavItems: StoreCategoryNavItem[] = [
    { id: 'all', icon: 'bi-grid-3x3-gap', labelKey: 'storesPage.catAll' },
    { id: 'fashion', icon: 'bi-bag-heart', labelKey: 'storesPage.catFashion' },
    { id: 'restaurants', icon: 'bi-cup-hot', labelKey: 'storesPage.catRestaurants' },
    { id: 'electronics', icon: 'bi-laptop', labelKey: 'storesPage.catElectronics' },
    { id: 'delivery', icon: 'bi-truck', labelKey: 'storesPage.catDelivery' },
    { id: 'beauty', icon: 'bi-palette', labelKey: 'storesPage.catBeauty' },
    { id: 'kids', icon: 'bi-balloon-heart', labelKey: 'storesPage.catKids' },
    { id: 'perfumes', icon: 'bi-droplet-half', labelKey: 'storesPage.catPerfumes' },
    { id: 'flowers', icon: 'bi-flower1', labelKey: 'storesPage.catFlowers' },
    { id: 'abayas', icon: 'bi-person-standing-dress', labelKey: 'storesPage.catAbayas' },
    { id: 'furniture', icon: 'bi-lamp', labelKey: 'storesPage.catFurniture' },
    { id: 'pets', icon: 'bi-heart', labelKey: 'storesPage.catPets' },
  ];

  readonly breadcrumbItems: BreadcrumbItem[] = [
    { route: '/', labelKey: 'breadcrumb.home', icon: 'home' },
    { labelKey: 'storesPage.breadcrumbStores' },
  ];

  private readonly storesData = signal<StorePageItem[]>(STORES_PAGE_DATA);
  readonly sortBy = signal<StoreSortBy>('popular');
  readonly sortDropdownOpen = signal(false);
  readonly searchQuery = signal('');
  readonly selectedCategory = signal<StoreCategoryId>('all');
  readonly currentPage = signal(1);
  readonly copiedId = signal<string | null>(null);
  private copyResetTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      this.stores();
      untracked(() => {
        const tp = this.totalPages();
        if (this.currentPage() > tp) {
          this.currentPage.set(tp);
        }
      });
    });
  }

  readonly stores = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const cat = this.selectedCategory();
    let list = [...this.storesData()];
    if (cat !== 'all') {
      list = list.filter((s) => s.category === cat);
    }
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

  readonly totalPages = computed(() => {
    const n = this.stores().length;
    if (n === 0) return 1;
    return Math.max(1, Math.ceil(n / this.pageSize));
  });

  readonly paginatedStores = computed(() => {
    const list = this.stores();
    const tp = this.totalPages();
    const p = Math.min(Math.max(1, this.currentPage()), tp);
    const start = (p - 1) * this.pageSize;
    return list.slice(start, start + this.pageSize);
  });

  readonly paginationItems = computed(() =>
    buildStorePagination(
      Math.min(Math.max(1, this.currentPage()), this.totalPages()),
      this.totalPages()
    )
  );

  onSearchInput(event: Event): void {
    const el = event.target as HTMLInputElement;
    this.searchQuery.set(el.value);
    this.currentPage.set(1);
  }

  setCategory(id: StoreCategoryId): void {
    this.selectedCategory.set(id);
    this.currentPage.set(1);
  }

  setSort(value: StoreSortBy): void {
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
