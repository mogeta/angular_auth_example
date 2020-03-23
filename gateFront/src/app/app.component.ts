import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {


  public products: any[] = [];
  public findProductsErrorMessage: string = '';

  constructor(private httpClient: HttpClient) { }

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


}
