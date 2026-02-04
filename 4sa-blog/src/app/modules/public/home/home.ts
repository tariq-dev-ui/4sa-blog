import { Component } from '@angular/core';
import { ArticlesSection } from '../../../layout/articles-section/articles-section';
import { FaqSection } from '../../../layout/faq-section/faq-section';
import { MajorStoresSection } from '../../../layout/major-stores-section/major-stores-section';
import { OffersSection } from '../../../layout/offers-section/offers-section';
import { SiteIntro } from '../../../layout/site-intro/site-intro';

@Component({
  selector: 'app-home',
  imports: [
    MajorStoresSection,
    OffersSection,
    ArticlesSection,
    SiteIntro,
    FaqSection,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
