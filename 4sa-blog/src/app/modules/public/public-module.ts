import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing-module';
import { Categories } from './categories/categories';
import { Home } from './home/home';
import { PostDetails } from './post-details/post-details';
import { Posts } from './posts/posts';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PublicRoutingModule,
    Home,
    Posts,
    PostDetails,
    Categories,
  ],
})
export class PublicModule {}
