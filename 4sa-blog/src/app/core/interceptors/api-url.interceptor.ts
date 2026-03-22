import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Prefixes all requests with `environment.apiUrl` unless the request url
 * already contains `http` or is for a local asset.
 */
export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const isApiRequest = !/^(http|.\/assets|.\/i18n)/.test(req.url);

  if (!isApiRequest) {
    return next(req);
  }

  const clonedReq = req.clone({
    url: `${environment.apiUrl}/${req.url}`,
  });

  return next(clonedReq);
};
