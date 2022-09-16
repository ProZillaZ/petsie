import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'wizard',
  templateUrl: './wizard.html',
  styleUrls: [ './wizard.scss' ],
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
export class WizardPageComponent {

  selected:boolean = false;
  final:boolean = false;
  clickTop:number = 0;
  clickLeft:number = 0;
  circleBg:string = '';

  constructor(private _router:Router, public cs: CoreService) {
    this.cs.quiet = 0;
    this.cs.active = 0;
    this.cs.place = 0;
  }

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
}
