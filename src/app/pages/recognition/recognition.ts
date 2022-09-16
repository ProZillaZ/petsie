import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import {
  AnnotationModel,
  FeatureModel,
  RequestModel,
  VisionModel
} from '../../core/models/api.model';
import { BreedModel } from '../../core/models/breed.model';
import 'rxjs/add/operator/map';
import { CoreService } from '../../core/services/core.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'recognition',
  templateUrl: './recognition.html',
  styleUrls: [ './recognition.scss' ],
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
export class RecognitionPageComponent implements OnInit {

  selected:boolean = false;
  final:boolean = false;
  clickTop:number = 0;
  clickLeft:number = 0;
  circleBg:string = '';

  file: File = null;
  base64:string = '';
  showLoading:boolean = false;

  cats:string[] = [];
  dogs:string[] = [];
  list:BreedModel[] = [];

  petsFound:BreedModel[] = [];

  showResults:boolean = false;

  constructor(private _router:Router,
              private _route: ActivatedRoute,
              private _matSnack: MatSnackBar,
              private _http: HttpClient,
              private _sanitizer: DomSanitizer,
              public cs:CoreService
  ) {}

  ngOnInit(): void {
    this._route.data.subscribe(data => {
      this.dogs = data['breeds']['dogs'];
      this.cats = data['breeds']['cats'];
      this.list = data['ourBreeds'];
    });
  }

  upload(files: FileList): void {
    if (files.item(0).size < 5*1000*1000) {
      if (files.item(0).type.split('/')[0] == 'image') {
        this.showLoading = true;
        this.file = files.item(0);
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = () => {
          this.base64 = reader.result.split(',')[1];
          this.visionAPI(this.base64);
        };
      }
      else
        this._matSnack.open('You can only upload images. Please select an image.', 'OK', {duration: 3000});
    }
    else
      this._matSnack.open('Image size is over 5MB. Please select another image', 'OK', {duration: 3000});
  }

  visionAPI(image:string): void {
    const feature:FeatureModel = new FeatureModel();
    feature.type = 'LABEL_DETECTION';
    feature.maxResults = 10;
    const request:RequestModel = new RequestModel();
    request.features = [feature];
    request.image = {content: image};
    const vision:VisionModel = new VisionModel();
    vision.requests = [request];
    this._http.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBszlWpR95cbkRk2BmUpXxXsZUWyayLwng', vision).subscribe(res => {
      this.parseResults(res['responses'][0]['labelAnnotations'].map(label => this.replaceUsless(label)).filter(label => label.description != ''));
    },
    err => {
      this.showLoading = false;
      this._matSnack.open('Something went wrong. Please try again.', 'OK', {duration: 3000});
    });
  }

  parseResults(results:AnnotationModel[]): void {
    this.petsFound = [];
    for (const res of results) {
      for (const cat of this.cats)
        if (cat.toLowerCase().indexOf(res['description']) != -1)
          this.petsFound.push(new BreedModel({name: cat, type: 'cat', sure: Math.round(res.score*100)}));

      for (const dog of this.dogs)
        if (dog.toLowerCase().indexOf(res['description']) != -1)
          this.petsFound.push(new BreedModel({name: dog, type: 'dog', sure: Math.round(res.score*100)}));
    }
    for (let i = 0; i < this.petsFound.length; i++){
      for (const pet of this.list)
        if (pet.name.toLowerCase().indexOf(this.petsFound[i].name.toLowerCase()) != -1) {
          const sure = this.petsFound[i].sure;
          this.petsFound[i] = pet;
          this.petsFound[i].sure = sure;
        }

    }
    this.petsFound = this.removeDuplicates(this.petsFound);
    this.showLoading = false;
    this.showResults = true;
  }

  replaceUsless(str:AnnotationModel): AnnotationModel {
    str.description = str.description.replace('dog ', '');
    str.description = str.description.replace(' dog', '');
    str.description = str.description.replace('dog', '');
    str.description = str.description.replace('cat ', '');
    str.description = str.description.replace(' cat', '');
    str.description = str.description.replace('cat', '');
    str.description = str.description.replace('mammal ', '');
    str.description = str.description.replace(' mammal', '');
    str.description = str.description.replace('mammal', '');
    str.description = str.description.replace('like ', '');
    str.description = str.description.replace(' like', '');
    str.description = str.description.replace('like', '');
    str.description = str.description.replace('breed ', '');
    str.description = str.description.replace(' breed', '');
    str.description = str.description.replace('breed', '');
    str.description = str.description.replace('group ', '');
    str.description = str.description.replace(' group', '');
    str.description = str.description.replace('group', '');
    return str;
  }
  removeDuplicates(arr:BreedModel[]): BreedModel[] {
    let newArr:BreedModel[] = [];
    for (let i = 0; i < arr.length; i++) {
      let found = false;
      for (let j = i+1; j < arr.length; j++)
        if (arr[i].name == arr[j].name) {
          found = true;
          break;
        }
      if (!found)
        newArr.push(arr[i]);
    }
    return newArr;
  }
  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }
  reset(): void {
    this.showLoading = false;
    this.showResults = false;
    this.petsFound = [];
  }
  select(event:any, num:number): void {
    const colors = ['', '#fa9d1f', '#e8eaf6', '#fefce3'];
    this.clickTop = event.clientY;
    this.clickLeft = event.clientX;
    this.circleBg = colors[num];
    this.selected = true;
    setTimeout(_=>{this.final = true;},100);
    setTimeout(_=>{
      if (num == 1)
        this._router.navigate(['/home']);
      else if (num == 2)
        this._router.navigate(['/picked-pet']);
    },900);
  }
  pickPet(event:any, pet:BreedModel): void {
    this.cs.pickedPet = pet;
    this.select(event, 2);
  }
}
