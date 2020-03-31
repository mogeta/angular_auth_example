import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CustomInterceptor } from './custom-interceptor';
import { GuardComponent } from './guard/guard.component';
import {CookieService} from "ngx-cookie-service";
import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
@NgModule({
  declarations: [
    AppComponent,
    GuardComponent,
    LoginComponent,
    MembersComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    CookieService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: CustomInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {

}
