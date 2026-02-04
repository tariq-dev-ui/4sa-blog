import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-site-intro',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './site-intro.html',
  styleUrl: './site-intro.scss',
})
export class SiteIntro {}
