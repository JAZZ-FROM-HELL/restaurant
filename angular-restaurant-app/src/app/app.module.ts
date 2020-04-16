import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./auth/login.component";
import {ErrorInterceptor} from "./auth/error.interceptor";
import {JwtInterceptor} from "./auth/jwt.interceptor";
import {fakeBackendProvider} from "./auth/fake-backend";

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
