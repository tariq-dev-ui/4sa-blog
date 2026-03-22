import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.html',
  styleUrl: './posts.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Posts {

}
