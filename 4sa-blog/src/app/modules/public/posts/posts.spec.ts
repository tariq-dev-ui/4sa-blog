import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { Posts } from './posts';

class TestTranslateLoader implements TranslateLoader {
  getTranslation(_lang: string) {
    return of({});
  }
}

describe('Posts', () => {
  let component: Posts;
  let fixture: ComponentFixture<Posts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Posts,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TestTranslateLoader },
        }),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Posts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
