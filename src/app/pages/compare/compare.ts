import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../core/services/core.service';
import { Router } from '@angular/router';
import { BreedModel } from '../../core/models/breed.model';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'compare',
  templateUrl: './compare.html',
  styleUrls: [ './compare.scss' ],
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
export class ComparePageComponent implements OnInit {

  selected:boolean = false;
  clickTop:number = 0;
  clickLeft:number = 0;
  circleBg:string = '';

  constructor(public cs: CoreService,
              private _router: Router) {}

  ngOnInit(): void {
    if (this.cs.compareList.length < 2)
      this._router.navigate(['/find-pet']);
  }
  removeCompare(index:number): void {
    this.cs.compareList.splice(index, 1);
    if (this.cs.compareList.length == 1)
      this._router.navigate(['/find-pet']);
  }
  pickPet(event:any, pet:BreedModel): void {
    this.cs.pickedPet = pet;
    this.select(event, 2);
  }

  select(event:any, num:number): void {
    const colors = ['', '#fff', '#e8eaf6'];
    this.clickTop = event.clientY;
    this.clickLeft = event.clientX;
    this.circleBg = colors[num];
    this.selected = true;
    setTimeout(_=>{
      if (num == 1)
        this._router.navigate(['/find-pet']);
      else
        this._router.navigate(['/picked-pet']);
    },900);
  }
}
