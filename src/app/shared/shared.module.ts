import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NabvarComponent } from './nabvar/nabvar.component';


@NgModule({
  declarations: [
    NabvarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [NabvarComponent]
})
export class SharedModule { }
