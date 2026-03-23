export interface StoreDetailCoupon {
  code: string;
  /** نسبة أو مقدار الخصم للعرض (مثل 15% أو حتى 20%) */
  discount: string;
  /** مفتاح ترجمة وصف اختياري (مثلاً للقسم التفصيلي أو الوصولية) */
  labelKey: string;
}

export interface StoreDetailData {
  slug: string;
  titleKey: string;
  subtitleKey: string;
  storeUrl: string;
  galleryImageUrls: readonly string[];
  paragraphKeys: readonly string[];
  coupons: readonly StoreDetailCoupon[];
}

export const STORE_DETAIL_BY_SLUG: Record<string, StoreDetailData> = {
  iherb: {
    slug: 'iherb',
    titleKey: 'storeDetail.iherb.title',
    subtitleKey: 'storeDetail.iherb.subtitle',
    storeUrl: 'https://www.iherb.com',
    galleryImageUrls: [
      '/img/بنر رئيسي.jpeg',
      '/img/بنر صغير بجوار البنر.png',
      '/img/بنر الرئيسي.png',
      '/img/صورة البنر الرئيسي.jpeg',
    ],
    paragraphKeys: [
      'storeDetail.iherb.p1',
      'storeDetail.iherb.p2',
      'storeDetail.iherb.p3',
      'storeDetail.iherb.p4',
      'storeDetail.iherb.p5',
    ],
    coupons: [
      { code: 'IHERB15', discount: '15%', labelKey: 'storeDetail.iherb.coupon1' },
      { code: 'NEWIHERB20', discount: '20%', labelKey: 'storeDetail.iherb.coupon2' },
      { code: 'HEALTH10', discount: '10%', labelKey: 'storeDetail.iherb.coupon3' },
      { code: 'RAMADAN25', discount: '25%', labelKey: 'storeDetail.iherb.coupon4' },
      { code: 'VITAMIN12', discount: '12%', labelKey: 'storeDetail.iherb.coupon5' },
    ],
  },
};

export function getStoreDetailBySlug(slug: string | null | undefined): StoreDetailData | null {
  if (!slug) return null;
  return STORE_DETAIL_BY_SLUG[slug] ?? null;
}
