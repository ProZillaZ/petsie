import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreedModel } from '../../core/models/breed.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { CoreService } from '../../core/services/core.service';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'find-pet',
  templateUrl: './find-pet.html',
  styleUrls: [ './find-pet.scss' ],
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
export class FindPetPageComponent implements OnInit {

  petSearch: FormGroup;
  list:BreedModel[] = [];
  limit:number = 16;
  filterHeight:boolean = false;
  moreFilters:boolean = false;

  selected:boolean = false;
  final:boolean = false;
  clickTop:number = 0;
  clickLeft:number = 0;
  circleBg:string = '';

  constructor(
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _router: Router,
    public cs: CoreService) {}

  ngOnInit(): void {
    this._route.data.subscribe(data => {
      this.list = this.cs.shuffle(data['breeds']);
    });
    this.petSearch = this._formBuilder.group({
      size: [0],
      animalFriendly: [0],
      kidFriendly: [0],
      lowShedding: [0],
      easyToGroom: [0],
      energy: [0],
      health: [0],
      quietness: [0],
      intelligence: [0],
      trainable: [0],
      standHot: [0],
      standCold: [0]
    });
    if (this.cs.place > 0) {this.petSearch.controls['size'].setValue(this.cs.place); this.refreshSearch(); }
    if (this.cs.active > 0) {this.petSearch.controls['energy'].setValue(this.cs.active); this.refreshSearch(); }
    if (this.cs.quiet > 0) {this.petSearch.controls['quietness'].setValue(this.cs.quiet); this.refreshSearch(); }
    this.petSearch.valueChanges.subscribe(form => {
        this.refreshSearch();
    });
  }
  refreshSearch(): void {
    const s = this.petSearch.value;
    for (const pet of this.list) {
      pet.show =
        !(
          (s['size'] != 0 && pet.size != s['size']) ||
          (s['animalFriendly'] != 0 && pet.animalFriendly != s['animalFriendly']) ||
          (s['kidFriendly'] != 0 && pet.kidFriendly != s['kidFriendly']) ||
          (s['lowShedding'] != 0 && pet.lowShedding != s['lowShedding']) ||
          (s['easyToGroom'] != 0 && pet.easyToGroom != s['easyToGroom']) ||
          (s['energy'] != 0 && pet.energy != s['energy']) ||
          (s['health'] != 0 && pet.health != s['health']) ||
          (s['quietness'] != 0 && pet.quietness != s['quietness']) ||
          (s['intelligence'] != 0 && pet.intelligence != s['intelligence']) ||
          (s['trainable'] != 0 && pet.trainable != s['trainable']) ||
          (s['standHot'] != 0 && pet.trainable != s['standHot']) ||
          (s['standCold'] != 0 && pet.standCold != s['standCold'])
        );
    }
    this.limit = 16;
    this.moreFilters = false;
    this.filterHeight=false;
  }
  filterList(): BreedModel[] {
    const list = [];
    let count = 0;
    for (const pet of this.list) {
      if (count >= this.limit)
        break;
      if (pet.show) {
        list.push(pet);
        count++;
      }
    }
    return list;
  }
  reset(): void {
    this.petSearch.controls['size'].setValue(0);
    this.petSearch.controls['animalFriendly'].setValue(0);
    this.petSearch.controls['kidFriendly'].setValue(0);
    this.petSearch.controls['lowShedding'].setValue(0);
    this.petSearch.controls['easyToGroom'].setValue(0);
    this.petSearch.controls['energy'].setValue(0);
    this.petSearch.controls['health'].setValue(0);
    this.petSearch.controls['quietness'].setValue(0);
    this.petSearch.controls['intelligence'].setValue(0);
    this.petSearch.controls['trainable'].setValue(0);
    this.petSearch.controls['trainable'].setValue(0);
    this.petSearch.controls['standCold'].setValue(0);
    this.moreFilters = false;
    this.filterHeight=false;
  }
  compare(breed:BreedModel): void {
    this.cs.compareList.push(breed);
  }
  checkComapare(breed:BreedModel): boolean {
    for (const pet of this.cs.compareList)
      if (pet.name == breed.name)
        return false;
    return true;
  }
  clearCompare(index:number): void {
    this.cs.compareList.splice(index, 1);
  }
  pickPet(event:any, pet:BreedModel): void {
    this.cs.pickedPet = pet;
    this.select(event, 2);
  }
  showMoreFilters(): void {
    if (!this.filterHeight) {
      this.filterHeight = true;
      setTimeout(_=>{this.moreFilters=true;}, 400);
    }
    else {
      this.moreFilters = false;
      this.filterHeight=false;
    }
  }
  select(event:any, num:number): void {
    const colors = ['', '#2b2b31', '#e8eaf6', '#fa9d1f', '#2b2b31'];
    this.clickTop = event.clientY;
    this.clickLeft = event.clientX;
    this.circleBg = colors[num];
    this.selected = true;
    if (num != 1 && num != 4)
      setTimeout(_=>{this.final = true;},100);
    setTimeout(_=>{
      if (num == 1)
        this._router.navigate(['/compare']);
      else if (num == 2)
        this._router.navigate(['/picked-pet']);
      else if (num == 3)
        this._router.navigate(['/home']);
      else
        this._router.navigate(['/wizard']);
    },900);
  }
}
