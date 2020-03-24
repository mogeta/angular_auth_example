import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-guard',
  templateUrl: './guard.component.html',
  styleUrls: ['./guard.component.sass']
})
export class GuardComponent implements OnInit {


  public products: any[] = [];
  public findProductsErrorMessage: string = '';
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
  public findProducts(): void {
    //this.products = [];
    this.findProductsErrorMessage = '';

    this.httpClient.get('api/products', { withCredentials: true }).toPromise()
      .then((results) => {
        // @ts-ignore
        this.products = results["products"];
      })
      .catch((error) => {
        this.findProductsErrorMessage = `製品一覧取得に失敗 : ${JSON.stringify(error)}`;
      });
  }
}
