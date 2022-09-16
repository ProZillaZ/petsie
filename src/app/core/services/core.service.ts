import { Injectable } from '@angular/core';
import { BreedModel } from '../models/breed.model';

@Injectable()
export class CoreService {

  public compareList:BreedModel[] = [];
  public pickedPet:BreedModel = null;

  public place:number = 0;
  public active:number = 0;
  public quiet:number = 0;

  public shuffle(array:BreedModel[]): BreedModel[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  public urlEncoder(phrase:string): string {
    return phrase.split(' ').join('-').toLowerCase();
  }

  public clone(object: any): any {
    return JSON.parse(JSON.stringify( object ));
  }
}
