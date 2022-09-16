import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../core/modules/core.shared.module';
import { FindPetPageComponent } from './find-pet';
import {
  MatButtonModule,
  MatFormFieldModule, MatIconModule,
  MatSelectModule
} from '@angular/material';
import { BreedsResolver } from '../../core/resolvers/breeds.resolver';
import { ReactiveFormsModule } from '@angular/forms';

export const routes = [
  { path: '', component: FindPetPageComponent, resolve: {breeds: BreedsResolver} }
];

const MATERIAL = [
  MatSelectModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    ...MATERIAL
  ],
  declarations: [
    FindPetPageComponent
  ],
  providers: [BreedsResolver]
})
export class FindPetPageModule {
}
