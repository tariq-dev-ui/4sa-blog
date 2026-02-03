import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * قسم عام بنفس تصميم هيدر قسم العروض (عنوان + عرض الكل) بدون خلفية.
 * يُستخدم تحت قسم العروض أو في أي صفحة تحتاج نفس التخطيط.
 */
@Component({
  selector: 'app-section-strip',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './section-strip.html',
  styleUrl: './section-strip.scss',
})
export class SectionStrip {
  /** عنوان القسم (أو مفتاح ترجمة مثل 'sections.title') */
  readonly mainTitle = input<string>('');
  /** رابط "عرض الكل" */
  readonly viewAllUrl = input<string>('#');
  /** نص "عرض الكل" (أو مفتاح ترجمة) */
  readonly viewAllLabel = input<string | undefined>(undefined);
  /** معرّف للعنوان (لإمكانية الوصول) */
  readonly titleId = input<string>('section-strip-title');
}
