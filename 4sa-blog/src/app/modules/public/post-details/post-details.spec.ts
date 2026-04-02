import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { PostDetails } from './post-details';

class TestTranslateLoader implements TranslateLoader {
  getTranslation(_lang: string) {
    return of({});
  }
}

describe('PostDetails', () => {
  let component: PostDetails;
  let fixture: ComponentFixture<PostDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PostDetails,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TestTranslateLoader },
        }),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
