import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './components/app.component';
import { RouterPageComponent } from './router-page.component'
import { TwoPageComponent } from './components/two-page.component'
import { LoginComponent } from './components/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'one', component: AppComponent },
  { path: 'two', component: TwoPageComponent },
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}