import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'loading',
  template: `
    <div class="loading-container">
      <div class="loader">
        <img src="./assets/img/barbell.gif" />
        <p>Loading</p>
      </div>
    </div>
    <div class="loading-circle" [ngClass]="{'active': finish}"></div>
  `,
  styleUrls: ['./loading.scss']
})
export class LoadingComponent implements AfterViewInit {

  finish:boolean = false;

  constructor(private _router:Router) {}

  ngAfterViewInit(): void {
    setTimeout(_=>{this.finish=true;},3000);
    setTimeout(_=>{this._router.navigate(['/home']);},3500);
  }
}
