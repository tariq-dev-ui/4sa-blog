import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Article } from '../models/article.model';
import { MOCK_ARTICLES } from '../mocks/articles.mock';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private http = inject(HttpClient);

  /**
   * Retrieves a list of articles.
   * Currently, it returns mock data with a simulated network delay.
   *
   * @returns An Observable emitting an array of Articles.
   */
  getArticles(): Observable<Article[]> {
    // --- MOCK DATA LOGIC ---
    // Simulate a network delay of 800ms before returning mock data.
    // This helps in testing loading states in the UI.
    return of(MOCK_ARTICLES).pipe(delay(800));

    /*
     * --- FUTURE-PROOFING: REAL API CALL ---
     * TODO: When the backend API is ready, remove the mock logic above
     * and uncomment the following line. The `apiUrlInterceptor` will
     * automatically prefix the URL with the value from `environment.ts`.
     */
    // return this.http.get<Article[]>('articles');
  }

  /**
   * Retrieves a single article by its slug.
   *
   * @param slug The unique slug of the article.
   * @returns An Observable emitting a single Article or null if not found.
   */
  getArticleBySlug(slug: string): Observable<Article | null> {
    // --- MOCK DATA LOGIC ---
    const article = MOCK_ARTICLES.find(a => a.slug === slug) ?? null;
    return of(article).pipe(delay(500));


    /*
     * --- FUTURE-PROOFING: REAL API CALL ---
     * TODO: When the backend API is ready, remove the mock logic above
     * and uncomment the following line.
     */
    // return this.http.get<Article | null>(`articles/${slug}`);
  }
}
