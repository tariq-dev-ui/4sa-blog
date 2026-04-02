import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { Home } from './home';

class TestTranslateLoader implements TranslateLoader {
  getTranslation(_lang: string) {
    return of({});
  }
}

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Home,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TestTranslateLoader },
        }),
      ],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
