import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public userName: string = '';
  public password: string = '';

  public loginedMessage: string = '';
  public loginErrorMessage: string = '';

  public products: any[] = [];
  public findProductsErrorMessage: string = '';

  constructor(private httpClient: HttpClient) { }

  public onLogin(): void {
    // フィードバックメッセージのリセット
    this.loginedMessage = this.loginErrorMessage = '';
    // Express サーバに POST 通信する。リクエストボディのプロパティ名は passport.use('local') で定めたモノに合わせる
    // 第3引数の withCredentials はログイン時から全ての通信で必須
    this.httpClient.post('http://localhost:8080/login', {
      userName: this.userName,
      password: this.password
    }, { withCredentials: true }).toPromise()
      .then((result) => {
        this.loginedMessage = 'ログインしました';
      })
      .catch((error) => {
        this.loginErrorMessage = `ログイン失敗 : ${JSON.stringify(error)}`;
      });
  }

  public findProducts(): void {
    //this.products = [];
    this.findProductsErrorMessage = '';

    this.httpClient.get('http://localhost:8080/products', { withCredentials: true }).toPromise()
      .then((results) => {
        // @ts-ignore
        this.products = results["products"];
      })
      .catch((error) => {
        this.findProductsErrorMessage = `製品一覧取得に失敗 : ${JSON.stringify(error)}`;
      });
  }

  public onLogout(): void {
    this.httpClient.get('http://localhost:8080/logout', { withCredentials: true }).toPromise()
      .then((_result) => {
        this.loginedMessage = '';
      });
  };
}
