import {
  Component,
  OnDestroy,
  OnInit,
  signal,
  computed,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export interface BannerItem {
  image: string;
  title?: string;
  link?: string;
}

@Component({
  selector: 'app-banner',
  imports: [TranslatePipe],
  templateUrl: './banner.html',
  styleUrl: './banner.scss',
})
export class Banner implements OnInit, OnDestroy {
  /** قائمة البنر الرئيسي (اليسار) - تحكم منفصل */
  readonly leftItems: BannerItem[] = [
    {
      image: '/img/' + encodeURIComponent('بنر الرئيسي.png'),
      title: 'بنر رئيسي',
    },
    {
      image: '/img/' + encodeURIComponent('بنر رئيسي.jpeg'),
      title: 'بنر رئيسي',
    },
  ];

  /** قائمة البنر الثاني (اليمين) - تحكم منفصل */
  readonly rightItems: BannerItem[] = [
    {
      image: '/img/' + encodeURIComponent('صورة البنر الرئيسي.jpeg'),
      title: 'بنر',
    },
    {
      image: '/img/' + encodeURIComponent('بنر صغير بجوار البنر.png'),
      title: 'بنر صغير',
    },
  ];

  readonly slideIntervalSeconds = 5;
  /** يتزامن مع ذروة اللمعة (نصف مدة animation: 0.32s → 160ms) */
  readonly fadeDurationMs = 160;

  private intervalLeft: ReturnType<typeof setInterval> | null = null;
  private intervalRight: ReturnType<typeof setInterval> | null = null;
  private timeoutRightStart: ReturnType<typeof setTimeout> | null = null;

  readonly currentLeftIndex = signal(0);
  readonly currentRightIndex = signal(0);
  readonly isPaused = signal(false);

  readonly isFadingLeft = signal(false);
  readonly isFadingRight = signal(false);

  readonly displayLeft = computed(
    () =>
      this.leftItems[
        this.currentLeftIndex() % Math.max(1, this.leftItems.length)
      ] ?? this.leftItems[0]
  );
  readonly displayRight = computed(
    () =>
      this.rightItems[
        this.currentRightIndex() % Math.max(1, this.rightItems.length)
      ] ?? this.rightItems[0]
  );

  readonly hasMultipleLeft = computed(() => this.leftItems.length > 1);
  readonly hasMultipleRight = computed(() => this.rightItems.length > 1);

  ngOnInit(): void {
    this.startTimers();
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }

  onBannerMouseEnter(): void {
    this.isPaused.set(true);
  }

  onBannerMouseLeave(): void {
    this.isPaused.set(false);
  }

  /** بنر رئيسي (يسار): السابق */
  prevLeft(): void {
    if (this.leftItems.length <= 1) return;
    this.isFadingLeft.set(true);
    setTimeout(() => {
      const n = this.leftItems.length;
      this.currentLeftIndex.set(
        (this.currentLeftIndex() - 1 + n) % n
      );
      this.isFadingLeft.set(false);
    }, this.fadeDurationMs);
  }

  /** بنر رئيسي (يسار): التالي */
  nextLeft(): void {
    if (this.leftItems.length <= 1) return;
    this.isFadingLeft.set(true);
    setTimeout(() => {
      const n = this.leftItems.length;
      this.currentLeftIndex.set((this.currentLeftIndex() + 1) % n);
      this.isFadingLeft.set(false);
    }, this.fadeDurationMs);
  }

  /** بنر ثاني (يمين): السابق */
  prevRight(): void {
    if (this.rightItems.length <= 1) return;
    this.isFadingRight.set(true);
    setTimeout(() => {
      const n = this.rightItems.length;
      this.currentRightIndex.set(
        (this.currentRightIndex() - 1 + n) % n
      );
      this.isFadingRight.set(false);
    }, this.fadeDurationMs);
  }

  /** بنر ثاني (يمين): التالي */
  nextRight(): void {
    if (this.rightItems.length <= 1) return;
    this.isFadingRight.set(true);
    setTimeout(() => {
      const n = this.rightItems.length;
      this.currentRightIndex.set((this.currentRightIndex() + 1) % n);
      this.isFadingRight.set(false);
    }, this.fadeDurationMs);
  }

  private startTimers(): void {
    this.clearTimers();
    const ms = this.slideIntervalSeconds * 1000;
    // البنر الرئيسي (يسار): يتبدّل كل slideIntervalSeconds
    this.intervalLeft = setInterval(() => {
      if (!this.isPaused() && this.leftItems.length > 1) {
        this.nextLeft();
      }
    }, ms);
    // البنر الثاني (يمين): يبدأ بعد نصف المدة ثم يتبدّل كل slideIntervalSeconds (حتى لا يتغيرا معاً)
    const offsetMs = Math.floor(ms / 2);
    this.timeoutRightStart = setTimeout(() => {
      this.timeoutRightStart = null;
      this.intervalRight = setInterval(() => {
        if (!this.isPaused() && this.rightItems.length > 1) {
          this.nextRight();
        }
      }, ms);
    }, offsetMs);
  }

  private clearTimers(): void {
    if (this.timeoutRightStart !== null) {
      clearTimeout(this.timeoutRightStart);
      this.timeoutRightStart = null;
    }
    if (this.intervalLeft !== null) {
      clearInterval(this.intervalLeft);
      this.intervalLeft = null;
    }
    if (this.intervalRight !== null) {
      clearInterval(this.intervalRight);
      this.intervalRight = null;
    }
  }
}
