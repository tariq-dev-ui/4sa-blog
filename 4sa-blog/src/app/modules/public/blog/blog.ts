import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { BlogSidebar } from '../../../layout/blog-sidebar/blog-sidebar';
import type { BreadcrumbItem } from '../../../shared/breadcrumb/breadcrumb';
import { Breadcrumb } from '../../../shared/breadcrumb/breadcrumb';
import { BLOG_POSTS } from './blog-data';
import type { BlogPost } from './blog-data';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, TranslatePipe, BlogSidebar, Breadcrumb],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blog implements AfterViewInit, OnDestroy {
  readonly breadcrumbItems: BreadcrumbItem[] = [
    { route: '/', labelKey: 'breadcrumb.home' },
    { labelKey: 'blog.title' },
  ];
  @ViewChild('blogCatsStrip') private blogCatsStripRef!: ElementRef<HTMLElement>;

  private catsScrollInterval: ReturnType<typeof setInterval> | null = null;
  private readonly catsScrollSpeed = 1;
  private readonly catsScrollIntervalMs = 35;
  private readonly catsScrollStep = 180;

  readonly categories = signal<{ key: string; slug?: string }[]>([
    { key: 'blog.catStores' },
    { key: 'blog.catSaving' },
    { key: 'blog.catFathersDay' },
    { key: 'blog.catMothersDay' },
    { key: 'blog.catBackToSchool' },
    { key: 'blog.catNationalDay' },
    { key: 'blog.catTodayOffers' },
    { key: 'blog.catPrimeDay' },
    { key: 'blog.catFunnyStories' },
    { key: 'blog.catYearEnd2025' },
    { key: 'blog.catWinter' },
    { key: 'blog.catBeauty' },
    { key: 'blog.catBestSellers' },
    { key: 'blog.catSaudiWinter' },
    { key: 'blog.catNewTrending' },
    { key: 'blog.catNewYear' },
    { key: 'blog.catHealthFitness' },
    { key: 'blog.catRamadan2026' },
  ]);

  readonly allPosts = signal<BlogPost[]>(BLOG_POSTS);
  readonly recentPosts = signal<BlogPost[]>(BLOG_POSTS.slice(0, 12));
  readonly mostViewedPosts = signal<BlogPost[]>(BLOG_POSTS.slice(0, 12));

  formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString('ar-SA', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  ngAfterViewInit(): void {
    const el = this.blogCatsStripRef?.nativeElement;
    if (!el) return;
    const maxScroll = () => el.scrollWidth - el.clientWidth;
    this.catsScrollInterval = setInterval(() => {
      el.scrollLeft += this.catsScrollSpeed;
      if (el.scrollLeft >= maxScroll()) el.scrollLeft = 0;
    }, this.catsScrollIntervalMs);
  }

  ngOnDestroy(): void {
    if (this.catsScrollInterval) clearInterval(this.catsScrollInterval);
  }

  scrollCats(direction: number): void {
    const el = this.blogCatsStripRef?.nativeElement;
    if (!el) return;
    const step = this.catsScrollStep * direction;
    el.scrollBy({ left: step, behavior: 'smooth' });
  }
}
