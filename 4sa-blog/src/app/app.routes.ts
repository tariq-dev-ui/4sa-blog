import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/public/public.routes').then((m) => m.PUBLIC_ROUTES),
  },
  { path: '**', redirectTo: '' },
];
