import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

export interface BlogSidebarStore {
  id: string;
  name: string;
  logoUrl: string;
  storeUrl?: string;
}

export interface BlogSidebarCategory {
  key: string;
  slug: string;
}

export interface BlogSidebarAuthor {
  id: string;
  nameKey: string;
  avatarUrl?: string;
}

const STORE_LOGOS = [
  '/img/بنر رئيسي.jpeg',
  '/img/بنر صغير بجوار البنر.png',
  '/img/صورة البنر الرئيسي.jpeg',
  '/img/بنر الرئيسي.png',
];

const SIDEBAR_STORES: BlogSidebarStore[] = [
  { id: '1', name: 'تيمو', logoUrl: STORE_LOGOS[0], storeUrl: 'https://www.temu.com' },
  { id: '2', name: 'اسوس', logoUrl: STORE_LOGOS[1], storeUrl: 'https://www.asos.com' },
  { id: '3', name: 'اي هيرب', logoUrl: STORE_LOGOS[2], storeUrl: 'https://www.iherb.com' },
  { id: '4', name: 'نون', logoUrl: STORE_LOGOS[0], storeUrl: 'https://www.noon.com' },
  { id: '5', name: 'نمشي', logoUrl: STORE_LOGOS[1], storeUrl: 'https://www.namshi.com' },
  { id: '6', name: '6 ستريت', logoUrl: STORE_LOGOS[2], storeUrl: 'https://www.6thstreet.com' },
];

const SIDEBAR_CATEGORIES: BlogSidebarCategory[] = [
  { key: 'blogSidebar.catBlogs', slug: 'blogs' },
  { key: 'blogSidebar.catStores', slug: 'stores' },
  { key: 'blogSidebar.catSweets', slug: 'sweets' },
  { key: 'blogSidebar.catRamadan', slug: 'ramadan' },
  { key: 'blogSidebar.catEid', slug: 'eid' },
];

const SIDEBAR_AUTHORS: BlogSidebarAuthor[] = [
  { id: '1', nameKey: 'blogSidebar.author4sa' },
  { id: '2', nameKey: 'blogSidebar.authorTariq' },
];

@Component({
  selector: 'app-blog-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './blog-sidebar.html',
  styleUrl: './blog-sidebar.scss',
})
export class BlogSidebar {
  readonly isSortDropdownOpen = signal(false);
  readonly isCategoriesDropdownOpen = signal(false);

  readonly sortOptions = [
    { key: 'blogSidebar.sortRecent', value: 'recent' },
    { key: 'blog.allBlogs', value: 'all' },
    { key: 'blog.mostViewed', value: 'popular' },
  ];
  readonly stores = SIDEBAR_STORES;
  readonly categories = SIDEBAR_CATEGORIES;
  readonly authors = SIDEBAR_AUTHORS;

  toggleSortDropdown(): void {
    this.isSortDropdownOpen.update((v) => !v);
  }

  toggleCategoriesDropdown(): void {
    this.isCategoriesDropdownOpen.update((v) => !v);
  }
}
