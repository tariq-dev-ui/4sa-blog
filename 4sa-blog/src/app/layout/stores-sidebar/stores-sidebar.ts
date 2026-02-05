import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

export interface StoresSidebarArticle {
  slug: string;
  titleKey: string;
  categoryKey: string;
  imageUrl: string;
}

export interface StoresSidebarReview {
  name: string;
  date: string;
  quoteKey: string;
}

@Component({
  selector: 'app-stores-sidebar',
  standalone: true,
  imports: [DecimalPipe, RouterLink, TranslatePipe],
  templateUrl: './stores-sidebar.html',
  styleUrl: './stores-sidebar.scss',
})
export class StoresSidebar {
  readonly newArticleLabelKey = 'storesSidebar.newArticle';
  readonly articles: StoresSidebarArticle[] = [
    { slug: 'sephora-2025', titleKey: 'sidebar.article1Title', categoryKey: 'sidebar.catBeauty', imageUrl: '/img/بنر رئيسي.jpeg' },
    { slug: 'top-travel-countries', titleKey: 'sidebar.article2Title', categoryKey: 'sidebar.catTravel', imageUrl: '/img/بنر صغير بجوار البنر.png' },
    { slug: 'thermal-pajama', titleKey: 'sidebar.article3Title', categoryKey: 'sidebar.catFashion', imageUrl: '/img/صورة البنر الرئيسي.jpeg' },
    { slug: 'bath-body-2025', titleKey: 'sidebar.article4Title', categoryKey: 'sidebar.catBeauty', imageUrl: '/img/بنر الرئيسي.png' },
  ];

  readonly reviews: StoresSidebarReview[] = [
    { name: 'abolamees alasmari', date: '30-01-2026', quoteKey: 'storesSidebar.review1' },
    { name: 'فؤاد خولفاوي', date: '29-01-2026', quoteKey: 'storesSidebar.review2' },
    { name: 'Gg Hh', date: '21-01-2026', quoteKey: 'storesSidebar.review3' },
    { name: 'السر الامين', date: '05-01-2026', quoteKey: 'storesSidebar.review4' },
  ];

  readonly stats = {
    totalCodes: 891,
    totalStores: 1244,
    totalSavers: 10021,
    averageDiscount: '15.38%',
  };

  readonly telegramUrl = '#';
  readonly facebookUrl = '#';
  readonly instagramUrl = '#';
  readonly contactEmail = 'mailto:contact@example.com';
}
