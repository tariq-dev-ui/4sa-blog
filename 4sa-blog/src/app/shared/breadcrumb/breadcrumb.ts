import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

export interface BreadcrumbItem {
  /** مفتاح الترجمة للنص */
  labelKey?: string;
  /** نص ثابت (بدون ترجمة) */
  label?: string;
  /** الرابط — إن وُجد يُعرض كرابط، وإلا كصفحة حالية */
  route?: string;
  /** عند التعيين يُعرض رمز بدل النص؛ يُستخدم labelKey لـ aria-label */
  icon?: 'home';
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class Breadcrumb {
  /** عناصر المسار (الصفحة الرئيسية ثم ... ثم الحالية) */
  readonly items = input.required<BreadcrumbItem[]>();
  /** مفتاح الترجمة لـ aria-label على الـ nav */
  readonly ariaLabelKey = input<string>('breadcrumb.ariaLabel');
}
