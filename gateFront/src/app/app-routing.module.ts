import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./guard/auth.guard";
import {GuardComponent} from "./guard/guard.component";
import {LoginComponent} from "./login/login.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'guard', component: GuardComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
