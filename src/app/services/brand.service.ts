import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = 'https://localhost:44325/api/brands/getbrandsall';
  constructor(private httpClinet: HttpClient) {}

  getBrands(): Observable<ListResponseModel<Brand>> {
    return this.httpClinet.get<ListResponseModel<Brand>>(this.apiUrl);
  }
}
