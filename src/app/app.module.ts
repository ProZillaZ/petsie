import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'environments/environment';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { CoreService } from './core/services/core.service';
import { NoContentComponent } from './pages/no-content';
import { LoadingComponent } from './pages/loading/loading';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    LoadingComponent,
    NoContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    })
  ],
  providers: [
    environment.ENV_PROVIDERS,
    CoreService
  ]
})
export class AppModule {}
