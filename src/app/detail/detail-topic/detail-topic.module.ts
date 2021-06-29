import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailTopicRoutingModule } from './detail-topic-routing.module';
import { DetailTopicComponent } from './detail-topic.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    DetailTopicComponent
  ],
  imports: [
    CommonModule,
    DetailTopicRoutingModule,
    MatProgressSpinnerModule,
    FlexLayoutModule
  ]
})
export class DetailTopicModule { }
