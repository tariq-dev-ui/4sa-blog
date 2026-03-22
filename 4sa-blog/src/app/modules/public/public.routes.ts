import { Routes } from '@angular/router';

import { Blog } from './blog/blog';
import { BlogDetails } from './blog/blog-details/blog-details';
import { Categories } from './categories/categories';
import { Home } from './home/home';
import { PostDetails } from './post-details/post-details';
import { Posts } from './posts/posts';
import { Stores } from './stores/stores';

export const PUBLIC_ROUTES: Routes = [
  { path: '', component: Home, title: 'الرئيسية' },
  { path: 'blog', component: Blog, title: 'المدونة' },
  { path: 'blog/:id', component: BlogDetails, title: 'تفاصيل المدونة' },
  { path: 'posts', component: Posts, title: 'المقالات' },
  { path: 'posts/:id', component: PostDetails, title: 'تفاصيل المقال' },
  { path: 'categories', component: Categories, title: 'التصنيفات' },
  { path: 'categories/:slug', component: Categories, title: 'التصنيفات' },
  { path: 'stores', component: Stores, title: 'المتاجر' },
  { path: '**', redirectTo: '' },
];
