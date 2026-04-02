import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { Categories } from './categories';

class TestTranslateLoader implements TranslateLoader {
  getTranslation(_lang: string) {
    return of({});
  }
}

describe('Categories', () => {
  let component: Categories;
  let fixture: ComponentFixture<Categories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Categories,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TestTranslateLoader },
        }),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Categories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
