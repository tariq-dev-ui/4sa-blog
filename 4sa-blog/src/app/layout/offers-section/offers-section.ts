import { Component, input } from '@angular/core';

export interface OfferCard {
  id: string;
  storeName: string;
  storeLogoUrl?: string;
  offerTitle: string;
  offerSubtext: string;
  buttonText: 'احصل' | 'إنسخ الكود';
  isNew: boolean;
}

const DEFAULT_OFFERS: OfferCard[] = [
      {
        id: '1',
        storeName: 'Amazon',
        storeLogoUrl: undefined,
        offerTitle: 'عروض رمضان: خصم حتى 80%',
        offerSubtext: 'عروض رمضان: خصم حتى 80%',
        buttonText: 'احصل',
        isNew: true,
      },
      {
        id: '2',
        storeName: 'Noon',
        storeLogoUrl: undefined,
        offerTitle: 'عروض تجهيزات رمضان: خصم حتى 70% + 15% كاش باك',
        offerSubtext: 'عروض تجهيزات رمضان: خصم حتى 70% + 15% كاش باك',
        buttonText: 'احصل',
        isNew: true,
      },
      {
        id: '3',
        storeName: 'To You',
        storeLogoUrl: undefined,
        offerTitle: 'خصم 30% + توصيل مجاني + 30 ريال كاش باك',
        offerSubtext: 'كود خصم تويو خرافي: خصم 30% + توصيل مجاني + 10 ريال كاش باك',
        buttonText: 'إنسخ الكود',
        isNew: true,
      },
      {
        id: '4',
        storeName: 'Jarir',
        storeLogoUrl: undefined,
        offerTitle: 'عروض رمضان على الإلكترونيات حتى 50%',
        offerSubtext: 'كوبونات جرير خصم إضافي',
        buttonText: 'إنسخ الكود',
        isNew: true,
      },
      {
        id: '5',
        storeName: 'Extra',
        storeLogoUrl: undefined,
        offerTitle: 'خصم 20% على أول طلب + توصيل مجاني',
        offerSubtext: 'كود خصم إكسترا رمضان 2026',
        buttonText: 'احصل',
        isNew: false,
      },
];

@Component({
  selector: 'app-offers-section',
  standalone: true,
  templateUrl: './offers-section.html',
  styleUrl: './offers-section.scss',
})
export class OffersSection {
  readonly mainTitle = input<string>('الموفر: أفضل موقع كوبونات خصم وعروض 2026');
  readonly subTitle = input<string>('استعد لرمضان');
  readonly offers = input<OfferCard[]>(DEFAULT_OFFERS);
}
