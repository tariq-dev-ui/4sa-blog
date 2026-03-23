export type OfferType = 'direct' | 'coupon';

export interface OfferCard {
  id: string;
  storeName: string;
  storeLogoUrl?: string;
  storeUrl?: string;
  offerTitle: string;
  offerTypeLabel: string;
  offerType: OfferType;
  couponCode?: string;
  discount?: string;
  isNew: boolean;
}

export const STORE_IMAGES = [
  '/img/بنر رئيسي.jpeg',
  '/img/بنر صغير بجوار البنر.png',
  '/img/صورة البنر الرئيسي.jpeg',
  '/img/بنر الرئيسي.png',
] as const;

/** العروض المعروضة في الشريط والرئيسية */
export const DEFAULT_OFFERS: OfferCard[] = [
  {
    id: '1',
    storeName: 'Amazon',
    storeLogoUrl: STORE_IMAGES[0],
    storeUrl: 'https://www.amazon.sa',
    offerTitle: 'عروض رمضان حتى 80% خصم',
    offerTypeLabel: 'الخصم يطبّق تلقائياً في المتجر',
    offerType: 'direct',
    discount: '80%',
    isNew: true,
  },
  {
    id: '2',
    storeName: 'Noon',
    storeLogoUrl: STORE_IMAGES[1],
    storeUrl: 'https://www.noon.com',
    offerTitle: 'تجهيزات رمضان حتى 70% خصم + 15% كاش باك',
    offerTypeLabel: 'الخصم يطبّق تلقائياً في المتجر',
    offerType: 'direct',
    discount: '70%',
    isNew: true,
  },
  {
    id: '3',
    storeName: 'To You',
    storeLogoUrl: STORE_IMAGES[2],
    storeUrl: 'https://toyou.sa',
    offerTitle: 'خصم 30% + توصيل مجاني + 30 ريال كاش باك',
    offerTypeLabel: 'كوبون خصم + كاش باك',
    offerType: 'coupon',
    couponCode: 'RAMADAN30',
    discount: '30%',
    isNew: true,
  },
  {
    id: '4',
    storeName: 'Jarir',
    storeLogoUrl: STORE_IMAGES[3],
    storeUrl: 'https://www.jarir.com',
    offerTitle: 'إلكترونيات رمضان حتى 50% خصم',
    offerTypeLabel: 'كود خصم رمضان 2026',
    offerType: 'coupon',
    couponCode: 'JARIR50',
    discount: '50%',
    isNew: true,
  },
  {
    id: '5',
    storeName: 'Extra',
    storeLogoUrl: STORE_IMAGES[0],
    storeUrl: 'https://www.extra.com',
    offerTitle: 'خصم 20% على أول طلب + توصيل مجاني',
    offerTypeLabel: 'صالح على أول طلب فقط',
    offerType: 'coupon',
    couponCode: 'EXTRA20',
    discount: '20%',
    isNew: false,
  },
];

const EXTRA_OFFERS: OfferCard[] = [
  {
    id: '6',
    storeName: 'Shein',
    storeLogoUrl: STORE_IMAGES[1],
    storeUrl: 'https://www.shein.com',
    offerTitle: 'خصم 25% على الأزياء والمنزل',
    offerTypeLabel: 'كوبون للمستخدمين الجدد',
    offerType: 'coupon',
    couponCode: 'SHEIN25',
    discount: '25%',
    isNew: true,
  },
  {
    id: '7',
    storeName: 'Namshi',
    storeLogoUrl: STORE_IMAGES[2],
    storeUrl: 'https://www.namshi.com',
    offerTitle: 'تخفيضات موسمية حتى 40%',
    offerTypeLabel: 'يطبّق على منتجات مختارة',
    offerType: 'direct',
    discount: '40%',
    isNew: false,
  },
  {
    id: '8',
    storeName: 'iHerb',
    storeLogoUrl: STORE_IMAGES[3],
    storeUrl: 'https://www.iherb.com',
    offerTitle: 'فيتامينات وعناية: خصم 15%',
    offerTypeLabel: 'كود خصم صحة ولياقة',
    offerType: 'coupon',
    couponCode: 'IHERB15',
    discount: '15%',
    isNew: false,
  },
  {
    id: '9',
    storeName: 'Sephora',
    storeLogoUrl: STORE_IMAGES[0],
    storeUrl: 'https://www.sephora.sa',
    offerTitle: 'عروض الجمال والعطور',
    offerTypeLabel: 'خصم تلقائي في السلة',
    offerType: 'direct',
    discount: '35%',
    isNew: true,
  },
  {
    id: '10',
    storeName: 'Carrefour',
    storeLogoUrl: STORE_IMAGES[1],
    storeUrl: 'https://www.carrefourksa.com',
    offerTitle: 'مستلزمات رمضان بأسعار مميزة',
    offerTypeLabel: 'كاش باك مع تطبيق المتجر',
    offerType: 'coupon',
    couponCode: 'CARR10',
    discount: '10%',
    isNew: false,
  },
  {
    id: '11',
    storeName: 'IKEA',
    storeLogoUrl: STORE_IMAGES[2],
    storeUrl: 'https://www.ikea.com/sa',
    offerTitle: 'تخفيضات أثاث وديكور',
    offerTypeLabel: 'للفروع والأونلاين',
    offerType: 'direct',
    discount: '45%',
    isNew: false,
  },
  {
    id: '12',
    storeName: 'Golden Scent',
    storeLogoUrl: STORE_IMAGES[3],
    storeUrl: 'https://www.goldenscent.com',
    offerTitle: 'عطور ومستحضرات: خصم 20%',
    offerTypeLabel: 'كود خصم حصري',
    offerType: 'coupon',
    couponCode: 'GS20',
    discount: '20%',
    isNew: true,
  },
];

/** جميع الكوبونات والعروض لصفحة «عرض الكل» */
export const ALL_OFFERS: OfferCard[] = [...DEFAULT_OFFERS, ...EXTRA_OFFERS];
