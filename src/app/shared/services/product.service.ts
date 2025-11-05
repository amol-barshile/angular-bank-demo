import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'
import { Product } from '../../models/product.model'

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    addProduct(product: Product): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/products`, product)
    }

    getAllProducts(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/products`)
    }

    deleteProductById(productId: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/products/${productId}`)
    }
}