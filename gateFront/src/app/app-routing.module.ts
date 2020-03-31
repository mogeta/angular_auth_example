import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./guard/auth.guard";
import {GuardComponent} from "./guard/guard.component";
import {LoginComponent} from "./login/login.component";
import {MembersComponent} from "./members/members.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'guard', component: GuardComponent, canActivate: [AuthGuard] },
  { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
