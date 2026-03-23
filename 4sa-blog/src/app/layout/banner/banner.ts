import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export interface BannerItem {
  image: string;
  title?: string;
  link?: string;
}

@Component({
  selector: 'app-banner',
  imports: [TranslatePipe],
  templateUrl: './banner.html',
  styleUrl: './banner.scss',
})
export class Banner {
  readonly banner: BannerItem = {
    image: '/img/' + encodeURIComponent('بنر رئيسي.jpeg'),
    title: 'بنر رئيسي',
  };
}
