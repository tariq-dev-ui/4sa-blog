import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  signal,
  ViewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

export interface SidebarCategory {
  slug: string;
  labelKey: string;
  icon: string;
}

@Component({
  selector: 'app-categories-sidebar',
  imports: [NgClass, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './categories-sidebar.html',
  styleUrl: './categories-sidebar.scss',
})
export class CategoriesSidebar implements AfterViewInit {
  @ViewChild('drawerScroll') drawerScrollRef!: ElementRef<HTMLElement>;

  readonly categories: SidebarCategory[] = [
    { slug: 'food', labelKey: 'sections.food', icon: 'bi-egg-fried' },
    { slug: 'hotels', labelKey: 'sections.hotels', icon: 'bi-building' },
    { slug: 'perfumes', labelKey: 'sections.perfumes', icon: 'bi-droplet' },
    { slug: 'fashion', labelKey: 'sections.fashion', icon: 'bi-bag' },
    { slug: 'electronics', labelKey: 'sections.electronics', icon: 'bi-cpu' },
    { slug: 'beauty', labelKey: 'sections.beauty', icon: 'bi-stars' },
    { slug: 'kids', labelKey: 'sections.kids', icon: 'bi-balloon-heart' },
    { slug: 'made-in-saudi', labelKey: 'sections.madeInSaudi', icon: 'bi-flag' },
    { slug: 'health-fitness', labelKey: 'sections.healthFitness', icon: 'bi-heart-pulse' },
    { slug: '', labelKey: 'sections.allCategories', icon: 'bi-grid-3x3-gap' },
  ];

  /** إظهار سهم «السابق» عندما يمكن التمرير للخلف */
  canScrollPrev = signal(false);
  /** إظهار سهم «التالي» عندما يمكن التمرير للأمام */
  canScrollNext = signal(false);

  private readonly scrollStep = 280;

  ngAfterViewInit(): void {
    this.updateScrollState();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateScrollState();
  }

  updateScrollState(): void {
    const el = this.drawerScrollRef?.nativeElement;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const isRtl = el.getAttribute('dir') === 'rtl' || document.documentElement.dir === 'rtl';
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll <= 0) {
      this.canScrollPrev.set(false);
      this.canScrollNext.set(false);
      return;
    }

    if (isRtl) {
      this.canScrollPrev.set(scrollLeft > -maxScroll);
      this.canScrollNext.set(scrollLeft < 0);
    } else {
      this.canScrollPrev.set(scrollLeft > 0);
      this.canScrollNext.set(scrollLeft < maxScroll - 1);
    }
  }

  scrollPrev(): void {
    const el = this.drawerScrollRef?.nativeElement;
    if (!el) return;
    const step = el.getAttribute('dir') === 'rtl' || document.documentElement.dir === 'rtl'
      ? this.scrollStep
      : -this.scrollStep;
    el.scrollBy({ left: step, behavior: 'smooth' });
    setTimeout(() => this.updateScrollState(), 350);
  }

  scrollNext(): void {
    const el = this.drawerScrollRef?.nativeElement;
    if (!el) return;
    const step = el.getAttribute('dir') === 'rtl' || document.documentElement.dir === 'rtl'
      ? -this.scrollStep
      : this.scrollStep;
    el.scrollBy({ left: step, behavior: 'smooth' });
    setTimeout(() => this.updateScrollState(), 350);
  }
}
