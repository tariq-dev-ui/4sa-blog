import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { Banner } from './layout/banner/banner';
import { CategoriesSidebar } from './layout/categories-sidebar/categories-sidebar';
import { Footer } from './layout/footer/footer';
import { MainSidebar } from './layout/main-sidebar/main-sidebar';
import { Navbar } from './layout/navbar/navbar';
import { ArticlesSection } from './layout/articles-section/articles-section';
import { OffersSection } from './layout/offers-section/offers-section';
import { StoresStrip } from './layout/stores-strip/stores-strip';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Banner, CategoriesSidebar, StoresStrip, MainSidebar, OffersSection, ArticlesSection, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly translate = inject(TranslateService);

  ngOnInit(): void {
    const applyDir = (lang: string) => {
      const dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.dir = dir;
      document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
    };
    this.translate.onLangChange.subscribe((e) => applyDir(e.lang));
    applyDir(this.translate.currentLang || this.translate.defaultLang || 'ar');
  }
}
