import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Blog } from './blog/blog';
import { Categories } from './categories/categories';
import { Home } from './home/home';
import { PostDetails } from './post-details/post-details';
import { Posts } from './posts/posts';

const routes: Routes = [
  { path: '', component: Home, title: 'الرئيسية' },
  { path: 'blog', component: Blog, title: 'المدونة' },
  { path: 'posts', component: Posts, title: 'المقالات' },
  { path: 'posts/:id', component: PostDetails, title: 'تفاصيل المقال' },
  { path: 'categories', component: Categories, title: 'التصنيفات' },
  { path: 'categories/:slug', component: Categories, title: 'التصنيفات' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
