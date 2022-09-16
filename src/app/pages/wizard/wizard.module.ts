import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../core/modules/core.shared.module';
import { MatButtonModule, MatIconModule, MatRadioModule } from '@angular/material';
import { WizardPageComponent } from './wizard';

export const routes = [
  { path: '', component: WizardPageComponent }
];

const MATERIAL = [
  MatButtonModule,
  MatIconModule,
  MatRadioModule
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    ...MATERIAL
  ],
  declarations: [
    WizardPageComponent
  ],
  providers: []
})
export class WizardPageModule {
}
