import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export interface FaqItem {
  id: string;
  questionKey: string;
  answerKey: string;
}

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './faq-section.html',
  styleUrl: './faq-section.scss',
})
export class FaqSection {
  /** المفتاح المفتوح حاليًا (واحد فقط) */
  openId = signal<string | null>(null);

  readonly items: FaqItem[] = [
    { id: '1', questionKey: 'faq.q1', answerKey: 'faq.a1' },
    { id: '2', questionKey: 'faq.q2', answerKey: 'faq.a2' },
    { id: '3', questionKey: 'faq.q3', answerKey: 'faq.a3' },
    { id: '4', questionKey: 'faq.q4', answerKey: 'faq.a4' },
    { id: '5', questionKey: 'faq.q5', answerKey: 'faq.a5' },
    { id: '6', questionKey: 'faq.q6', answerKey: 'faq.a6' },
  ];

  toggle(id: string): void {
    this.openId.update((current) => (current === id ? null : id));
  }

  isOpen(id: string): boolean {
    return this.openId() === id;
  }
}
