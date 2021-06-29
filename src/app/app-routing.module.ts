import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchTopicComponent } from './search-topic/search-topic.component';

const routes: Routes = [
  { path: '', component: SearchTopicComponent },
  { path: 'detail', pathMatch: 'full', redirectTo: '' },
  { path: 'detail/:id', loadChildren: () => import('./detail/detail-topic/detail-topic.module').then(m => m.DetailTopicModule) },
  {path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
