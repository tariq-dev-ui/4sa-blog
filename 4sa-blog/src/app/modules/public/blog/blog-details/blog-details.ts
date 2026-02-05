import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { Breadcrumb, type BreadcrumbItem } from '../../../../shared/breadcrumb/breadcrumb';
import { BlogSidebar } from '../../../../layout/blog-sidebar/blog-sidebar';
import { getBlogPostById } from '../blog-data';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [RouterLink, TranslatePipe, BlogSidebar, Breadcrumb],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.scss',
})
export class BlogDetails {
  private readonly route = inject(ActivatedRoute);

  readonly postId = signal<string | null>(null);
  readonly post = computed(() => {
    const id = this.postId();
    return id ? getBlogPostById(id) : null;
  });

  constructor() {
    this.route.params.subscribe((params) => {
      this.postId.set(params['id'] ?? null);
    });
  }

  breadcrumbItems(post: { title: string }): BreadcrumbItem[] {
    return [
      { route: '/', labelKey: 'breadcrumb.home' },
      { route: '/blog', labelKey: 'blog.title' },
      { label: post.title },
    ];
  }

  formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString('ar-SA', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  copied = false;

  copyCoupon(code: string): void {
    if (typeof navigator?.clipboard?.writeText !== 'function') return;
    navigator.clipboard.writeText(code).then(() => {
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    });
  }
}
