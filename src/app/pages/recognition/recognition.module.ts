import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../core/modules/core.shared.module';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule, MatProgressBarModule,
  MatSnackBarModule
} from '@angular/material';
import { RecognitionPageComponent } from './recognition';
import { AllBreedsResolver, BreedsResolver } from '../../core/resolvers/breeds.resolver';

export const routes = [
  { path: '', component: RecognitionPageComponent, resolve: {breeds: AllBreedsResolver, ourBreeds: BreedsResolver} }
];

const MATERIAL = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatSnackBarModule,
  MatProgressBarModule
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    ...MATERIAL
  ],
  declarations: [
    RecognitionPageComponent
  ],
  providers: [AllBreedsResolver, BreedsResolver]
})
export class RecognitionPageModule {
}
