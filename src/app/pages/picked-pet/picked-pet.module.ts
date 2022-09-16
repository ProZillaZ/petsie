import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../core/modules/core.shared.module';
import {  MatButtonModule,  MatIconModule} from '@angular/material';
import { PickedPetPageComponent } from './picked-pet';

export const routes = [
  {path: '', component: PickedPetPageComponent}
];

const MATERIAL = [
  MatButtonModule,
  MatIconModule
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    ...MATERIAL
  ],
  declarations: [
    PickedPetPageComponent
  ],
  providers: []
})
export class PickedPetPageModule {
}
