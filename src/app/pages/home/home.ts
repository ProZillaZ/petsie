import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { animate, group, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: [ './home.scss' ],
  animations: [
    trigger('transitionEl', [
      transition('* => *', [
        query('.item', [
          style({ opacity: 0 }),
          stagger(100, [
            style({ transform: 'translateY(50px)' }),
            animate('500ms cubic-bezier(0.785, 0.135, 0.150, 0.860)', style({ transform: 'translateY(0px)', opacity: 1 })),
          ])
        ], {optional: true})
      ])
    ])
  ]
})
export class HomePageComponent {

  selected:boolean = false;
  final:boolean = false;
  clickTop:number = 0;
  clickLeft:number = 0;
  circleBg:string = '';

  constructor(private _router:Router) {}

  select(event:any, num:number): void {
    const colors = ['', '#c2fafb', '#c8ffe8', '#fefce3'];
    this.clickTop = event.clientY;
    this.clickLeft = event.clientX;
    this.circleBg = colors[num];
    this.selected = true;
    setTimeout(_=>{this.final = true;},100);
    setTimeout(_=>{
      if (num == 1)
        this._router.navigate(['/find-pet']);
      else if (num == 2)
        this._router.navigate(['/recognition']);
      else
        this._router.navigate(['/adopt']);
    },900);
  }
  vote() {
    window.open('http://www.angularattack.com/entries/312-prozillaz/vote','_blank');
  }
}
