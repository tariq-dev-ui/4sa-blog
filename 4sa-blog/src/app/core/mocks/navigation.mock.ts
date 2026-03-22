import { NavItem } from '../models/nav-item.model';

export const MOCK_NAV_ITEMS: NavItem[] = [
  { id: 1, label: 'الرئيسية', link: '/home', icon: 'bi bi-house' },
  { id: 2, label: 'المقالات', link: '/posts', icon: 'bi bi-files' },
  { id: 3, label: 'المدونة', link: '/blog', icon: 'bi bi-journal-richtext' },
  { id: 4, label: 'الأقسام', link: '/categories', icon: 'bi bi-bookmarks' },
  { id: 5, label: 'المتاجر', link: '/stores', icon: 'bi bi-shop' },
];
