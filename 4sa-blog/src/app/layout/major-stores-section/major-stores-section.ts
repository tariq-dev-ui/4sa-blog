import {
  AfterViewInit,
  Component,
  ElementRef,
  signal,
  ViewChild,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export interface FeaturedStore {
  id: string;
  name: string;
  imageUrl: string;
  url: string;
  couponsCount: number;
  offersCount: number;
}

export interface StoreCard {
  id: string;
  name: string;
  logoUrl: string | null;
  url: string;
  couponsCount: number;
  offersCount: number;
}

const CARD_WIDTH = 160;
const CARD_HEIGHT = 181;
const ROWS = 3;
const GAP = 12;
const CARDS_PER_PAGE = 12; // 4 columns × 3 rows

@Component({
  selector: 'app-major-stores-section',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './major-stores-section.html',
  styleUrl: './major-stores-section.scss',
})
export class MajorStoresSection implements AfterViewInit {
  @ViewChild('gridWrap') gridWrapRef!: ElementRef<HTMLElement>;

  readonly featuredStore = signal<FeaturedStore>({
    id: 'iherb',
    name: 'اي هيرب',
    imageUrl: '/img/صورة البنر الرئيسي.jpeg',
    url: 'https://www.iherb.com',
    couponsCount: 7,
    offersCount: 0,
  });

  /** روابط شعارات المتاجر (Clearbit أو مسارات محلية مثل /img/stores/اسم.png) */
  readonly storeCards = signal<StoreCard[]>([
    { id: '1', name: 'أمازون', logoUrl: 'https://logo.clearbit.com/amazon.com', url: '#', couponsCount: 12, offersCount: 5 },
    { id: '2', name: 'نون', logoUrl: 'https://logo.clearbit.com/noon.com', url: '#', couponsCount: 8, offersCount: 3 },
    { id: '3', name: 'جرير', logoUrl: 'https://logo.clearbit.com/jarir.com', url: '#', couponsCount: 6, offersCount: 2 },
    { id: '4', name: 'إكسترا', logoUrl: 'https://logo.clearbit.com/extra.com', url: '#', couponsCount: 4, offersCount: 1 },
    { id: '5', name: 'نمشي', logoUrl: 'https://logo.clearbit.com/namshi.com', url: '#', couponsCount: 10, offersCount: 4 },
    { id: '6', name: 'سيفورا', logoUrl: 'https://logo.clearbit.com/sephora.com', url: '#', couponsCount: 5, offersCount: 2 },
    { id: '7', name: 'علي إكسبريس', logoUrl: 'https://logo.clearbit.com/aliexpress.com', url: '#', couponsCount: 15, offersCount: 6 },
    { id: '8', name: 'شي إن', logoUrl: 'https://logo.clearbit.com/shein.com', url: '#', couponsCount: 9, offersCount: 3 },
    { id: '9', name: 'جوميا', logoUrl: 'https://logo.clearbit.com/jumia.com', url: '#', couponsCount: 7, offersCount: 2 },
    { id: '10', name: 'ازهلها', logoUrl: null, url: '#', couponsCount: 4, offersCount: 1 },
    { id: '11', name: 'AZADEA', logoUrl: 'https://logo.clearbit.com/azadea.com', url: '#', couponsCount: 6, offersCount: 2 },
    { id: '12', name: 'أروم للأثاث', logoUrl: null, url: '#', couponsCount: 3, offersCount: 0 },
    { id: '13', name: 'ASRARI', logoUrl: null, url: '#', couponsCount: 5, offersCount: 1 },
    { id: '14', name: 'Aster', logoUrl: null, url: '#', couponsCount: 8, offersCount: 3 },
    { id: '15', name: 'افوكادو', logoUrl: null, url: '#', couponsCount: 4, offersCount: 1 },
    { id: '16', name: 'asos', logoUrl: 'https://logo.clearbit.com/asos.com', url: '#', couponsCount: 10, offersCount: 4 },
    { id: '17', name: 'أسناس', logoUrl: null, url: '#', couponsCount: 6, offersCount: 2 },
    { id: '18', name: 'نمشي', logoUrl: 'https://logo.clearbit.com/namshi.com', url: '#', couponsCount: 9, offersCount: 3 },
  ]);

  readonly currentPage = signal(0);
  readonly paginationDots = signal<{ index: number; active: boolean }[]>([]);

  ngAfterViewInit(): void {
    this.updatePaginationDots();
  }

  private get totalPages(): number {
    const total = this.storeCards().length;
    return Math.max(1, Math.ceil(total / CARDS_PER_PAGE));
  }

  private get scrollAmount(): number {
    const colWidth = CARD_WIDTH + GAP;
    return 4 * colWidth;
  }

  updatePaginationDots(): void {
    const pages = this.totalPages;
    const current = this.currentPage();
    this.paginationDots.set(
      Array.from({ length: pages }, (_, i) => ({
        index: i,
        active: i === current,
      }))
    );
  }

  onGridScroll(): void {
    const el = this.gridWrapRef?.nativeElement;
    if (!el) return;
    const colWidth = CARD_WIDTH + GAP;
    const scrollLeft = el.scrollLeft;
    const rtl = document.documentElement.dir === 'rtl';
    const scrollPos = rtl ? -scrollLeft : scrollLeft;
    const page = Math.round(scrollPos / this.scrollAmount);
    const clamped = Math.max(0, Math.min(page, this.totalPages - 1));
    if (clamped !== this.currentPage()) {
      this.currentPage.set(clamped);
      this.updatePaginationDots();
    }
  }

  scrollPrev(): void {
    const el = this.gridWrapRef?.nativeElement;
    if (!el) return;
    const rtl = document.documentElement.dir === 'rtl';
    const step = rtl ? this.scrollAmount : -this.scrollAmount;
    el.scrollBy({ left: step, behavior: 'smooth' });
  }

  scrollNext(): void {
    const el = this.gridWrapRef?.nativeElement;
    if (!el) return;
    const rtl = document.documentElement.dir === 'rtl';
    const step = rtl ? -this.scrollAmount : this.scrollAmount;
    el.scrollBy({ left: step, behavior: 'smooth' });
  }

  goToPage(index: number): void {
    const el = this.gridWrapRef?.nativeElement;
    if (!el) return;
    const colWidth = CARD_WIDTH + GAP;
    const colsPerPage = 4;
    const scrollLeft = index * colsPerPage * colWidth;
    const rtl = document.documentElement.dir === 'rtl';
    el.scrollTo({
      left: rtl ? -scrollLeft : scrollLeft,
      behavior: 'smooth',
    });
    this.currentPage.set(index);
    this.updatePaginationDots();
  }
}
