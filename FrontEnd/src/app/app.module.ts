import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './components/app.component';
import { RouterPageComponent } from './router-page.component';
import { TwoPageComponent } from './components/two-page.component';
import { LoginComponent } from './components/login.component';
import { RegistrationComponent } from './components/registration.component';

import { MapService } from './services/mapService';
import { NotificationService } from './services/notification.service';
import { SecurityService } from './services/security.service';
import { UserService } from './services/user.service';

import { TokenInterceptor } from './interceptors/token.interceptor';
import { AppRoutingModule } from './app-routing.module';

import {
  MatButtonModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSliderModule,
  MatInputModule,
  MatTableModule,
  MatCardModule,
  MatListModule,
  MatGridListModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    RouterPageComponent,
    TwoPageComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatSliderModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [
    MapService,
    SecurityService, 
    NotificationService, 
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [RouterPageComponent]
})
export class AppModule { }
