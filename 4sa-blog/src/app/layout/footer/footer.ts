import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

interface FooterReview {
  id: string;
  name: string;
  date: string;
  quote: string;
  avatar?: string;
}

@Component({
  selector: 'app-footer',
  imports: [DecimalPipe, TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly currentYear = new Date().getFullYear();

  readonly reviews: FooterReview[] = [
    { id: 'r1', name: 'Gg Hh', date: '21-01-2026', quote: 'sidebar.review1' },
    { id: 'r2', name: 'السر الامين', date: '05-01-2026', quote: 'sidebar.review2' },
    { id: 'r3', name: 'Mohamed Sharif', date: '04-01-2026', quote: 'sidebar.review3' },
    { id: 'r4', name: 'خالد العطوي', date: '25-12-2025', quote: 'sidebar.review4' },
    { id: 'r5', name: 'نورة س.', date: '18-01-2026', quote: 'sidebar.review5' },
    { id: 'r6', name: 'Fahad M.', date: '15-01-2026', quote: 'sidebar.review6' },
    { id: 'r7', name: 'ريم أحمد', date: '12-01-2026', quote: 'sidebar.review7' },
    { id: 'r8', name: 'Omar K.', date: '09-01-2026', quote: 'sidebar.review8' },
    { id: 'r9', name: 'لينا م.', date: '07-01-2026', quote: 'sidebar.review9' },
    { id: 'r10', name: 'Sultan A.', date: '03-01-2026', quote: 'sidebar.review10' },
    { id: 'r11', name: 'هند ف.', date: '02-01-2026', quote: 'sidebar.review3' },
    { id: 'r12', name: 'Yasser T.', date: '30-12-2025', quote: 'sidebar.review1' },
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
