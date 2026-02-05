import {
  Component,
  inject,
  signal,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

export interface NavMenuItem {
  labelKey: string;
  path: string;
  icon?: string;
  children?: { labelKey: string; path: string }[];
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  @ViewChild('menuContainer') menuContainerRef!: ElementRef<HTMLElement>;

  readonly translate = inject(TranslateService);
  readonly isMenuOpen = signal(false);

  readonly menuItems: NavMenuItem[] = [
    { labelKey: 'nav.menuHome', path: '/', icon: 'bi-house' },
    {
      labelKey: 'nav.menuPosts',
      path: '/posts',
      icon: 'bi-newspaper',
      children: [
        { labelKey: 'nav.menuAllPosts', path: '/posts' },
        { labelKey: 'nav.menuLatest', path: '/posts' },
      ],
    },
    { labelKey: 'nav.menuBlog', path: '/blog', icon: 'bi-journal-text' },
    { labelKey: 'nav.menuCategories', path: '/categories', icon: 'bi-folder' },
    { labelKey: 'nav.menuAbout', path: '/about', icon: 'bi-info-circle' },
    { labelKey: 'nav.menuContact', path: '/contact', icon: 'bi-envelope' },
    { labelKey: 'nav.menuArchive', path: '/archive', icon: 'bi-archive' },
    { labelKey: 'nav.menuTags', path: '/tags', icon: 'bi-tags' },
    { labelKey: 'nav.menuNews', path: '/news', icon: 'bi-megaphone' },
    { labelKey: 'nav.menuReviews', path: '/reviews', icon: 'bi-star' },
    { labelKey: 'nav.menuLinks', path: '/links', icon: 'bi-link-45deg' },
  ];

  get currentLangLabel(): string {
    return this.translate.currentLang === 'ar'
      ? this.translate.instant('nav.langAr')
      : this.translate.instant('nav.langEn');
  }

  toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
  }

  openMenu(): void {
    this.isMenuOpen.set(true);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  /** إغلاق القائمة عند الضغط خارجها */
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.isMenuOpen()) return;
    const el = this.menuContainerRef?.nativeElement;
    if (el && !el.contains(event.target as Node)) {
      this.closeMenu();
    }
  }

  toggleLang(): void {
    const next = this.translate.currentLang === 'ar' ? 'en' : 'ar';
    this.translate.use(next);
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = next === 'ar' ? 'ar' : 'en';
  }
}
