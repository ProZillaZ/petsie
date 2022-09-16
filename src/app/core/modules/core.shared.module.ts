import { NgModule } from '@angular/core';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [],
  declarations: [
    TruncatePipe
  ],
  exports: [
    FormsModule,
    CommonModule,
    RouterModule,
    TruncatePipe
  ]
})
export class SharedModule {
}
