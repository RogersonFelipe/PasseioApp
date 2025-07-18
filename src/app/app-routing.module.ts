import { LandingpageComponent } from './landingpage/landingpage.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LandingpageComponent
  },
  {
    path: 'paginas',
    loadChildren: () => import('./template/template.module').then(m => m.TemplateModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
