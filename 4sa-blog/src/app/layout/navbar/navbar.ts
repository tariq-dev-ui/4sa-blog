import {
  Component,
  computed,
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

export interface NavbarCountry {
  id: string;
  labelKey: string;
  flag: string;
}

const COUNTRY_STORAGE_KEY = '4sa-selected-country';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  @ViewChild('menuContainer') menuContainerRef!: ElementRef<HTMLElement>;
  @ViewChild('countryContainer') countryContainerRef!: ElementRef<HTMLElement>;

  readonly translate = inject(TranslateService);
  readonly isMenuOpen = signal(false);
  readonly isCountryOpen = signal(false);
  /** موضع القائمة (fixed) — يُحسب من زر الدولة لتجاوز قصّ overflow على الـ navbar */
  readonly countryDropdownTop = signal<number | null>(null);
  readonly countryDropdownRight = signal<number | null>(null);

  readonly countries: NavbarCountry[] = [
    { id: 'SA', labelKey: 'nav.countrySA', flag: '🇸🇦' },
    { id: 'AE', labelKey: 'nav.countryAE', flag: '🇦🇪' },
    { id: 'KW', labelKey: 'nav.countryKW', flag: '🇰🇼' },
    { id: 'QA', labelKey: 'nav.countryQA', flag: '🇶🇦' },
    { id: 'BH', labelKey: 'nav.countryBH', flag: '🇧🇭' },
    { id: 'OM', labelKey: 'nav.countryOM', flag: '🇴🇲' },
    { id: 'EG', labelKey: 'nav.countryEG', flag: '🇪🇬' },
  ];

  readonly selectedCountryId = signal<string>('SA');

  readonly selectedCountry = computed(() => {
    const id = this.selectedCountryId();
    return (
      this.countries.find((c) => c.id === id) ?? this.countries[0]
    );
  });

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

  constructor() {
    try {
      const stored = localStorage.getItem(COUNTRY_STORAGE_KEY);
      if (stored && this.countries.some((c) => c.id === stored)) {
        this.selectedCountryId.set(stored);
      }
    } catch {
      /* ignore */
    }
  }

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

  toggleCountry(event: Event): void {
    event.stopPropagation();
    let opened = false;
    this.isCountryOpen.update((v) => {
      opened = !v;
      return opened;
    });
    if (opened) {
      this.closeMenu();
      this.syncCountryDropdownPosition();
    } else {
      this.countryDropdownTop.set(null);
      this.countryDropdownRight.set(null);
    }
  }

  private syncCountryDropdownPosition(): void {
    const btn = document.getElementById('navbar-country-btn');
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    this.countryDropdownTop.set(r.bottom + 6);
    this.countryDropdownRight.set(window.innerWidth - r.right);
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.isCountryOpen()) {
      this.syncCountryDropdownPosition();
    }
  }

  closeCountry(): void {
    this.isCountryOpen.set(false);
    this.countryDropdownTop.set(null);
    this.countryDropdownRight.set(null);
  }

  selectCountry(id: string): void {
    this.selectedCountryId.set(id);
    try {
      localStorage.setItem(COUNTRY_STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
    this.closeCountry();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const target = event.target as Node;
    if (this.isMenuOpen()) {
      const el = this.menuContainerRef?.nativeElement;
      if (el && !el.contains(target)) {
        this.closeMenu();
      }
    }
    if (this.isCountryOpen()) {
      const el = this.countryContainerRef?.nativeElement;
      if (el && !el.contains(target)) {
        this.closeCountry();
      }
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeCountry();
    this.closeMenu();
  }

  toggleLang(): void {
    const next = this.translate.currentLang === 'ar' ? 'en' : 'ar';
    this.translate.use(next);
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = next === 'ar' ? 'ar' : 'en';
  }
}
