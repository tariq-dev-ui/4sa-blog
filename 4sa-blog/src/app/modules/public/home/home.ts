import { Component } from '@angular/core';
import { ArticlesSection } from '../../../layout/articles-section/articles-section';
import { FaqSection } from '../../../layout/faq-section/faq-section';
import { MajorStoresSection } from '../../../layout/major-stores-section/major-stores-section';
import { OffersSection } from '../../../layout/offers-section/offers-section';
import { SiteIntro } from '../../../layout/site-intro/site-intro';

/**
 * الصفحة الرئيسية — تجمع مكوّنات المحتوى الخاصة بالرئيسية فقط.
 * هذه المكوّنات مُستوردة هنا ولا تُستخدم في مسارات أخرى (المقالات، التصنيفات، إلخ).
 * لإضافة قسم في صفحة أخرى، استورد المكوّن المطلوب في تلك الصفحة فقط.
 */
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
