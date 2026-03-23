import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { interval } from 'rxjs';

export interface BannerItem {
  image: string;
  altKey: string;
  link?: string;
}

function imgPath(filename: string): string {
  return '/img/' + encodeURIComponent(filename);
}

@Component({
  selector: 'app-banner',
  imports: [TranslatePipe],
  templateUrl: './banner.html',
  styleUrl: './banner.scss',
})
export class Banner {
  private readonly destroyRef = inject(DestroyRef);

  /** نفس أصول البنر المستخدمة في المشروع (public/img) */
  readonly banners: BannerItem[] = [
    {
      image: imgPath('بنر رئيسي.jpeg'),
      altKey: 'banner.slideAlt1',
    },
    {
      image: imgPath('صورة البنر الرئيسي.jpeg'),
      altKey: 'banner.slideAlt2',
    },
    {
      image: imgPath('بنر صغير بجوار البنر.png'),
      altKey: 'banner.slideAlt3',
    },
    {
      image: imgPath('بنر الرئيسي.png'),
      altKey: 'banner.slideAlt4',
    },
  ];

  readonly activeIndex = signal(0);

  constructor() {
    interval(6500)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.next());
  }

  goTo(index: number): void {
    const n = this.banners.length;
    if (n === 0) return;
    const i = ((index % n) + n) % n;
    this.activeIndex.set(i);
  }

  prev(): void {
    this.goTo(this.activeIndex() - 1);
  }

  next(): void {
    this.goTo(this.activeIndex() + 1);
  }
}
