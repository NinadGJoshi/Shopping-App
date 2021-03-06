import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProductsDataProviderService {
    constructor(private http: HttpClient) { }

    getProductsData(): Observable<any> {
        return this.http.get('../../assets/data-files/products.json').pipe();
    }
}