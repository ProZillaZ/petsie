import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../assets/scss/app.scss',
    '../assets/css/indigo-pink.css'
  ],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
}
