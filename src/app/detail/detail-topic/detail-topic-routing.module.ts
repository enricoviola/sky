import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailTopicComponent } from './detail-topic.component';

const routes: Routes = [{ path: '', component: DetailTopicComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailTopicRoutingModule { }
