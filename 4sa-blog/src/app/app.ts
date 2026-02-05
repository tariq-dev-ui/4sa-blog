import { Component, OnInit, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

import { Banner } from './layout/banner/banner';
import { CategoriesSidebar } from './layout/categories-sidebar/categories-sidebar';
import { Footer } from './layout/footer/footer';
import { MainSidebar } from './layout/main-sidebar/main-sidebar';
import { Navbar } from './layout/navbar/navbar';
import { StoresStrip } from './layout/stores-strip/stores-strip';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Banner, CategoriesSidebar, StoresStrip, MainSidebar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly translate = inject(TranslateService);
  private readonly router = inject(Router);

  /** true عندما يكون المسار صفحة مستقلة (مدونة أو متاجر) — بدون بانر ولا سايدبار */
  readonly isStandaloneRoute = signal(false);

  private updateStandalone(): void {
    const url = this.router.url.split('?')[0];
    this.isStandaloneRoute.set(url.startsWith('/blog') || url === '/stores');
  }

  ngOnInit(): void {
    this.updateStandalone();
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.updateStandalone());

    const applyDir = (lang: string) => {
      const dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.dir = dir;
      document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
    };
    this.translate.onLangChange.subscribe((e) => applyDir(e.lang));
    applyDir(this.translate.currentLang || this.translate.defaultLang || 'ar');
  }
}
