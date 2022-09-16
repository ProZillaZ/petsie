import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../core/modules/core.shared.module';
import {
  MatButtonModule,
  MatIconModule,
} from '@angular/material';
import { ComparePageComponent } from './compare';

export const routes = [
  { path: '', component: ComparePageComponent }
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
    ComparePageComponent
  ],
  providers: []
})
export class ComparePageModule {
}
