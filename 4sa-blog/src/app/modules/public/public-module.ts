import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing-module';
import { Blog } from './blog/blog';
import { BlogDetails } from './blog/blog-details/blog-details';
import { Categories } from './categories/categories';
import { Home } from './home/home';
import { PostDetails } from './post-details/post-details';
import { Posts } from './posts/posts';
import { Stores } from './stores/stores';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PublicRoutingModule,
    Home,
    Blog,
    BlogDetails,
    Posts,
    PostDetails,
    Categories,
    Stores,
  ],
})
export class PublicModule {}
