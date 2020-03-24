import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private httpClient: HttpClient,private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.httpClient.get('/api/products', { withCredentials: true }).toPromise()
      .then((results) => {
        console.log("通信してログイン済み");
        return true;
      })
      .catch((error) => {
        return this.router.parseUrl('/login');
        console.log("通信してログイン失敗");
        return false;
      });
  }

}
