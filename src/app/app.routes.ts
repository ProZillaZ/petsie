import { Routes } from '@angular/router';
import { NoContentComponent } from './pages/no-content';
import { LoadingComponent } from './pages/loading/loading';

export const ROUTES: Routes = [
  {path: 'home', loadChildren: './pages/home#HomePageModule'},
  {path: 'find-pet', loadChildren: './pages/find-pet#FindPetPageModule'},
  {path: 'compare', loadChildren: './pages/compare#ComparePageModule'},
  {path: 'picked-pet', loadChildren: './pages/picked-pet#PickedPetPageModule'},
  {path: 'recognition', loadChildren: './pages/recognition#RecognitionPageModule'},
  {path: 'wizard', loadChildren: './pages/wizard#WizardPageModule'},
  {path: 'loading', component: LoadingComponent},
  {path: '', redirectTo: 'loading', pathMatch: 'full'},
  {path: '**', component: NoContentComponent}
];
