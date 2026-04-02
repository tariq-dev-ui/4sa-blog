import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { Footer } from './footer';

class TestTranslateLoader implements TranslateLoader {
  getTranslation(_lang: string) {
    return of({});
  }
}

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Footer,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TestTranslateLoader },
        }),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
