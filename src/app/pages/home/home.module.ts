import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home';
import { SharedModule } from '../../core/modules/core.shared.module';
import { MatButtonModule } from '@angular/material';

export const routes = [
  { path: '', component: HomePageComponent }
];

const MATERIAL = [
  MatButtonModule
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    ...MATERIAL
  ],
  declarations: [
    HomePageComponent
  ],
  providers: []
})
export class HomePageModule {
}
