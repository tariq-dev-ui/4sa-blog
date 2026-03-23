import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { Banner } from './banner';

describe('Banner', () => {
  let component: Banner;
  let fixture: ComponentFixture<Banner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Banner],
      providers: [
        provideHttpClient(),
        provideTranslateService({ lang: 'ar', fallbackLang: 'en' }),
        provideTranslateHttpLoader({ prefix: '/i18n/', suffix: '.json' }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Banner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
