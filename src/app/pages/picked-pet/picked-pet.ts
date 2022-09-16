import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../core/services/core.service';
import { Router } from '@angular/router';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'picked-pet',
  templateUrl: './picked-pet.html',
  styleUrls: [ './picked-pet.scss' ],
  animations: [
    trigger('transitionEl', [
      transition('* => *', [
        query('.item', [
          style({ opacity: 0 }),
          stagger(100, [
            style({ transform: 'translateX(-50px)' }),
            animate('500ms cubic-bezier(0.785, 0.135, 0.150, 0.860)', style({ transform: 'translateX(0px)', opacity: 1 })),
          ])
        ], {optional: true})
      ])
    ])
  ]
})
export class PickedPetPageComponent implements OnInit {

  selected:boolean = false;
  final:boolean = false;
  clickTop:number = 0;
  clickLeft:number = 0;
  circleBg:string = '';

  constructor(public cs: CoreService,
              private _router: Router) {}

  ngOnInit(): void {
    if (this.cs.pickedPet == null || this.cs.pickedPet.name.length == 0)
      this._router.navigate(['/find-pet']);
  }

  select(event:any, num:number): void {
    const colors = ['', '#c2fafb', '#e8eaf6', '#fa9d1f'];
    this.clickTop = event.clientY;
    this.clickLeft = event.clientX;
    this.circleBg = colors[num];
    this.selected = true;
    setTimeout(_=>{this.final = true;},100);
    setTimeout(_=>{
      if (num == 1)
        this._router.navigate(['/find-pet']);
      else if (num == 2)
        this._router.navigate(['/picked-pet']);
      else
        this._router.navigate(['/home']);
    },900);
  }
}
