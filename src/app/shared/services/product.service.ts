import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {productType} from "../../../types/product.type";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: productType[] = [];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<productType[]> {
    //ajax
    return this.http.get<productType[]>(environment.apiURL + 'pizzas')
  }

  getProduct(id: number): Observable<productType>  {
    return this.http.get<productType>(environment.apiURL + `pizzas?id=${id}`);
  }

  createOrder(data: {product: string, address: string, phone: string}) {
    return this.http.post<{ success: boolean, message?: string }>(environment.apiURL + `order-pizza`, data);
  }
}
