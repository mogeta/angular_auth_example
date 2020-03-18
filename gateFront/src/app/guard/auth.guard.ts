import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private httpClient: HttpClient) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("auth check開始");
    return this.httpClient.get('http://localhost:8080/products', { withCredentials: true }).toPromise()
      .then((results) => {
        console.log("通信してログイン済み");
        return true;
      })
      .catch((error) => {
        console.log("通信してログイン失敗");
        return false;
      });
  }

}
