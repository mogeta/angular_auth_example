import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public userName: string = 'ExampleUser';
  public password: string = 'MyPassword';

  public loginedMessage: string = '';
  public loginErrorMessage: string = '';
  constructor(private httpClient: HttpClient,private router: Router) { }

  ngOnInit(): void {
  }
  public onLogin(): void {
    // フィードバックメッセージのリセット
    this.loginedMessage = this.loginErrorMessage = '';
    // Express サーバに POST 通信する。リクエストボディのプロパティ名は passport.use('local') で定めたモノに合わせる
    // 第3引数の withCredentials はログイン時から全ての通信で必須
    this.httpClient.post('api/login', {
      userName: this.userName,
      password: this.password
    }, { withCredentials: true }).toPromise()
      .then((result) => {
        this.loginedMessage = 'ログインしました';
        this.router.navigateByUrl('/guard');
      })
      .catch((error) => {
        this.loginErrorMessage = `ログイン失敗 : ${JSON.stringify(error)}`;
      });
  }
  public onLogout(): void {
    this.httpClient.get('/api/logout', { withCredentials: true }).toPromise()
      .then((_result) => {
        this.loginedMessage = '';
        this.router.navigateByUrl('/');
      });
  };
}
