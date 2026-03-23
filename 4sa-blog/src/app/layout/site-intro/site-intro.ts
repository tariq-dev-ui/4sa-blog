import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  signal,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export interface SiteIntroCouponRow {
  store: string;
  code: string;
  description: string;
}

@Component({
  selector: 'app-site-intro',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './site-intro.html',
  styleUrl: './site-intro.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteIntro implements OnDestroy {
  readonly couponRows: SiteIntroCouponRow[] = [
    {
      store: 'كود خصم ماكس',
      code: 'SB6',
      description:
        'يشمل جميع المنتجات مع بعض الاستثناءات',
    },
    {
      store: 'كود خصم ترينديول',
      code: 'AZIZ',
      description:
        'خصم يصل إلى 40% يشمل جميع المنتجات مع بعض الاستثناءات للمستخدم الجديد و 10% للمستخدم الحالي بحد أدنى للسلة 75 ريال وحد أقصى للخصم 200 ريال (التطبيق فقط)',
    },
    {
      store: 'كود خصم نايس ون',
      code: 'DW530',
      description:
        'يشمل جميع المنتجات مع بعض الاستثناءات للعملاء الجدد بحد أقصى للخصم 50 ريال و 5% للعملاء الحاليين بحد أقصى 15 ريال',
    },
    {
      store: 'كود خصم بلانكو',
      code: 'SSH',
      description: 'يشمل جميع المنتجات',
    },
    {
      store: 'كود خصم صيدلية النهدي',
      code: '5F2C',
      description: 'على منتجات مختارة',
    },
    {
      store: 'كود خصم شي إن',
      code: 'SHEN15',
      description:
        'يشمل جميع المنتجات، للاستخدام مرة واحدة لكل مستخدم جديد (في غضون 30 يوماً من التسجيل)',
    },
    {
      store: 'كود خصم مفارش الحبيب',
      code: 'sss',
      description: 'يشمل جميع المنتجات',
    },
    {
      store: 'كود خصم ريف للعطور',
      code: 'shsh10',
      description: 'يشمل جميع المنتجات',
    },
    {
      store: 'كود خصم فوغاكلوسيت',
      code: 'EEE',
      description: 'يشمل جميع المنتجات',
    },
    {
      store: 'كود خصم كيتا',
      code: 'y7Up5n@',
      description: 'يحصل أصدقاؤك على قسائم ترحيبية بقيمة ١٥٠ ريال',
    },
    {
      store: 'كود خصم شي إن',
      code: 'MEAF25',
      description:
        'يشمل جميع المنتجات مع بعض الاستثناءات وباستثناء Marketplace',
    },
    {
      store: 'كود خصم أمازون',
      code: 'NEW20',
      description: 'فعّال على طلبك الأول بحد أقصى 30 ريال للخصم',
    },
  ];

  readonly copiedRowIndex = signal<number | null>(null);
  private copyResetTimeout: ReturnType<typeof setTimeout> | null = null;

  copyCode(code: string, rowIndex: number): void {
    const done = (): void => {
      if (this.copyResetTimeout) clearTimeout(this.copyResetTimeout);
      this.copiedRowIndex.set(rowIndex);
      this.copyResetTimeout = setTimeout(() => {
        this.copiedRowIndex.set(null);
        this.copyResetTimeout = null;
      }, 2200);
    };

    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(code).then(done).catch(done);
    } else {
      done();
    }
  }

  ngOnDestroy(): void {
    if (this.copyResetTimeout) {
      clearTimeout(this.copyResetTimeout);
      this.copyResetTimeout = null;
    }
  }
}
