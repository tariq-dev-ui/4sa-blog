export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  categoryKey: string;
  imageUrl: string;
  author: string;
  publishedDate: string; // ISO 8601 format: 'YYYY-MM-DD'
  updatedDate: string; // ISO 8601 format: 'YYYY-MM-DD'
  couponCode?: string;
  storeUrl?: string;
}
