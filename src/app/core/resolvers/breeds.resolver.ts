import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { BreedModel } from '../models/breed.model';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BreedsResolver implements Resolve<BreedModel[]> {

  constructor(private _http: HttpClient) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._http.get(`./assets/data/breeds.json`)
      .map((res:any) => {
        const pets:BreedModel[] = [];

        for (const pet of res)
          pets.push(new BreedModel(pet));

        return pets;
      });
  }
}

@Injectable()
export class AllBreedsResolver implements Resolve<{cats: string[], dogs: string[]}> {

  constructor(private _http: HttpClient) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._http.get(`./assets/data/allBreeds.json`).map(res => {
      return {cats: res['cats'], dogs: res['dogs']};
    });
  }
}
