import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideTranslateService({
      lang: 'ar',
      fallbackLang: 'en',
    }),
    // يجب أن يأتي بعد provideTranslateService ليستخدم HttpLoader بدل NoOpLoader
    provideTranslateHttpLoader({ prefix: '/i18n/', suffix: '.json' }),
    provideRouter(routes),
  ],
};
