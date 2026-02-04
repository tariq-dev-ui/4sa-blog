import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export interface FeaturedStore {
  id: string;
  name: string;
  imageUrl: string;
  url: string;
  couponsCount: number;
  offersCount: number;
}

export interface StoreCard {
  id: string;
  name: string;
  logoUrl: string | null;
  url: string;
  couponsCount: number;
  offersCount: number;
}

@Component({
  selector: 'app-major-stores-section',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './major-stores-section.html',
  styleUrl: './major-stores-section.scss',
})
export class MajorStoresSection {
  readonly featuredStore = signal<FeaturedStore>({
    id: 'iherb',
    name: 'اي هيرب',
    imageUrl: '/img/صورة البنر الرئيسي.jpeg',
    url: 'https://www.iherb.com',
    couponsCount: 7,
    offersCount: 0,
  });

  readonly storeCards = signal<StoreCard[]>([
    { id: '1', name: 'أمازون', logoUrl: null, url: '#', couponsCount: 12, offersCount: 5 },
    { id: '2', name: 'نون', logoUrl: null, url: '#', couponsCount: 8, offersCount: 3 },
    { id: '3', name: 'جرير', logoUrl: null, url: '#', couponsCount: 6, offersCount: 2 },
    { id: '4', name: 'إكسترا', logoUrl: null, url: '#', couponsCount: 4, offersCount: 1 },
    { id: '5', name: 'نمشي', logoUrl: null, url: '#', couponsCount: 10, offersCount: 4 },
    { id: '6', name: 'سيفورا', logoUrl: null, url: '#', couponsCount: 5, offersCount: 2 },
    { id: '7', name: 'علي إكسبريس', logoUrl: null, url: '#', couponsCount: 15, offersCount: 6 },
    { id: '8', name: 'شي إن', logoUrl: null, url: '#', couponsCount: 9, offersCount: 3 },
    { id: '9', name: 'جوميا', logoUrl: null, url: '#', couponsCount: 7, offersCount: 2 },
  ]);
}
