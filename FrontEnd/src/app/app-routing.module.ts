import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityService } from './services/security.service';

import { AppComponent } from './components/app.component';
import { RouterPageComponent } from './router-page.component'
import { TwoPageComponent } from './components/two-page.component'
import { LoginComponent } from './components/login.component';
import { RegistrationComponent } from './components/registration.component';

const routes: Routes = [
  { path: '', redirectTo: '/one', pathMatch: 'full' },
  { path: 'one', component: AppComponent, canActivate:[SecurityService]},
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent},
  { path: 'two', component: TwoPageComponent, canActivate:[SecurityService]},
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}