import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

export interface SidebarArticle {
  slug: string;
  titleKey: string;
  categoryKey: string;
  imageUrl?: string;
}

export interface SidebarReview {
  name: string;
  date: string;
  quote: string;
  avatar?: string;
}

@Component({
  selector: 'app-main-sidebar',
  standalone: true,
  imports: [DecimalPipe, RouterLink, TranslatePipe],
  templateUrl: './main-sidebar.html',
  styleUrl: './main-sidebar.scss',
})
export class MainSidebar {
  readonly newsletterEmail = '';

  readonly appStoreUrl = '#';
  readonly playStoreUrl = '#';
  readonly giftBotUrl = '#';
  readonly chromeExtensionUrl = '#';

  readonly sidebarArticles: SidebarArticle[] = [
    { slug: 'sephora-2025', titleKey: 'sidebar.article1Title', categoryKey: 'sidebar.catBeauty', imageUrl: '/img/بنر رئيسي.jpeg' },
    { slug: 'top-travel-countries', titleKey: 'sidebar.article2Title', categoryKey: 'sidebar.catTravel', imageUrl: '/img/بنر صغير بجوار البنر.png' },
    { slug: 'thermal-pajama', titleKey: 'sidebar.article3Title', categoryKey: 'sidebar.catFashion', imageUrl: '/img/صورة البنر الرئيسي.jpeg' },
    { slug: 'bath-body-2025', titleKey: 'sidebar.article4Title', categoryKey: 'sidebar.catBeauty', imageUrl: '/img/بنر الرئيسي.png' },
  ];

  readonly reviews: SidebarReview[] = [
    { name: 'Gg Hh', date: '21-01-2026', quote: 'sidebar.review1' },
    { name: 'السر الامين', date: '05-01-2026', quote: 'sidebar.review2' },
    { name: 'Mohamed Sharif', date: '04-01-2026', quote: 'sidebar.review3' },
    { name: 'خالد العطوي', date: '25-12-2025', quote: 'sidebar.review4' },
  ];

  readonly stats = {
    totalCodes: 877,
    totalStores: 1244,
    totalSavers: 10527,
    averageDiscount: '15.43%',
  };

  readonly telegramUrl = '#';
  readonly facebookUrl = '#';
  readonly instagramUrl = '#';
  readonly contactEmail = 'mailto:contact@example.com';

  onNewsletterSubmit(): void {
    // TODO: wire to API
  }
}
