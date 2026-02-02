import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  readonly translate = inject(TranslateService);

  /** اسم اللغة الحالية للعرض بجانب الزر */
  get currentLangLabel(): string {
    return this.translate.currentLang === 'ar' ? 'العربية' : 'English';
  }

  toggleLang(): void {
    const next = this.translate.currentLang === 'ar' ? 'en' : 'ar';
    this.translate.use(next);
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = next === 'ar' ? 'ar' : 'en';
  }
}
